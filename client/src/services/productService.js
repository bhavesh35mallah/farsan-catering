import api from './api';

export const productService = {
  // Public
  getProducts: async (params = {}) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get('/products/categories');
    return response.data;
  },

  // Admin
  getAllCategoriesAdmin: async () => {
    const response = await api.get('/products/admin/categories');
    return response.data;
  },

  createCategory: async (data) => {
    const response = await api.post('/products/categories', data);
    return response.data;
  },

  updateCategory: async (id, data) => {
    const response = await api.put(`/products/categories/${id}`, data);
    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await api.delete(`/products/categories/${id}`);
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.post('/products/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
