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
    <div className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-cream-300 hover:border-saffron-400 shadow-soft hover:shadow-hover transition-all duration-300 flex flex-col h-full">
      {/* Food Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-200">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80'}
          alt={displayName}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Ambient Gradient on Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent pointer-events-none"></div>

        {/* Pure Veg Indicator */}
        <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md p-1 rounded-md shadow-sm border border-stone-200/80 z-10" title="100% Pure Vegetarian">
          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-emerald-600 flex items-center justify-center rounded-sm">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-600"></div>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 items-end z-10">
          {product.isFeatured && (
            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-saffron-600 text-white text-[10px] sm:text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-md">
              <Sparkles className="w-3 h-3 text-amber-200" />
              <span>{t('bestseller')}</span>
            </span>
          )}

          {!product.isAvailable && (
            <span className="bg-stone-900/90 text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md backdrop-blur-sm">
              {t('soldOut')}
            </span>
          )}

          {product.requiresAdvanceOrder && product.isAvailable && (
            <span className="inline-flex items-center gap-1 bg-amber-950/80 text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm backdrop-blur-sm">
              <Clock className="w-2.5 h-2.5 text-amber-300" />
              <span>{t('advanceOrder')}</span>
            </span>
          )}
        </div>

        {/* Floating Unit Tag on Image */}
        <div className="absolute bottom-2.5 right-2.5 bg-stone-900/75 backdrop-blur-md text-white text-[11px] font-extrabold px-2 py-0.5 rounded-lg border border-white/20">
          {product.unit}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="uppercase tracking-wider font-extrabold text-kothmir-800 text-[10px] sm:text-[11px]">
              {displayCategory}
            </span>
          </div>

          {/* Dish Title */}
          <h3 className="font-extrabold text-base sm:text-lg text-stone-900 group-hover:text-saffron-700 transition line-clamp-1 leading-snug">
            {displayName}
          </h3>

          {/* Subtitle in English if Gujarati is selected */}
          {isGujarati && displayName !== product.name && (
            <p className="text-[11px] text-stone-400 font-medium truncate mt-0.5">
              {product.name}
            </p>
          )}

          {/* Short Description */}
          <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing & Add to Cart Controls */}
        <div className="mt-3.5 pt-3 border-t border-cream-200">
          <div className="flex items-baseline justify-between mb-2.5">
            <div>
              <span className="text-xs text-stone-500 mr-1">
                {isGujarati ? 'ભાવ:' : 'Price:'}
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-saffron-700 tabular-price">
                ₹{product.price}
              </span>
              <span className="text-[11px] text-stone-500 font-medium"> / {product.unit}</span>
            </div>
            {product.requiresAdvanceOrder && (
              <span className="text-[10px] text-amber-800 font-bold bg-amber-100/80 px-2 py-0.5 rounded-md">
                {isGujarati ? 'અગાઉથી બુકિંગ' : 'Advance'}
              </span>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Quantity Stepper */}
            {product.isAvailable ? (
              <div className="flex items-center border border-cream-300 bg-cream-50 rounded-xl overflow-hidden shrink-0">
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="p-1.5 sm:p-2 text-stone-700 hover:text-saffron-700 hover:bg-cream-200 disabled:opacity-30 transition active:scale-90"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-1.5 sm:px-2.5 text-xs sm:text-sm font-extrabold text-stone-900 min-w-[20px] text-center tabular-price">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="p-1.5 sm:p-2 text-stone-700 hover:text-saffron-700 hover:bg-cream-200 transition active:scale-90"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : null}

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!product.isAvailable}
              className={`flex-1 py-2 sm:py-2.5 px-2.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-200 shadow-sm active:scale-95 ${
                !product.isAvailable
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : addedAnimation
                  ? 'bg-kothmir-700 text-white shadow-md'
                  : 'bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white shadow-md hover:shadow-saffron-600/30'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4 text-emerald-200" />
                  <span>{t('addedToCart')}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="truncate">
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
