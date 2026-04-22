// apps/customer-app/src/components/customer/TrackingPage.jsx
import React, { useState } from 'react';
import { orderAPI } from '../../services/api';
import StatusBadge from './StatusBadge';

export default function TrackingPage() {
  const [resi, setResi] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async () => {
    if (!resi.trim()) {
      setError('Masukkan No Resi');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    const res = await orderAPI.track(resi);
    if (res?.success) {
      setResult(res.order);
    } else {
      setError('Order tidak ditemukan');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="page-title">Tracking Order</h2>
      <div style={{ display: 'flex', gap: '12px' }}>
        <input
          type="text"
          value={resi}
          onChange={(e) => setResi(e.target.value)}
          placeholder="Masukkan No Resi"
          style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}
        />
        <button className="btn-primary" onClick={handleTrack} disabled={loading}>
          {loading ? 'Melacak...' : 'Lacak'}
        </button>
      </div>

      {error && (
        <div style={{ marginTop: '20px', padding: '20px', background: '#fef2f2', borderRadius: '12px' }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: '20px', background: '#f8fafc', padding: '20px', borderRadius: '16px' }}>
          <h3>{result.noResi}</h3>
          <p>Status: <StatusBadge status={result.status} /></p>
          <h4 style={{ marginTop: '16px' }}>Timeline:</h4>
          <div className="tracking-timeline">
            {result.trackingHistory?.map((step, idx) => (
              <div key={idx} className="tracking-step">
                <strong>{step.status}</strong>
                <br />
                {step.date}
                <br />
                📍 {step.location}
              </div>
            ))}
          </div>
          {result.pickupPhoto && (
            <div className="photo-proof">
              <strong>Foto Pickup:</strong>
              <br />
              <img src={result.pickupPhoto} alt="Pickup" style={{ width: '100px', borderRadius: '8px' }} />
            </div>
          )}
          {result.deliveryPhoto && (
            <div className="photo-proof">
              <strong>Foto Delivery:</strong>
              <br />
              <img src={result.deliveryPhoto} alt="Delivery" style={{ width: '100px', borderRadius: '8px' }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}