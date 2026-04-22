// apps/customer-app/src/components/customer/OrderForm.jsx
import React, { useState } from 'react';

export default function OrderForm({ onSubmit, loading }) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    // Pengirim
    senderName: '',
    senderPhone: '',
    senderDusun: '',
    senderKelurahan: '',
    senderKecamatan: '',
    senderKabupaten: '',
    senderProvinsi: '',
    senderShareloc: '',
    // Penerima
    receiverName: '',
    receiverPhone: '',
    receiverDusun: '',
    receiverKelurahan: '',
    receiverKecamatan: '',
    receiverKabupaten: '',
    receiverProvinsi: '',
    receiverShareloc: '',
    // Jadwal
    scheduleDay: 'Senin',
    scheduleDate: defaultDate,
    notes: '',
  });

  const [senderLocInfo, setSenderLocInfo] = useState('');
  const [receiverLocInfo, setReceiverLocInfo] = useState('');

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getCurrentLocation = (type) => {
    if (!navigator.geolocation) {
      alert('Browser tidak mendukung GPS');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const googleMapsLink = `https://www.google.com/maps?q=${lat},${lng}`;

        if (type === 'sender') {
          updateField('senderShareloc', googleMapsLink);
          setSenderLocInfo(`✅ Lokasi: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
        } else {
          updateField('receiverShareloc', googleMapsLink);
          setReceiverLocInfo(`✅ Lokasi: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
        }
        alert('Lokasi berhasil diambil!');
      },
      (error) => {
        alert('Gagal mengambil lokasi: ' + error.message);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.senderShareloc) {
      alert('Harap isi ShareLoc Pengirim!');
      return;
    }
    if (!formData.receiverShareloc) {
      alert('Harap isi ShareLoc Penerima!');
      return;
    }
    if (!formData.senderName || !formData.senderPhone || !formData.receiverName) {
      alert('Harap isi nama pengirim dan penerima!');
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="page-title">Buat Order Baru</h2>

      {/* DATA PENGIRIM */}
      <div className="address-section">
        <div className="address-title"><i className="fas fa-user"></i> Data Pengirim</div>
        <div className="form-row">
          <div className="form-group">
            <label>Nama Lengkap *</label>
            <input
              type="text"
              value={formData.senderName}
              onChange={(e) => updateField('senderName', e.target.value)}
              placeholder="Nama pengirim"
              required
            />
          </div>
          <div className="form-group">
            <label>No Telepon *</label>
            <input
              type="text"
              value={formData.senderPhone}
              onChange={(e) => updateField('senderPhone', e.target.value)}
              placeholder="08xxxxxxxxxx"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Dusun / Dk</label>
          <input
            type="text"
            value={formData.senderDusun}
            onChange={(e) => updateField('senderDusun', e.target.value)}
            placeholder="Dusun / Dk (opsional)"
          />
        </div>
        <div className="form-group">
          <label>Kelurahan / Desa</label>
          <input
            type="text"
            value={formData.senderKelurahan}
            onChange={(e) => updateField('senderKelurahan', e.target.value)}
            placeholder="Kelurahan / Desa (opsional)"
          />
        </div>
        <div className="form-group">
          <label>Kecamatan</label>
          <input
            type="text"
            value={formData.senderKecamatan}
            onChange={(e) => updateField('senderKecamatan', e.target.value)}
            placeholder="Kecamatan (opsional)"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Kabupaten / Kota</label>
            <input
              type="text"
              value={formData.senderKabupaten}
              onChange={(e) => updateField('senderKabupaten', e.target.value)}
              placeholder="Kabupaten / Kota (opsional)"
            />
          </div>
          <div className="form-group">
            <label>Provinsi</label>
            <input
              type="text"
              value={formData.senderProvinsi}
              onChange={(e) => updateField('senderProvinsi', e.target.value)}
              placeholder="Provinsi (opsional)"
            />
          </div>
        </div>
        <div className="form-group">
          <label><i className="fas fa-map-marker-alt"></i> ShareLoc Pengirim *</label>
          <div className="shareloc-group">
            <input
              type="text"
              value={formData.senderShareloc}
              onChange={(e) => updateField('senderShareloc', e.target.value)}
              placeholder="https://www.google.com/maps?q=..."
            />
            <button type="button" onClick={() => getCurrentLocation('sender')}>
              <i className="fas fa-location-dot"></i> Ambil Lokasi Sekarang
            </button>
          </div>
          {senderLocInfo && <div className="loc-info">{senderLocInfo}</div>}
        </div>
      </div>

      {/* DATA PENERIMA */}
      <div className="address-section">
        <div className="address-title"><i className="fas fa-user-friends"></i> Data Penerima</div>
        <div className="form-row">
          <div className="form-group">
            <label>Nama Lengkap *</label>
            <input
              type="text"
              value={formData.receiverName}
              onChange={(e) => updateField('receiverName', e.target.value)}
              placeholder="Nama penerima"
              required
            />
          </div>
          <div className="form-group">
            <label>No Telepon</label>
            <input
              type="text"
              value={formData.receiverPhone}
              onChange={(e) => updateField('receiverPhone', e.target.value)}
              placeholder="08xxxxxxxxxx (opsional)"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Dusun / Dk</label>
          <input
            type="text"
            value={formData.receiverDusun}
            onChange={(e) => updateField('receiverDusun', e.target.value)}
            placeholder="Dusun / Dk (opsional)"
          />
        </div>
        <div className="form-group">
          <label>Kelurahan / Desa</label>
          <input
            type="text"
            value={formData.receiverKelurahan}
            onChange={(e) => updateField('receiverKelurahan', e.target.value)}
            placeholder="Kelurahan / Desa (opsional)"
          />
        </div>
        <div className="form-group">
          <label>Kecamatan</label>
          <input
            type="text"
            value={formData.receiverKecamatan}
            onChange={(e) => updateField('receiverKecamatan', e.target.value)}
            placeholder="Kecamatan (opsional)"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Kabupaten / Kota</label>
            <input
              type="text"
              value={formData.receiverKabupaten}
              onChange={(e) => updateField('receiverKabupaten', e.target.value)}
              placeholder="Kabupaten / Kota (opsional)"
            />
          </div>
          <div className="form-group">
            <label>Provinsi</label>
            <input
              type="text"
              value={formData.receiverProvinsi}
              onChange={(e) => updateField('receiverProvinsi', e.target.value)}
              placeholder="Provinsi (opsional)"
            />
          </div>
        </div>
        <div className="form-group">
          <label><i className="fas fa-map-marker-alt"></i> ShareLoc Penerima *</label>
          <div className="shareloc-group">
            <input
              type="text"
              value={formData.receiverShareloc}
              onChange={(e) => updateField('receiverShareloc', e.target.value)}
              placeholder="https://www.google.com/maps?q=..."
            />
            <button type="button" onClick={() => getCurrentLocation('receiver')}>
              <i className="fas fa-location-dot"></i> Ambil Lokasi Sekarang
            </button>
          </div>
          {receiverLocInfo && <div className="loc-info">{receiverLocInfo}</div>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Hari Pengiriman *</label>
          <select
            value={formData.scheduleDay}
            onChange={(e) => updateField('scheduleDay', e.target.value)}
          >
            <option>Senin</option><option>Selasa</option><option>Rabu</option>
            <option>Kamis</option><option>Jumat</option><option>Sabtu</option>
          </select>
        </div>
        <div className="form-group">
          <label>Tanggal Pengiriman *</label>
          <input
            type="date"
            value={formData.scheduleDate}
            onChange={(e) => updateField('scheduleDate', e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Catatan (Opsional)</label>
        <textarea
          rows="2"
          value={formData.notes}
          onChange={(e) => updateField('notes', e.target.value)}
        />
      </div>

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Mengirim...' : 'Kirim Order'}
      </button>
    </form>
  );
}