// apps/customer-app/src/hooks/useCustomerAuth.js
import { useState, useEffect } from 'react';
import { authAPI } from '../services/api';

export function useCustomerAuth() {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('daka_customer');
    if (saved) {
      setCustomer(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const register = async (data) => {
    const res = await authAPI.register(data);
    if (res?.success) {
      return { success: true };
    }
    return { success: false, message: res?.message || 'Registrasi gagal' };
  };

  const login = async (loginInput, password) => {
    const res = await authAPI.login({ loginInput, password });
    if (res?.success) {
      setCustomer(res.customer);
      localStorage.setItem('daka_customer', JSON.stringify(res.customer));
      return { success: true };
    }
    return { success: false, message: 'Login gagal!' };
  };

  const logout = () => {
    setCustomer(null);
    localStorage.removeItem('daka_customer');
  };

  return { customer, loading, register, login, logout };
}