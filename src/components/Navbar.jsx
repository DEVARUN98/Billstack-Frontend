// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function Navbar({ setPage }) {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     if (window.confirm('Logout?')) {
//       try {
//         await fetch('http://localhost:8000/api/logout/', {
//           method: 'POST',
//           credentials: 'include',
//         });
//       } catch (e) {
//         console.log("Logout error:");
//         console.error(e);
//       }
      
//       // Reload to clear session state
//       window.location.href = '/login';
//     }
//   };
//   return (
//     <div className="navbar">
//       <h2>BillStack</h2>

//       <div className="nav-links">
//         <button onClick={() => navigate("/dashboard")}>Dashboard</button>
//         <button onClick={() => navigate("/customers")}>Customers</button>
//         <button onClick={() => navigate("/products")}>Products</button>
//         <button onClick={() => navigate("/invoice")}>New Invoice</button>
//         <button onClick={() => navigate("/invoices")}>Invoices</button>

//         {/* Logout button */}
//         <button className="logout-btn" onClick={handleLogout}>Logout</button>
//       </div>
//     </div>
//   );
// }





import React from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm('Logout?')) {
      try {
        await fetch('http://localhost:8000/api/logout/', {
          method: 'POST',
          credentials: 'include',
        });
      } catch (e) {
        console.error(e);
      }
      // Go back to login page
      navigate('/login');
      window.location.reload(); // optional: hard reset state
    }
  };

  return (
    <div className="navbar">
      <h2>BillStack</h2>

      <div className="nav-links">
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/customers")}>Customers</button>
        <button onClick={() => navigate("/products")}>Products</button>
        <button onClick={() => navigate("/invoice")}>New Invoice</button>
        <button onClick={() => navigate("/invoices")}>Invoices</button>

        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
