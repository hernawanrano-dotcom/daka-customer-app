// apps/customer-app/src/hooks/useCustomerOrders.js
import { useState, useEffect, useCallback } from 'react';
import { orderAPI, chatAPI } from '../services/api';

export function useCustomerOrders(customerId) {
  const [orders, setOrders] = useState([]);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = useCallback(async () => {
    if (!customerId) return;
    try {
      const [ordersRes, chatsRes] = await Promise.all([
        orderAPI.getByCustomer(customerId),
        chatAPI.getByCustomer(customerId),
      ]);
      if (ordersRes?.success) setOrders(ordersRes.orders);
      if (chatsRes?.success) setChats(chatsRes.chats);
    } catch (error) {
      console.error('Load orders error:', error);
    } finally {
      setLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const createOrder = async (data) => {
    const res = await orderAPI.create(data);
    if (res?.success) {
      await loadOrders();
    }
    return res;
  };

  const cancelOrder = async (orderId, reason) => {
    const res = await orderAPI.updateStatus({
      orderId,
      status: 'dibatalkan',
      cancelReason: reason,
      cancelBy: 'customer',
    });
    if (res?.success) await loadOrders();
    return res;
  };

  const sendChat = async (message) => {
    const res = await chatAPI.send({ customerId, message });
    if (res?.success) await loadOrders();
    return res;
  };

  return { orders, chats, loading, loadOrders, createOrder, cancelOrder, sendChat };
}