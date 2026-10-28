import { Product } from '../models/Product.js';

export const calculateOrderTotals = async (rawItems, orderType, settings) => {
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    throw new Error('Order must contain at least one item.');
  }

  const verifiedItems = [];
  let subtotal = 0;

  for (const item of rawItems) {
    const productId = item.productId || item._id || item.product;
    const quantity = parseInt(item.quantity, 10);

    if (!productId) {
      throw new Error('Invalid item: product ID is missing.');
    }

    if (isNaN(quantity) || quantity <= 0) {
      throw new Error(`Invalid quantity for item ID: ${productId}`);
    }

    const product = await Product.findById(productId);
    if (!product) {
      throw new Error(`Product not found or has been removed.`);
    }

    if (!product.isAvailable) {
      throw new Error(`"${product.name}" is currently marked out of stock.`);
    }

    const lineTotal = product.price * quantity;
    subtotal += lineTotal;

    verifiedItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      quantity,
      lineTotal,
      image: product.image,
    });
  }

  // Minimum order check
  const minOrder = settings?.minimumOrderAmount || 0;
  if (subtotal < minOrder) {
    throw new Error(`Minimum order subtotal must be at least ₹${minOrder}. Current subtotal is ₹${subtotal}.`);
  }

  // Calculate delivery fee
  let deliveryFee = 0;
  if (orderType === 'Delivery') {
    const fee = settings?.deliveryFee ?? 40;
    const freeThreshold = settings?.freeDeliveryThreshold ?? 800;
    deliveryFee = subtotal >= freeThreshold ? 0 : fee;
  }

  const discount = 0; // Architecture can support promotional coupons here
  const grandTotal = subtotal + deliveryFee - discount;

  return {
    verifiedItems,
    subtotal,
    deliveryFee,
    discount,
    grandTotal,
  };
};
