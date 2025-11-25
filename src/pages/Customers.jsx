import React, { useState } from "react";

export default function Customers({ customers, setCustomers }) {
  const [cust, setCust] = useState({ name: "", phone: "" });
  const [searchTerm, setSearchTerm] = useState("");

  // 🔹 Add new customer
  const addCustomer = () => {
    if (!cust.name.trim() || !cust.phone.trim()) {
      alert("Please enter both name and phone number!");
      return;
    }

    const exists = customers.some(
      (c) =>
        c.name.toLowerCase() === cust.name.toLowerCase() ||
        c.phone === cust.phone
    );
    if (exists) {
      alert("Customer already exists!");
      return;
    }

    setCustomers([...customers, cust]);
    setCust({ name: "", phone: "" });
  };

  // 🔹 Delete customer
  const deleteCustomer = (index) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      const updated = [...customers];
      updated.splice(index, 1);
      setCustomers(updated);
    }
  };

  // 🔹 Filtered list based on search
  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
  );

  return (
    <div className="page">
      <h2>Customer Management</h2>

      {/* 🔍 Search Section */}
      <div className="form-row">
        <input
          type="text"
          placeholder="🔍 Search by name or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "300px", marginBottom: "15px" }}
        />
      </div>

      {/* ➕ Add New Customer */}
      <div className="form-row">
        <input
          type="text"
          placeholder="Customer Name"
          value={cust.name}
          onChange={(e) => setCust({ ...cust, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={cust.phone}
          onChange={(e) => setCust({ ...cust, phone: e.target.value })}
        />
        <button onClick={addCustomer}>Add</button>
      </div>

      {/* 📋 Customer Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((c, i) => (
              <tr key={i}>
                <td>{c.name}</td>
                <td>{c.phone}</td>
                <td>
                  <button
                    onClick={() => deleteCustomer(i)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center", color: "#888" }}>
                No matching customers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
