import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag, ShieldCheck, Sparkles, AlertCircle, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, subtotal, totalItems } = useCart();
  const { settings } = useSettings();
  const { isGujarati, t, getProductName } = useLanguage();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const minOrder = settings.minimumOrderAmount || 200;
  const freeThreshold = settings.freeDeliveryThreshold || 800;
  const deliveryFee = subtotal >= freeThreshold ? 0 : (settings.deliveryFee || 40);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0; // 10% demo discount
  const grandTotal = Math.max(0, subtotal + deliveryFee - discount);
  const isMinOrderMet = subtotal >= minOrder;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCode.trim()) return;

    if (couponCode.trim().toUpperCase() === 'GUJARAT10' || couponCode.trim().toUpperCase() === 'FARSAN10') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError(isGujarati ? 'અમાન્ય કૂપન કોડ. "GUJARAT10" અજમાવો' : 'Invalid coupon code. Try using "GUJARAT10"');
    }
  };

  if (cart.length === 0) {
    return (
      <div className={`max-w-4xl mx-auto px-4 py-16 text-center ${isGujarati ? 'font-gujarati' : ''}`}>
        <div className="w-24 h-24 rounded-full bg-cream-200 flex items-center justify-center mx-auto text-stone-400 mb-6">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-extrabold text-stone-900">{t('cartEmpty')}</h1>
        <p className="text-sm text-stone-600 mt-2 max-w-md mx-auto font-normal">
          {t('cartEmptyDesc')}
        </p>
        <div className="mt-8">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-saffron-600 hover:bg-saffron-700 text-white font-bold rounded-xl shadow-md transition"
          >
            <span>{isGujarati ? 'ફરસાણ મેનુ જુઓ' : 'Explore Farsan Menu'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-8 sm:py-12 ${isGujarati ? 'font-gujarati' : ''}`}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900">
            {t('cartTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 font-normal">
            {isGujarati ? 'તમારી વાનગીઓ તપાસો, પ્રમાણ બદલો અને ઓર્ડર કન્ફર્મ કરો.' : 'Review your delicacies, adjust quantities, and proceed to checkout.'}
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-stone-500 hover:text-red-600 flex items-center gap-1 transition"
        >
          <Trash2 className="w-3.5 h-3.5" /> {isGujarati ? 'કાર્ટ ખાલી કરો' : 'Clear Cart'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart items table */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-cream-300 shadow-soft overflow-hidden">
          <div className="divide-y divide-cream-200">
            {cart.map((item) => (
              <div key={item._id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&auto=format&fit=crop&q=80'}
                    alt={getProductName(item.name)}
                    className="w-20 h-20 rounded-xl object-cover border border-cream-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="font-bold text-base text-stone-900 truncate">
                      {getProductName(item.name)}
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {isGujarati ? 'ભાવ:' : 'Rate:'} <span className="font-semibold text-stone-700">₹{item.price}</span> / {item.unit}
                    </p>
                    {item.requiresAdvanceOrder && (
                      <span className="inline-block mt-1 text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                        {isGujarati ? 'અગાઉથી તૈયારી જરૂરી' : 'Requires advance batch prep'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-2 sm:pt-0">
                  {/* Stepper */}
                  <div className="flex items-center border border-cream-300 bg-cream-50 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="p-2 text-stone-600 hover:text-saffron-700 transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-stone-900 min-w-[28px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="p-2 text-stone-600 hover:text-saffron-700 transition"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line total */}
                  <div className="text-right min-w-[70px]">
                    <div className="font-serif font-extrabold text-base text-saffron-700">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-stone-400 hover:text-red-600 transition p-1.5"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-cream-50/70 border-t border-cream-200 flex items-center justify-between text-xs text-stone-600">
            <Link to="/menu" className="inline-flex items-center gap-1 font-bold text-saffron-700 hover:underline">
              <ArrowLeft className="w-3.5 h-3.5" /> {isGujarati ? 'હજુ બીજી વાનગીઓ ઉમેરો' : 'Add more items'}
            </Link>
            <span>{isGujarati ? 'કુલ:' : 'Total:'} <strong>{totalItems} {isGujarati ? 'વાનગીઓ' : 'items'}</strong></span>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-cream-300 shadow-soft p-5 sm:p-6 space-y-5">
            <h2 className="text-lg font-bold text-stone-900 border-b border-cream-200 pb-3">
              {isGujarati ? 'ઓર્ડર બિલ' : 'Order Summary'}
            </h2>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label className="text-xs font-semibold text-stone-700 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-saffron-600" /> {isGujarati ? 'કૂપન કોડ છે?' : 'Have a Coupon Code?'}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="GUJARAT10"
                  disabled={couponApplied}
                  className="flex-1 uppercase px-3 py-2 bg-cream-50 border border-cream-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-saffron-500/20"
                />
                <button
                  type="submit"
                  disabled={couponApplied || !couponCode.trim()}
                  className="px-4 py-2 bg-stone-800 text-white rounded-xl text-xs font-bold hover:bg-stone-900 disabled:opacity-40 transition"
                >
                  {couponApplied ? 'લાગુ થયું ✓' : isGujarati ? 'લાગુ કરો' : 'Apply'}
                </button>
              </div>
              {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
              {couponApplied && (
                <p className="text-[11px] text-kothmir-700 font-semibold">
                  {isGujarati ? '૧૦% પ્રમોશનલ ડિસ્કાઉન્ટ લાગુ થયું!' : '10% Promotional discount applied!'}
                </p>
              )}
            </form>

            {/* Line calculations */}
            <div className="space-y-2 text-xs sm:text-sm pt-2 border-t border-cream-200">
              <div className="flex justify-between text-stone-600">
                <span>{t('subtotal')}:</span>
                <span className="font-semibold text-stone-900">₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-stone-600">
                <span>{t('deliveryFee')}:</span>
                <span className="font-semibold text-kothmir-700">
                  {subtotal >= freeThreshold ? t('freeDelivery') : `₹${deliveryFee}`}
                </span>
              </div>

              {couponApplied && (
                <div className="flex justify-between text-kothmir-700 font-semibold">
                  <span>{isGujarati ? 'ખાસ છૂટ (૧૦%):' : 'Special Discount (10%):'}</span>
                  <span>-₹{discount}</span>
                </div>
              )}

              <div className="pt-3 border-t border-cream-300 flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-base text-stone-900">{t('grandTotal')}:</span>
                </div>
                <span className="font-serif font-extrabold text-2xl text-saffron-700">
                  ₹{grandTotal}
                </span>
              </div>
            </div>

            {/* Minimum order notice */}
            {!isMinOrderMet && (
              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-800">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  {isGujarati
                    ? `ઓછામાં ઓછો ઓર્ડર ₹${minOrder} નો હોવો જરૂરી છે. હજુ ₹${minOrder - subtotal} ઉમેરો.`
                    : `Minimum order amount is ₹${minOrder}. Please add ₹${minOrder - subtotal} more to checkout.`}
                </span>
              </div>
            )}

            {/* Checkout CTA */}
            <button
              onClick={() => navigate('/checkout')}
              disabled={!isMinOrderMet}
              className="w-full py-3.5 px-4 bg-saffron-600 hover:bg-saffron-700 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-bold rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-md active:scale-95"
            >
              <span>{t('checkoutBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-center">
              <span className="text-[11px] text-stone-700 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-kothmir-700" />
                {isGujarati ? 'ડિલિવરી વખતે રોકડા અથવા UPI સ્વીકાર્ય' : 'Pay cash or UPI on Delivery / Pickup'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
