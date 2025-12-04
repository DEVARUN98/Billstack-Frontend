import React from "react";

export default function InvoiceList({ invoices, isAdmin ,onViewInvoice }) {
  const invoicedata = invoices || [];
  const hasInvoices = invoicedata.length > 0;

  console.log("InvoiceList received:", invoicedata);

  return (
    <div className="page">
      <h2>Invoices ({hasInvoices ? invoicedata.length : 0})</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Phone</th>
            <th>Total</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!hasInvoices ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", color: "#888" }}>
                No invoices yet. Create one in "New Invoice".
              </td>
            </tr>
          ) : (
            invoicedata.map((inv,index) => (
              <tr key={inv.id}>
                <td>{index+1}</td>
                {/* 👈 FIXED: Use correct field names from your API */}
                <td>{inv.customer_name || "N/A"}</td>
                <td>{inv.phone || "N/A"}</td>
                <td>₹ {Number(inv.total || 0).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}</td>
                <td>{inv.date || "N/A"}</td>
                <td>
                  <button className="view-btn" onClick={() => onViewInvoice(inv,index+1)}>
                    View
                  </button>
                  {isAdmin && (
                    <button className="delete-btn" onClick={() => {
                      if (window.confirm(`Delete invoice ${inv.id}?`)) {
                        console.log("Delete invoice:", inv.id);
                        // TODO: Implement delete API call
                      }
                    }}>
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Debug info - Remove after testing */}
      {/* {hasInvoices && (
        <div style={{
          marginTop: "20px",
          padding: "10px",
          background: "#f0f0f0",
          borderRadius: "5px",
          fontSize: "12px"
        }}>
          <strong>Sample Invoice Structure:</strong>
          <pre style={{ overflow: "auto", maxHeight: "150px" }}>
            {JSON.stringify(invoicedata[0], null, 2)}
          </pre>
        </div>
      )} */}
    </div>
  );
}
