import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';

export const protectAdmin = async (req, res, next) => {
  let token = null;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please log in.',
    });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET || 'farsan_super_secret_jwt_key_2026';
    const decoded = jwt.verify(token, jwtSecret);

    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Admin account not found or has been revoked.',
      });
    }

    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token. Please log in again.',
    });
  }
};
