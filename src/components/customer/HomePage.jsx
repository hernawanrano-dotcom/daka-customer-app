// apps/customer-app/src/components/customer/HomePage.jsx
import React from 'react';
import StatusBadge from './StatusBadge';

export default function HomePage({ customerName, todayOrders, recentOrders, onNavigate, onTrackOrder, onCancelOrder }) {
  return (
    <>
      <div className="welcome-section">
        <h1>Selamat Datang, <span id="welcomeName">{customerName}</span>!</h1>
      </div>

      <div className="menu-grid">
        <div className="menu-card" onClick={() => onNavigate('order')}>
          <div className="menu-icon"><i className="fas fa-plus-circle"></i></div>
          <h3>Buat Order</h3>
        </div>
        <div className="menu-card" onClick={() => onNavigate('tracking')}>
          <div className="menu-icon"><i className="fas fa-search-location"></i></div>
          <h3>Tracking</h3>
        </div>
        <div className="menu-card" onClick={() => onNavigate('history')}>
          <div className="menu-icon"><i className="fas fa-history"></i></div>
          <h3>Riwayat Order</h3>
        </div>
        <div className="menu-card" onClick={() => onNavigate('chat')}>
          <div className="menu-icon"><i className="fas fa-comments"></i></div>
          <h3>Live Chat</h3>
        </div>
      </div>

      <div className="card">
        <h3>📋 Order Hari Ini</h3>
        <div className="table-wrapper">
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>No Resi</th>
                <th>Jadwal</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {todayOrders.length === 0 ? (
                <tr><td colSpan="4">Tidak ada order hari ini</td></tr>
              ) : (
                todayOrders.map(order => (
                  <tr key={order.id}>
                    <td>{order.noResi}</td>
                    <td>{order.scheduleDay || '-'}, {order.scheduleDate}</td>
                    <td><StatusBadge status={order.status} /></td>
                    <td>
                      <a className="track-link" onClick={() => onTrackOrder(order.noResi)}>Lacak</a>
                      {(order.status === 'diterima' || order.status === 'dijadwalkan') && (
                        <button
                          className="track-link"
                          style={{ background: '#ef4444', color: 'white', marginLeft: '8px', border: 'none', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer' }}
                          onClick={() => onCancelOrder(order.id)}
                        >
                          Batal
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h3>📦 Order Terbaru</h3>
        <div className="table-wrapper">
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>No Resi</th>
                <th>Tanggal</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr><td colSpan="4">Belum ada order</td></tr>
              ) : (
                recentOrders.map(order => (
                  <tr key={order.id}>
                    <td>{order.noResi}</td>
                    <td>{order.tglOrder}</td>
                    <td><StatusBadge status={order.status} /></td>
                    <td>
                      <a className="track-link" onClick={() => onTrackOrder(order.noResi)}>Lacak</a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}