import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'shreeji_farsan_cart_v1';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    if (!product || !product.isAvailable) return;
    const qtyToAdd = Math.max(1, parseInt(quantity, 10) || 1);

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item._id === product._id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qtyToAdd;
        return updated;
      } else {
        return [
          ...prev,
          {
            _id: product._id,
            name: product.name,
            price: product.price,
            unit: product.unit,
            image: product.image,
            category: product.category?.name || product.category,
            quantity: qtyToAdd,
            requiresAdvanceOrder: product.requiresAdvanceOrder,
            preparationTime: product.preparationTime,
          },
        ];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    const qty = parseInt(newQuantity, 10);
    if (isNaN(qty) || qty <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prev) =>
      prev.map((item) => (item._id === productId ? { ...item, quantity: qty } : item))
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item._id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (e) {}
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const openCart = () => setIsDrawerOpen(true);
  const closeCart = () => setIsDrawerOpen(false);
  const toggleCart = () => setIsDrawerOpen((prev) => !prev);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
        isDrawerOpen,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
