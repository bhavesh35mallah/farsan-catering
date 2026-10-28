import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB } from './config/db.js';
import { initEmailTransporter } from './config/email.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // 1. Connect Database
    await connectDB();

    // 2. Initialize Email Transporter
    initEmailTransporter();

    // 3. Start Listening
    app.listen(PORT, () => {
      console.log(`[Server] Gujarati Farsan & Catering API running on port ${PORT}`);
      console.log(`[Server] Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error(`[Server] Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
