// apps/customer-app/src/services/api.js
const API_BASE = 'http://localhost:5000/api';

export async function fetchAPI(url, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${url}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    return await res.json();
  } catch (e) {
    console.error('API Error:', e);
    return { success: false, message: e.message };
  }
}

// Auth API
export const authAPI = {
  register: (data) => fetchAPI('/customer/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => fetchAPI('/customer/login', { method: 'POST', body: JSON.stringify(data) }),
};

// Order API
export const orderAPI = {
  getByCustomer: (customerId) => fetchAPI(`/customer/orders/${customerId}`),
  create: (data) => fetchAPI('/customer/order', { method: 'POST', body: JSON.stringify(data) }),
  track: (resi) => fetchAPI(`/order/track/${resi}`),
  updateStatus: (data) => fetchAPI('/order/status', { method: 'PUT', body: JSON.stringify(data) }),
  getAll: () => fetchAPI('/customer/orders/all'),
};

// Chat API
export const chatAPI = {
  getByCustomer: (customerId) => fetchAPI(`/customer/chats/${customerId}`),
  send: (data) => fetchAPI('/customer/chat', { method: 'POST', body: JSON.stringify(data) }),
  getAll: () => fetchAPI('/customer/chats/all'),
  markRead: (chatId) => fetchAPI('/chat/mark-read', { method: 'POST', body: JSON.stringify({ chatId }) }),
  sendAdmin: (data) => fetchAPI('/admin/chat/send', { method: 'POST', body: JSON.stringify(data) }),
};

// Customer API
export const customerAPI = {
  getAll: () => fetchAPI('/customers/all'),
};

// Staff API
export const staffAPI = {
  getAll: () => fetchAPI('/staff/all'),
};