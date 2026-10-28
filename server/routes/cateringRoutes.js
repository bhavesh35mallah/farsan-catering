import express from 'express';
import {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
} from '../controllers/cateringController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public submission
router.post('/', createEnquiry);

// Admin enquiry management
router.get('/', protectAdmin, getEnquiries);
router.patch('/:id/status', protectAdmin, updateEnquiryStatus);

export default router;
