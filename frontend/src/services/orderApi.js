import api from './apiClient';

export const createOrder = (payload) => api.post('/orders', payload).then(r => r.data);
export const myOrders = () => api.get('/orders/me').then(r => r.data);
export const updateOrderStatus = (id, status) =>
  api.patch(`/orders/${id}/status`, { status }).then(r => r.data);
