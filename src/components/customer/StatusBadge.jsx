// apps/customer-app/src/components/customer/StatusBadge.jsx
import React from 'react';

const statusMap = {
  diterima: 'Diterima',
  dijadwalkan: 'Dijadwalkan',
  proses_pickup: 'Proses Pickup',
  proses_delivery: 'Proses Delivery',
  selesai: 'Selesai',
  dibatalkan: 'Dibatalkan',
};

const statusClassMap = {
  diterima: 'status-diterima',
  dijadwalkan: 'status-dijadwalkan',
  proses_pickup: 'status-proses_pickup',
  proses_delivery: 'status-proses_delivery',
  selesai: 'status-selesai',
  dibatalkan: 'status-dibatalkan',
};

export default function StatusBadge({ status }) {
  const text = statusMap[status] || status;
  const className = statusClassMap[status] || 'status-default';
  return <span className={`status-badge ${className}`}>{text}</span>;
}