import React from "react";

export default function InvoiceList({ invoices }) {
  return (
    <div className="page">
      <h2>Invoices</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Date</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.id}</td>
              <td>{inv.customer}</td>
              <td>₹ {inv.total}</td>
              <td>{inv.date}</td>
              <td>
                <a href={`#/invoices/${inv.id}`}>View</a>
                <button>new</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
