import nodemailer from 'nodemailer';

let transporter = null;

export const initEmailTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    transporter.verify((err) => {
      if (err) {
        console.warn(`[Nodemailer] Warning: SMTP connection failed (${err.message}). Outgoing emails might fail until credentials are corrected.`);
      } else {
        console.log(`[Nodemailer] SMTP server is ready to send emails.`);
      }
    });
  } else {
    console.log(`[Nodemailer] SMTP credentials not fully configured in .env. Running in simulated fallback mode (email contents logged to console).`);
    transporter = null;
  }

  return transporter;
};

export const getTransporter = () => transporter;
