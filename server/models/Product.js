import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    unit: {
      type: String,
      required: [true, 'Unit is required (e.g. 250 g, 500 g, 1 kg, piece, box)'],
      default: '500 g',
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    image: {
      type: String,
      default: '',
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isVeg: {
      type: Boolean,
      default: true,
    },
    requiresAdvanceOrder: {
      type: Boolean,
      default: false,
    },
    preparationTime: {
      type: String,
      default: 'Available for same-day delivery / pickup',
      trim: true,
    },
    minOrderQty: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  { timestamps: true }
);

// Virtual for populating category details
productSchema.set('toObject', { virtuals: true });
productSchema.set('toJSON', { virtuals: true });

export const Product = mongoose.model('Product', productSchema);
