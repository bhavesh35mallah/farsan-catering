import mongoose from 'mongoose';

const cateringEnquirySchema = new mongoose.Schema(
  {
    customer: {
      name: {
        type: String,
        required: [true, 'Contact name is required'],
        trim: true,
      },
      phone: {
        type: String,
        required: [true, 'Mobile number is required'],
        trim: true,
      },
      email: {
        type: String,
        required: [true, 'Email address is required'],
        lowercase: true,
        trim: true,
      },
    },
    eventType: {
      type: String,
      required: [true, 'Event type is required'],
      trim: true,
    },
    eventDate: {
      type: String,
      required: [true, 'Event date is required'],
    },
    guestCount: {
      type: Number,
      required: [true, 'Number of guests is required'],
      min: [5, 'Minimum guest count for catering is 5'],
    },
    eventLocation: {
      type: String,
      required: [true, 'Event location/venue is required'],
      trim: true,
    },
    requiredItems: {
      type: String,
      required: [true, 'Preferred items or menu requirements are required'],
      trim: true,
    },
    estimatedBudget: {
      type: String,
      trim: true,
      default: '',
    },
    additionalRequirements: {
      type: String,
      trim: true,
      default: '',
    },
    enquiryStatus: {
      type: String,
      enum: ['New', 'Contacted', 'Quotation Sent', 'Confirmed', 'Declined'],
      default: 'New',
    },
    internalNotes: {
      type: String,
      trim: true,
      default: '',
    },
    emailNotificationSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const CateringEnquiry = mongoose.model('CateringEnquiry', cateringEnquirySchema);
