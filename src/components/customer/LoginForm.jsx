// apps/customer-app/src/components/customer/LoginForm.jsx
import React, { useState } from 'react';

export default function LoginForm({ onLogin, onShowRegister, error }) {
  const [loginInput, setLoginInput] = useState('demo@daka.com');
  const [password, setPassword] = useState('demo123');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(loginInput, password);
  };

  return (
    <div id="loginForm">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email / No WhatsApp</label>
          <input
            type="text"
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}
            placeholder="Email atau No WhatsApp"
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '12px' }}>{error}</p>}
        <button type="submit" className="btn-primary">Login</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        <a href="#" onClick={(e) => { e.preventDefault(); onShowRegister(); }}>Daftar sekarang</a>
      </p>
      <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.8rem' }}>
        Demo: demo@daka.com / demo123
      </p>
    </div>
  );
}