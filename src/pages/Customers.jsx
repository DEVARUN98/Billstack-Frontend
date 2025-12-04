import React, { useState, useEffect } from "react";

export default function Customers({ isAdmin }) {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cust, setCust] = useState({ name: "", phone: "" });
  const [addLoading, setAddLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Fetch customers once when component mounts
  useEffect(() => {
    const loadCustomers = async () => {
      try {
        setInitialLoading(true);
        const res = await fetch("http://localhost:8000/api/invoicesnew/customers/", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setCustomers(data);
        }
      } catch (e) {
        console.error("Load customers failed:", e);
      } finally {
        setInitialLoading(false);
      }
    };
    loadCustomers();
  }, []);

  // Filter customers by search term
  const filteredCustomers = customers.filter((c) => {
    const name = (c.customer_name || "").toLowerCase();
    const phone = (c.phone || "").toString();
    const term = searchTerm.toLowerCase();
    return name.includes(term) || phone.includes(term);
  });

  const hasCustomers = customers.length > 0;

  // Add a new customer and refresh the list
  const addCustomer = async () => {
    if (!cust.name.trim() || !cust.phone.trim()) {
      alert("Please enter both name and phone!");
      return;
    }

    setAddLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/invoicesnew/add_customer/", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: cust.name.trim(),
          phone: cust.phone.trim(),
        }),
      });

      if (res.ok) {
        // Refresh customers list after add
        const refreshRes = await fetch("http://localhost:8000/api/invoicesnew/customers/", {
          credentials: "include",
        });
        if (refreshRes.ok) {
          const updatedCustomers = await refreshRes.json();
          setCustomers(updatedCustomers);
        }
        setCust({ name: "", phone: "" });
        alert("✅ Customer added successfully!");
      } else {
        const error = await res.json();
        alert(`❌ ${error.error || "Failed to add customer"}`);
      }
    } catch (e) {
      console.error("Add customer error:", e);
      alert("❌ Network error");
    } finally {
      setAddLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="page" style={{ textAlign: "center", padding: "60px", color: "#888" }}>
        <h2>Loading customers...</h2>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Customers ({customers.length})</h2>

      {/* Add Customer Form */}
      <div
        className="form-row"
        style={{
          marginBottom: "20px",
          background: "#f8f9fa",
          padding: "20px",
          borderRadius: "12px",
          // border: "2px dashed #2b6777",
        }}
      >
        <input
          type="text"
          placeholder="👤 Customer Name"
          value={cust.name}
          onChange={(e) => setCust({ ...cust, name: e.target.value })}
          style={{ flex: 1, minWidth: "220px", padding: "12px", borderRadius: "6px" }}
          disabled={addLoading}
        />
        <input
          type="tel"
          placeholder="📱 Phone Number"
          value={cust.phone}
          onChange={(e) => setCust({ ...cust, phone: e.target.value })}
          style={{ flex: 1, minWidth: "180px", padding: "12px", borderRadius: "6px" }}
          disabled={addLoading}
        />
        <button
          onClick={addCustomer}
          disabled={addLoading || !cust.name.trim() || !cust.phone.trim()}
          className="print-btn"
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            opacity: addLoading ? 0.6 : 1,
            cursor: addLoading ? "not-allowed" : "pointer",
          }}
        >
          {addLoading ? "⏳ Adding..." : "➕ Add Customer"}
        </button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: "25px" }}>
        <input
          type="text"
          placeholder="🔍 Search by name or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "350px",
            padding: "12px 16px",
            borderRadius: "8px",
            border: "2px solid #ddd",
            fontSize: "16px",
          }}
        />
      </div>

      {/* Customers Table */}
      <table>
        <thead>
          <tr>
            <th style={{ background: "#2b6777", color: "white", padding: "15px" }}>Name</th>
            <th style={{ background: "#2b6777", color: "white", padding: "15px" }}>Phone</th>
            <th style={{ background: "#2b6777", color: "white", padding: "15px" }}>Total Invoices</th>
            <th style={{ background: "#2b6777", color: "white", padding: "15px" }}>Total Spent</th>
          </tr>
        </thead>
        <tbody>
          {!hasCustomers ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", color: "#888", padding: "50px" }}>
                📭 No customers yet.
                <br />
                <small style={{ fontSize: "14px" }}>
                  Add your first customer above or create an invoice!
                </small>
              </td>
            </tr>
          ) : filteredCustomers.length > 0 ? (
            filteredCustomers.map((c, i) => (
              <tr key={`${c.customer_name}-${c.phone}-${i}`}>
                <td style={{ fontWeight: "500", padding: "15px" }}>{c.customer_name || "N/A"}</td>
                <td style={{ padding: "15px" }}>{c.phone || "N/A"}</td>
                <td style={{ textAlign: "center", padding: "15px" }}>{c.total_invoices || 0}</td>
                <td
                  style={{
                    fontWeight: "600",
                    color: "#2d5a2d",
                    padding: "15px",
                    textAlign: "right",
                  }}
                >
                  ₹{Number(c.total_spent || 0).toLocaleString("en-IN")}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", color: "#888", padding: "50px" }}>
                🔍 No matching customers found.
                <br />
                <small style={{ fontSize: "14px" }}>Try a different search term.</small>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
