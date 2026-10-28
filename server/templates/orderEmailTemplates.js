export const businessOrderNotificationHtml = (order, settings) => {
  const businessName = settings?.businessName || 'Shreeji Homemade Farsan & Catering';
  const currency = settings?.currencySymbol || '₹';

  const itemsRows = order.items
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #f1e7d0;">
        <td style="padding: 10px 8px; font-weight: 500; color: #2c2523;">${item.name} <span style="color:#7c7267; font-size: 12px;">(${item.unit})</span></td>
        <td style="padding: 10px 8px; text-align: center; color: #2c2523;">${item.quantity}</td>
        <td style="padding: 10px 8px; text-align: right; color: #2c2523;">${currency}${item.price}</td>
        <td style="padding: 10px 8px; text-align: right; font-weight: 600; color: #c44d18;">${currency}${item.lineTotal}</td>
      </tr>`
    )
    .join('');

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>New Order #${order.orderNumber}</title>
  </head>
  <body style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #faf7f2; margin: 0; padding: 20px; color: #2d2424;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border: 1px solid #fae8c8;">
      <!-- Header -->
      <tr style="background: linear-gradient(135deg, #c44d18 0%, #9e390c 100%);">
        <td style="padding: 24px 28px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 0.5px;">🔔 New Customer Order Received</h1>
          <p style="color: #ffd8c0; margin: 6px 0 0; font-size: 14px;">${businessName} &bull; Order #${order.orderNumber}</p>
        </td>
      </tr>

      <!-- Body Content -->
      <tr>
        <td style="padding: 28px;">
          <!-- Badge and Basic Details -->
          <table width="100%" style="background-color: #fdfaf3; border-radius: 8px; padding: 16px; margin-bottom: 24px; border: 1px dashed #e8d7b8;">
            <tr>
              <td>
                <span style="display: inline-block; background-color: ${order.orderType === 'Delivery' ? '#18633b' : '#c44d18'}; color: #ffffff; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; text-transform: uppercase;">
                  ${order.orderType}
                </span>
                <span style="color: #7c7267; font-size: 13px; margin-left: 10px;">Placed on: ${new Date(order.createdAt || Date.now()).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</span>
              </td>
            </tr>
            <tr>
              <td style="padding-top: 10px;">
                <p style="margin: 4px 0; font-size: 14px;"><strong>📅 Requested Date:</strong> <span style="color: #c44d18; font-weight: 600;">${order.requestedDate}</span></p>
                <p style="margin: 4px 0; font-size: 14px;"><strong>⏰ Preferred Time Slot:</strong> <span style="color: #18633b; font-weight: 600;">${order.requestedTimeSlot}</span></p>
                <p style="margin: 4px 0; font-size: 14px;"><strong>💳 Payment Mode:</strong> ${order.paymentMethod} (${order.paymentStatus})</p>
              </td>
            </tr>
          </table>

          <!-- Customer Info -->
          <h3 style="margin: 0 0 10px; font-size: 16px; color: #18633b; border-bottom: 2px solid #ebf4ee; padding-bottom: 6px;">Customer Details</h3>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Name:</strong> ${order.customer.name}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Phone:</strong> <a href="tel:${order.customer.phone}" style="color: #c44d18; text-decoration: none; font-weight: 600;">${order.customer.phone}</a></p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${order.customer.email}" style="color: #18633b;">${order.customer.email}</a></p>
          ${
            order.orderType === 'Delivery'
              ? `
          <p style="margin: 4px 0; font-size: 14px;"><strong>Delivery Address:</strong> ${order.deliveryAddress.address}, ${order.deliveryAddress.city} - ${order.deliveryAddress.postalCode} ${order.deliveryAddress.landmark ? `(Landmark: ${order.deliveryAddress.landmark})` : ''}</p>
          `
              : `<p style="margin: 4px 0; font-size: 14px; color: #7c7267;"><em>Customer will pick up from kitchen location.</em></p>`
          }

          ${
            order.specialInstructions
              ? `<div style="margin-top: 12px; background: #fff8e8; border-left: 4px solid #e2901a; padding: 10px 14px; border-radius: 4px;">
                  <strong style="color: #925807; font-size: 13px;">Special Instructions:</strong>
                  <p style="margin: 4px 0 0; font-size: 14px; color: #5a3d07;">${order.specialInstructions}</p>
                </div>`
              : ''
          }

          <!-- Order Items Table -->
          <h3 style="margin: 24px 0 10px; font-size: 16px; color: #18633b; border-bottom: 2px solid #ebf4ee; padding-bottom: 6px;">Ordered Items</h3>
          <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse; font-size: 14px;">
            <thead>
              <tr style="background: #faf4e8; border-bottom: 2px solid #e7d5b5;">
                <th style="padding: 10px 8px; text-align: left; color: #62503a; font-size: 13px;">Item</th>
                <th style="padding: 10px 8px; text-align: center; color: #62503a; font-size: 13px;">Qty</th>
                <th style="padding: 10px 8px; text-align: right; color: #62503a; font-size: 13px;">Rate</th>
                <th style="padding: 10px 8px; text-align: right; color: #62503a; font-size: 13px;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${itemsRows}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" style="padding: 10px 8px; text-align: right; color: #7c7267;">Subtotal:</td>
                <td style="padding: 10px 8px; text-align: right; font-weight: 600;">${currency}${order.subtotal}</td>
              </tr>
              <tr>
                <td colspan="3" style="padding: 6px 8px; text-align: right; color: #7c7267;">Delivery Charges:</td>
                <td style="padding: 6px 8px; text-align: right; font-weight: 600;">${order.deliveryFee === 0 ? 'FREE' : `${currency}${order.deliveryFee}`}</td>
              </tr>
              ${
                order.discount > 0
                  ? `<tr>
                      <td colspan="3" style="padding: 6px 8px; text-align: right; color: #18633b;">Discount:</td>
                      <td style="padding: 6px 8px; text-align: right; font-weight: 600; color: #18633b;">-${currency}${order.discount}</td>
                    </tr>`
                  : ''
              }
              <tr style="border-top: 2px solid #c44d18;">
                <td colspan="3" style="padding: 14px 8px; text-align: right; font-size: 16px; font-weight: 700; color: #c44d18;">Grand Total:</td>
                <td style="padding: 14px 8px; text-align: right; font-size: 18px; font-weight: 800; color: #c44d18;">${currency}${order.grandTotal}</td>
              </tr>
            </tfoot>
          </table>
        </td>
      </tr>

      <!-- Footer -->
      <tr style="background: #f5ede1; border-top: 1px solid #ebd8c0;">
        <td style="padding: 18px 28px; text-align: center; font-size: 13px; color: #7c7267;">
          <p style="margin: 0;">Automated Notification from ${businessName} Online Store</p>
          <p style="margin: 4px 0 0;">Please contact customer directly if you need to confirm preparation timings.</p>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};

export const customerOrderConfirmationHtml = (order, settings) => {
  const businessName = settings?.businessName || 'Shreeji Homemade Farsan & Catering';
  const phone = settings?.contactPhone || '+91 98765 43210';
  const whatsapp = settings?.whatsappPhone || '919876543210';
  const currency = settings?.currencySymbol || '₹';

  const itemsRows = order.items
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #f1e7d0;">
        <td style="padding: 10px 8px; font-weight: 500; color: #2c2523;">${item.name} <span style="color:#7c7267; font-size: 12px;">(${item.unit})</span></td>
        <td style="padding: 10px 8px; text-align: center; color: #2c2523;">${item.quantity}</td>
        <td style="padding: 10px 8px; text-align: right; color: #2c2523;">${currency}${item.price}</td>
        <td style="padding: 10px 8px; text-align: right; font-weight: 600; color: #c44d18;">${currency}${item.lineTotal}</td>
      </tr>`
    )
    .join('');

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Order Confirmation #${order.orderNumber}</title>
  </head>
  <body style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #faf7f2; margin: 0; padding: 20px; color: #2d2424;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border: 1px solid #fae8c8;">
      <!-- Header -->
      <tr style="background: linear-gradient(135deg, #18633b 0%, #11472a 100%);">
        <td style="padding: 26px 28px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Thank You For Your Order!</h1>
          <p style="color: #d1ecd9; margin: 6px 0 0; font-size: 14px;">We are preparing authentic homemade delicacies fresh for you.</p>
        </td>
      </tr>

      <!-- Body Content -->
      <tr>
        <td style="padding: 28px;">
          <p style="font-size: 15px; margin: 0 0 16px;">Namaste <strong>${order.customer.name}</strong>,</p>
          <p style="font-size: 14px; line-height: 1.6; color: #4b413c; margin: 0 0 20px;">
            Your order <strong>#${order.orderNumber}</strong> has been received by our kitchen. Every batch is freshly made using traditional Gujarati recipes, pure oil/ghee, and quality spices.
          </p>

          <!-- Delivery / Pickup Box -->
          <table width="100%" style="background-color: #fdfaf3; border-radius: 8px; padding: 16px; margin-bottom: 24px; border: 1px solid #fae3be;">
            <tr>
              <td>
                <p style="margin: 3px 0; font-size: 14px;"><strong>Order Type:</strong> <span style="color: #18633b; font-weight: 700;">${order.orderType}</span></p>
                <p style="margin: 3px 0; font-size: 14px;"><strong>Scheduled Date:</strong> ${order.requestedDate}</p>
                <p style="margin: 3px 0; font-size: 14px;"><strong>Time Slot:</strong> ${order.requestedTimeSlot}</p>
                ${
                  order.orderType === 'Delivery'
                    ? `<p style="margin: 3px 0; font-size: 14px;"><strong>Delivering To:</strong> ${order.deliveryAddress.address}, ${order.deliveryAddress.city} - ${order.deliveryAddress.postalCode}</p>`
                    : `<p style="margin: 3px 0; font-size: 14px;"><strong>Pickup Address:</strong> ${settings?.address || 'Kitchen address'}, ${settings?.city || ''}</p>`
                }
                <p style="margin: 3px 0; font-size: 14px;"><strong>Payment Mode:</strong> ${order.paymentMethod} (Due upon delivery/pickup)</p>
              </td>
            </tr>
          </table>

          <!-- Items Table -->
          <h3 style="margin: 0 0 12px; font-size: 16px; color: #18633b; border-bottom: 2px solid #ebf4ee; padding-bottom: 6px;">Your Order Summary</h3>
          <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse; font-size: 14px;">
            <thead>
              <tr style="background: #faf4e8; border-bottom: 2px solid #e7d5b5;">
                <th style="padding: 10px 8px; text-align: left; color: #62503a; font-size: 13px;">Item</th>
                <th style="padding: 10px 8px; text-align: center; color: #62503a; font-size: 13px;">Qty</th>
                <th style="padding: 10px 8px; text-align: right; color: #62503a; font-size: 13px;">Rate</th>
                <th style="padding: 10px 8px; text-align: right; color: #62503a; font-size: 13px;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${itemsRows}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" style="padding: 10px 8px; text-align: right; color: #7c7267;">Subtotal:</td>
                <td style="padding: 10px 8px; text-align: right; font-weight: 600;">${currency}${order.subtotal}</td>
              </tr>
              <tr>
                <td colspan="3" style="padding: 6px 8px; text-align: right; color: #7c7267;">Delivery Fee:</td>
                <td style="padding: 6px 8px; text-align: right; font-weight: 600;">${order.deliveryFee === 0 ? 'FREE' : `${currency}${order.deliveryFee}`}</td>
              </tr>
              <tr style="border-top: 2px solid #c44d18;">
                <td colspan="3" style="padding: 12px 8px; text-align: right; font-size: 16px; font-weight: 700; color: #c44d18;">Total Amount to Pay:</td>
                <td style="padding: 12px 8px; text-align: right; font-size: 18px; font-weight: 800; color: #c44d18;">${currency}${order.grandTotal}</td>
              </tr>
            </tfoot>
          </table>

          <!-- Questions Box -->
          <div style="margin-top: 28px; background-color: #f7f9f7; border: 1px solid #dcebde; border-radius: 8px; padding: 16px; text-align: center;">
            <p style="margin: 0 0 8px; font-weight: 600; color: #18633b; font-size: 15px;">Have questions or need modifications?</p>
            <p style="margin: 0; font-size: 14px; color: #49544c;">
              Call us at <a href="tel:${phone}" style="color: #c44d18; font-weight: 600; text-decoration: none;">${phone}</a> or 
              <a href="https://wa.me/${whatsapp}?text=Hi%20${encodeURIComponent(businessName)}%2C%20regarding%20my%20order%20%23${order.orderNumber}" style="color: #25d366; font-weight: 700; text-decoration: none;">WhatsApp Us Here</a>
            </p>
          </div>
        </td>
      </tr>

      <!-- Footer -->
      <tr style="background: #f5ede1; border-top: 1px solid #ebd8c0;">
        <td style="padding: 20px 28px; text-align: center; font-size: 13px; color: #7c7267;">
          <p style="margin: 0; font-weight: 600; color: #3d342f;">${businessName}</p>
          <p style="margin: 4px 0 0;">${settings?.address || ''}, ${settings?.city || ''}</p>
          <p style="margin: 8px 0 0; font-size: 12px; color: #9c9186;">Made fresh with love & traditional care.</p>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};
