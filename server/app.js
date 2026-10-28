import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cateringRoutes from './routes/cateringRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

const app = express();

// Trust reverse proxy headers (Render, Heroku, Cloudflare, etc.)
app.set('trust proxy', 1);

// Security HTTP headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || '*',
    credentials: true,
  })
);

// Rate limiter: 300 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false },
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after 15 minutes.',
  },
});
app.use('/api', limiter);

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static uploads with graceful fallback for ephemeral cloud hosting (Render)
const uploadDirs = [
  path.resolve('uploads'),
  path.resolve('server/uploads'),
];

app.get('/uploads/:filename', (req, res, next) => {
  const filename = path.basename(req.params.filename);
  for (const dir of uploadDirs) {
    const fullPath = path.join(dir, filename);
    if (fs.existsSync(fullPath)) {
      return res.sendFile(fullPath);
    }
  }

  // Fallback if image was removed during an ephemeral cloud restart:
  // Redirect to high-quality Gujarati farsan photography so UI never breaks
  return res.redirect(
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80'
  );
});
app.use('/uploads', express.static(path.resolve('uploads')));

// Root healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Gujarati Farsan & Catering API',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/catering-enquiries', cateringRoutes);
app.use('/api/settings', settingsRoutes);

// Production Frontend Static Files (Single-service deployment on Render / Cloud)
const possibleDistPaths = [
  path.resolve('../client/dist'),
  path.resolve('client/dist'),
  path.join(process.cwd(), '..', 'client', 'dist'),
  path.join(process.cwd(), 'client', 'dist'),
];
const clientDistPath = possibleDistPaths.find((p) => fs.existsSync(p));

if (clientDistPath) {
  app.use(express.static(clientDistPath));

  // SPA fallback for client-side routing
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
