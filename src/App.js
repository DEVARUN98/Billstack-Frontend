// import React, { useState } from "react";
// import "./App.css";
// import Login from "./pages/Login";
// import Navbar from "./components/Navbar";
// import Dashboard from "./pages/Dashboard";
// import Customers from "./pages/Customers";
// import Products from "./pages/Products";
// import InvoiceForm from "./pages/InvoiceForm";
// import InvoiceList from "./pages/InvoiceList";

// function App() {
//   const [auth, setAuth] = useState(false);
//   const [page, setPage] = useState("dashboard");

//   const [customers, setCustomers] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [invoices, setInvoices] = useState([]);

//   // 🔹 Logout function
//   const handleLogout = () => {
//     if (window.confirm("Are you sure you want to logout?")) {
//       setAuth(false);
//       setPage("dashboard");
//     }
//   };

//   if (!auth) return <Login setAuth={setAuth} />;

//   return (
//     <div>
//       <Navbar setPage={setPage} handleLogout={handleLogout} />

//       {page === "dashboard" && (
//         <Dashboard
//           invoices={invoices}
//           customers={customers}
//           products={products}
//         />
//       )}
//       {page === "customers" && (
//         <Customers customers={customers} setCustomers={setCustomers} />
//       )}
//       {page === "products" && (
//         <Products products={products} setProducts={setProducts} />
//       )}
//       {page === "invoice" && (
//         <InvoiceForm invoices={invoices} setInvoices={setInvoices} />
//       )}
//       {page === "invoices" && <InvoiceList invoices={invoices} />}
//     </div>
//   );
// }

// export default App;


// TEST FROM PERPLEXITY

// App.js

import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import React, { useState } from 'react';
import Login from './components/Login';
import InventoryList from './components/InventoryList';



function App() {
  const [token, setToken] = useState(null);

  return (
    <div>
      {token ? <InventoryList token={token} /> : <Login onLogin={setToken} />}
    </div>
  );
}

export default App;
