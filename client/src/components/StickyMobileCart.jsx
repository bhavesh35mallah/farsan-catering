import React from 'react';
import { useLocation } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const StickyMobileCart = () => {
  const { totalItems, subtotal, openCart } = useCart();
  const { language, t } = useLanguage();
  const location = useLocation();

  // Hide on checkout and order success pages
  if (totalItems === 0 || location.pathname.startsWith('/checkout') || location.pathname.startsWith('/order-success') || location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-30">
      <div className="bg-stone-900/95 backdrop-blur-md text-white rounded-2xl p-3.5 shadow-2xl border border-stone-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative bg-saffron-600 p-2.5 rounded-xl">
            <ShoppingBag className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 bg-white text-saffron-700 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          </div>
          <div>
            <div className="text-[11px] text-stone-300 uppercase tracking-wider font-semibold">
              {totalItems} {language === 'gu' ? 'આઇટમ કાર્ટમાં છે' : (totalItems === 1 ? 'item in cart' : 'items in cart')}
            </div>
            <div className="font-serif font-extrabold text-base text-amber-300">
              ₹{subtotal}
            </div>
          </div>
        </div>

        <button
          onClick={openCart}
          className="bg-saffron-600 hover:bg-saffron-500 active:scale-95 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm transition"
        >
          <span>{t('viewCart')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default StickyMobileCart;
