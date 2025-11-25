import React from "react";

export default function Navbar({ setPage, handleLogout }) {
  return (
    <div className="navbar">
      <h2>BillStack</h2>

      <div className="nav-links">
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("customers")}>Customers</button>
        <button onClick={() => setPage("products")}>Products</button>
        <button onClick={() => setPage("invoice")}>New Invoice</button>
        <button onClick={() => setPage("invoices")}>Invoices</button>

        {/* Logout button */}
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}