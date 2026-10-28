import api from './api';

export const settingsService = {
  getPublicSettings: async () => {
    const response = await api.get('/settings/public');
    return response.data;
  },

  getAdminSettings: async () => {
    const response = await api.get('/settings/admin');
    return response.data;
  },

  updateSettings: async (settingsData) => {
    const response = await api.put('/settings', settingsData);
    return response.data;
  },
};
