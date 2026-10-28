import React, { useState } from 'react';
import { Plus, Minus, ShoppingBag, Clock, Sparkles, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const { addToCart } = useCart();
  const { isGujarati, getProductName, getCategoryName, t } = useLanguage();

  const handleIncrement = (e) => {
    e.stopPropagation();
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!product.isAvailable) return;
    addToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 900);
  };

  const displayName = getProductName(product.name);
  const displayCategory = getCategoryName(product.category?.name || 'Gujarati Farsan');

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-orange-100 hover:border-saffron-200 shadow-soft hover:shadow-hover transition-all duration-300 flex flex-col h-full">
      {/* Food Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-orange-50">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80'}
          alt={displayName}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 items-end z-10">
          {product.isFeatured && (
            <span className="bg-saffron-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              {t('bestseller')}
            </span>
          )}

          {!product.isAvailable && (
            <span className="bg-stone-900/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              {t('soldOut')}
            </span>
          )}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[8px] sm:text-[9px] font-bold text-orange-600 uppercase tracking-wider">
            {displayCategory}
          </span>
          <h3 className="font-bold text-sm sm:text-base text-stone-900 group-hover:text-saffron-600 transition-colors duration-300 line-clamp-1 leading-tight mt-0.5">
            {displayName}
          </h3>
          <p className="text-[10px] text-stone-500 mt-1 line-clamp-2 leading-relaxed opacity-90">
            {product.description}
          </p>
        </div>

        {/* Pricing & Add to Cart Controls */}
        <div className="mt-3 pt-2.5 border-t border-orange-50">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-baseline">
              <span className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
                ₹{product.price}
              </span>
              <span className="text-[9px] sm:text-[10px] text-stone-400 font-medium ml-1">/{product.unit}</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2">
            {product.isAvailable ? (
              <div className="flex items-center justify-between xs:justify-start border border-orange-100 bg-orange-50/50 rounded-lg overflow-hidden shrink-0">
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="p-1.5 xs:p-1 text-stone-600 hover:text-saffron-600 disabled:opacity-30 transition-all"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5 xs:w-3 xs:h-3" />
                </button>
                <span className="px-2 xs:px-1 text-xs font-bold text-stone-900 min-w-[24px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="p-1.5 xs:p-1 text-stone-600 hover:text-saffron-600 transition-all"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5 xs:w-3 xs:h-3" />
                </button>
              </div>
            ) : null}

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!product.isAvailable}
              className={`flex-1 py-2 xs:py-1.5 px-2 rounded-lg text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-95 ${
                !product.isAvailable
                  ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                  : addedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-saffron-600 text-white hover:bg-saffron-700 shadow-sm'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span className="whitespace-nowrap">{t('addedToCart')}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span className="whitespace-nowrap">
                    {!product.isAvailable ? t('soldOut') : t('addToCart')}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
