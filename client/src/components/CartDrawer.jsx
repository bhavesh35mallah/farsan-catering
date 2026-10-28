import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';

const CartDrawer = () => {
  const { cart, isDrawerOpen, closeCart, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();
  const { settings } = useSettings();
  const { isGujarati, t, getProductName } = useLanguage();
  const navigate = useNavigate();

  if (!isDrawerOpen) return null;

  const minOrder = settings.minimumOrderAmount || 200;
  const freeThreshold = settings.freeDeliveryThreshold || 800;
  const remainingForFreeDelivery = Math.max(0, freeThreshold - subtotal);
  const isMinOrderMet = subtotal >= minOrder;

  const handleCheckoutClick = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleViewCartClick = () => {
    closeCart();
    navigate('/cart');
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden ${isGujarati ? 'font-gujarati' : ''}`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-full sm:w-[420px] bg-white shadow-2xl flex flex-col h-full">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-cream-200 flex items-center justify-between bg-cream-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-saffron-600" />
              <h2 className="text-lg font-bold text-stone-900">
                {t('cartTitle')}
              </h2>
              <span className="text-xs bg-saffron-100 text-saffron-800 font-bold px-2 py-0.5 rounded-full">
                {totalItems} {isGujarati ? 'આઇટમ' : 'items'}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-cream-200 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free delivery bar */}
          <div className="bg-saffron-50/80 px-4 py-2.5 border-b border-saffron-100 text-xs">
            {remainingForFreeDelivery === 0 ? (
              <p className="text-kothmir-700 font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-kothmir-600" />
                {isGujarati
                  ? 'અભિનંદન! તમને મફત હોમ ડિલિવરી મળે છે!'
                  : 'Congratulations! You unlocked FREE home delivery!'}
              </p>
            ) : (
              <div>
                <p className="text-stone-700">
                  {isGujarati ? (
                    <>
                      હજુ <strong className="text-saffron-700">₹{remainingForFreeDelivery}</strong> ઉમેરો અને{' '}
                      <strong className="text-kothmir-700">મફત ડિલિવરી</strong> મેળવો
                    </>
                  ) : (
                    <>
                      Add <strong className="text-saffron-700">₹{remainingForFreeDelivery}</strong> more to get{' '}
                      <strong className="text-kothmir-700">FREE Delivery</strong>
                    </>
                  )}
                </p>
                <div className="w-full bg-cream-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-saffron-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / freeThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-cream-200">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-cream-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-800">{t('cartEmpty')}</h3>
                  <p className="text-xs text-stone-500 mt-1 font-normal">
                    {t('cartEmptyDesc')}
                  </p>
                </div>
                <button
                  onClick={() => {
                    closeCart();
                    navigate('/menu');
                  }}
                  className="px-5 py-2.5 bg-saffron-600 text-white rounded-lg text-sm font-semibold hover:bg-saffron-700 transition shadow-sm"
                >
                  {isGujarati ? 'મેનુ જુઓ અને પસંદ કરો' : 'Browse Menu & Shop'}
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item._id} className="py-3.5 flex gap-3 first:pt-0 last:pb-0">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&auto=format&fit=crop&q=80'}
                    alt={getProductName(item.name)}
                    className="w-16 h-16 rounded-xl object-cover border border-cream-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-stone-900 truncate">
                        {getProductName(item.name)}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-stone-400 hover:text-red-600 transition p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-xs text-stone-500 mt-0.5">
                      ₹{item.price} / {item.unit}
                    </div>

                    <div className="mt-2.5 flex items-center justify-between">
                      {/* Stepper */}
                      <div className="flex items-center border border-cream-300 bg-cream-50 rounded-md">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="px-2 py-1 text-stone-600 hover:text-saffron-700"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="px-2 py-1 text-stone-600 hover:text-saffron-700"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif font-bold text-sm text-saffron-700">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-cream-200 bg-cream-50/50 space-y-3">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>{t('subtotal')}:</span>
                  <span className="font-semibold text-stone-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-stone-600 text-xs">
                  <span>{t('deliveryFee')}:</span>
                  <span className="font-medium text-kothmir-700">
                    {subtotal >= freeThreshold ? t('freeDelivery') : `₹${settings.deliveryFee || 40}`}
                  </span>
                </div>
              </div>

              {!isMinOrderMet && (
                <div className="flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>
                    {isGujarati
                      ? `ઓછામાં ઓછો ઓર્ડર ₹${minOrder} નો હોવો જરૂરી છે. હજુ ₹${minOrder - subtotal} ઉમેરો.`
                      : `Minimum order amount is ₹${minOrder}. Add ₹${minOrder - subtotal} more to checkout.`}
                  </span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleViewCartClick}
                  className="py-2.5 px-3 border border-cream-400 bg-white hover:bg-cream-100 text-stone-800 rounded-xl text-xs font-bold transition text-center"
                >
                  {t('viewCartBtn')}
                </button>
                <button
                  onClick={handleCheckoutClick}
                  disabled={!isMinOrderMet}
                  className="py-2.5 px-3 bg-saffron-600 hover:bg-saffron-700 disabled:bg-stone-300 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 shadow-sm"
                >
                  <span>{t('checkoutBtn')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
