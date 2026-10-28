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

export const sendOrderEmails = async (order) => {
  const result = {
    businessEmailSent: false,
    customerEmailSent: false,
    error: null,
  };

  try {
    const settings = (await BusinessSettings.findOne()) || {};
    const transporter = getTransporter();

    const senderEmail = process.env.SENDER_EMAIL || process.env.SMTP_USER || 'no-reply@farsancatering.com';
    const businessNotificationEmail =
      process.env.BUSINESS_NOTIFICATION_EMAIL ||
      (settings.notificationEmail && !settings.notificationEmail.includes('shreejifarsan.com')
        ? settings.notificationEmail
        : 'farsan-catering@yopmail.com');

    // If no real SMTP transporter is configured, simulate successfully and log
    if (!transporter) {
      console.log(`[Email Service Simulation] New Order #${order.orderNumber}`);
      console.log(` -> To Business: ${businessNotificationEmail}`);
      console.log(` -> To Customer: ${order.customer.email}`);
      console.log(` -> Grand Total: ₹${order.grandTotal}`);
      return {
        businessEmailSent: true,
        customerEmailSent: true,
        simulated: true,
        error: null,
      };
    }

    // 1. Send notification to Business Owner
    try {
      await transporter.sendMail({
        from: `"${settings.businessName || 'Shreeji Farsan'}" <${senderEmail}>`,
        to: businessNotificationEmail,
        subject: `🔔 New Order Received: #${order.orderNumber} (₹${order.grandTotal}) - ${order.orderType}`,
        html: businessOrderNotificationHtml(order, settings),
      });
      result.businessEmailSent = true;
      console.log(`[Email Service] Business notification sent for Order #${order.orderNumber}`);
    } catch (bizErr) {
      console.error(`[Email Service] Failed sending business notification for #${order.orderNumber}:`, bizErr.message);
      result.error = `Business email error: ${bizErr.message}`;
    }

    // 2. Send confirmation to Customer
    try {
      await transporter.sendMail({
        from: `"${settings.businessName || 'Shreeji Farsan'}" <${senderEmail}>`,
        to: order.customer.email,
        subject: `Order Confirmation: #${order.orderNumber} - ${settings.businessName || 'Shreeji Farsan'}`,
        html: customerOrderConfirmationHtml(order, settings),
      });
      result.customerEmailSent = true;
      console.log(`[Email Service] Customer confirmation sent to ${order.customer.email}`);
    } catch (custErr) {
      console.error(`[Email Service] Failed sending customer confirmation for #${order.orderNumber}:`, custErr.message);
      result.error = result.error ? `${result.error}; Customer email error: ${custErr.message}` : `Customer email error: ${custErr.message}`;
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
    const transporter = getTransporter();

    const senderEmail = process.env.SENDER_EMAIL || process.env.SMTP_USER || 'no-reply@farsancatering.com';
    const businessNotificationEmail =
      process.env.BUSINESS_NOTIFICATION_EMAIL ||
      (settings.notificationEmail && !settings.notificationEmail.includes('shreejifarsan.com')
        ? settings.notificationEmail
        : 'farsan-catering@yopmail.com');

    if (!transporter) {
      console.log(`[Email Service Simulation] Catering Enquiry from ${enquiry.customer.name}`);
      console.log(` -> Event: ${enquiry.eventType} on ${enquiry.eventDate} for ${enquiry.guestCount} guests`);
      console.log(` -> To Business: ${businessNotificationEmail}`);
      console.log(` -> To Customer: ${enquiry.customer.email}`);
      return {
        businessEmailSent: true,
        customerEmailSent: true,
        simulated: true,
        error: null,
      };
    }

    // 1. Business notification
    try {
      await transporter.sendMail({
        from: `"${settings.businessName || 'Shreeji Farsan'}" <${senderEmail}>`,
        to: businessNotificationEmail,
        subject: `🥘 New Catering Enquiry: ${enquiry.eventType} (${enquiry.guestCount} guests) - ${enquiry.customer.name}`,
        html: businessCateringEnquiryHtml(enquiry, settings),
      });
      result.businessEmailSent = true;
    } catch (err) {
      console.error(`[Email Service] Catering business email failed:`, err.message);
      result.error = err.message;
    }

    // 2. Customer confirmation
    try {
      await transporter.sendMail({
        from: `"${settings.businessName || 'Shreeji Farsan'}" <${senderEmail}>`,
        to: enquiry.customer.email,
        subject: `Catering Enquiry Received - ${settings.businessName || 'Shreeji Farsan'}`,
        html: customerCateringConfirmationHtml(enquiry, settings),
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
