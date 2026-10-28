import { Order } from '../models/Order.js';
import { BusinessSettings } from '../models/BusinessSettings.js';
import { calculateOrderTotals } from '../utils/calculateOrderTotals.js';
import { generateOrderNumber } from '../utils/generateOrderNumber.js';
import { sendOrderEmails } from '../services/emailService.js';

// Validation helpers
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
const isValidPhone = (phone) => {
  const clean = String(phone).replace(/\D/g, '');
  return clean.length >= 10 && clean.length <= 13;
};

export const createOrder = async (req, res, next) => {
  try {
    const {
      customer,
      items,
      orderType,
      deliveryAddress,
      requestedDate,
      requestedTimeSlot,
      paymentMethod = 'Cash on Delivery',
      specialInstructions = '',
    } = req.body;

    // 1. Basic validation
    if (!customer || !customer.name || !customer.phone || !customer.email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide complete customer details (full name, phone, and email).',
      });
    }

    if (!isValidEmail(customer.email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.',
      });
    }

    if (!isValidPhone(customer.phone)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid 10-digit mobile number.',
      });
    }

    if (!orderType || !['Delivery', 'Pickup'].includes(orderType)) {
      return res.status(400).json({
        success: false,
        message: 'Please select a valid order type (Delivery or Pickup).',
      });
    }

    if (orderType === 'Delivery') {
      if (!deliveryAddress || !deliveryAddress.address || !deliveryAddress.city) {
        return res.status(400).json({
          success: false,
          message: 'Delivery address and city are required for home delivery.',
        });
      }
    }

    if (!requestedDate) {
      return res.status(400).json({
        success: false,
        message: 'Please select your preferred delivery or pickup date.',
      });
    }

    // Check if requested date is in the past
    const today = new Date().toISOString().split('T')[0];
    if (requestedDate < today) {
      return res.status(400).json({
        success: false,
        message: 'Requested date cannot be in the past.',
      });
    }

    if (!requestedTimeSlot) {
      return res.status(400).json({
        success: false,
        message: 'Please select your preferred time slot.',
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Your cart is empty. Please add items before placing an order.',
      });
    }

    // 2. Fetch business settings
    const settings = (await BusinessSettings.findOne()) || {};
    if (settings.isStoreOpen === false) {
      return res.status(400).json({
        success: false,
        message: settings.closureNotice || 'Our store is temporarily not taking online orders. Please call us directly.',
      });
    }

    // 3. Server-side totals calculation and product price verification
    const { verifiedItems, subtotal, deliveryFee, discount, grandTotal } = await calculateOrderTotals(
      items,
      orderType,
      settings
    );

    // 4. Generate order reference number
    const orderNumber = generateOrderNumber();

    // 5. Save order in MongoDB
    const newOrder = await Order.create({
      orderNumber,
      customer: {
        name: customer.name.trim(),
        phone: customer.phone.trim(),
        email: customer.email.trim().toLowerCase(),
      },
      items: verifiedItems,
      subtotal,
      deliveryFee,
      discount,
      grandTotal,
      orderType,
      deliveryAddress:
        orderType === 'Delivery'
          ? {
              address: deliveryAddress.address.trim(),
              city: deliveryAddress.city.trim(),
              postalCode: (deliveryAddress.postalCode || '').trim(),
              landmark: (deliveryAddress.landmark || '').trim(),
            }
          : undefined,
      requestedDate,
      requestedTimeSlot,
      paymentMethod: orderType === 'Pickup' && paymentMethod === 'Cash on Delivery' ? 'Cash on Pickup' : paymentMethod,
      specialInstructions: (specialInstructions || '').trim(),
      orderStatus: 'New',
    });

    // 6. Asynchronously trigger emails (order already safely saved)
    sendOrderEmails(newOrder)
      .then(async (emailRes) => {
        await Order.findByIdAndUpdate(newOrder._id, {
          emailNotificationStatus: {
            businessEmailSent: emailRes.businessEmailSent,
            customerEmailSent: emailRes.customerEmailSent,
            error: emailRes.error,
          },
        });
      })
      .catch((emailErr) => {
        console.error(`[Order Email Error] Order #${orderNumber}:`, emailErr.message);
      });

    // 7. Return success response
    res.status(201).json({
      success: true,
      message: 'Order placed successfully! Complete order details have been recorded.',
      order: newOrder,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const { search, status, date, page = 1, limit = 20 } = req.query;

    const query = {};

    if (status && status !== 'all') {
      query.orderStatus = status;
    }

    if (date) {
      query.requestedDate = date;
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { orderNumber: searchRegex },
        { 'customer.name': searchRegex },
        { 'customer.phone': searchRegex },
        { 'customer.email': searchRegex },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Order.countDocuments(query);

    const orders = await Order.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));

    res.json({
      success: true,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let order;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(id);
    } else {
      order = await Order.findOne({ orderNumber: id });
    }

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.',
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { orderStatus, internalNotes, paymentStatus } = req.body;

    const allowedStatuses = [
      'New',
      'Accepted',
      'Preparing',
      'Ready for Pickup',
      'Out for Delivery',
      'Completed',
      'Cancelled',
    ];

    const updates = {};

    if (orderStatus) {
      if (!allowedStatuses.includes(orderStatus)) {
        return res.status(400).json({
          success: false,
          message: `Invalid order status. Allowed: ${allowedStatuses.join(', ')}`,
        });
      }
      updates.orderStatus = orderStatus;
    }

    if (internalNotes !== undefined) {
      updates.internalNotes = internalNotes;
    }

    if (paymentStatus && ['Pending', 'Paid'].includes(paymentStatus)) {
      updates.paymentStatus = paymentStatus;
    }

    const order = await Order.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.',
      });
    }

    res.json({
      success: true,
      message: `Order status updated to "${order.orderStatus}".`,
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderStats = async (req, res, next) => {
  try {
    const [
      totalOrders,
      newOrders,
      acceptedOrders,
      preparingOrders,
      readyOrders,
      outForDeliveryOrders,
      completedOrders,
      cancelledOrders,
      revenueResult,
    ] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ orderStatus: 'New' }),
      Order.countDocuments({ orderStatus: 'Accepted' }),
      Order.countDocuments({ orderStatus: 'Preparing' }),
      Order.countDocuments({ orderStatus: 'Ready for Pickup' }),
      Order.countDocuments({ orderStatus: 'Out for Delivery' }),
      Order.countDocuments({ orderStatus: 'Completed' }),
      Order.countDocuments({ orderStatus: 'Cancelled' }),
      Order.aggregate([
        { $match: { orderStatus: { $ne: 'Cancelled' } } },
        { $group: { _id: null, totalRevenue: { $sum: '$grandTotal' } } },
      ]),
    ]);

    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    // Recent orders
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      stats: {
        totalOrders,
        newOrders,
        acceptedOrders,
        preparingOrders,
        readyOrders,
        outForDeliveryOrders,
        completedOrders,
        cancelledOrders,
        totalRevenue,
      },
      recentOrders,
    });
  } catch (error) {
    next(error);
  }
};
