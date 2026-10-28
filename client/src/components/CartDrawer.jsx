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
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-full sm:w-[400px] bg-white shadow-xl flex flex-col h-full relative">
          {/* Header */}
          <div className="px-6 py-6 flex items-center justify-between border-b border-orange-100 bg-orange-50/30">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-saffron-600" />
              <div>
                <h2 className="text-lg font-bold text-stone-900 uppercase tracking-tight">
                  {t('cartTitle')}
                </h2>
                <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                  {totalItems} {isGujarati ? 'આઇટમ' : 'items'}
                </span>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-stone-900 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-orange-50 text-saffron-600 flex items-center justify-center shadow-sm">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900 uppercase tracking-tight">{t('cartEmpty')}</h3>
                  <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                    {t('cartEmptyDesc')}
                  </p>
                </div>
                <button
                  onClick={() => {
                    closeCart();
                    navigate('/menu');
                  }}
                  className="w-full py-4 bg-saffron-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-saffron-700 transition-all shadow-sm"
                >
                  {isGujarati ? 'મેનુ જુઓ' : 'Browse Menu'}
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item._id} className="group relative flex gap-4 p-3 rounded-2xl bg-white border border-orange-50 hover:border-orange-100 transition-all duration-300 shadow-soft">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-orange-50">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&auto=format&fit=crop&q=80'}
                      alt={getProductName(item.name)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-stone-900 uppercase tracking-tight truncate max-w-[140px]">
                          {getProductName(item.name)}
                        </h4>
                        <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider mt-0.5 block">
                          ₹{item.price} / {item.unit}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-stone-300 hover:text-red-500 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Stepper */}
                      <div className="flex items-center bg-orange-50/50 rounded-lg border border-orange-100 p-0.5">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-500 hover:text-saffron-600"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="px-2 text-[11px] font-bold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-500 hover:text-saffron-600"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-stone-900">
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
            <div className="p-6 border-t border-orange-100 bg-orange-50/10 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-stone-500">
                  <span>{t('subtotal')}</span>
                  <span className="text-stone-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-stone-500">
                  <span>{t('deliveryFee')}</span>
                  <span className={subtotal >= freeThreshold ? 'text-emerald-600' : 'text-stone-900'}>
                    {subtotal >= freeThreshold ? t('freeDelivery') : `₹${settings.deliveryFee || 40}`}
                  </span>
                </div>
                <div className="pt-3 mt-3 border-t border-orange-100 flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-900">Total</span>
                  <span className="text-xl font-bold text-saffron-600 tracking-tight">
                    ₹{subtotal + (subtotal >= freeThreshold ? 0 : (settings.deliveryFee || 40))}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckoutClick}
                disabled={!isMinOrderMet}
                className="w-full py-4 bg-saffron-600 hover:bg-saffron-700 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-saffron active:scale-95"
              >
                <span>{t('checkoutBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
