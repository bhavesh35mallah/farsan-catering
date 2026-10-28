/**
 * Designer Email Templates for Shreeji Homemade Farsan & Catering
 * Includes a luxury digital culinary receipt for customers and executive dispatch alert for admin.
 */

export const customerOrderConfirmationHtml = (order, settings) => {
  const businessName = settings?.businessName || 'Shreeji Homemade Farsan & Catering';
  const tagline = settings?.tagline || 'Authentic Gujarati Farsan & Homemade Catering, Made Fresh with Love';
  const phone = settings?.contactPhone || '+91 98765 43210';
  const whatsapp = settings?.whatsappPhone || '919876543210';
  const currency = settings?.currencySymbol || '₹';
  const kitchenAddress = `${settings?.address || 'Ahmedabad, Gujarat'}, ${settings?.city || ''}`;
  const orderDate = new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const orderTime = new Date(order.createdAt || Date.now()).toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
  });

  const itemsRows = order.items
    .map(
      (item, idx) => `
      <tr style="border-bottom: 1px solid #f0e6d6;">
        <td style="padding: 14px 12px; vertical-align: middle;">
          <div style="font-weight: 700; color: #1c1917; font-size: 14px; margin-bottom: 2px;">
            ${idx + 1}. ${item.name}
          </div>
          <div style="font-size: 12px; color: #78716c; font-weight: 500;">
            Pack size: <span style="color: #ea580c; font-weight: 600;">${item.unit}</span>
          </div>
        </td>
        <td style="padding: 14px 12px; text-align: center; vertical-align: middle; color: #292524; font-weight: 700; font-size: 14px;">
          <span style="background: #fef3c7; color: #92400e; padding: 3px 9px; border-radius: 9999px; font-size: 12px;">
            x${item.quantity}
          </span>
        </td>
        <td style="padding: 14px 12px; text-align: right; vertical-align: middle; color: #57534e; font-size: 13px;">
          ${currency}${item.price}
        </td>
        <td style="padding: 14px 12px; text-align: right; vertical-align: middle; font-weight: 800; color: #c2410c; font-size: 14px;">
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
    <title>Official Order Receipt #${order.orderNumber}</title>
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f7f3eb; margin: 0; padding: 24px 12px; color: #1c1917; line-height: 1.5;">
    
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 640px; margin: 0 auto;">
      
      <!-- Top Brand Heritage Header -->
      <tr>
        <td style="text-align: center; padding-bottom: 20px;">
          <div style="display: inline-block; width: 48px; height: 48px; background: linear-gradient(135deg, #c2410c, #f59e0b); border-radius: 14px; text-align: center; line-height: 48px; color: #ffffff; font-size: 24px; font-weight: bold; margin-bottom: 8px; box-shadow: 0 4px 12px rgba(194, 65, 12, 0.3);">
            श्री
          </div>
          <h2 style="margin: 0; font-size: 22px; font-weight: 800; color: #1c1917; letter-spacing: -0.3px;">${businessName}</h2>
          <p style="margin: 4px 0 0; font-size: 12px; color: #78716c; font-weight: 500;">${tagline}</p>
        </td>
      </tr>

      <!-- Main Receipt Card -->
      <tr>
        <td>
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08); border: 1px solid #fae8c8;">
            
            <!-- Receipt Header Strip -->
            <tr style="background: linear-gradient(135deg, #15803d 0%, #166534 100%);">
              <td style="padding: 24px 28px; text-align: left; color: #ffffff;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td>
                      <span style="background: rgba(255, 255, 255, 0.2); color: #ffffff; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
                        ✓ Order Confirmed
                      </span>
                      <h1 style="margin: 8px 0 2px; font-size: 24px; font-weight: 800; color: #ffffff;">Thank You for Your Order!</h1>
                      <p style="margin: 0; font-size: 13px; color: #dcfce7;">We're preparing your authentic Gujarati batch fresh with love.</p>
                    </td>
                    <td style="text-align: right; vertical-align: top;">
                      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #bbf7d0;">Receipt #</div>
                      <div style="font-size: 16px; font-weight: 800; color: #ffffff; font-family: monospace; letter-spacing: 0.5px;">${order.orderNumber}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Digital Receipt Meta Details (Perforated ticket style) -->
            <tr>
              <td style="padding: 20px 28px; background: #faf5ec; border-bottom: 2px dashed #e7d8c0;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 13px;">
                  <tr>
                    <td style="width: 50%; padding-bottom: 10px; vertical-align: top;">
                      <span style="color: #78716c; font-size: 11px; text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 2px;">Customer Details:</span>
                      <strong style="color: #1c1917; font-size: 14px;">${order.customer.name}</strong><br>
                      <span style="color: #57534e;">📞 ${order.customer.phone}</span><br>
                      <span style="color: #57534e;">✉️ ${order.customer.email}</span>
                    </td>
                    <td style="width: 50%; padding-bottom: 10px; vertical-align: top; text-align: right;">
                      <span style="color: #78716c; font-size: 11px; text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 2px;">Placed On:</span>
                      <span style="color: #1c1917; font-weight: 600;">${orderDate} at ${orderTime}</span><br>
                      <span style="color: #78716c; font-size: 11px; text-transform: uppercase; font-weight: 700; display: block; margin-top: 6px; margin-bottom: 2px;">Payment Method:</span>
                      <span style="background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 6px; font-weight: 700; font-size: 11px;">
                        ${order.paymentMethod}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding-top: 10px; border-top: 1px solid #efe4cf;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td>
                            <span style="color: #78716c; font-size: 11px; text-transform: uppercase; font-weight: 700; display: block;">Scheduled Dispatch:</span>
                            <span style="font-size: 14px; color: #c2410c; font-weight: 800;">📅 ${order.requestedDate} &bull; ⏰ ${order.requestedTimeSlot}</span>
                          </td>
                          <td style="text-align: right;">
                            <span style="display: inline-block; background: ${order.orderType === 'Delivery' ? '#f0fdf4' : '#fff7ed'}; border: 1px solid ${order.orderType === 'Delivery' ? '#86efac' : '#fdba74'}; color: ${order.orderType === 'Delivery' ? '#166534' : '#c2410c'}; font-size: 12px; font-weight: 800; padding: 4px 12px; border-radius: 9999px;">
                              ${order.orderType === 'Delivery' ? '🚚 Home Delivery' : '🏪 Self Pickup'}
                            </span>
                          </td>
                        </tr>
                        ${
                          order.orderType === 'Delivery'
                            ? `<tr>
                                <td colspan="2" style="padding-top: 8px;">
                                  <span style="color: #78716c; font-size: 11px; text-transform: uppercase; font-weight: 700;">Delivery Address:</span>
                                  <div style="color: #292524; font-size: 13px; margin-top: 2px;">
                                    ${order.deliveryAddress?.address || ''}, ${order.deliveryAddress?.city || ''} ${order.deliveryAddress?.postalCode ? `- ${order.deliveryAddress.postalCode}` : ''}
                                    ${order.deliveryAddress?.landmark ? `<span style="color:#78716c;">(Landmark: ${order.deliveryAddress.landmark})</span>` : ''}
                                  </div>
                                </td>
                              </tr>`
                            : `<tr>
                                <td colspan="2" style="padding-top: 8px;">
                                  <span style="color: #78716c; font-size: 11px; text-transform: uppercase; font-weight: 700;">Kitchen Pickup Point:</span>
                                  <div style="color: #292524; font-size: 13px; margin-top: 2px;">${kitchenAddress}</div>
                                </td>
                              </tr>`
                        }
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Order Items Receipt Table -->
            <tr>
              <td style="padding: 24px 28px 12px;">
                <div style="font-size: 15px; font-weight: 800; color: #1c1917; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
                  <span>Ordered Food Items</span>
                  <span style="font-size: 12px; color: #78716c; font-weight: 500;">(${order.items.length} items)</span>
                </div>
                
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                  <thead>
                    <tr style="background: #faf5ec; border-bottom: 2px solid #e7d8c0;">
                      <th style="padding: 10px 12px; text-align: left; font-size: 12px; text-transform: uppercase; color: #78716c; font-weight: 700;">Item Name</th>
                      <th style="padding: 10px 12px; text-align: center; font-size: 12px; text-transform: uppercase; color: #78716c; font-weight: 700;">Qty</th>
                      <th style="padding: 10px 12px; text-align: right; font-size: 12px; text-transform: uppercase; color: #78716c; font-weight: 700;">Rate</th>
                      <th style="padding: 10px 12px; text-align: right; font-size: 12px; text-transform: uppercase; color: #78716c; font-weight: 700;">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsRows}
                  </tbody>
                </table>
              </td>
            </tr>

            <!-- Special Instructions Note (if provided) -->
            ${
              order.specialInstructions
                ? `<tr>
                    <td style="padding: 0 28px 16px;">
                      <div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 10px 14px; border-radius: 6px; font-size: 12px; color: #92400e;">
                        <strong>Customer Note:</strong> ${order.specialInstructions}
                      </div>
                    </td>
                  </tr>`
                : ''
            }

            <!-- Receipt Pricing Summary Card -->
            <tr>
              <td style="padding: 0 28px 24px;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #faf5ec; border-radius: 14px; padding: 16px 20px; border: 1px solid #ebd8c0;">
                  <tr>
                    <td style="padding: 4px 0; color: #57534e; font-size: 13px;">Items Subtotal:</td>
                    <td style="padding: 4px 0; text-align: right; font-weight: 700; color: #1c1917; font-size: 14px;">${currency}${order.subtotal}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #57534e; font-size: 13px;">Delivery Fee:</td>
                    <td style="padding: 4px 0; text-align: right; font-weight: 700; font-size: 13px;">
                      ${order.deliveryFee === 0 ? '<span style="color:#166534; font-weight:800;">FREE</span>' : `${currency}${order.deliveryFee}`}
                    </td>
                  </tr>
                  <tr style="border-top: 2px solid #e7d8c0;">
                    <td style="padding: 12px 0 0; color: #c2410c; font-size: 16px; font-weight: 800;">Grand Total Amount:</td>
                    <td style="padding: 12px 0 0; text-align: right; font-size: 22px; font-weight: 900; color: #c2410c; font-family: monospace;">
                      ${currency}${order.grandTotal}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding-top: 6px; text-align: right; font-size: 11px; color: #78716c;">
                      Payment Due: <strong>${order.paymentMethod} (${order.paymentStatus})</strong>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Purity & Quality Guarantee Badge -->
            <tr>
              <td style="padding: 0 28px 24px;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 14px 18px;">
                  <tr>
                    <td style="width: 38px; vertical-align: top; font-size: 24px;">🌿</td>
                    <td style="font-size: 12px; color: #166534; line-height: 1.5;">
                      <strong style="font-size: 13px; color: #14532d; display: block; margin-bottom: 2px;">100% Homemade Purity Guarantee</strong>
                      Prepared with 100% pure filtered groundnut oil and authentic cow ghee. Zero chemical food colorings, zero preservatives, cooked in a clean hygienic kitchen.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Contact Kitchen & WhatsApp Support -->
            <tr>
              <td style="padding: 20px 28px; background: #faf5ec; text-align: center; border-top: 1px solid #ebd8c0;">
                <p style="margin: 0 0 10px; font-weight: 700; color: #1c1917; font-size: 14px;">Questions about your order timings or items?</p>
                <div>
                  <a href="https://wa.me/${whatsapp}?text=Hi%20${encodeURIComponent(businessName)}%2C%20regarding%20my%20order%20%23${order.orderNumber}" style="display: inline-block; background: #16a34a; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 10px; font-size: 13px; font-weight: 700; margin: 4px 6px; box-shadow: 0 2px 6px rgba(22, 163, 74, 0.3);">
                    💬 WhatsApp Us (${phone})
                  </a>
                  <a href="tel:${phone}" style="display: inline-block; background: #ffffff; border: 1px solid #d6d3d1; color: #1c1917; text-decoration: none; padding: 10px 18px; border-radius: 10px; font-size: 13px; font-weight: 700; margin: 4px 6px;">
                    📞 Direct Call
                  </a>
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>

      <!-- Footer Info -->
      <tr>
        <td style="text-align: center; padding-top: 20px; font-size: 11px; color: #a8a29e;">
          <p style="margin: 0;">${businessName} &bull; ${kitchenAddress}</p>
          <p style="margin: 4px 0 0;">This email serves as your official digital receipt for order #${order.orderNumber}.</p>
        </td>
      </tr>

    </table>

  </body>
  </html>
  `;
};

export const businessOrderNotificationHtml = (order, settings) => {
  const businessName = settings?.businessName || 'Shreeji Homemade Farsan & Catering';
  const currency = settings?.currencySymbol || '₹';
  const phone = order.customer?.phone || '';
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  const itemsRows = order.items
    .map(
      (item, idx) => `
      <tr style="border-bottom: 1px solid #fed7aa;">
        <td style="padding: 12px 10px; font-weight: 700; color: #1c1917; font-size: 14px;">
          ${idx + 1}. ${item.name} <span style="color: #c2410c; font-size: 12px; font-weight: 600;">(${item.unit})</span>
        </td>
        <td style="padding: 12px 10px; text-align: center; font-weight: 900; color: #1c1917; font-size: 15px;">
          x${item.quantity}
        </td>
        <td style="padding: 12px 10px; text-align: right; color: #57534e; font-size: 13px;">
          ${currency}${item.price}
        </td>
        <td style="padding: 12px 10px; text-align: right; font-weight: 900; color: #c2410c; font-size: 15px;">
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
    <title>🔔 New Order Alert #${order.orderNumber}</title>
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f7f3eb; margin: 0; padding: 20px 10px; color: #1c1917;">
    
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 18px; overflow: hidden; box-shadow: 0 8px 25px rgba(0,0,0,0.08); border: 1px solid #fed7aa;">
      
      <!-- Executive Header -->
      <tr style="background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%);">
        <td style="padding: 24px 26px; text-align: left; color: #ffffff;">
          <span style="background: #fef08a; color: #854d0e; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;">
            🔔 NEW ORDER ALERT
          </span>
          <h1 style="margin: 8px 0 2px; font-size: 24px; font-weight: 900; color: #ffffff;">Order #${order.orderNumber}</h1>
          <p style="margin: 0; font-size: 14px; color: #ffedd5;">Amount to Collect: <strong style="color: #fef08a; font-size: 18px;">${currency}${order.grandTotal}</strong> &bull; ${order.orderType}</p>
        </td>
      </tr>

      <!-- Kitchen Preparation Slot Box -->
      <tr>
        <td style="padding: 20px 26px; background: #fff7ed; border-bottom: 2px solid #fed7aa;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td>
                <div style="font-size: 11px; color: #9a3412; font-weight: 800; text-transform: uppercase;">⏰ Scheduled Delivery / Pickup:</div>
                <div style="font-size: 18px; font-weight: 900; color: #c2410c; margin-top: 2px;">
                  📅 ${order.requestedDate} &bull; ${order.requestedTimeSlot}
                </div>
                <div style="margin-top: 6px; font-size: 13px; color: #431407;">
                  <strong>Order Type:</strong> ${order.orderType} &bull; <strong>Payment:</strong> ${order.paymentMethod}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Quick Action Buttons: Call & WhatsApp -->
      <tr>
        <td style="padding: 16px 26px; background: #ffffff; border-bottom: 1px solid #fed7aa;">
          <div style="font-size: 11px; color: #78716c; font-weight: 700; text-transform: uppercase; margin-bottom: 8px;">Customer Quick Actions:</div>
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td style="width: 50%; padding-right: 6px;">
                <a href="tel:${phone}" style="display: block; text-align: center; background: #ea580c; color: #ffffff; text-decoration: none; padding: 10px 0; border-radius: 10px; font-weight: 800; font-size: 13px;">
                  📞 Call Customer (${phone})
                </a>
              </td>
              <td style="width: 50%; padding-left: 6px;">
                <a href="https://wa.me/${cleanPhone}?text=Namaste%20${encodeURIComponent(order.customer.name)}%2C%20from%20${encodeURIComponent(businessName)}%20regarding%20your%20order%20%23${order.orderNumber}" style="display: block; text-align: center; background: #16a34a; color: #ffffff; text-decoration: none; padding: 10px 0; border-radius: 10px; font-weight: 800; font-size: 13px;">
                  💬 WhatsApp Customer
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Customer Details -->
      <tr>
        <td style="padding: 20px 26px;">
          <h3 style="margin: 0 0 10px; font-size: 15px; font-weight: 800; color: #1c1917;">Customer & Address:</h3>
          <p style="margin: 3px 0; font-size: 14px;"><strong>Name:</strong> ${order.customer.name}</p>
          <p style="margin: 3px 0; font-size: 14px;"><strong>Phone:</strong> ${order.customer.phone}</p>
          <p style="margin: 3px 0; font-size: 14px;"><strong>Email:</strong> ${order.customer.email}</p>
          ${
            order.orderType === 'Delivery'
              ? `<p style="margin: 6px 0 0; font-size: 14px; background: #f5f5f4; padding: 10px 12px; border-radius: 8px; border: 1px solid #e7e5e4;">
                  <strong>📍 Delivery Address:</strong><br>
                  ${order.deliveryAddress?.address || ''}, ${order.deliveryAddress?.city || ''} ${order.deliveryAddress?.postalCode ? `- ${order.deliveryAddress.postalCode}` : ''}
                  ${order.deliveryAddress?.landmark ? `<br><em>Landmark: ${order.deliveryAddress.landmark}</em>` : ''}
                </p>`
              : `<p style="margin: 4px 0; font-size: 13px; color: #78716c;"><em>Self-pickup from your kitchen address.</em></p>`
          }

          ${
            order.specialInstructions
              ? `<div style="margin-top: 12px; background: #fef08a; border-left: 4px solid #ca8a04; padding: 10px 12px; border-radius: 6px; font-size: 13px; color: #713f12;">
                  <strong>Kitchen Instructions:</strong> ${order.specialInstructions}
                </div>`
              : ''
          }

          <!-- Items Table -->
          <h3 style="margin: 22px 0 10px; font-size: 15px; font-weight: 800; color: #1c1917;">Items to Prepare (${order.items.length} items):</h3>
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
            <thead>
              <tr style="background: #ffedd5; border-bottom: 2px solid #fdba74;">
                <th style="padding: 10px; text-align: left; font-size: 12px; color: #9a3412;">Item</th>
                <th style="padding: 10px; text-align: center; font-size: 12px; color: #9a3412;">Qty</th>
                <th style="padding: 10px; text-align: right; font-size: 12px; color: #9a3412;">Rate</th>
                <th style="padding: 10px; text-align: right; font-size: 12px; color: #9a3412;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${itemsRows}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" style="padding: 10px 10px 4px; text-align: right; color: #78716c; font-size: 13px;">Subtotal:</td>
                <td style="padding: 10px 10px 4px; text-align: right; font-weight: 700; color: #1c1917;">${currency}${order.subtotal}</td>
              </tr>
              <tr>
                <td colspan="3" style="padding: 4px 10px; text-align: right; color: #78716c; font-size: 13px;">Delivery Fee:</td>
                <td style="padding: 4px 10px; text-align: right; font-weight: 700; color: #1c1917;">${currency}${order.deliveryFee}</td>
              </tr>
              <tr style="border-top: 2px solid #c2410c;">
                <td colspan="3" style="padding: 10px; text-align: right; font-size: 16px; font-weight: 900; color: #c2410c;">Grand Total:</td>
                <td style="padding: 10px; text-align: right; font-size: 20px; font-weight: 900; color: #c2410c;">${currency}${order.grandTotal}</td>
              </tr>
            </tfoot>
          </table>
        </td>
      </tr>

      <!-- Footer -->
      <tr style="background: #faf5ec; border-top: 1px solid #fed7aa;">
        <td style="padding: 16px; text-align: center; font-size: 12px; color: #78716c;">
          ${businessName} Admin Alert &bull; Prepared freshly for your customers.
        </td>
      </tr>

    </table>

  </body>
  </html>
  `;
};
