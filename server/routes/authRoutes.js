import express from 'express';
import { login, getMe, logout } from '../controllers/authController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protectAdmin, getMe);

export default router;
