import { CateringEnquiry } from '../models/CateringEnquiry.js';
import { sendCateringEmails } from '../services/emailService.js';

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
const isValidPhone = (phone) => {
  const clean = String(phone).replace(/\D/g, '');
  return clean.length >= 10 && clean.length <= 13;
};

export const createEnquiry = async (req, res, next) => {
  try {
    const {
      customer,
      eventType,
      eventDate,
      guestCount,
      eventLocation,
      requiredItems,
      estimatedBudget,
      additionalRequirements,
    } = req.body;

    if (!customer || !customer.name || !customer.phone || !customer.email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, contact phone, and email address.',
      });
    }

    if (!isValidEmail(customer.email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    if (!isValidPhone(customer.phone)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid 10-digit mobile number.',
      });
    }

    if (!eventType || !eventDate || !guestCount || !eventLocation || !requiredItems) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required event details: event type, date, guest count, location, and preferred menu.',
      });
    }

    if (Number(guestCount) < 5) {
      return res.status(400).json({
        success: false,
        message: 'Minimum guest count for catering enquiries is 5 guests.',
      });
    }

    const enquiry = await CateringEnquiry.create({
      customer: {
        name: customer.name.trim(),
        phone: customer.phone.trim(),
        email: customer.email.trim().toLowerCase(),
      },
      eventType: eventType.trim(),
      eventDate,
      guestCount: Number(guestCount),
      eventLocation: eventLocation.trim(),
      requiredItems: requiredItems.trim(),
      estimatedBudget: estimatedBudget ? estimatedBudget.trim() : '',
      additionalRequirements: additionalRequirements ? additionalRequirements.trim() : '',
      enquiryStatus: 'New',
    });

    // Send emails
    sendCateringEmails(enquiry)
      .then(async (emailRes) => {
        if (emailRes.businessEmailSent) {
          await CateringEnquiry.findByIdAndUpdate(enquiry._id, { emailNotificationSent: true });
        }
      })
      .catch((err) => {
        console.error(`[Catering Email Error]:`, err.message);
      });

    res.status(201).json({
      success: true,
      message: 'Catering enquiry submitted successfully! Our catering coordinator will contact you shortly.',
      enquiry,
    });
  } catch (error) {
    next(error);
  }
};

export const getEnquiries = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;

    const query = {};

    if (status && status !== 'all') {
      query.enquiryStatus = status;
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [
        { 'customer.name': regex },
        { 'customer.phone': regex },
        { 'customer.email': regex },
        { eventType: regex },
        { eventLocation: regex },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await CateringEnquiry.countDocuments(query);

    const enquiries = await CateringEnquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));

    res.json({
      success: true,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      enquiries,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { enquiryStatus, internalNotes } = req.body;

    const allowed = ['New', 'Contacted', 'Quotation Sent', 'Confirmed', 'Declined'];
    const updates = {};

    if (enquiryStatus) {
      if (!allowed.includes(enquiryStatus)) {
        return res.status(400).json({
          success: false,
          message: `Invalid status. Allowed: ${allowed.join(', ')}`,
        });
      }
      updates.enquiryStatus = enquiryStatus;
    }

    if (internalNotes !== undefined) {
      updates.internalNotes = internalNotes;
    }

    const enquiry = await CateringEnquiry.findByIdAndUpdate(id, updates, { new: true });

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.',
      });
    }

    res.json({
      success: true,
      message: 'Enquiry updated successfully.',
      enquiry,
    });
  } catch (error) {
    next(error);
  }
};
