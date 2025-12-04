import React from "react";

export default function InvoiceDetailModal({ invoice, onClose,displayIndex }) {
  if (!invoice) return null;

  // 👈 FIX: Check if items is string or already object
  let items = [];
  if (invoice.items) {
    try {
      if (typeof invoice.items === 'string') {
        items = JSON.parse(invoice.items);  // 👈 Parse if string
      } else {
        items = invoice.items;              // 👈 Use directly if object
      }
    } catch (e) {
      console.error("Failed to parse items:", e);
      items = [];
    }
  }

  console.log("Parsed items:", items);  // 👈 Debug

  return (
    <div 
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          maxWidth: "800px",
          maxHeight: "90vh",
          overflow: "auto",
          minWidth: "500px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <h2>Invoice #{displayIndex}</h2>
          <button 
            onClick={onClose}
            style={{
              background: "#ff4444",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            ✕ Close
          </button>
        </div>

        {/* Customer Info */}
        <div style={{ 
          background: "#f8f9fa", 
          padding: "20px", 
          borderRadius: "8px", 
          marginBottom: "20px" 
        }}>
          <h3>Customer Details</h3>
          <p><strong>Name:</strong> {invoice.customer_name || "N/A"}</p>
          <p><strong>Phone:</strong> {invoice.phone || "N/A"}</p>
        </div>

        {/* Items Table */}
        <h3>Items ({items.length})</h3>
        {items.length > 0 ? (
          <table style={{ width: "100%", marginBottom: "20px" }}>
            <thead>
              <tr style={{ background: "#f1f3f4" }}>
                <th style={{ padding: "12px", textAlign: "left" }}>Product</th>
                <th style={{ padding: "12px", width: "100px" }}>Qty</th>
                <th style={{ padding: "12px", width: "120px" }}>Price</th>
                <th style={{ padding: "12px", width: "120px" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "12px" }}>{item.name || item.product_name || "N/A"}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{item.qty || 0}</td>
                  <td style={{ padding: "12px", textAlign: "right" }}>
                    ₹{Number(item.price || 0).toLocaleString()}
                  </td>
                  <td style={{ padding: "12px", textAlign: "right", fontWeight: "600" }}>
                    ₹{Number((item.qty || 0) * (item.price || 0)).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: "20px", textAlign: "center", color: "#888" }}>
            No items found for this invoice.
          </div>
        )}

        {/* Totals */}
        <div style={{ 
          display: "flex", 
          justifyContent: "flex-end", 
          gap: "20px", 
          marginTop: "20px",
          fontSize: "18px",
          fontWeight: "600"
        }}>
          <div>
            <div>Subtotal:</div>
            <div>GST:</div>
            <div>Discount:</div>
            <hr />
            <div style={{ fontSize: "22px", color: "#2d5a2d" }}>
              <strong>Total: ₹{Number(invoice.total || 0).toLocaleString()}</strong>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div>₹{Number(invoice.subtotal || 0).toLocaleString()}</div>
            <div>₹{Number(invoice.gst || 0).toLocaleString()}</div>
            <div>- ₹{Number(invoice.discount || 0).toLocaleString()}</div>
            <hr />
          </div>
        </div>

        <div style={{ 
          marginTop: "30px", 
          paddingTop: "20px", 
          borderTop: "2px solid #eee", 
          textAlign: "center" 
        }}>
          <p style={{ color: "#666", fontSize: "14px" }}>
            Invoice Date: {invoice.date || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
