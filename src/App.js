import React, { useState, useEffect, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Login from './pages/Login';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Products from './pages/Products';
import InvoiceForm from './pages/InvoiceForm';
import InvoiceList from './pages/InvoiceList';
import InvoiceDetails from './pages/InvoiceDetails';

function App() {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Data state
  const [invoices, setInvoices] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  // Stable setCustomers callback to prevent re-creation each render
  const stableSetCustomers = useCallback(
    (newCustomers) => setCustomers(newCustomers),
    []
  );

  // 👈 MODAL STATE
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [displayIndex, setDisplayIndex] = useState(null);

  // 1) Check authentication status on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/session-status/', {
          credentials: 'include',
        });
        const data = await res.json();
        setIsLoggedIn(data.is_authenticated);
        setIsAdmin(data.is_admin || false);
        console.log('Backend session-status:', data);
        console.log('User isAdmin:', data.is_admin || false);
      } catch (e) {
        console.error('Auth check failed:', e);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  // 2) Load all data when user is logged in
  useEffect(() => {
    if (!isLoggedIn) return;

    const loadAllData = async () => {
      try {
        // Load Products
        const productsRes = await fetch('http://localhost:8000/api/products/', {
          credentials: 'include',
        });
        if (productsRes.ok) {
          const productsData = await productsRes.json();
          setProducts(productsData);
        }

        // Load Invoices
        const invoicesRes = await fetch('http://localhost:8000/api/invoicesnew/', {
          credentials: 'include',
        });
        if (invoicesRes.ok) {
          const invoicesData = await invoicesRes.json();
          console.log('Invoices data loaded:', invoicesData);
          setInvoices(invoicesData);
        }

        // Load Customers (from invoices)
        const customersRes = await fetch('http://localhost:8000/api/invoicesnew/customers/', {
          credentials: 'include',
        });
        if (customersRes.ok) {
          const customersData = await customersRes.json();
          console.log('Customers data loaded:', customersData);
          stableSetCustomers(customersData);
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    loadAllData();
  }, [isLoggedIn, stableSetCustomers]);

  // 3) Handle successful login
  const handleLoginSuccess = (adminStatus) => {
    setIsLoggedIn(true);
    setIsAdmin(adminStatus); // 👈 FIXED: was setIsLoggedIn(adminStatus)
  };

  // 👈 VIEW INVOICE HANDLER
  const handleViewInvoice = (invoice, index) => {
    setSelectedInvoice(invoice);
    setDisplayIndex(index);
  };

  // 👈 CLOSE MODAL HANDLER
  const handleCloseInvoice = () => {
    setSelectedInvoice(null);
    setDisplayIndex(null);
  };

  // 4) Private Route wrapper
  const PrivateRoute = ({ children }) =>
    isLoggedIn ? children : <Navigate to="/login" />;

  // 5) Loading screen
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '18px',
        }}
      >
        Checking session...
      </div>
    );
  }

  return (
    <Router>
      {/* NAVBAR */}
      {isLoggedIn && <Navbar isAdmin={isAdmin} />}

      {/* ROUTES - ONLY Route components */}
      <Routes>
        {/* Login */}
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={handleLoginSuccess} />
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard
                isAdmin={isAdmin}
                invoices={invoices}
                customers={customers}
                products={products}
              />
            </PrivateRoute>
          }
        />

        {/* Customers */}
        <Route
          path="/customers"
          element={
            <PrivateRoute>
              <Customers isAdmin={isAdmin} customers={customers} setCustomers={stableSetCustomers} />
            </PrivateRoute>
          }
        />

        {/* Products */}
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Products
                isAdmin={isAdmin}
                products={products}
                setProducts={setProducts}
              />
            </PrivateRoute>
          }
        />

        {/* Create Invoice */}
        <Route
          path="/invoice"
          element={
            <PrivateRoute>
              <InvoiceForm
                isAdmin={isAdmin}
                invoices={invoices}
                setInvoices={setInvoices}
                products={products}
                setProducts={setProducts}
              />
            </PrivateRoute>
          }
        />

        {/* Invoice List */}
        <Route
          path="/invoices"
          element={
            <PrivateRoute>
              <InvoiceList
                isAdmin={isAdmin}
                invoices={invoices}
                onViewInvoice={handleViewInvoice}
              />
            </PrivateRoute>
          }
        />

        {/* Default routes */}
        <Route path="/" element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} />} />
        <Route path="*" element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} />} />
      </Routes>

      {/* 👈 GLOBAL MODAL - OUTSIDE Routes */}
      {selectedInvoice && (
        <InvoiceDetails
          invoice={selectedInvoice}
          onClose={handleCloseInvoice}
          displayIndex={displayIndex}
        />
      )}
    </Router>
  );
}

export default App;
