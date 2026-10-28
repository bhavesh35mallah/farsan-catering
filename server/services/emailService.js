import { getTransporter } from '../config/email.js';
import { BusinessSettings } from '../models/BusinessSettings.js';
import {
  businessOrderNotificationHtml,
  customerOrderConfirmationHtml,
} from '../templates/orderEmailTemplates.js';
import {
  businessCateringEnquiryHtml,
  customerCateringConfirmationHtml,
} from '../templates/cateringEmailTemplates.js';

/**
 * Universal email dispatcher:
 * 1. Resend HTTPS API (Port 443 - Recommended for Render Free Tier)
 * 2. Brevo HTTPS API (Port 443 - Works on Render Free Tier)
 * 3. Nodemailer SMTP (Works locally or on paid cloud hosts)
 * 4. Simulated Fallback (Logs to console)
 */
export const dispatchEmail = async ({ to, subject, html, settings }) => {
  const fromName = settings?.businessName || 'Shreeji Homemade Farsan';
  const senderEmail = process.env.SENDER_EMAIL || process.env.SMTP_USER || 'no-reply@farsancatering.com';

  // 1. Brevo (Sendinblue) API (HTTPS Port 443 - Sends to ANY customer without domain verification!)
  if (process.env.BREVO_API_KEY) {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: fromName, email: senderEmail },
        to: (Array.isArray(to) ? to : [to]).map((email) => ({ email })),
        subject,
        htmlContent: html,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Brevo API Error (${response.status}): ${data.message || JSON.stringify(data)}`);
    }
    console.log(`[Email Service] Delivered via Brevo HTTPS API to ${to} (ID: ${data.messageId})`);
    return { success: true, provider: 'brevo', messageId: data.messageId };
  }

  // 2. Resend API (HTTPS Port 443)
  if (process.env.RESEND_API_KEY) {
    const resendFrom = process.env.RESEND_FROM || `${fromName} <onboarding@resend.dev>`;
    const targetEmails = Array.isArray(to) ? to : [to];

    let response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: resendFrom,
        to: targetEmails,
        subject,
        html,
      }),
    });

    let data = await response.json();

    // If Resend test restriction triggered (unverified domain allows only account owner email)
    if (!response.ok && response.status === 403 && data.message?.includes('only send testing emails')) {
      const ownerEmail = process.env.RESEND_OWNER_EMAIL || process.env.SMTP_USER || 'bhavesh.45.mallah@gmail.com';
      console.warn(`[Email Service] Resend test mode: re-routing to account owner (${ownerEmail}) because recipient ${targetEmails.join(', ')} is unverified`);

      response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: resendFrom,
          to: [ownerEmail],
          subject: `[Order Alert for ${targetEmails.join(', ')}] ${subject}`,
          html: `<div style="background:#fff3cd;padding:12px;border-left:4px solid #ffc107;margin-bottom:16px;font-family:sans-serif;font-size:13px;color:#856404;">
            <strong>⚠️ Resend Test Mode Notice:</strong> Intended recipient was <code>${targetEmails.join(', ')}</code>. Because a custom domain is not yet verified at resend.com, Resend routed this order to your account email (${ownerEmail}).
          </div>` + html,
        }),
      });
      data = await response.json();
    }

    if (!response.ok) {
      throw new Error(`Resend API Error (${response.status}): ${data.message || JSON.stringify(data)}`);
    }
    console.log(`[Email Service] Delivered via Resend HTTPS API (ID: ${data.id})`);
    return { success: true, provider: 'resend', id: data.id };
  }

  // 3. Nodemailer SMTP (Localhost or Paid Cloud Server)
  const transporter = getTransporter();
  if (transporter) {
    const info = await transporter.sendMail({
      from: `"${fromName}" <${senderEmail}>`,
      to,
      subject,
      html,
    });
    console.log(`[Email Service] Delivered via SMTP to ${to} (MessageId: ${info.messageId})`);
    return { success: true, provider: 'smtp', messageId: info.messageId };
  }

  // 4. Simulated Fallback
  console.log(`[Email Service Simulation] Subject: "${subject}" to: ${to}`);
  return { success: true, provider: 'simulation' };
};

export const sendOrderEmails = async (order) => {
  const result = {
    businessEmailSent: false,
    customerEmailSent: false,
    error: null,
  };

  try {
    const settings = (await BusinessSettings.findOne()) || {};
    const businessNotificationEmail =
      process.env.BUSINESS_NOTIFICATION_EMAIL ||
      (settings.notificationEmail && !settings.notificationEmail.includes('shreejifarsan.com')
        ? settings.notificationEmail
        : 'farsan-catering@yopmail.com');

    // 1. Send notification to Business Owner
    try {
      await dispatchEmail({
        to: businessNotificationEmail,
        subject: `🔔 New Order Received: #${order.orderNumber} (₹${order.grandTotal}) - ${order.orderType}`,
        html: businessOrderNotificationHtml(order, settings),
        settings,
      });
      result.businessEmailSent = true;
    } catch (bizErr) {
      console.error(`[Email Service] Business notification failed for #${order.orderNumber}:`, bizErr.message);
      result.error = `Business email error: ${bizErr.message}`;
    }

    // 2. Send confirmation to Customer
    try {
      await dispatchEmail({
        to: order.customer.email,
        subject: `Order Confirmation: #${order.orderNumber} - ${settings.businessName || 'Shreeji Farsan'}`,
        html: customerOrderConfirmationHtml(order, settings),
        settings,
      });
      result.customerEmailSent = true;
    } catch (custErr) {
      console.error(`[Email Service] Customer confirmation failed for #${order.orderNumber}:`, custErr.message);
      result.error = result.error
        ? `${result.error}; Customer email error: ${custErr.message}`
        : `Customer email error: ${custErr.message}`;
    }
  } catch (err) {
    console.error(`[Email Service] Unexpected error in sendOrderEmails:`, err.message);
    result.error = err.message;
  }

  return result;
};

export const sendCateringEmails = async (enquiry) => {
  const result = {
    businessEmailSent: false,
    customerEmailSent: false,
    error: null,
  };

  try {
    const settings = (await BusinessSettings.findOne()) || {};
    const businessNotificationEmail =
      process.env.BUSINESS_NOTIFICATION_EMAIL ||
      (settings.notificationEmail && !settings.notificationEmail.includes('shreejifarsan.com')
        ? settings.notificationEmail
        : 'farsan-catering@yopmail.com');

    // 1. Business notification
    try {
      await dispatchEmail({
        to: businessNotificationEmail,
        subject: `🥘 New Catering Enquiry: ${enquiry.eventType} (${enquiry.guestCount} guests) - ${enquiry.customer.name}`,
        html: businessCateringEnquiryHtml(enquiry, settings),
        settings,
      });
      result.businessEmailSent = true;
    } catch (err) {
      console.error(`[Email Service] Catering business email failed:`, err.message);
      result.error = err.message;
    }

    // 2. Customer confirmation
    try {
      await dispatchEmail({
        to: enquiry.customer.email,
        subject: `Catering Enquiry Received - ${settings.businessName || 'Shreeji Farsan'}`,
        html: customerCateringConfirmationHtml(enquiry, settings),
        settings,
      });
      result.customerEmailSent = true;
    } catch (err) {
      console.error(`[Email Service] Catering customer confirmation failed:`, err.message);
    }
  } catch (err) {
    console.error(`[Email Service] Unexpected error in sendCateringEmails:`, err.message);
    result.error = err.message;
  }

  return result;
};
