import React, { useState, useRef } from "react";

export default function InvoiceForm({ invoices=[], setInvoices ,customers=[], setCustomers}) {
  const [items, setItems] = useState([{ name: "", qty: 1, price: 0 }]);
  const [customer, setCustomer] = useState("");
  const [contact, setContact] = useState("");
  const [discount, setDiscount] = useState(0);
  const [saving, setSaving] = useState(false);

  const printRef = useRef();

  // ➕ Add new item row
  const addItem = () => setItems([...items, { name: "", qty: 1, price: 0 }]);

  // ❌ Remove item
  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));

  // 💰 Totals
  const subtotal = items.reduce((sum, i) => sum + Number(i.qty) * Number(i.price), 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst - Number(discount);

  // 💾 Save invoice
  const saveInvoice = async () => {
  if (!customer.trim() || !contact.trim()) {
    alert("Please enter customer name and contact number!");
    return;
  }

  if (items.every(item => !item.name.trim())) {
    alert("Please add at least one item!");
    return;
  }

  try {
    setSaving(true);

    // Construct payload matching your backend serializer
    const payload = {
      customer_name: customer,
      phone: contact,
      items: items.map(item => ({
        name: item.name,
        qty: item.qty,
        price: item.price,
      })),
      subtotal: subtotal.toFixed(2),    // 👈 string
      gst: gst.toFixed(2),              // 👈 string - fixes decimal issue
      discount: Number(discount).toFixed(2),  // 👈 string
      total: total.toFixed(2), 
    };

    const res = await fetch("https://billstack-backend-eb1d.onrender.com/api/invoicesnew/", {
      method: "POST",
      credentials: "include",  // send session cookie
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Invoice save failed:", res.status, errorText);
      alert(`Failed to save invoice: ${res.status}`);
      return;
    }

    const newInvoice = await res.json();
    setInvoices([...invoices, newInvoice]);
    alert("Invoice & Customer Saved Successfully!");

    // Reset form fields
    setCustomer("");
    setContact("");
    setDiscount(0);
    setItems([{ name: "", qty: 1, price: 0 }]);

  } catch (err) {
    console.error("Network error:", err);
    alert("Network error. Try again.");
  } finally {
    setSaving(false);
  }
};


  // 🖨️ Print invoice safely (no reload)
  const printInvoice = () => {
    window.print();
  };

  return (
    <div className="page">
      <h2>Create Invoice</h2>

      {/* Invoice Form */}
      <div className="invoice-inputs">
        <input
          className="input-field"
          type="text"
          placeholder="Customer Name"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />
        <input
          className="input-field"
          type="text"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </div>

      {/* Items Table */}
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price (₹)</th>
            <th>Total (₹)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td>
                <input
                  value={item.name}
                  onChange={(e) => {
                    items[i].name = e.target.value;
                    setItems([...items]);
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.qty}
                  onChange={(e) => {
                    items[i].qty = Number(e.target.value);
                    setItems([...items]);
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => {
                    items[i].price = Number(e.target.value);
                    setItems([...items]);
                  }}
                />
              </td>
              <td>₹ {(item.qty * item.price).toFixed(2)}</td>
              <td>
                <button onClick={() => removeItem(i)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={addItem} disabled={saving}>{saving?"saving":"+ Add Item"} </button>

      {/* Totals */}
      <div className="totals">
        <p>Subtotal: ₹ {subtotal.toFixed(2)}</p>
        <p>GST (18%): ₹ {gst.toFixed(2)}</p>
        <p>
          Discount:
          <input
            type="number"
            style={{
              marginLeft: "8px",
              width: "80px",
              textAlign: "right",
            }}
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />{" "}
          ₹
        </p>
        <h3>Total: ₹ {total.toFixed(2)}</h3>
      </div>

      <button onClick={saveInvoice}>Save Invoice</button>
      <button className="print-btn" onClick={printInvoice}>
        Print / PDF
      </button>

      {/* 🧾 Printable Invoice Section */}
      <div ref={printRef} className="print-area">
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <h2>Invoice</h2>
        </div>
        <p>
          <strong>Date:</strong> {new Date().toLocaleDateString()}
        </p>
        <p>
          <strong>Customer:</strong> {customer}
        </p>
        <p>
          <strong>Contact No:</strong> {contact}
        </p>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #000", padding: "6px" }}>Item</th>
              <th style={{ border: "1px solid #000", padding: "6px" }}>Qty</th>
              <th style={{ border: "1px solid #000", padding: "6px" }}>Price</th>
              <th style={{ border: "1px solid #000", padding: "6px" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td style={{ border: "1px solid #000", padding: "6px" }}>
                  {item.name}
                </td>
                <td style={{ border: "1px solid #000", padding: "6px" }}>
                  {item.qty}
                </td>
                <td style={{ border: "1px solid #000", padding: "6px" }}>
                  ₹ {item.price}
                </td>
                <td style={{ border: "1px solid #000", padding: "6px" }}>
                  ₹ {(item.qty * item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: "10px", textAlign: "right" }}>
          <p>
            <strong>Subtotal:</strong> ₹ {subtotal.toFixed(2)}
          </p>
          <p>
            <strong>GST (18%):</strong> ₹ {gst.toFixed(2)}
          </p>
          <p>
            <strong>Discount:</strong> ₹ {discount}
          </p>
          <h3>
            <strong>Total:</strong> ₹ {total.toFixed(2)}
          </h3>
        </div>
      </div>
    </div>
  );
}
