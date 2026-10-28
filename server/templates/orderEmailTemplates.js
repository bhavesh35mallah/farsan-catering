/**
 * Industry-Grade Email Templates for Shreeji Homemade Farsan & Catering
 * Fully responsive down to 320px mobile screens (iPhone SE, narrow viewports).
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
        <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; vertical-align: middle;">
          <table border="0" cellspacing="0" cellpadding="0" style="width: 100%;">
            <tr>
              <td style="width: 14px; vertical-align: top; padding-top: 3px;">
                <span style="display: inline-block; width: 10px; height: 10px; border: 1.5px solid #16a34a; border-radius: 2px; text-align: center; line-height: 7px;">
                  <span style="display: inline-block; width: 4px; height: 4px; background: #16a34a; border-radius: 50%;"></span>
                </span>
              </td>
              <td style="padding-left: 8px;">
                <div style="font-size: 13px; font-weight: 700; color: #0f172a; line-height: 1.35; word-break: break-word;">
                  ${item.name}
                </div>
                <div style="font-size: 11px; color: #64748b; margin-top: 2px;">
                  Pack: <span style="font-weight: 600; color: #ea580c;">${item.unit}</span>
                  <span class="show-mobile-rate" style="display: none; color: #64748b;"> &bull; ${currency}${item.price} each</span>
                </div>
              </td>
            </tr>
          </table>
        </td>
        <td class="hide-mobile" style="padding: 12px 6px; border-bottom: 1px solid #f1f5f9; text-align: right; vertical-align: middle; font-size: 12px; color: #64748b; white-space: nowrap;">
          ${currency}${item.price}
        </td>
        <td style="padding: 12px 4px; border-bottom: 1px solid #f1f5f9; text-align: center; vertical-align: middle; width: 44px;">
          <span style="display: inline-block; background: #f8fafc; border: 1px solid #e2e8f0; color: #1e293b; font-size: 11px; font-weight: 700; padding: 2px 6px; border-radius: 6px; white-space: nowrap;">
            x${item.quantity}
          </span>
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; text-align: right; vertical-align: middle; font-size: 13px; font-weight: 800; color: #0f172a; white-space: nowrap;">
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Order Receipt #${order.orderNumber} - ${businessName}</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; min-width: 100% !important; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; }
    
    /* Responsive rules specifically tested down to 320px screens */
    @media only screen and (max-width: 480px) {
      .outer-body-td { padding: 10px 4px !important; }
      .main-table-wrap { width: 100% !important; min-width: 100% !important; max-width: 100% !important; }
      .responsive-card { padding: 18px 12px !important; }
      .meta-box-pad { padding: 12px 10px !important; }
      
      .meta-item {
        display: inline-block !important;
        width: 49% !important;
        vertical-align: top !important;
        box-sizing: border-box !important;
        padding: 4px 2px !important;
      }
      
      .step-text { font-size: 10px !important; letter-spacing: 0 !important; }
      
      .hide-mobile { display: none !important; width: 0 !important; max-height: 0 !important; overflow: hidden !important; }
      .show-mobile-rate { display: inline !important; }
      
      .bento-cell {
        display: block !important;
        width: 100% !important;
        box-sizing: border-box !important;
        border-left: none !important;
        border-right: none !important;
        border-bottom: 1px solid #e2e8f0 !important;
        padding: 8px 4px !important;
        text-align: left !important;
      }
      .bento-cell:last-child {
        border-bottom: none !important;
      }
      
      .mobile-full-btn {
        display: block !important;
        width: 100% !important;
        box-sizing: border-box !important;
        margin: 6px 0 !important;
        text-align: center !important;
        padding: 12px 10px !important;
      }
    }
  </style>
</head>
<body style="background-color: #f8fafc; margin: 0; padding: 24px 8px;">

  <!-- Hidden Preview Text -->
  <div style="display: none; max-height: 0px; overflow: hidden; mso-hide: all;">
    Order Confirmed! Your fresh Gujarati delicacies (#${order.orderNumber}) are scheduled for ${order.requestedDate} (${order.requestedTimeSlot}). Total: ${currency}${order.grandTotal}.
  </div>

  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width: 100% !important; min-width: 100%;">
    <tr>
      <td align="center" class="outer-body-td" style="padding: 24px 8px;">
        
        <!-- Main 600px Max Container (Fluids down to 320px) -->
        <table class="main-table-wrap" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; margin: 0 auto;">
          
          <!-- Brand Header -->
          <tr>
            <td style="padding: 0 0 18px 0; text-align: center;">
              <table border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                <tr>
                  <td style="vertical-align: middle; padding-right: 8px;">
                    <div style="width: 36px; height: 36px; background: linear-gradient(135deg, #ea580c, #f97316); border-radius: 9px; text-align: center; line-height: 36px; color: #ffffff; font-size: 18px; font-weight: bold; box-shadow: 0 2px 6px rgba(234, 88, 12, 0.25);">
                      श्री
                    </div>
                  </td>
                  <td style="vertical-align: middle; text-align: left;">
                    <div style="font-size: 16px; font-weight: 800; color: #0f172a; letter-spacing: -0.3px; line-height: 1.2;">
                      ${businessName}
                    </div>
                    <div style="font-size: 11px; color: #64748b; font-weight: 500;">
                      Pure Gujarati Farsan &bull; Ahmedabad
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Primary Card -->
          <tr>
            <td>
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width: 100% !important; background: #ffffff; border-radius: 14px; border: 1px solid #e2e8f0; box-shadow: 0 4px 18px -2px rgba(15, 23, 42, 0.05); overflow: hidden;">
                
                <!-- Hero Confirmation Block -->
                <tr>
                  <td class="responsive-card" style="padding: 28px 24px 20px 24px; text-align: center; border-bottom: 1px solid #f1f5f9;">
                    <div style="display: inline-block; width: 40px; height: 40px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 50%; text-align: center; line-height: 40px; color: #059669; font-size: 20px; font-weight: bold; margin-bottom: 10px;">
                      ✓
                    </div>
                    <h1 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 800; color: #0f172a; letter-spacing: -0.3px;">
                      Order Confirmed!
                    </h1>
                    <p style="margin: 0; font-size: 13px; color: #475569; line-height: 1.45; max-width: 420px; margin: 0 auto;">
                      Hi <strong>${firstName}</strong>, thank you for your order. We've received your request and scheduled it for fresh kitchen preparation.
                    </p>

                    <!-- Order Progress Stepper (Responsive to 320px) -->
                    <div style="margin-top: 18px; padding-top: 16px; border-top: 1px solid #f1f5f9;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width: 100% !important;">
                        <tr>
                          <td style="width: 33.33%; text-align: center; padding: 0 2px;">
                            <div class="step-text" style="font-size: 10px; font-weight: 700; color: #059669; text-transform: uppercase;">1. Confirmed</div>
                            <div style="height: 3px; background: #059669; border-radius: 2px; margin-top: 5px;"></div>
                          </td>
                          <td style="width: 33.33%; text-align: center; padding: 0 2px;">
                            <div class="step-text" style="font-size: 10px; font-weight: 700; color: #ea580c; text-transform: uppercase;">2. Kitchen Prep</div>
                            <div style="height: 3px; background: #ea580c; border-radius: 2px; margin-top: 5px;"></div>
                          </td>
                          <td style="width: 33.33%; text-align: center; padding: 0 2px;">
                            <div class="step-text" style="font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase;">3. ${order.orderType === 'Delivery' ? 'Delivery' : 'Ready'}</div>
                            <div style="height: 3px; background: #e2e8f0; border-radius: 2px; margin-top: 5px;"></div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>

                <!-- Order Meta Stats Bar (Stacks gracefully into 2x2 grid on 320px) -->
                <tr>
                  <td class="meta-box-pad" style="padding: 14px 24px; background: #fafafa; border-bottom: 1px solid #f1f5f9;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width: 100% !important;">
                      <tr>
                        <td class="meta-item" style="width: 25%; vertical-align: top;">
                          <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.3px;">Receipt #</div>
                          <div style="font-size: 12px; font-weight: 700; color: #0f172a; margin-top: 2px; font-family: monospace; word-break: break-all;">${order.orderNumber}</div>
                        </td>
                        <td class="meta-item" style="width: 25%; vertical-align: top;">
                          <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.3px;">Date</div>
                          <div style="font-size: 12px; font-weight: 600; color: #0f172a; margin-top: 2px;">${orderDate}</div>
                        </td>
                        <td class="meta-item" style="width: 25%; vertical-align: top;">
                          <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.3px;">Fulfillment</div>
                          <div style="font-size: 12px; font-weight: 700; color: ${order.orderType === 'Delivery' ? '#0284c7' : '#ea580c'}; margin-top: 2px;">
                            ${order.orderType === 'Delivery' ? '🚚 Delivery' : '🏪 Pickup'}
                          </div>
                        </td>
                        <td class="meta-item" style="width: 25%; vertical-align: top;">
                          <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.3px;">Payment</div>
                          <div style="font-size: 12px; font-weight: 700; color: #059669; margin-top: 2px;">${order.paymentMethod}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Dispatch Slot & Location Box -->
                <tr>
                  <td class="responsive-card" style="padding: 20px 24px; border-bottom: 1px solid #f1f5f9;">
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 16px;">
                      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #ea580c; letter-spacing: 0.3px;">
                        ⏰ Scheduled Preparation Slot
                      </div>
                      <div style="font-size: 15px; font-weight: 800; color: #0f172a; margin-top: 3px;">
                        📅 ${order.requestedDate} &bull; ${order.requestedTimeSlot}
                      </div>
                      
                      <div style="margin-top: 10px; padding-top: 10px; border-top: 1px dashed #cbd5e1;">
                        <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b;">
                          ${order.orderType === 'Delivery' ? '📍 Deliver To:' : '🏪 Pickup Location:'}
                        </div>
                        <div style="font-size: 13px; color: #1e293b; font-weight: 700; margin-top: 2px;">
                          ${order.customer.name} &bull; <span style="font-weight: 500; color: #475569;">${order.customer.phone}</span>
                        </div>
                        <div style="font-size: 12px; color: #475569; margin-top: 3px; line-height: 1.4; word-break: break-word;">
                          ${order.orderType === 'Delivery' ? `${order.deliveryAddress?.address}, ${order.deliveryAddress?.city} ${order.deliveryAddress?.postalCode ? `- ${order.deliveryAddress.postalCode}` : ''}` : kitchenAddress}
                          ${order.deliveryAddress?.landmark ? `<span style="color: #64748b;">(Landmark: ${order.deliveryAddress.landmark})</span>` : ''}
                        </div>
                      </div>
                    </div>

                    ${
                      order.specialInstructions
                        ? `
                    <div style="margin-top: 12px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 10px 12px; font-size: 12px; color: #92400e; line-height: 1.4; word-break: break-word;">
                      <strong>Special Note:</strong> ${order.specialInstructions}
                    </div>`
                        : ''
                    }
                  </td>
                </tr>

                <!-- Receipt Items Table (Clean 320px Responsive Layout) -->
                <tr>
                  <td class="responsive-card" style="padding: 20px 24px 14px 24px;">
                    <div style="font-size: 13px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px;">
                      Itemized Bill
                    </div>
                    
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width: 100% !important; border-collapse: collapse;">
                      <thead>
                        <tr style="border-bottom: 1px solid #cbd5e1;">
                          <th style="padding-bottom: 8px; text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b;">Item</th>
                          <th class="hide-mobile" style="padding-bottom: 8px; text-align: right; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b;">Rate</th>
                          <th style="padding-bottom: 8px; text-align: center; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; width: 44px;">Qty</th>
                          <th style="padding-bottom: 8px; text-align: right; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b;">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${itemsHtml}
                      </tbody>
                    </table>

                    <!-- Pricing Calculation -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 12px; width: 100% !important;">
                      <tr>
                        <td style="padding: 3px 0; font-size: 13px; color: #64748b;">Subtotal</td>
                        <td style="padding: 3px 0; text-align: right; font-size: 13px; font-weight: 600; color: #0f172a;">${currency}${order.subtotal}</td>
                      </tr>
                      <tr>
                        <td style="padding: 3px 0; font-size: 13px; color: #64748b;">Delivery Fee</td>
                        <td style="padding: 3px 0; text-align: right; font-size: 13px; font-weight: 600; color: #059669;">
                          ${order.deliveryFee === 0 ? 'FREE' : `${currency}${order.deliveryFee}`}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0 3px 0; border-top: 2px solid #0f172a; font-size: 15px; font-weight: 800; color: #0f172a;">
                          Total Amount
                        </td>
                        <td style="padding: 10px 0 3px 0; border-top: 2px solid #0f172a; text-align: right; font-size: 19px; font-weight: 900; color: #ea580c; font-family: monospace;">
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

                <!-- Quality & Purity Bento Grid (Stacks cleanly on 320px) -->
                <tr>
                  <td class="responsive-card" style="padding: 6px 24px 20px 24px;">
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 14px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width: 100% !important;">
                        <tr>
                          <td class="bento-cell" style="width: 33.33%; text-align: center; padding: 0 4px; vertical-align: middle;">
                            <div style="font-size: 16px;">🥜</div>
                            <div style="font-size: 11px; font-weight: 700; color: #0f172a; margin-top: 2px;">Filtered Groundnut Oil</div>
                            <div style="font-size: 10px; color: #64748b;">Zero palm oil</div>
                          </td>
                          <td class="bento-cell" style="width: 33.33%; text-align: center; padding: 0 4px; vertical-align: middle; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0;">
                            <div style="font-size: 16px;">🧈</div>
                            <div style="font-size: 11px; font-weight: 700; color: #0f172a; margin-top: 2px;">Shuddh Cow Ghee</div>
                            <div style="font-size: 10px; color: #64748b;">Artisanal sweets</div>
                          </td>
                          <td class="bento-cell" style="width: 33.33%; text-align: center; padding: 0 4px; vertical-align: middle;">
                            <div style="font-size: 16px;">🌿</div>
                            <div style="font-size: 11px; font-weight: 700; color: #0f172a; margin-top: 2px;">100% Pure Veg</div>
                            <div style="font-size: 10px; color: #64748b;">Clean Jain kitchen</div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>

                <!-- Support & Assistance Buttons (Full width on 320px) -->
                <tr>
                  <td class="responsive-card" style="padding: 18px 24px; background: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center;">
                    <div style="font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 10px;">
                      Questions or need delivery timing changes?
                    </div>
                    <div>
                      <a href="https://wa.me/${whatsapp}?text=Hello%20${encodeURIComponent(businessName)}%2C%20regarding%20my%20order%20%23${order.orderNumber}" class="mobile-full-btn" style="display: inline-block; background: #25D366; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 8px; font-size: 13px; font-weight: 700; margin: 3px; box-shadow: 0 2px 4px rgba(37, 211, 102, 0.2);">
                        💬 Chat on WhatsApp
                      </a>
                      <a href="tel:${phone}" class="mobile-full-btn" style="display: inline-block; background: #ffffff; border: 1px solid #cbd5e1; color: #0f172a; text-decoration: none; padding: 10px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; margin: 3px;">
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
            <td style="padding: 20px 12px; text-align: center; font-size: 11px; color: #94a3b8; line-height: 1.4;">
              <div style="font-weight: 600; color: #64748b;">${businessName}</div>
              <div style="margin-top: 2px;">${kitchenAddress} &bull; ${phone}</div>
              <div style="margin-top: 5px; font-size: 10px; color: #cbd5e1;">
                Digital Order Receipt #${order.orderNumber}
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
 * 2. Executive Business / Kitchen Staff Order Alert (Responsive to 320px)
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
        <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; vertical-align: middle;">
          <div style="font-weight: 700; color: #0f172a; font-size: 13px; line-height: 1.35; word-break: break-word;">
            <span style="display: inline-block; width: 16px; height: 16px; border: 1.5px solid #cbd5e1; border-radius: 4px; vertical-align: middle; margin-right: 6px;"></span>
            ${idx + 1}. ${item.name}
          </div>
          <div style="font-size: 11px; color: #ea580c; font-weight: 600; margin-left: 22px; margin-top: 2px;">
            Pack Size: ${item.unit}
          </div>
        </td>
        <td style="padding: 10px 4px; border-bottom: 1px solid #f1f5f9; text-align: center; vertical-align: middle; width: 44px;">
          <span style="background: #0f172a; color: #ffffff; padding: 2px 8px; border-radius: 6px; font-size: 12px; font-weight: 800; white-space: nowrap;">
            x${item.quantity}
          </span>
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; text-align: right; vertical-align: middle; font-weight: 700; color: #0f172a; font-size: 13px; white-space: nowrap;">
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <title>New Order #${order.orderNumber} - Kitchen Dispatch</title>
  <style type="text/css">
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; }
    @media only screen and (max-width: 480px) {
      .outer-body-td { padding: 10px 4px !important; }
      .responsive-card { padding: 16px 12px !important; }
      .mobile-full-btn { display: block !important; width: 100% !important; box-sizing: border-box !important; margin: 6px 0 !important; text-align: center !important; }
    }
  </style>
</head>
<body style="background-color: #f8fafc; margin: 0; padding: 24px 8px;">

  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width: 100% !important;">
    <tr>
      <td align="center" class="outer-body-td" style="padding: 24px 8px;">
        
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; margin: 0 auto; background: #ffffff; border-radius: 14px; border: 1px solid #e2e8f0; box-shadow: 0 4px 18px -2px rgba(15, 23, 42, 0.05); overflow: hidden;">
          
          <!-- Alert Header Banner -->
          <tr>
            <td style="background: #0f172a; padding: 20px 24px; color: #ffffff;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="background: #ea580c; color: #ffffff; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; padding: 3px 8px; border-radius: 9999px;">
                      🔔 KITCHEN DISPATCH
                    </span>
                    <h1 style="margin: 6px 0 2px 0; font-size: 19px; font-weight: 800; color: #ffffff; letter-spacing: -0.3px;">
                      Order #${order.orderNumber}
                    </h1>
                    <div style="font-size: 12px; color: #94a3b8;">
                      ${order.orderType === 'Delivery' ? '🚚 Delivery' : '🏪 Pickup'} &bull; ${order.paymentMethod}
                    </div>
                  </td>
                  <td style="text-align: right; vertical-align: middle;">
                    <div style="font-size: 10px; text-transform: uppercase; color: #94a3b8; font-weight: 600;">To Collect</div>
                    <div style="font-size: 20px; font-weight: 900; color: #f59e0b; font-family: monospace;">
                      ${currency}${order.grandTotal}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Scheduled Prep Time Highlight -->
          <tr>
            <td style="padding: 16px 24px; background: #fff7ed; border-bottom: 1px solid #ffedd5;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="width: 24px; vertical-align: top; font-size: 18px;">⏰</td>
                  <td style="padding-left: 8px;">
                    <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #c2410c; letter-spacing: 0.5px;">Scheduled Kitchen Slot</div>
                    <div style="font-size: 16px; font-weight: 800; color: #7c2d12; margin-top: 2px;">
                      📅 ${order.requestedDate} &bull; ${order.requestedTimeSlot}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Quick Action Buttons for Kitchen Staff (Stacks on 320px) -->
          <tr>
            <td class="responsive-card" style="padding: 14px 24px; border-bottom: 1px solid #f1f5f9; background: #fafafa;">
              <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 6px;">Customer Instant Actions:</div>
              <div>
                <a href="tel:${phone}" class="mobile-full-btn" style="display: inline-block; background: #0f172a; color: #ffffff; text-decoration: none; padding: 10px 16px; border-radius: 8px; font-size: 12px; font-weight: 700; margin: 2px;">
                  📞 Call Customer (${phone})
                </a>
                <a href="https://wa.me/${cleanPhone}?text=Namaste%20${encodeURIComponent(order.customer.name)}%2C%20from%20${encodeURIComponent(businessName)}%20regarding%20your%20order%20%23${order.orderNumber}" class="mobile-full-btn" style="display: inline-block; background: #25D366; color: #ffffff; text-decoration: none; padding: 10px 16px; border-radius: 8px; font-size: 12px; font-weight: 700; margin: 2px;">
                  💬 WhatsApp Customer
                </a>
              </div>
            </td>
          </tr>

          <!-- Customer Info & Delivery Details -->
          <tr>
            <td class="responsive-card" style="padding: 20px 24px; border-bottom: 1px solid #f1f5f9;">
              <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Customer Info</div>
              <div style="font-size: 15px; font-weight: 700; color: #0f172a; margin-top: 2px;">${order.customer.name}</div>
              <div style="font-size: 12px; color: #475569; margin-top: 2px;">
                📞 <a href="tel:${phone}" style="color: #ea580c; text-decoration: none; font-weight: 600;">${order.customer.phone}</a> &bull; ✉️ ${order.customer.email}
              </div>

              ${
                order.orderType === 'Delivery'
                  ? `
              <div style="margin-top: 10px; padding: 10px 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
                <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #0284c7;">📍 Delivery Destination:</div>
                <div style="font-size: 12px; color: #1e293b; font-weight: 600; margin-top: 2px; word-break: break-word;">
                  ${order.deliveryAddress?.address || ''}, ${order.deliveryAddress?.city || ''} ${order.deliveryAddress?.postalCode ? `- ${order.deliveryAddress.postalCode}` : ''}
                </div>
                ${order.deliveryAddress?.landmark ? `<div style="font-size: 11px; color: #64748b; margin-top: 2px;">Landmark: ${order.deliveryAddress.landmark}</div>` : ''}
              </div>`
                  : `<div style="margin-top: 8px; font-size: 12px; color: #ea580c; font-weight: 600;">🏪 Customer will self-pickup from store.</div>`
              }

              ${
                order.specialInstructions
                  ? `
              <div style="margin-top: 10px; padding: 10px 12px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; font-size: 12px; color: #92400e; word-break: break-word;">
                <strong>⚠️ Note:</strong> ${order.specialInstructions}
              </div>`
                  : ''
              }
            </td>
          </tr>

          <!-- Packing Checklist -->
          <tr>
            <td class="responsive-card" style="padding: 20px 24px;">
              <div style="font-size: 13px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">
                Kitchen Packing Checklist (${order.items.length} items)
              </div>

              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width: 100% !important; border-collapse: collapse;">
                <thead>
                  <tr style="border-bottom: 1px solid #cbd5e1;">
                    <th style="padding-bottom: 6px; text-align: left; font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b;">Item Description</th>
                    <th style="padding-bottom: 6px; text-align: center; font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b; width: 44px;">Qty</th>
                    <th style="padding-bottom: 6px; text-align: right; font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsRows}
                </tbody>
              </table>

              <div style="margin-top: 14px; padding: 12px 14px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width: 100% !important;">
                  <tr>
                    <td style="font-size: 12px; color: #64748b;">Subtotal:</td>
                    <td style="text-align: right; font-weight: 600; color: #0f172a; font-size: 12px;">${currency}${order.subtotal}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 12px; color: #64748b; padding-top: 2px;">Delivery:</td>
                    <td style="text-align: right; font-weight: 600; color: #0f172a; font-size: 12px; padding-top: 2px;">${currency}${order.deliveryFee}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 14px; font-weight: 800; color: #0f172a; padding-top: 6px; border-top: 1px solid #cbd5e1;">Grand Total:</td>
                    <td style="text-align: right; font-size: 17px; font-weight: 900; color: #ea580c; padding-top: 6px; border-top: 1px solid #cbd5e1; font-family: monospace;">${currency}${order.grandTotal}</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 14px 20px; background: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; font-size: 11px; color: #94a3b8;">
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
