import express from 'express';
import {
  getPublicSettings,
  getAdminSettings,
  updateSettings,
} from '../controllers/settingsController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/public', getPublicSettings);
router.get('/admin', protectAdmin, getAdminSettings);
router.put('/', protectAdmin, updateSettings);

export default router;
