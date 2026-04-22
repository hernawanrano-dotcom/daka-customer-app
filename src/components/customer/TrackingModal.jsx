// apps/customer-app/src/components/customer/TrackingModal.jsx
import React from 'react';
import StatusBadge from './StatusBadge';

export default function TrackingModal({ order, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal" style={{ display: 'flex' }} onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Tracking Pengiriman</h3>
          <button className="close-modal" onClick={onClose}>&times;</button>
        </div>
        <div>
          <div><strong>No Resi:</strong> {order.noResi}</div>
          <div><strong>Status:</strong> <StatusBadge status={order.status} /></div>
          <div><strong>Pengirim:</strong> {order.pengirim}<br />{order.pengirimAlamat?.full || '-'}</div>
          <div><strong>Penerima:</strong> {order.penerima}<br />{order.penerimaAlamat?.full || '-'}</div>
          {order.cancelReason && <div><strong>Alasan Batal:</strong> {order.cancelReason}</div>}
          <h4 style={{ marginTop: '16px' }}>Timeline:</h4>
          <div className="tracking-timeline">
            {order.trackingHistory?.map((step, idx) => (
              <div key={idx} className={`tracking-step ${idx === order.trackingHistory.length - 1 ? 'active' : 'completed'}`}>
                <div><strong>{step.status}</strong></div>
                <div>{step.date}</div>
                <div>📍 {step.location}</div>
              </div>
            ))}
          </div>
          {order.pickupPhoto && (
            <div className="photo-proof">
              <strong>Foto Pickup:</strong><br />
              <img src={order.pickupPhoto} alt="Pickup" style={{ width: '100px', borderRadius: '8px' }} />
            </div>
          )}
          {order.deliveryPhoto && (
            <div className="photo-proof">
              <strong>Foto Delivery:</strong><br />
              <img src={order.deliveryPhoto} alt="Delivery" style={{ width: '100px', borderRadius: '8px' }} />
            </div>
          )}
          <button className="btn-primary" onClick={onClose} style={{ marginTop: '16px', width: '100%' }}>Tutup</button>
        </div>
      </div>
    </div>
  );
}