/**
 * Industry-Grade Email Templates for Catering & Bulk Enquiries
 * Fully responsive down to 320px mobile screens.
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <title>Catering Enquiry Received - ${businessName}</title>
  <style type="text/css">
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; }
    @media only screen and (max-width: 480px) {
      .outer-body-td { padding: 10px 4px !important; }
      .responsive-card { padding: 18px 12px !important; }
      .mobile-full-btn { display: block !important; width: 100% !important; box-sizing: border-box !important; margin: 6px 0 !important; text-align: center !important; }
    }
  </style>
</head>
<body style="background-color: #f8fafc; margin: 0; padding: 24px 8px;">

  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width: 100% !important;">
    <tr>
      <td align="center" class="outer-body-td" style="padding: 24px 8px;">
        
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; margin: 0 auto;">
          
          <!-- Brand Header -->
          <tr>
            <td style="padding: 0 0 18px 0; text-align: center;">
              <table border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                <tr>
                  <td style="vertical-align: middle; padding-right: 8px;">
                    <div style="width: 36px; height: 36px; background: linear-gradient(135deg, #ea580c, #f97316); border-radius: 9px; text-align: center; line-height: 36px; color: #ffffff; font-size: 18px; font-weight: bold;">
                      श्री
                    </div>
                  </td>
                  <td style="vertical-align: middle; text-align: left;">
                    <div style="font-size: 16px; font-weight: 800; color: #0f172a; line-height: 1.2;">
                      ${businessName}
                    </div>
                    <div style="font-size: 11px; color: #64748b; font-weight: 500;">
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
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width: 100% !important; background: #ffffff; border-radius: 14px; border: 1px solid #e2e8f0; box-shadow: 0 4px 18px -2px rgba(15, 23, 42, 0.05); overflow: hidden;">
                
                <!-- Hero Block -->
                <tr>
                  <td class="responsive-card" style="padding: 26px 24px 18px 24px; text-align: center; border-bottom: 1px solid #f1f5f9;">
                    <div style="display: inline-block; width: 40px; height: 40px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 50%; text-align: center; line-height: 40px; color: #059669; font-size: 20px; font-weight: bold; margin-bottom: 10px;">
                      ✓
                    </div>
                    <h1 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 800; color: #0f172a; letter-spacing: -0.3px;">
                      Catering Enquiry Received!
                    </h1>
                    <p style="margin: 0; font-size: 13px; color: #475569; line-height: 1.45; max-width: 420px; margin: 0 auto;">
                      Namaste <strong>${firstName}</strong>, thank you for considering us for your upcoming <strong>${enquiry.eventType}</strong>. Our catering manager will contact you with a customized menu proposal.
                    </p>
                  </td>
                </tr>

                <!-- Event Details Grid -->
                <tr>
                  <td class="responsive-card" style="padding: 20px 24px; border-bottom: 1px solid #f1f5f9;">
                    <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-bottom: 10px;">
                      Your Event Overview
                    </div>

                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 16px; width: 100% !important;">
                      <tr>
                        <td style="padding-bottom: 8px;">
                          <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; color: #64748b;">Event Type</div>
                          <div style="font-size: 13px; font-weight: 700; color: #ea580c; margin-top: 2px;">${enquiry.eventType}</div>
                        </td>
                        <td style="padding-bottom: 8px;">
                          <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; color: #64748b;">Event Date</div>
                          <div style="font-size: 13px; font-weight: 700; color: #0f172a; margin-top: 2px;">📅 ${enquiry.eventDate}</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top: 6px; border-top: 1px solid #e2e8f0;">
                          <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; color: #64748b;">Guest Count</div>
                          <div style="font-size: 13px; font-weight: 700; color: #0f172a; margin-top: 2px;">👥 ${enquiry.guestCount} Guests</div>
                        </td>
                        <td style="padding-top: 6px; border-top: 1px solid #e2e8f0;">
                          <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; color: #64748b;">Location</div>
                          <div style="font-size: 12px; font-weight: 600; color: #0f172a; margin-top: 2px; word-break: break-word;">📍 ${enquiry.eventLocation}</div>
                        </td>
                      </tr>
                    </table>

                    <div style="margin-top: 14px;">
                      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 4px;">
                        Requested Menu & Delicacies:
                      </div>
                      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px; font-size: 12px; color: #334155; line-height: 1.45; white-space: pre-wrap; word-break: break-word;">${enquiry.requiredItems}</div>
                    </div>

                    ${
                      enquiry.additionalRequirements
                        ? `
                    <div style="margin-top: 10px;">
                      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 4px;">
                        Notes / Instructions:
                      </div>
                      <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 8px 12px; font-size: 12px; color: #92400e; word-break: break-word;">${enquiry.additionalRequirements}</div>
                    </div>`
                        : ''
                    }
                  </td>
                </tr>

                <!-- Action CTA -->
                <tr>
                  <td class="responsive-card" style="padding: 16px 24px; background: #f8fafc; text-align: center;">
                    <div style="font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 8px;">
                      Need immediate assistance or sample tasting?
                    </div>
                    <div>
                      <a href="https://wa.me/${whatsapp}?text=Hello%20${encodeURIComponent(businessName)}%2C%20regarding%20my%20catering%20enquiry%20for%20${encodeURIComponent(enquiry.eventDate)}" class="mobile-full-btn" style="display: inline-block; background: #25D366; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 8px; font-size: 12px; font-weight: 700; margin: 3px;">
                        💬 Chat on WhatsApp
                      </a>
                      <a href="tel:${phone}" class="mobile-full-btn" style="display: inline-block; background: #ffffff; border: 1px solid #cbd5e1; color: #0f172a; text-decoration: none; padding: 10px 16px; border-radius: 8px; font-size: 12px; font-weight: 600; margin: 3px;">
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
            <td style="padding: 20px 12px; text-align: center; font-size: 11px; color: #94a3b8; line-height: 1.4;">
              <div style="font-weight: 600; color: #64748b;">${businessName}</div>
              <div style="margin-top: 2px;">${kitchenAddress} &bull; ${phone}</div>
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <title>New Catering Enquiry: ${enquiry.customer.name}</title>
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
          
          <tr style="background: #0f172a;">
            <td style="padding: 20px 24px; color: #ffffff;">
              <span style="background: #ea580c; color: #ffffff; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; padding: 3px 8px; border-radius: 9999px;">
                🥘 NEW CATERING LEAD
              </span>
              <h1 style="margin: 6px 0 2px 0; font-size: 19px; font-weight: 800; color: #ffffff; letter-spacing: -0.3px;">
                ${enquiry.eventType} (${enquiry.guestCount} Guests)
              </h1>
              <div style="font-size: 12px; color: #94a3b8;">
                📅 ${enquiry.eventDate} &bull; 📍 ${enquiry.eventLocation}
              </div>
            </td>
          </tr>

          <!-- Quick Action Buttons -->
          <tr>
            <td class="responsive-card" style="padding: 14px 24px; background: #fafafa; border-bottom: 1px solid #f1f5f9;">
              <div>
                <a href="tel:${phone}" class="mobile-full-btn" style="display: inline-block; background: #0f172a; color: #ffffff; text-decoration: none; padding: 10px 16px; border-radius: 8px; font-size: 12px; font-weight: 700; margin: 2px;">
                  📞 Call Client (${phone})
                </a>
                <a href="https://wa.me/${cleanPhone}?text=Namaste%20${encodeURIComponent(enquiry.customer.name)}%2C%20from%20${encodeURIComponent(businessName)}%20regarding%20your%20catering%20enquiry" class="mobile-full-btn" style="display: inline-block; background: #25D366; color: #ffffff; text-decoration: none; padding: 10px 16px; border-radius: 8px; font-size: 12px; font-weight: 700; margin: 2px;">
                  💬 WhatsApp Client
                </a>
              </div>
            </td>
          </tr>

          <!-- Client Details -->
          <tr>
            <td class="responsive-card" style="padding: 20px 24px;">
              <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-bottom: 4px;">Client Contact</div>
              <div style="font-size: 15px; font-weight: 700; color: #0f172a;">${enquiry.customer.name}</div>
              <div style="font-size: 12px; color: #475569; margin-top: 2px;">
                📞 <a href="tel:${phone}" style="color: #ea580c; text-decoration: none; font-weight: 600;">${phone}</a> &bull; ✉️ ${enquiry.customer.email}
              </div>

              <div style="margin-top: 14px; padding: 12px 14px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
                <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 4px;">Requested Menu:</div>
                <div style="font-size: 12px; color: #1e293b; line-height: 1.45; white-space: pre-wrap; word-break: break-word;">${enquiry.requiredItems}</div>

                ${
                  enquiry.additionalRequirements
                    ? `
                <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e2e8f0;">
                  <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #92400e;">Notes:</div>
                  <div style="font-size: 12px; color: #78350f; word-break: break-word;">${enquiry.additionalRequirements}</div>
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
