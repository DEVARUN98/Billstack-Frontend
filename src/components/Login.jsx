
import React, { useState } from "react";


const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


const handleSubmit = e => {
  e.preventDefault();
  fetch('https://billstack-backend-eb1d.onrender.com/api/api-token-auth/', {  // full backend URL here
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
    .then(async res => {
      const data = await res.json();
      if (res.ok && data.token) {
        onLogin(data.token);
      } else {
        alert(data.error || 'Login failed. Only admin users allowed.');
      }
    })
    .catch(() => {
      alert('Network or server error, please try again.');
    });
};

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
