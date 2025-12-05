import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Add this import

export default function Login({ onLoginSuccess }) {  // ← CHANGED: onLoginSuccess
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // For auto-redirect

  const handleLogin = async () => {
    if (!user || !pass) {
      alert("Please enter username and password!");
      return;
    }

    setLoading(true);
    try {
      console.log("Attempting login with:", { username: user });
      
      const res = await fetch("https://billstack-backend-eb1d.onrender.com/api/login/", {  // Session endpoint
        method: "POST",
        credentials: 'include',  // Session cookie!
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, password: pass }),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (res.ok) {
        onLoginSuccess(data.is_admin || false);  // ← Notify App.js
        alert("Login successful!");
        navigate("/dashboard");  // Auto-redirect
      } else {
        alert(data.error || data.detail || "Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Network error - Check if backend server is running on port 8000");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ 
      maxWidth: '400px', 
      margin: '100px auto', 
      padding: '2rem', 
      border: '1px solid #ddd',
      borderRadius: '8px'
    }}>
      <h2>BillStack Login</h2>
      
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          style={{ width: '100%', padding: '0.75rem', marginBottom: '0.5rem' }}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          style={{ width: '100%', padding: '0.75rem' }}
          disabled={loading}
        />
      </div>

      <button 
        onClick={handleLogin}
        disabled={loading || !user || !pass}
        style={{
          width: '100%',
          padding: '0.75rem',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {loading && <p style={{ textAlign: 'center', color: '#666' }}>Connecting to server...</p>}
    </div>
  );
}
