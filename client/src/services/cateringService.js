import api from './api';

export const cateringService = {
  createEnquiry: async (payload) => {
    const response = await api.post('/catering-enquiries', payload);
    return response.data;
  },

  getEnquiriesAdmin: async (params = {}) => {
    const response = await api.get('/catering-enquiries', { params });
    return response.data;
  },

  updateEnquiryStatus: async (id, payload) => {
    const response = await api.patch(`/catering-enquiries/${id}/status`, payload);
    return response.data;
  },
};
