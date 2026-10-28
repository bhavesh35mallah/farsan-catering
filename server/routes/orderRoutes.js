import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  getOrderStats,
} from '../controllers/orderController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin stats
router.get('/admin/stats', protectAdmin, getOrderStats);

// Customer checkout
router.post('/', createOrder);

// Admin order listing
router.get('/', protectAdmin, getOrders);

// Order details (tracking or admin)
router.get('/:id', getOrderById);

// Update status
router.patch('/:id/status', protectAdmin, updateOrderStatus);

export default router;
