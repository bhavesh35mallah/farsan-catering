import nodemailer from 'nodemailer';

let transporter = null;

export const initEmailTransporter = () => {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (user && pass) {
    const isGmail = (host && host.toLowerCase().includes('gmail')) || (user && user.toLowerCase().includes('@gmail'));

    const transportConfig = isGmail
      ? {
          service: 'gmail',
          auth: { user, pass },
          connectionTimeout: 15000,
          socketTimeout: 15000,
        }
      : {
          host,
          port,
          secure: port === 465,
          auth: { user, pass },
          connectionTimeout: 15000,
          socketTimeout: 15000,
        };

    transporter = nodemailer.createTransport(transportConfig);

    transporter.verify((err) => {
      if (err) {
        console.warn(`[Nodemailer] Warning: SMTP connection failed (${err.message}). Outgoing emails might fail until credentials are corrected.`);
      } else {
        console.log(`[Nodemailer] SMTP server is ready to send emails.`);
      }
    });
  } else {
    console.log(`[Nodemailer] SMTP credentials not fully configured in environment. Running in simulated fallback mode (email contents logged to console).`);
    transporter = null;
  }

  return transporter;
};

export const getTransporter = () => transporter;
