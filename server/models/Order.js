import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
    lineTotal: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    customer: {
      name: {
        type: String,
        required: [true, 'Customer name is required'],
        trim: true,
      },
      phone: {
        type: String,
        required: [true, 'Customer mobile number is required'],
        trim: true,
      },
      email: {
        type: String,
        required: [true, 'Customer email is required'],
        lowercase: true,
        trim: true,
      },
    },
    items: [orderItemSchema],
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    deliveryFee: {
      type: Number,
      default: 0,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    grandTotal: {
      type: Number,
      required: true,
      min: 0,
    },
    orderType: {
      type: String,
      enum: ['Delivery', 'Pickup'],
      required: [true, 'Order type (Delivery/Pickup) is required'],
    },
    deliveryAddress: {
      address: { type: String, trim: true, default: '' },
      city: { type: String, trim: true, default: '' },
      postalCode: { type: String, trim: true, default: '' },
      landmark: { type: String, trim: true, default: '' },
    },
    requestedDate: {
      type: String,
      required: [true, 'Preferred date is required'],
    },
    requestedTimeSlot: {
      type: String,
      required: [true, 'Preferred time slot is required'],
    },
    paymentMethod: {
      type: String,
      enum: ['Cash on Delivery', 'Cash on Pickup', 'UPI on Delivery/Pickup'],
      default: 'Cash on Delivery',
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid'],
      default: 'Pending',
    },
    orderStatus: {
      type: String,
      enum: ['New', 'Accepted', 'Preparing', 'Ready for Pickup', 'Out for Delivery', 'Completed', 'Cancelled'],
      default: 'New',
      index: true,
    },
    specialInstructions: {
      type: String,
      trim: true,
      default: '',
    },
    emailNotificationStatus: {
      businessEmailSent: { type: Boolean, default: false },
      customerEmailSent: { type: Boolean, default: false },
      error: { type: String, default: null },
    },
    internalNotes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model('Order', orderSchema);
