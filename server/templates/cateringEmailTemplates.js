/**
 * Industry-Grade Email Templates for Catering & Bulk Enquiries
 * Minimalist, clean, and professional design for both customer and kitchen coordinator.
 */

export const customerCateringConfirmationHtml = (enquiry, settings) => {
  const businessName = settings?.businessName || 'Shreeji Homemade Farsan & Catering';
  const phone = settings?.contactPhone || '+91 98765 43210';
  const whatsapp = settings?.whatsappPhone || '919876543210';
  const kitchenAddress = `${settings?.address || 'Ahmedabad, Gujarat'}, ${settings?.city || ''}`;
  const firstName = enquiry.customer.name.split(' ')[0] || enquiry.customer.name;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Catering Enquiry Received - ${businessName}</title>
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
                      Gujarati Catering & Bulk Orders &bull; Ahmedabad
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
                
                <!-- Hero Block -->
                <tr>
                  <td class="responsive-card" style="padding: 32px 32px 24px 32px; text-align: center; border-bottom: 1px solid #f1f5f9;">
                    <div style="display: inline-block; width: 44px; height: 44px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 50%; text-align: center; line-height: 44px; color: #059669; font-size: 22px; font-weight: bold; margin-bottom: 12px;">
                      ✓
                    </div>
                    <h1 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 800; color: #0f172a; letter-spacing: -0.4px;">
                      Catering Enquiry Received!
                    </h1>
                    <p style="margin: 0; font-size: 14px; color: #475569; line-height: 1.5; max-width: 440px; margin: 0 auto;">
                      Namaste <strong>${firstName}</strong>, thank you for considering us for your upcoming <strong>${enquiry.eventType}</strong>. Our catering manager will contact you with a customized menu proposal.
                    </p>
                  </td>
                </tr>

                <!-- Event Details Grid -->
                <tr>
                  <td class="responsive-card" style="padding: 24px 32px; border-bottom: 1px solid #f1f5f9;">
                    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-bottom: 12px;">
                      Your Event Overview
                    </div>

                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px;">
                      <tr>
                        <td style="padding-bottom: 10px;">
                          <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: #64748b;">Event Type</div>
                          <div style="font-size: 14px; font-weight: 700; color: #ea580c; margin-top: 2px;">${enquiry.eventType}</div>
                        </td>
                        <td style="padding-bottom: 10px;">
                          <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: #64748b;">Event Date</div>
                          <div style="font-size: 14px; font-weight: 700; color: #0f172a; margin-top: 2px;">📅 ${enquiry.eventDate}</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top: 6px; border-top: 1px solid #e2e8f0;">
                          <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: #64748b;">Guest Count</div>
                          <div style="font-size: 14px; font-weight: 700; color: #0f172a; margin-top: 2px;">👥 ${enquiry.guestCount} Guests</div>
                        </td>
                        <td style="padding-top: 6px; border-top: 1px solid #e2e8f0;">
                          <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: #64748b;">Location / Area</div>
                          <div style="font-size: 13px; font-weight: 600; color: #0f172a; margin-top: 2px;">📍 ${enquiry.eventLocation}</div>
                        </td>
                      </tr>
                    </table>

                    <div style="margin-top: 16px;">
                      <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 4px;">
                        Requested Menu & Delicacies:
                      </div>
                      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 14px; font-size: 13px; color: #334155; line-height: 1.5; white-space: pre-wrap;">${enquiry.requiredItems}</div>
                    </div>

                    ${
                      enquiry.additionalRequirements
                        ? `
                    <div style="margin-top: 12px;">
                      <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 4px;">
                        Additional Instructions / Dietary Notes:
                      </div>
                      <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #92400e;">${enquiry.additionalRequirements}</div>
                    </div>`
                        : ''
                    }
                  </td>
                </tr>

                <!-- Action CTA -->
                <tr>
                  <td class="responsive-card" style="padding: 20px 32px; background: #f8fafc; text-align: center;">
                    <div style="font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 10px;">
                      Need immediate assistance or want to discuss sample tasting?
                    </div>
                    <div>
                      <a href="https://wa.me/${whatsapp}?text=Hello%20${encodeURIComponent(businessName)}%2C%20regarding%20my%20catering%20enquiry%20for%20${encodeURIComponent(enquiry.eventDate)}" style="display: inline-block; background: #25D366; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 700; margin: 4px;">
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

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 16px; text-align: center; font-size: 12px; color: #94a3b8; line-height: 1.5;">
              <div style="font-weight: 600; color: #64748b;">${businessName}</div>
              <div style="margin-top: 2px;">${kitchenAddress} &bull; Phone: ${phone}</div>
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

export const businessCateringEnquiryHtml = (enquiry, settings) => {
  const businessName = settings?.businessName || 'Shreeji Homemade Farsan & Catering';
  const phone = enquiry.customer?.phone || '';
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Catering Enquiry: ${enquiry.customer.name}</title>
  <style type="text/css">
    body { margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; }
  </style>
</head>
<body style="background-color: #f8fafc; margin: 0; padding: 32px 12px;">

  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05); overflow: hidden;">
          
          <tr style="background: #0f172a;">
            <td style="padding: 24px 32px; color: #ffffff;">
              <span style="background: #ea580c; color: #ffffff; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; padding: 3px 10px; border-radius: 9999px;">
                🥘 NEW CATERING LEAD
              </span>
              <h1 style="margin: 8px 0 2px 0; font-size: 22px; font-weight: 800; color: #ffffff;">
                ${enquiry.eventType} (${enquiry.guestCount} Guests)
              </h1>
              <div style="font-size: 13px; color: #94a3b8;">
                📅 Event Date: ${enquiry.eventDate} &bull; Location: ${enquiry.eventLocation}
              </div>
            </td>
          </tr>

          <!-- Quick Action Buttons -->
          <tr>
            <td style="padding: 16px 32px; background: #fafafa; border-bottom: 1px solid #f1f5f9;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="width: 50%; padding-right: 6px;">
                    <a href="tel:${phone}" style="display: block; text-align: center; background: #0f172a; color: #ffffff; text-decoration: none; padding: 10px 0; border-radius: 8px; font-size: 13px; font-weight: 700;">
                      📞 Call Client (${phone})
                    </a>
                  </td>
                  <td style="width: 50%; padding-left: 6px;">
                    <a href="https://wa.me/${cleanPhone}?text=Namaste%20${encodeURIComponent(enquiry.customer.name)}%2C%20from%20${encodeURIComponent(businessName)}%20regarding%20your%20catering%20enquiry" style="display: block; text-align: center; background: #25D366; color: #ffffff; text-decoration: none; padding: 10px 0; border-radius: 8px; font-size: 13px; font-weight: 700;">
                      💬 WhatsApp Client
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Client Details -->
          <tr>
            <td style="padding: 24px 32px;">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-bottom: 8px;">Client Contact</div>
              <div style="font-size: 16px; font-weight: 700; color: #0f172a;">${enquiry.customer.name}</div>
              <div style="font-size: 13px; color: #475569; margin-top: 2px;">
                📞 <a href="tel:${phone}" style="color: #ea580c; text-decoration: none; font-weight: 600;">${phone}</a> &bull; ✉️ ${enquiry.customer.email}
              </div>

              <div style="margin-top: 18px; padding: 14px 16px; background: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0;">
                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 4px;">Requested Menu:</div>
                <div style="font-size: 13px; color: #1e293b; line-height: 1.5; white-space: pre-wrap;">${enquiry.requiredItems}</div>

                ${
                  enquiry.additionalRequirements
                    ? `
                <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #e2e8f0;">
                  <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #92400e;">Notes:</div>
                  <div style="font-size: 13px; color: #78350f;">${enquiry.additionalRequirements}</div>
                </div>`
                    : ''
                }
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
