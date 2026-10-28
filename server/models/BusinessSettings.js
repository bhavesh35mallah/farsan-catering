import mongoose from 'mongoose';

const businessSettingsSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      default: 'Shreeji Homemade Farsan & Catering',
      trim: true,
    },
    tagline: {
      type: String,
      default: 'Authentic Gujarati Farsan & Homemade Catering, Made Fresh with Love',
      trim: true,
    },
    contactPhone: {
      type: String,
      default: '+91 98765 43210',
      trim: true,
    },
    whatsappPhone: {
      type: String,
      default: '919876543210',
      trim: true,
    },
    email: {
      type: String,
      default: 'contact@shreejifarsan.com',
      trim: true,
    },
    notificationEmail: {
      type: String,
      default: 'orders@shreejifarsan.com',
      trim: true,
    },
    address: {
      type: String,
      default: 'A-12, Ambica Krupa Society, Near Jain Temple, Subhash Chowk',
      trim: true,
    },
    city: {
      type: String,
      default: 'Ahmedabad, Gujarat 380052',
      trim: true,
    },
    serviceAreas: {
      type: [String],
      default: ['Navrangpura', 'Paldi', 'Satellite', 'Bodakdev', 'Vastrapur', 'Naranpura', 'Ghatlodia', 'Ellisbridge', 'Thaltej', 'Maninagar'],
    },
    businessHours: {
      type: String,
      default: 'Monday - Sunday: 8:00 AM - 9:00 PM',
      trim: true,
    },
    minimumOrderAmount: {
      type: Number,
      default: 200,
      min: 0,
    },
    deliveryFee: {
      type: Number,
      default: 40,
      min: 0,
    },
    freeDeliveryThreshold: {
      type: Number,
      default: 800,
      min: 0,
    },
    advanceBookingHours: {
      type: Number,
      default: 4,
      min: 0,
    },
    orderTimeSlots: {
      type: [String],
      default: [
        '09:00 AM - 11:00 AM (Morning Batch)',
        '11:00 AM - 01:00 PM (Lunch Hours)',
        '03:00 PM - 05:00 PM (Afternoon Tea/Snacks)',
        '05:00 PM - 07:00 PM (Evening Fresh Batch)',
        '07:00 PM - 09:00 PM (Dinner & Night)',
      ],
    },
    isStoreOpen: {
      type: Boolean,
      default: true,
    },
    closureNotice: {
      type: String,
      default: '',
      trim: true,
    },
    currencySymbol: {
      type: String,
      default: '₹',
    },
  },
  { timestamps: true }
);

export const BusinessSettings = mongoose.model('BusinessSettings', businessSettingsSchema);
