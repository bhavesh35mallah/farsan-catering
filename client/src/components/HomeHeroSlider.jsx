import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { ShoppingBag, ChefHat, Sparkles, ArrowRight, ChevronLeft, ChevronRight, Star, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const HomeHeroSlider = () => {
  const { isGujarati } = useLanguage();

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=1600&auto=format&fit=crop&q=85',
      badgeGu: '🌿 ૧૦૦% શુદ્ધ સીંગતેલ • દરરોજ તાજી બેચ',
      badgeEn: '🌿 100% Pure Groundnut Oil • Fresh Daily Batch',
      titleGu: 'ગરમાગરમ નાયલોન ખમણ અને સિલ્કી ખાંડવી',
      titleEn: 'Spongy Nylon Khaman & Silky Khandvi',
      descGu: 'રાઈ-હીંગ-લીલા મરચાંનો વઘાર અને તાજા કોપરા-કોથમરીથી સજાવેલ અસલી ગુજરાતી સ્વાદ.',
      descEn: 'Authentic Gujarati taste prepared with fresh mustard-curry leaves tempering and grated coconut.',
      highlightGu: 'સવારનો સ્પેશિયલ • ₹૮૦ થી શરૂ',
      highlightEn: 'Morning Fresh Special • From ₹80',
      ctaTextGu: 'ઓર્ડર કરો',
      ctaTextEn: 'Order Now',
      ctaLink: '/menu?category=farsan',
      secondaryTextGu: 'મેનુ જુઓ',
      secondaryTextEn: 'View Full Menu',
      secondaryLink: '/menu',
      categoryTag: 'Farsan / ફરસાણ',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1600&auto=format&fit=crop&q=85',
      badgeGu: '👑 શુદ્ધ ગાયનું ઘી • પ્રીમિયમ ડ્રાયફ્રૂટ્સ',
      badgeEn: '👑 100% Pure Cow Ghee • Premium Dryfruits',
      titleGu: 'પરંપરાગત કેસર મોહનથાળ, સુખડી અને ગરમાગરમ જલેબી',
      titleEn: 'Traditional Kesar Mohanthal, Sukhdi & Hot Jalebi',
      descGu: 'દાદીમાના નુસ્ખા મુજબ ઘીમાં શેકેલ ચણાનો લોટ, કેસરની સુગંધ અને બદામ-પિસ્તાની ભરમાર.',
      descEn: 'Slow-roasted in pure cow ghee with aromatic saffron, crunchy almonds, and pistachios.',
      highlightGu: 'શુદ્ધ ઘી મિઠાઈ • ₹૧૬૦ થી શરૂ',
      highlightEn: 'Pure Ghee Mithai • From ₹160',
      ctaTextGu: 'મિઠાઈ ઓર્ડર કરો',
      ctaTextEn: 'Order Sweets',
      ctaLink: '/menu?category=sweets',
      secondaryTextGu: 'ગિફ્ટ બોક્સ',
      secondaryTextEn: 'Gift Hampers',
      secondaryLink: '/menu?category=festive-combos',
      categoryTag: 'Sweets / મિઠાઈ',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=1600&auto=format&fit=crop&q=85',
      badgeGu: '✨ ઘર જેવું કરકરૂ • ૧૦૦% પ્રિઝર્વેટિવ મુક્ત',
      badgeEn: '✨ Crispy & Crunchy • Zero Chemical Preservatives',
      titleGu: 'ભાવનગરી ગાંઠિયા, રતલામી સેવ અને મસાલા ચેવડો',
      titleEn: 'Bhavnagri Gathiya, Ratlami Sev & Masala Chevdo',
      descGu: 'સાંજના ચા સાથે માણવા જેવો કરકરો, મસાલેદાર અને તાજો ઘરગથ્થુ નાસ્તો.',
      descEn: 'Perfect teatime crunch made with freshly ground spices and premium besan.',
      highlightGu: 'સાંજનો નાસ્તો • ₹૯૦ થી શરૂ',
      highlightEn: 'Teatime Crunch • From ₹90',
      ctaTextGu: 'નમકીન મંગાવો',
      ctaTextEn: 'Order Namkeen',
      ctaLink: '/menu?category=namkeen',
      secondaryTextGu: 'ગુજરાતી સ્નેક્સ',
      secondaryTextEn: 'Gujarati Snacks',
      secondaryLink: '/menu?category=gujarati-snacks',
      categoryTag: 'Namkeen / નમકીન',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1600&auto=format&fit=crop&q=85',
      badgeGu: '🥘 લાઈવ કાઉન્ટર • ૨૫ થી ૫૦૦+ મહેમાનો માટે',
      badgeEn: '🥘 Live Counters • For 25 to 500+ Guests',
      titleGu: 'લગ્ન, પૂજા અને પાર્ટી માટે અસલી ગુજરાતી કેટરિંગ',
      titleEn: 'Authentic Gujarati Catering for Weddings & Parties',
      descGu: 'ગરમાગરમ લાઈવ જલેબી-ફાફડા, ખમણ ઢોકળા અને શુદ્ધ ગુજરાતી ભોજન પેકેજ.',
      descEn: 'Live tawa and steamer stations with trained traditional Gujarati halwais for your special moments.',
      highlightGu: 'કેટરિંગ પેકેજ • ₹૧૮૦ / વ્યક્તિથી',
      highlightEn: 'Catering Packages • From ₹180 / Head',
      ctaTextGu: 'કેટરિંગ પૂછપરછ',
      ctaTextEn: 'Enquire Catering',
      ctaLink: '/catering',
      secondaryTextGu: 'પેકેજ જુઓ',
      secondaryTextEn: 'View Packages',
      secondaryLink: '/menu?category=catering-packages',
      categoryTag: 'Catering / કેટરિંગ',
    },
  ];

  return (
    <div className="relative group w-full overflow-hidden rounded-3xl shadow-2xl border border-cream-300 bg-stone-900">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={900}
        loop={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          el: '.custom-swiper-pagination',
          bulletClass: 'custom-bullet',
          bulletActiveClass: 'custom-bullet-active',
        }}
        navigation={{
          prevEl: '.custom-swiper-prev',
          nextEl: '.custom-swiper-next',
        }}
        className="w-full h-[520px] sm:h-[560px] lg:h-[620px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Background Image with Zoom & Dark Gradient Overlay */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src={slide.image}
                alt={isGujarati ? slide.titleGu : slide.titleEn}
                className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
              />
              {/* Multi-layered cinematic gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/75 to-stone-900/35"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/40"></div>
            </div>

            {/* Slide Content */}
            <div className="relative z-10 max-w-7xl mx-auto h-full px-5 sm:px-8 lg:px-12 flex flex-col justify-center">
              <div className="max-w-2xl space-y-4 sm:space-y-5">
                {/* Top Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron-500/20 backdrop-blur-md border border-saffron-400/40 text-amber-300 text-xs sm:text-sm font-extrabold shadow-sm">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow shrink-0" />
                  <span>{isGujarati ? slide.badgeGu : slide.badgeEn}</span>
                </div>

                {/* Main Heading */}
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.25] tracking-tight drop-shadow-md">
                  {isGujarati ? slide.titleGu : slide.titleEn}
                </h2>

                {/* Description */}
                <p className="text-xs sm:text-base lg:text-lg text-stone-200 line-clamp-2 sm:line-clamp-none leading-relaxed drop-shadow-sm max-w-xl">
                  {isGujarati ? slide.descGu : slide.descEn}
                </p>

                {/* Price / Highlight Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-bold">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-serif font-extrabold text-amber-300">
                    {isGujarati ? slide.highlightGu : slide.highlightEn}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                  <Link
                    to={slide.ctaLink}
                    className="px-6 sm:px-8 py-3.5 rounded-2xl bg-gradient-to-r from-saffron-500 via-amber-500 to-saffron-600 hover:from-saffron-600 hover:to-amber-600 text-stone-950 font-extrabold text-sm sm:text-base shadow-xl hover:shadow-saffron-500/40 transition active:scale-95 flex items-center gap-2.5 glow-saffron"
                  >
                    <ShoppingBag className="w-5 h-5 text-stone-950" />
                    <span>{isGujarati ? slide.ctaTextGu : slide.ctaTextEn}</span>
                    <ArrowRight className="w-4 h-4 text-stone-950" />
                  </Link>

                  <Link
                    to={slide.secondaryLink}
                    className="px-5 sm:px-7 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white font-extrabold text-sm sm:text-base transition active:scale-95 flex items-center gap-2"
                  >
                    <span>{isGujarati ? slide.secondaryTextGu : slide.secondaryTextEn}</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Corner Category Tag */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 hidden sm:block">
              <span className="px-3.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-300 uppercase tracking-wider">
                {slide.categoryTag}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Prev & Next Navigation Buttons */}
      <button
        aria-label="Previous Slide"
        className="custom-swiper-prev absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-stone-900/60 hover:bg-saffron-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 opacity-80 hover:opacity-100 hover:scale-110 shadow-lg"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        aria-label="Next Slide"
        className="custom-swiper-next absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-stone-900/60 hover:bg-saffron-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 opacity-80 hover:opacity-100 hover:scale-110 shadow-lg"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Custom Pagination Container */}
      <div className="custom-swiper-pagination absolute bottom-4 sm:bottom-6 left-0 right-0 z-20 flex items-center justify-center gap-2"></div>
    </div>
  );
};

export default HomeHeroSlider;
