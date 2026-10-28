import nodemailer from 'nodemailer';

let transporter = null;

export const initEmailTransporter = () => {
  // If HTTP Email API is configured (Resend / Brevo), use it directly (Port 443 HTTPS - Works on Render Free Tier)
  if (process.env.RESEND_API_KEY) {
    console.log(`[Email Service] Resend HTTPS API configured. Outgoing emails will be sent via HTTPS (Port 443).`);
    return null;
  }
  if (process.env.BREVO_API_KEY) {
    console.log(`[Email Service] Brevo HTTPS API configured. Outgoing emails will be sent via HTTPS (Port 443).`);
    return null;
  }

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
          connectionTimeout: 8000,
          greetingTimeout: 8000,
          socketTimeout: 8000,
        }
      : {
          host,
          port,
          secure: port === 465,
          auth: { user, pass },
          connectionTimeout: 8000,
          greetingTimeout: 8000,
          socketTimeout: 8000,
        };

    transporter = nodemailer.createTransport(transportConfig);

    transporter.verify((err) => {
      if (err) {
        console.warn(`[Nodemailer] Warning: Direct SMTP connection failed (${err.message}). Note: Render Free Tier blocks outbound SMTP ports (25, 465, 587). Add RESEND_API_KEY to send emails via HTTPS without port restrictions.`);
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
