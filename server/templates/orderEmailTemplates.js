/**
 * Industry-Grade Email Templates for Shreeji Homemade Farsan & Catering
 * Minimalist, clean, modern transactional design inspired by Apple, Stripe, and Uber Eats.
 */

/**
 * 1. Customer Order Confirmation & Digital Culinary Receipt
 */
export const customerOrderConfirmationHtml = (order, settings) => {
  const businessName = settings?.businessName || 'Shreeji Homemade Farsan & Catering';
  const phone = settings?.contactPhone || '+91 98765 43210';
  const whatsapp = settings?.whatsappPhone || '919876543210';
  const currency = settings?.currencySymbol || '₹';
  const kitchenAddress = `${settings?.address || 'Ahmedabad, Gujarat'}, ${settings?.city || ''}`;
  const firstName = order.customer.name.split(' ')[0] || order.customer.name;

  const orderDate = new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; vertical-align: middle;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td style="width: 14px; vertical-align: top; padding-top: 3px;">
                <span style="display: inline-block; width: 10px; height: 10px; border: 1.5px solid #16a34a; border-radius: 2px; text-align: center; line-height: 7px;">
                  <span style="display: inline-block; width: 4px; height: 4px; background: #16a34a; border-radius: 50%;"></span>
                </span>
              </td>
              <td style="padding-left: 8px;">
                <div style="font-size: 14px; font-weight: 600; color: #0f172a; line-height: 1.3;">
                  ${item.name}
                </div>
                <div style="font-size: 12px; color: #64748b; margin-top: 2px;">
                  Pack size: <span style="font-weight: 600; color: #ea580c;">${item.unit}</span>
                </div>
              </td>
            </tr>
          </table>
        </td>
        <td style="padding: 14px 8px; border-bottom: 1px solid #f1f5f9; text-align: center; vertical-align: middle;">
          <span style="display: inline-block; background: #f8fafc; border: 1px solid #e2e8f0; color: #334155; font-size: 12px; font-weight: 600; padding: 2px 8px; border-radius: 6px;">
            x${item.quantity}
          </span>
        </td>
        <td style="padding: 14px 8px; border-bottom: 1px solid #f1f5f9; text-align: right; vertical-align: middle; font-size: 13px; color: #64748b;">
          ${currency}${item.price}
        </td>
        <td style="padding: 14px 0; border-bottom: 1px solid #f1f5f9; text-align: right; vertical-align: middle; font-size: 14px; font-weight: 700; color: #0f172a;">
          ${currency}${item.lineTotal}
        </td>
      </tr>`
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Order Receipt #${order.orderNumber} - ${businessName}</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; }
    @media only screen and (max-width: 600px) {
      .responsive-card { padding: 20px 16px !important; }
      .grid-stack { display: block !important; width: 100% !important; padding: 0 0 12px 0 !important; }
    }
  </style>
</head>
<body style="background-color: #f8fafc; margin: 0; padding: 32px 12px;">

  <!-- Hidden Preview Text for Email Clients -->
  <div style="display: none; max-height: 0px; overflow: hidden; mso-hide: all;">
    Order Confirmed! Your fresh Gujarati delicacies (#${order.orderNumber}) are scheduled for ${order.requestedDate} (${order.requestedTimeSlot}). Total: ${currency}${order.grandTotal}.
  </div>

  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        
        <!-- Main 600px Container -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto;">
          
          <!-- Brand Header -->
          <tr>
            <td style="padding: 0 0 24px 0; text-align: center;">
              <table border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                <tr>
                  <td style="vertical-align: middle; padding-right: 10px;">
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #ea580c, #f97316); border-radius: 10px; text-align: center; line-height: 40px; color: #ffffff; font-size: 20px; font-weight: bold; box-shadow: 0 2px 8px rgba(234, 88, 12, 0.25);">
                      श्री
                    </div>
                  </td>
                  <td style="vertical-align: middle; text-align: left;">
                    <div style="font-size: 17px; font-weight: 800; color: #0f172a; letter-spacing: -0.3px;">
                      ${businessName}
                    </div>
                    <div style="font-size: 12px; color: #64748b; font-weight: 500;">
                      Pure Homemade Gujarati Farsan &bull; Ahmedabad
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Primary Card -->
          <tr>
            <td>
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05); overflow: hidden;">
                
                <!-- Hero Confirmation Block -->
                <tr>
                  <td class="responsive-card" style="padding: 32px 32px 24px 32px; text-align: center; border-bottom: 1px solid #f1f5f9;">
                    <div style="display: inline-block; width: 44px; height: 44px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 50%; text-align: center; line-height: 44px; color: #059669; font-size: 22px; font-weight: bold; margin-bottom: 12px;">
                      ✓
                    </div>
                    <h1 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 800; color: #0f172a; letter-spacing: -0.4px;">
                      Order Confirmed!
                    </h1>
                    <p style="margin: 0; font-size: 14px; color: #475569; line-height: 1.5; max-width: 440px; margin: 0 auto;">
                      Hi <strong>${firstName}</strong>, thank you for your order. We've received your request and our kitchen team is scheduling it for fresh preparation.
                    </p>

                    <!-- Order Progress Stepper -->
                    <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #f1f5f9;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td style="width: 33.33%; text-align: center;">
                            <div style="font-size: 11px; font-weight: 700; color: #059669; text-transform: uppercase; letter-spacing: 0.5px;">1. Confirmed</div>
                            <div style="height: 4px; background: #059669; border-radius: 2px; margin-top: 6px;"></div>
                          </td>
                          <td style="width: 33.33%; text-align: center; padding: 0 4px;">
                            <div style="font-size: 11px; font-weight: 700; color: #ea580c; text-transform: uppercase; letter-spacing: 0.5px;">2. Kitchen Prep</div>
                            <div style="height: 4px; background: #ea580c; border-radius: 2px; margin-top: 6px;"></div>
                          </td>
                          <td style="width: 33.33%; text-align: center;">
                            <div style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px;">3. ${order.orderType === 'Delivery' ? 'Delivery' : 'Ready'}</div>
                            <div style="height: 4px; background: #e2e8f0; border-radius: 2px; margin-top: 6px;"></div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>

                <!-- Order Meta Stats Bar -->
                <tr>
                  <td style="padding: 16px 32px; background: #fafafa; border-bottom: 1px solid #f1f5f9;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td class="grid-stack" style="width: 25%; vertical-align: top;">
                          <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Receipt #</div>
                          <div style="font-size: 13px; font-weight: 700; color: #0f172a; margin-top: 2px; font-family: monospace;">${order.orderNumber}</div>
                        </td>
                        <td class="grid-stack" style="width: 25%; vertical-align: top;">
                          <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Date</div>
                          <div style="font-size: 13px; font-weight: 600; color: #0f172a; margin-top: 2px;">${orderDate}</div>
                        </td>
                        <td class="grid-stack" style="width: 25%; vertical-align: top;">
                          <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Fulfillment</div>
                          <div style="font-size: 13px; font-weight: 700; color: ${order.orderType === 'Delivery' ? '#0284c7' : '#ea580c'}; margin-top: 2px;">
                            ${order.orderType === 'Delivery' ? '🚚 Delivery' : '🏪 Pickup'}
                          </div>
                        </td>
                        <td class="grid-stack" style="width: 25%; vertical-align: top; text-align: right;">
                          <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Payment</div>
                          <div style="font-size: 13px; font-weight: 700; color: #059669; margin-top: 2px;">${order.paymentMethod}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Dispatch Slot & Location Box -->
                <tr>
                  <td class="responsive-card" style="padding: 24px 32px; border-bottom: 1px solid #f1f5f9;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px;">
                      <tr>
                        <td style="vertical-align: top;">
                          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #ea580c; letter-spacing: 0.5px;">
                            ⏰ Scheduled Preparation & Slot
                          </div>
                          <div style="font-size: 16px; font-weight: 800; color: #0f172a; margin-top: 3px;">
                            📅 ${order.requestedDate} &bull; ${order.requestedTimeSlot}
                          </div>
                          
                          <div style="margin-top: 12px; padding-top: 10px; border-top: 1px dashed #cbd5e1;">
                            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b;">
                              ${order.orderType === 'Delivery' ? '📍 Deliver To:' : '🏪 Pickup Address:'}
                            </div>
                            <div style="font-size: 13px; color: #1e293b; font-weight: 600; margin-top: 2px;">
                              ${order.customer.name} &bull; <span style="font-weight: 500; color: #475569;">${order.customer.phone}</span>
                            </div>
                            <div style="font-size: 13px; color: #475569; margin-top: 2px; line-height: 1.4;">
                              ${order.orderType === 'Delivery' ? `${order.deliveryAddress?.address}, ${order.deliveryAddress?.city} ${order.deliveryAddress?.postalCode ? `- ${order.deliveryAddress.postalCode}` : ''}` : kitchenAddress}
                              ${order.deliveryAddress?.landmark ? `<span style="color: #64748b;">(Landmark: ${order.deliveryAddress.landmark})</span>` : ''}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>

                    ${
                      order.specialInstructions
                        ? `
                    <div style="margin-top: 14px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 10px 14px; font-size: 12px; color: #92400e; line-height: 1.4;">
                      <strong>Special Note:</strong> ${order.specialInstructions}
                    </div>`
                        : ''
                    }
                  </td>
                </tr>

                <!-- Receipt Items Table -->
                <tr>
                  <td class="responsive-card" style="padding: 24px 32px 16px 32px;">
                    <div style="font-size: 14px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">
                      Itemized Bill
                    </div>
                    
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <thead>
                        <tr style="border-bottom: 1px solid #cbd5e1;">
                          <th style="padding-bottom: 8px; text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b;">Item & Description</th>
                          <th style="padding-bottom: 8px; text-align: center; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b;">Qty</th>
                          <th style="padding-bottom: 8px; text-align: right; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b;">Rate</th>
                          <th style="padding-bottom: 8px; text-align: right; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b;">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${itemsHtml}
                      </tbody>
                    </table>

                    <!-- Pricing Calculation -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 14px;">
                      <tr>
                        <td style="padding: 4px 0; font-size: 13px; color: #64748b;">Subtotal</td>
                        <td style="padding: 4px 0; text-align: right; font-size: 13px; font-weight: 600; color: #0f172a;">${currency}${order.subtotal}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; font-size: 13px; color: #64748b;">Delivery Fee</td>
                        <td style="padding: 4px 0; text-align: right; font-size: 13px; font-weight: 600; color: #059669;">
                          ${order.deliveryFee === 0 ? 'FREE' : `${currency}${order.deliveryFee}`}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0 4px 0; border-top: 2px solid #0f172a; font-size: 16px; font-weight: 800; color: #0f172a;">
                          Total Amount
                        </td>
                        <td style="padding: 12px 0 4px 0; border-top: 2px solid #0f172a; text-align: right; font-size: 20px; font-weight: 900; color: #ea580c; font-family: monospace;">
                          ${currency}${order.grandTotal}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding-top: 2px; text-align: right; font-size: 11px; color: #64748b;">
                          Payment Mode: <strong style="color: #334155;">${order.paymentMethod} (${order.paymentStatus})</strong>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Quality & Purity Guarantee (Clean Bento Grid) -->
                <tr>
                  <td class="responsive-card" style="padding: 8px 32px 24px 32px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 16px;">
                      <tr>
                        <td style="width: 33.33%; text-align: center; padding: 0 4px; vertical-align: top;">
                          <div style="font-size: 18px; margin-bottom: 2px;">🥜</div>
                          <div style="font-size: 11px; font-weight: 700; color: #0f172a;">100% Groundnut Oil</div>
                          <div style="font-size: 10px; color: #64748b;">Filtered pure seed oil</div>
                        </td>
                        <td style="width: 33.33%; text-align: center; padding: 0 4px; vertical-align: top; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0;">
                          <div style="font-size: 18px; margin-bottom: 2px;">🧈</div>
                          <div style="font-size: 11px; font-weight: 700; color: #0f172a;">Shuddh Cow Ghee</div>
                          <div style="font-size: 10px; color: #64748b;">Artisanal sweets & mohanthal</div>
                        </td>
                        <td style="width: 33.33%; text-align: center; padding: 0 4px; vertical-align: top;">
                          <div style="font-size: 18px; margin-bottom: 2px;">🌿</div>
                          <div style="font-size: 11px; font-weight: 700; color: #0f172a;">100% Pure Veg</div>
                          <div style="font-size: 10px; color: #64748b;">Clean Jain friendly kitchen</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Support & Assistance Buttons -->
                <tr>
                  <td class="responsive-card" style="padding: 20px 32px; background: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center;">
                    <div style="font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 12px;">
                      Need help or changes to your delivery time?
                    </div>
                    <div>
                      <a href="https://wa.me/${whatsapp}?text=Hello%20${encodeURIComponent(businessName)}%2C%20regarding%20my%20order%20%23${order.orderNumber}" style="display: inline-block; background: #25D366; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 700; margin: 4px; box-shadow: 0 2px 4px rgba(37, 211, 102, 0.2);">
                        💬 Chat on WhatsApp
                      </a>
                      <a href="tel:${phone}" style="display: inline-block; background: #ffffff; border: 1px solid #cbd5e1; color: #0f172a; text-decoration: none; padding: 10px 18px; border-radius: 8px; font-size: 13px; font-weight: 600; margin: 4px;">
                        📞 Call ${phone}
                      </a>
                    </div>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Clean Minimal Footer -->
          <tr>
            <td style="padding: 24px 16px; text-align: center; font-size: 12px; color: #94a3b8; line-height: 1.5;">
              <div style="font-weight: 600; color: #64748b;">${businessName}</div>
              <div style="margin-top: 2px;">${kitchenAddress} &bull; Phone: ${phone}</div>
              <div style="margin-top: 6px; font-size: 11px; color: #cbd5e1;">
                This automated digital receipt was generated for Order #${order.orderNumber}.
              </div>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;
};

/**
 * 2. Executive Business / Kitchen Staff Order Alert
 */
export const businessOrderNotificationHtml = (order, settings) => {
  const businessName = settings?.businessName || 'Shreeji Homemade Farsan & Catering';
  const currency = settings?.currencySymbol || '₹';
  const phone = order.customer?.phone || '';
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  const itemsRows = order.items
    .map(
      (item, idx) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; vertical-align: middle;">
          <div style="font-weight: 700; color: #0f172a; font-size: 14px;">
            <span style="display: inline-block; width: 18px; height: 18px; border: 1.5px solid #cbd5e1; border-radius: 4px; vertical-align: middle; margin-right: 6px;"></span>
            ${idx + 1}. ${item.name}
          </div>
          <div style="font-size: 12px; color: #ea580c; font-weight: 600; margin-left: 24px; margin-top: 2px;">
            Pack Size: ${item.unit}
          </div>
        </td>
        <td style="padding: 12px 8px; border-bottom: 1px solid #f1f5f9; text-align: center; vertical-align: middle;">
          <span style="background: #0f172a; color: #ffffff; padding: 3px 10px; border-radius: 6px; font-size: 13px; font-weight: 800;">
            x${item.quantity}
          </span>
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; text-align: right; vertical-align: middle; font-weight: 700; color: #0f172a; font-size: 14px;">
          ${currency}${item.lineTotal}
        </td>
      </tr>`
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order #${order.orderNumber} - Kitchen Dispatch</title>
  <style type="text/css">
    body { margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; }
    @media only screen and (max-width: 600px) {
      .responsive-card { padding: 20px 16px !important; }
    }
  </style>
</head>
<body style="background-color: #f8fafc; margin: 0; padding: 32px 12px;">

  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05); overflow: hidden;">
          
          <!-- Alert Header Banner -->
          <tr>
            <td style="background: #0f172a; padding: 24px 32px; color: #ffffff;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="background: #ea580c; color: #ffffff; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; padding: 3px 10px; border-radius: 9999px;">
                      🔔 NEW ORDER DISPATCH
                    </span>
                    <h1 style="margin: 8px 0 2px 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.3px;">
                      Order #${order.orderNumber}
                    </h1>
                    <div style="font-size: 13px; color: #94a3b8;">
                      ${order.orderType === 'Delivery' ? '🚚 Home Delivery' : '🏪 Self Pickup'} &bull; Payment: ${order.paymentMethod}
                    </div>
                  </td>
                  <td style="text-align: right; vertical-align: middle;">
                    <div style="font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: 600;">To Collect</div>
                    <div style="font-size: 22px; font-weight: 900; color: #f59e0b; font-family: monospace;">
                      ${currency}${order.grandTotal}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Scheduled Prep Time Highlight -->
          <tr>
            <td style="padding: 18px 32px; background: #fff7ed; border-bottom: 1px solid #ffedd5;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="width: 24px; vertical-align: top; font-size: 18px;">⏰</td>
                  <td style="padding-left: 8px;">
                    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #c2410c; letter-spacing: 0.5px;">Scheduled Kitchen Slot</div>
                    <div style="font-size: 17px; font-weight: 800; color: #7c2d12; margin-top: 2px;">
                      📅 ${order.requestedDate} &bull; ${order.requestedTimeSlot}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Quick Action Buttons for Kitchen Staff -->
          <tr>
            <td style="padding: 16px 32px; border-bottom: 1px solid #f1f5f9; background: #fafafa;">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 8px; letter-spacing: 0.5px;">Customer Instant Actions:</div>
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="width: 50%; padding-right: 6px;">
                    <a href="tel:${phone}" style="display: block; text-align: center; background: #0f172a; color: #ffffff; text-decoration: none; padding: 10px 0; border-radius: 8px; font-size: 13px; font-weight: 700;">
                      📞 Call Customer
                    </a>
                  </td>
                  <td style="width: 50%; padding-left: 6px;">
                    <a href="https://wa.me/${cleanPhone}?text=Namaste%20${encodeURIComponent(order.customer.name)}%2C%20from%20${encodeURIComponent(businessName)}%20regarding%20your%20order%20%23${order.orderNumber}" style="display: block; text-align: center; background: #25D366; color: #ffffff; text-decoration: none; padding: 10px 0; border-radius: 8px; font-size: 13px; font-weight: 700;">
                      💬 WhatsApp Customer
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Customer Info & Delivery Details -->
          <tr>
            <td class="responsive-card" style="padding: 24px 32px; border-bottom: 1px solid #f1f5f9;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="vertical-align: top;">
                    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Customer Info</div>
                    <div style="font-size: 15px; font-weight: 700; color: #0f172a; margin-top: 2px;">${order.customer.name}</div>
                    <div style="font-size: 13px; color: #475569; margin-top: 2px;">
                      📞 <a href="tel:${phone}" style="color: #ea580c; text-decoration: none; font-weight: 600;">${order.customer.phone}</a> &bull; ✉️ ${order.customer.email}
                    </div>

                    ${
                      order.orderType === 'Delivery'
                        ? `
                    <div style="margin-top: 12px; padding: 12px 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
                      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #0284c7;">📍 Delivery Destination:</div>
                      <div style="font-size: 13px; color: #1e293b; font-weight: 600; margin-top: 2px;">
                        ${order.deliveryAddress?.address || ''}, ${order.deliveryAddress?.city || ''} ${order.deliveryAddress?.postalCode ? `- ${order.deliveryAddress.postalCode}` : ''}
                      </div>
                      ${order.deliveryAddress?.landmark ? `<div style="font-size: 12px; color: #64748b; margin-top: 2px;">Landmark: ${order.deliveryAddress.landmark}</div>` : ''}
                    </div>`
                        : `<div style="margin-top: 8px; font-size: 13px; color: #ea580c; font-weight: 600;">🏪 Customer will self-pickup from store.</div>`
                    }

                    ${
                      order.specialInstructions
                        ? `
                    <div style="margin-top: 12px; padding: 10px 14px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; font-size: 13px; color: #92400e;">
                      <strong>⚠️ Customer Note:</strong> ${order.specialInstructions}
                    </div>`
                        : ''
                    }
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Packing Checklist -->
          <tr>
            <td class="responsive-card" style="padding: 24px 32px;">
              <div style="font-size: 14px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                Kitchen Packing Checklist (${order.items.length} items)
              </div>
              <p style="margin: 0 0 12px 0; font-size: 12px; color: #64748b;">Tick off items as they are weighed and packed:</p>

              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <thead>
                  <tr style="border-bottom: 1px solid #cbd5e1;">
                    <th style="padding-bottom: 8px; text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b;">Item Description</th>
                    <th style="padding-bottom: 8px; text-align: center; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b;">Qty</th>
                    <th style="padding-bottom: 8px; text-align: right; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsRows}
                </tbody>
              </table>

              <div style="margin-top: 16px; padding: 14px 16px; background: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="font-size: 13px; color: #64748b;">Items Subtotal:</td>
                    <td style="text-align: right; font-weight: 600; color: #0f172a; font-size: 13px;">${currency}${order.subtotal}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 13px; color: #64748b; padding-top: 2px;">Delivery Fee:</td>
                    <td style="text-align: right; font-weight: 600; color: #0f172a; font-size: 13px; padding-top: 2px;">${currency}${order.deliveryFee}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 16px; font-weight: 800; color: #0f172a; padding-top: 8px; border-top: 1px solid #cbd5e1;">Grand Total:</td>
                    <td style="text-align: right; font-size: 18px; font-weight: 900; color: #ea580c; padding-top: 8px; border-top: 1px solid #cbd5e1; font-family: monospace;">${currency}${order.grandTotal}</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 16px 32px; background: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; font-size: 11px; color: #94a3b8;">
              ${businessName} Kitchen Alert &bull; Automated notification for order dispatch.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;
};
