import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  getCategories,
  getAllCategoriesAdmin,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/productController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Categories
router.get('/categories', getCategories);
router.get('/admin/categories', protectAdmin, getAllCategoriesAdmin);
router.post('/categories', protectAdmin, createCategory);
router.put('/categories/:id', protectAdmin, updateCategory);
router.delete('/categories/:id', protectAdmin, deleteCategory);

// Image Upload
router.post('/upload-image', protectAdmin, upload.single('image'), uploadProductImage);

// Products
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protectAdmin, createProduct);
router.put('/:id', protectAdmin, updateProduct);
router.delete('/:id', protectAdmin, deleteProduct);

export default router;
