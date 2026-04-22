// apps/customer-app/src/components/customer/RegisterForm.jsx
import React, { useState } from 'react';

export default function RegisterForm({ onRegister, onShowLogin, error }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, phone, email, password });
  };

  return (
    <div id="registerForm">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Nama Lengkap</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama lengkap"
            required
          />
        </div>
        <div className="input-group">
          <label>No WhatsApp</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="08xxxxxxxxxx"
            required
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '12px' }}>{error}</p>}
        <button type="submit" className="btn-primary">Daftar</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        <a href="#" onClick={(e) => { e.preventDefault(); onShowLogin(); }}>Sudah punya akun?</a>
      </p>
    </div>
  );
}