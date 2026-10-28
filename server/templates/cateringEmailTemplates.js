export const businessCateringEnquiryHtml = (enquiry, settings) => {
  const businessName = settings?.businessName || 'Shreeji Homemade Farsan & Catering';

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>New Catering Enquiry</title>
  </head>
  <body style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #faf7f2; margin: 0; padding: 20px; color: #2d2424;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border: 1px solid #fae8c8;">
      <tr style="background: linear-gradient(135deg, #c44d18 0%, #a63f11 100%);">
        <td style="padding: 24px 28px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px;">🥘 New Catering & Bulk Order Enquiry</h1>
          <p style="color: #ffd8c0; margin: 6px 0 0; font-size: 14px;">${businessName}</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 28px;">
          <h3 style="margin: 0 0 14px; font-size: 16px; color: #18633b; border-bottom: 2px solid #ebf4ee; padding-bottom: 6px;">Client Information</h3>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Contact Name:</strong> ${enquiry.customer.name}</p>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Phone:</strong> <a href="tel:${enquiry.customer.phone}" style="color: #c44d18; font-weight: 600;">${enquiry.customer.phone}</a></p>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${enquiry.customer.email}" style="color: #18633b;">${enquiry.customer.email}</a></p>

          <h3 style="margin: 22px 0 14px; font-size: 16px; color: #18633b; border-bottom: 2px solid #ebf4ee; padding-bottom: 6px;">Event Details</h3>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Event Type:</strong> <span style="background: #fdf2e8; color: #c44d18; padding: 2px 8px; border-radius: 4px; font-weight: 600;">${enquiry.eventType}</span></p>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Event Date:</strong> ${enquiry.eventDate}</p>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Expected Guest Count:</strong> ${enquiry.guestCount} guests</p>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Event Location / Venue:</strong> ${enquiry.eventLocation}</p>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Estimated Budget:</strong> ${enquiry.estimatedBudget || 'Not specified'}</p>

          <h3 style="margin: 22px 0 10px; font-size: 16px; color: #18633b; border-bottom: 2px solid #ebf4ee; padding-bottom: 6px;">Requested Menu & Requirements</h3>
          <div style="background: #fcf9f2; border: 1px solid #fae6c6; border-radius: 6px; padding: 14px; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${enquiry.requiredItems}</div>

          ${
            enquiry.additionalRequirements
              ? `
          <h4 style="margin: 16px 0 6px; font-size: 14px; color: #695d52;">Additional Notes / Dietary Requests:</h4>
          <p style="margin: 0; font-size: 14px; color: #4e443c; background: #f8f6f4; padding: 10px; border-radius: 6px;">${enquiry.additionalRequirements}</p>
          `
              : ''
          }
        </td>
      </tr>
      <tr style="background: #f5ede1; border-top: 1px solid #ebd8c0;">
        <td style="padding: 16px 28px; text-align: center; font-size: 13px; color: #7c7267;">
          Received via Website Catering Enquiry Portal &bull; Please call the client to discuss custom menu and quotation.
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};

export const customerCateringConfirmationHtml = (enquiry, settings) => {
  const businessName = settings?.businessName || 'Shreeji Homemade Farsan & Catering';
  const phone = settings?.contactPhone || '+91 98765 43210';

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Catering Enquiry Received - ${businessName}</title>
  </head>
  <body style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #faf7f2; margin: 0; padding: 20px; color: #2d2424;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border: 1px solid #fae8c8;">
      <tr style="background: linear-gradient(135deg, #18633b 0%, #11472a 100%);">
        <td style="padding: 24px 28px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px;">We Have Received Your Catering Enquiry!</h1>
          <p style="color: #d1ecd9; margin: 6px 0 0; font-size: 14px;">${businessName}</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 28px;">
          <p style="font-size: 15px; margin: 0 0 16px;">Namaste <strong>${enquiry.customer.name}</strong>,</p>
          <p style="font-size: 14px; line-height: 1.6; color: #4b413c; margin: 0 0 20px;">
            Thank you for considering us for your upcoming <strong>${enquiry.eventType}</strong> on <strong>${enquiry.eventDate}</strong>. We specialize in authentic Gujarati tastes, pure preparations, and custom packages tailored to your celebration.
          </p>

          <table width="100%" style="background-color: #fdfaf3; border-radius: 8px; padding: 14px; margin-bottom: 20px; border: 1px solid #fae3be; font-size: 14px;">
            <tr>
              <td>
                <p style="margin: 4px 0;"><strong>Estimated Guests:</strong> ${enquiry.guestCount}</p>
                <p style="margin: 4px 0;"><strong>Location:</strong> ${enquiry.eventLocation}</p>
                <p style="margin: 4px 0;"><strong>Status:</strong> Our team is reviewing your requirements</p>
              </td>
            </tr>
          </table>

          <p style="font-size: 14px; color: #4b413c; line-height: 1.6;">
            We will contact you shortly on <strong>${enquiry.customer.phone}</strong> to discuss package options, taste samples, and provide a customized quote.
          </p>

          <p style="font-size: 14px; margin-top: 24px; color: #4b413c;">
            If you need urgent assistance, please feel free to call us directly at <strong>${phone}</strong>.
          </p>
        </td>
      </tr>
      <tr style="background: #f5ede1; border-top: 1px solid #ebd8c0;">
        <td style="padding: 16px 28px; text-align: center; font-size: 13px; color: #7c7267;">
          ${businessName} &bull; Pure Authentic Gujarati Delicacies
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};
