import React, { useState } from "react";

export default function Login({ setAuth }) {
  const [isSignup, setIsSignup] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleSignup = () => {
    if (!user || !pass) return alert("Enter username and password!");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existing = users.find((u) => u.user === user);
    if (existing) return alert("User already exists!");
    users.push({ user, pass });
    localStorage.setItem("users", JSON.stringify(users));
    alert("User registered successfully!");
    setIsSignup(false);
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find((u) => u.user === user && u.pass === pass);
    if (found) {
      setAuth(true);
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <h2>{isSignup ? "BillStack" : "BillStack"}</h2>

      <input
        type="text"
        placeholder="Username"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />

      {isSignup ? (
        <button onClick={handleSignup}>Sign Up</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}

      <p style={{ marginTop: "10px" }}>
        {isSignup ? (
          <>
            Already have an account?{" "}
            <span className="link" onClick={() => setIsSignup(false)}>
              Login
            </span>
          </>
        ) : (
          <>
            Don’t have an account?{" "}
            <span className="link" onClick={() => setIsSignup(true)}>
              Sign Up
            </span>
          </>
        )}
      </p>
    </div>
  );
}
