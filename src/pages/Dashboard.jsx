import React from "react";

export default function Dashboard({ invoices, customers, products }) {
  if (!invoices || !customers || !products) {
    return <div>Loading...</div>;
  }
  const totalSales = invoices.reduce((sum, inv) => sum + inv.total, 0);

  return (
    <div className="dashboard">
      {/* {console.log("invvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv",invoices)} */}
      {console.log("totalsalesssssssssssssss",totalSales)}
      {console.log("invoicessssssssssssssss",invoices)}
      {console.log("productssssssssssssss",products)}
      <h2>Dashboard Overview</h2>
      <div className="stats">
        <div className="stat-card">
          <h3>Total Sales</h3>
          <p>₹ {totalSales}</p>
        </div>
        <div className="stat-card">
          <h3>Total Customers</h3>
          <p>{customers.length}</p>
        </div>
        <div className="stat-card">
          <h3>Products</h3>
          <p>{products.length}</p>
        </div>
      </div>
    </div>
  );
}
