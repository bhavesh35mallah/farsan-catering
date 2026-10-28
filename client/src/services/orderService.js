import api from './api';

export const orderService = {
  createOrder: async (orderPayload) => {
    const response = await api.post('/orders', orderPayload);
    return response.data;
  },

  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  getOrdersAdmin: async (params = {}) => {
    const response = await api.get('/orders', { params });
    return response.data;
  },

  updateOrderStatus: async (id, payload) => {
    const response = await api.patch(`/orders/${id}/status`, payload);
    return response.data;
  },

  getOrderStats: async () => {
    const response = await api.get('/orders/admin/stats');
    return response.data;
  },
};
