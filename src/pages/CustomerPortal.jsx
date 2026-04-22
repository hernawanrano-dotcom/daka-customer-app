// apps/customer-app/src/pages/CustomerPortal.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useCustomerAuth } from '../hooks/useCustomerAuth';
import { useCustomerOrders } from '../hooks/useCustomerOrders';
import { orderAPI } from '../services/api';
import LoginForm from '../components/customer/LoginForm';
import RegisterForm from '../components/customer/RegisterForm';
import HomePage from '../components/customer/HomePage';
import OrderForm from '../components/customer/OrderForm';
import TrackingPage from '../components/customer/TrackingPage';
import HistoryPage from '../components/customer/HistoryPage';
import ChatPage from '../components/customer/ChatPage';

export default function CustomerPortal() {
  const { customer, loading: authLoading, register, login, logout } = useCustomerAuth();
  const { orders, chats, loading: ordersLoading, createOrder, cancelOrder, sendChat, loadOrders } = useCustomerOrders(customer?.id);
  const [currentPage, setCurrentPage] = useState('home');
  const [trackingResi, setTrackingResi] = useState(null);
  const [cancelModalOrderId, setCancelModalOrderId] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelNote, setCancelNote] = useState('');
  const [authError, setAuthError] = useState('');
  const [orderLoading, setOrderLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (customer) {
      const interval = setInterval(loadOrders, 10000);
      return () => clearInterval(interval);
    }
  }, [customer, loadOrders]);

  const handleRegister = async (data) => {
    const result = await register(data);
    if (result.success) {
      setShowRegister(false);
      setAuthError('');
    } else {
      setAuthError(result.message);
    }
  };

  const handleLogin = async (loginInput, password) => {
    const result = await login(loginInput, password);
    if (!result.success) {
      setAuthError(result.message);
    } else {
      setAuthError('');
    }
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
  };

  const handleCreateOrder = async (formData) => {
    setOrderLoading(true);
    const data = {
      customerId: customer.id,
      senderName: formData.senderName,
      senderPhone: formData.senderPhone,
      senderDusun: formData.senderDusun,
      senderKelurahan: formData.senderKelurahan,
      senderKecamatan: formData.senderKecamatan,
      senderKabupaten: formData.senderKabupaten,
      senderProvinsi: formData.senderProvinsi,
      senderShareloc: formData.senderShareloc,
      receiverName: formData.receiverName,
      receiverPhone: formData.receiverPhone,
      receiverDusun: formData.receiverDusun,
      receiverKelurahan: formData.receiverKelurahan,
      receiverKecamatan: formData.receiverKecamatan,
      receiverKabupaten: formData.receiverKabupaten,
      receiverProvinsi: formData.receiverProvinsi,
      receiverShareloc: formData.receiverShareloc,
      scheduleDay: formData.scheduleDay,
      scheduleDate: formData.scheduleDate,
      notes: formData.notes,
    };
    const result = await createOrder(data);
    setOrderLoading(false);
    if (result?.success) {
      alert('Order berhasil!');
      setCurrentPage('home');
    } else {
      alert('Gagal membuat order!');
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!cancelReason) {
      alert('Pilih alasan!');
      return;
    }
    const fullReason = cancelNote ? `${cancelReason} - ${cancelNote}` : cancelReason;
    await cancelOrder(orderId, fullReason);
    setCancelModalOrderId(null);
    setCancelReason('');
    setCancelNote('');
    alert('Order dibatalkan!');
  };

  const openCancelModal = (orderId) => {
    setCancelModalOrderId(orderId);
    setCancelReason('');
    setCancelNote('');
  };

  const handleTrackOrder = async (resi) => {
    setTrackingResi(resi);
    setCurrentPage('tracking');
  };

  const getTodayOrders = () => {
    const today = new Date().toISOString().split('T')[0];
    return orders.filter(o => o.scheduleDate === today && o.status !== 'dibatalkan');
  };

  const getRecentOrders = () => {
    return orders.slice(0, 5);
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
  };

  if (authLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  if (!customer) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="logo">
            <h1>🚚 DAKA Express</h1>
            <p>Customer Portal</p>
          </div>
          {showRegister ? (
            <RegisterForm
              onRegister={handleRegister}
              onShowLogin={() => setShowRegister(false)}
              error={authError}
            />
          ) : (
            <LoginForm
              onLogin={handleLogin}
              onShowRegister={() => setShowRegister(true)}
              error={authError}
            />
          )}
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            customerName={customer.name}
            todayOrders={getTodayOrders()}
            recentOrders={getRecentOrders()}
            onNavigate={setCurrentPage}
            onTrackOrder={handleTrackOrder}
            onCancelOrder={openCancelModal}
          />
        );
      case 'order':
        return <OrderForm onSubmit={handleCreateOrder} loading={orderLoading} />;
      case 'tracking':
        return <TrackingPage initialResi={trackingResi} />;
      case 'history':
        return <HistoryPage orders={orders} />;
      case 'chat':
        return <ChatPage chats={chats} onSendMessage={sendChat} customerName={customer.name} />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container" style={{ display: 'block' }}>
      <div className="top-bar">
        <div className="logo-app">
          <h2>DAKA Express</h2>
        </div>
        <div className="user-info">
          <div className="avatar">{customer.name.charAt(0)}</div>
          <span>{customer.name}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
          <button className="dark-toggle" onClick={toggleDarkMode}><i className="fas fa-moon"></i></button>
        </div>
      </div>

      <div className="main-container">
        <div id="homePage" style={{ display: currentPage === 'home' ? 'block' : 'none' }}>
          {currentPage === 'home' && renderPage()}
        </div>
        <div id="detailPage" className="page-detail" style={{ display: currentPage !== 'home' ? 'block' : 'none' }}>
          <button className="back-btn" onClick={() => setCurrentPage('home')}>
            <i className="fas fa-arrow-left"></i> Kembali
          </button>
          {renderPage()}
        </div>
      </div>

      {/* Cancel Modal */}
      {cancelModalOrderId && (
        <div className="modal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Batalkan Order</h3>
              <button className="close-modal" onClick={() => setCancelModalOrderId(null)}>&times;</button>
            </div>
            <div className="form-group">
              <label>Alasan Pembatalan</label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '12px' }}
              >
                <option value="">Pilih alasan...</option>
                <option value="Salah alamat">Salah alamat</option>
                <option value="Batal pesan">Batal pesan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <div className="form-group">
              <label>Catatan Tambahan</label>
              <textarea
                rows="2"
                value={cancelNote}
                onChange={(e) => setCancelNote(e.target.value)}
                style={{ width: '100%', padding: '12px' }}
              />
            </div>
            <button className="btn-danger" onClick={() => handleCancelOrder(cancelModalOrderId)} style={{ width: '100%', padding: '12px' }}>
              Batalkan Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}