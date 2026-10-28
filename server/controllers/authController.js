import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'farsan_super_secret_jwt_key_2026';
  return jwt.sign({ id }, secret, { expiresIn: '7d' });
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const token = generateToken(admin._id);

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res) => {
  res.json({
    success: true,
    admin: req.admin,
  });
};

export const logout = async (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully.',
  });
};
