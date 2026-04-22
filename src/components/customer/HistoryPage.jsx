// apps/customer-app/src/components/customer/HistoryPage.jsx
import React, { useState } from 'react';
import StatusBadge from './StatusBadge';
import TrackingModal from './TrackingModal';

export default function HistoryPage({ orders }) {
  const [trackingOrder, setTrackingOrder] = useState(null);

  const openTracking = (order) => {
    setTrackingOrder(order);
  };

  const closeTracking = () => {
    setTrackingOrder(null);
  };

  return (
    <div>
      <h2 className="page-title">Riwayat Order</h2>
      <div className="table-wrapper">
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>No Resi</th>
              <th>Tgl Order</th>
              <th>Jadwal</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>Belum ada order</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.noResi}</td>
                  <td>{order.tglOrder}</td>
                  <td>{order.scheduleDay || '-'}, {order.scheduleDate || '-'}</td>
                  <td><StatusBadge status={order.status} /></td>
                  <td>
                    <a className="track-link" onClick={() => openTracking(order)} style={{ cursor: 'pointer', color: '#667eea' }}>
                      Detail
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {trackingOrder && (
        <TrackingModal order={trackingOrder} onClose={closeTracking} />
      )}
    </div>
  );
}