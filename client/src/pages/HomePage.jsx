import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Clock,
  Heart,
  ChefHat,
  Users,
  ChevronDown,
  Phone,
  CheckCircle2,
  Calendar,
  Truck,
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import HomeHeroSlider from '../components/HomeHeroSlider';
import { productService } from '../services/productService';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

const HomePage = () => {
  const { settings } = useSettings();
  const { isGujarati, t, getCategoryName } = useLanguage();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [prodData, catData] = await Promise.all([
          productService.getProducts({ featured: 'true', limit: 8 }),
          productService.getCategories(),
        ]);
        setFeaturedProducts(prodData.products || []);
        setCategories(catData.categories || []);
      } catch (err) {
        console.error('Failed to load homepage data', err);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  const faqs = isGujarati
    ? [
        {
          q: 'ફરસાણ કેટલું તાજું મળે છે?',
          a: 'અમે આખો દિવસ નાની નાની બેચમાં ફરસાણ બનાવીએ છીએ. નાયલોન ખમણ ઢોકળા, ખાંડવી અને ફાફડા તમારા ઓર્ડર અને પસંદ કરેલા સમય સ્લોટ મુજબ ગરમાગરમ પેક કરવામાં આવે છે.',
        },
        {
          q: 'રસોઈમાં કયું તેલ અને ઘી વાપરો છો?',
          a: 'અમે ૧૦૦% શુદ્ધ ફિલ્ટર સીંગતેલ અને ગાયના ઘીનો ઉપયોગ કરીએ છીએ. કોઈ પણ પામતેલ કે રાસાયણિક કલર-પ્રિઝર્વેટિવ ઉમેરવામાં આવતા નથી.',
        },
        {
          q: 'કેટલા સમય પહેલાં ઓર્ડર આપવો પડે?',
          a: 'સામાન્ય ફરસાણ અને થેપલા માટે સેમ-ડે (૨-૪ કલાક અગાઉ) ઓર્ડર આપી શકાય છે. મિઠાઈ ગિફ્ટ બોક્સ અને મોટા પાર્ટી કેટરિંગ ઓર્ડર માટે ૨૪ કલાક અગાઉ જણાવવું.',
        },
        {
          q: 'શું તમે પાર્ટી કે પ્રસંગ માટે લાઈવ કાઉન્ટર આપો છો?',
          a: 'હા! ૨૫ થી ૫૦૦+ મહેમાનો માટે અમે અમારા કારીગરો સાથે લાઈવ ફાફડા-જલેબી, ગરમાગરમ ખમણ, મેથીના ગોટા અને મસાલા ચાના લાઈવ કાઉન્ટર ગોઠવી આપીએ છીએ.',
        },
        {
          q: 'તમારી હોમ ડિલિવરી સુવિધા ક્યાં છે?',
          a: `અમે ${settings.serviceAreas?.join(', ')} સહિત સમગ્ર અમદાવાદમાં ડિલિવરી કરીએ છીએ. ₹${settings.freeDeliveryThreshold} થી વધુના ઓર્ડર પર મફત ડિલિવરી મળે છે.`,
        },
      ]
    : [
        {
          q: 'How fresh is the farsan delivered?',
          a: 'We steam and fry our farsan in multiple small batches throughout the day. Hot items like Nylon Khaman Dhokla, Khandvi, and Fafda are packed right before dispatch for your scheduled time slot.',
        },
        {
          q: 'Which oil and ingredients do you use?',
          a: 'We use 100% pure filtered groundnut oil and premium cow ghee. We never reuse frying oil and never add artificial food colorings or chemical preservatives.',
        },
        {
          q: 'What is the advance booking notice required?',
          a: 'Regular farsan and theplas can be ordered for same-day delivery (usually 2-4 hours prior). Festive sweet gift boxes and bulk party orders require 24 hours advance notice.',
        },
        {
          q: 'Do you provide live counters for catering and parties?',
          a: 'Yes! For gatherings of 25 to 500+ guests, we bring our traditional tawa and steamer setups to serve hot live Jalebi-Fafda, live Dhokla, fresh Gota, and masala tea.',
        },
        {
          q: 'What are your delivery areas and charges?',
          a: `We deliver across ${settings.serviceAreas?.join(', ')}. Free delivery is available on orders above ₹${settings.freeDeliveryThreshold}, otherwise a nominal ₹${settings.deliveryFee} delivery charge applies.`,
        },
      ];

  return (
    <div className={`space-y-16 sm:space-y-24 pb-20 ${isGujarati ? 'font-gujarati' : ''}`}>
      {/* 1. Amazing Swiper Hero Showcase Slider */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-4 sm:pt-6">
        <HomeHeroSlider />

        {/* 3 Responsive Trust Guarantee Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-orange-50/50 rounded-xl p-4 border border-orange-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-saffron-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-base text-stone-900 uppercase tracking-tight">
                {isGujarati ? '૧૦૦% શુદ્ધ સામગ્રી' : '100% Pure'}
              </h4>
              <p className="text-[10px] text-stone-500 mt-0.5">
                {isGujarati ? 'પામતેલ મુક્ત' : 'Zero palm oil'}
              </p>
            </div>
          </div>

          <div className="bg-orange-50/50 rounded-xl p-4 border border-orange-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-base text-stone-900 uppercase tracking-tight">
                {isGujarati ? 'દરરોજ તાજી બેચ' : 'Daily Fresh'}
              </h4>
              <p className="text-[10px] text-stone-500 mt-0.5">
                {isGujarati ? 'ઓર્ડર મુજબ ગરમાગરમ' : 'Packed hot'}
              </p>
            </div>
          </div>

          <div className="bg-orange-50/50 rounded-xl p-4 border border-orange-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-base text-stone-900 uppercase tracking-tight">
                {isGujarati ? 'લાઈવ કેટરિંગ' : 'Live Catering'}
              </h4>
              <p className="text-[10px] text-stone-500 mt-0.5">
                {isGujarati ? '૨૫ થી ૫૦૦+ મહેમાનો' : 'For 25-500+ guests'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Categories Section */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-bold uppercase tracking-widest text-saffron-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
            {isGujarati ? 'હાથે બનાવેલી વાનગીઓ' : 'Artisanal Selection'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mt-4 tracking-tight">
            {t('categoriesTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            {t('categoriesSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              to={`/menu?category=${cat.slug}`}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-soft group-hover:shadow-hover transition-all duration-300 mb-4 border border-orange-100">
                <img
                  src={cat.image || 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&auto=format&fit=crop&q=80'}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-stone-900 group-hover:text-saffron-600 transition-colors uppercase tracking-wider">
                {getCategoryName(cat.name)}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured Products Grid */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div className="text-center sm:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              {t('featuredBadge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mt-4 tracking-tight">
              {t('featuredTitle')}
            </h2>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-xs font-bold text-saffron-600 hover:text-saffron-700 transition-colors"
          >
            <span>{t('viewFullMenu')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-orange-50/50 rounded-2xl h-64 sm:h-80 animate-pulse border border-orange-100"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 4. The Gujarati Purity & Heritage Promise */}
      <section className="bg-orange-50/50 py-16 sm:py-20 border-y border-orange-100">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-bold uppercase tracking-widest text-saffron-600 bg-white px-3 py-1 rounded-full border border-orange-100">
              {isGujarati ? 'અમારો શુદ્ધતા સંકલ્પ' : 'Our Purity Promise'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mt-6 tracking-tight">
              {t('whyTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-orange-100 shadow-soft hover:shadow-hover transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-saffron-600 flex items-center justify-center mb-6 text-2xl">
                🥜
              </div>
              <h3 className="font-bold text-lg text-stone-900 mb-3 uppercase tracking-tight">{t('pureOilTitle')}</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                {t('pureOilDesc')}
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-orange-100 shadow-soft hover:shadow-hover transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-emerald-600 flex items-center justify-center mb-6 text-2xl">
                📜
              </div>
              <h3 className="font-bold text-lg text-stone-900 mb-3 uppercase tracking-tight">{t('tradRecipeTitle')}</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                {t('tradRecipeDesc')}
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-orange-100 shadow-soft hover:shadow-hover transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-amber-600 flex items-center justify-center mb-6 text-2xl">
                🍲
              </div>
              <h3 className="font-bold text-lg text-stone-900 mb-3 uppercase tracking-tight">{t('smallBatchTitle')}</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                {t('smallBatchDesc')}
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-orange-100 shadow-soft hover:shadow-hover transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-emerald-600 flex items-center justify-center mb-6 text-2xl">
                🌿
              </div>
              <h3 className="font-bold text-lg text-stone-900 mb-3 uppercase tracking-tight">{t('jainFriendlyTitle')}</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                {t('jainFriendlyDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How Ordering Works */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-stone-600 bg-stone-50 px-3 py-1 rounded-full border border-stone-200">
            {isGujarati ? 'સરળ પ્રક્રિયા' : 'Simple Ordering'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mt-6 tracking-tight">
            {t('howTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="w-16 h-16 rounded-full bg-saffron-600 text-white font-bold text-2xl flex items-center justify-center mx-auto mb-6 shadow-saffron group-hover:scale-110 transition-transform">
              ૧
            </div>
            <h3 className="font-bold text-lg text-stone-900 mb-3 uppercase tracking-tight">{t('step1Title')}</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              {t('step1Desc')}
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 rounded-full bg-saffron-600 text-white font-bold text-2xl flex items-center justify-center mx-auto mb-6 shadow-saffron group-hover:scale-110 transition-transform">
              ૨
            </div>
            <h3 className="font-bold text-lg text-stone-900 mb-3 uppercase tracking-tight">{t('step2Title')}</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              {t('step2Desc')}
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 rounded-full bg-saffron-600 text-white font-bold text-2xl flex items-center justify-center mx-auto mb-6 shadow-saffron group-hover:scale-110 transition-transform">
              ૩
            </div>
            <h3 className="font-bold text-lg text-stone-900 mb-3 uppercase tracking-tight">{t('step3Title')}</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              {t('step3Desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-bold uppercase tracking-widest text-saffron-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
            {isGujarati ? 'ગ્રાહકોનો સાચો પ્રેમ' : 'Customer Stories'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mt-6 tracking-tight">
            {isGujarati ? 'ગુજરાતી પરિવારોનો વિશ્વાસ' : 'Loved by Families'}
          </h2>
        </div>

        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="pb-16"
          >
            <SwiperSlide className="h-auto">
              <div className="bg-white p-8 rounded-2xl border border-orange-100 shadow-soft flex flex-col justify-between h-full">
                <div>
                  <div className="flex text-amber-400 gap-1 text-xs mb-4">★★★★★</div>
                  <p className="text-sm text-stone-600 leading-relaxed italic">
                    {isGujarati
                      ? '“દિવાળી પર અમે ૧૫ કિલો મોહનથાળ અને નાયલોન સેવ મંગાવી હતી. શુદ્ધ ગાયના ઘીની એવી મહેક હતી કે બધા મહેમાનો વખાણ કરતાં થાક્યા નહીં!”'
                      : '“We ordered Mohan Thal and Nylon Sev for Diwali. The pure cow ghee aroma and authentic taste won over all our guests!”'}
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-orange-50">
                  <h4 className="font-bold text-sm text-stone-900 uppercase tracking-tight">{isGujarati ? 'પ્રવીણભાઈ શાહ' : 'Pravinbhai Shah'}</h4>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mt-1">{isGujarati ? 'સેટેલાઇટ, અમદાવાદ' : 'Satellite, Ahmedabad'}</p>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="h-auto">
              <div className="bg-white p-8 rounded-2xl border border-orange-100 shadow-soft flex flex-col justify-between h-full">
                <div>
                  <div className="flex text-amber-400 gap-1 text-xs mb-4">★★★★★</div>
                  <p className="text-sm text-stone-600 leading-relaxed italic">
                    {isGujarati
                      ? '“રવિવારે સવારે ગરમાગરમ ફાફડા અને પપૈયાનો સંભારો મંગાવ્યો. તેલ બિલકુલ હલકું અને ચોખ્ખું હતું, પેટમાં જરાય ભારે ન લાગ્યું.”'
                      : '“Sunday morning Fafda and Papaya Sambharo arrived piping hot. The groundnut oil was fresh and light on the stomach.”'}
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-orange-50">
                  <h4 className="font-bold text-sm text-stone-900 uppercase tracking-tight">{isGujarati ? 'ગીતાબેન મહેતા' : 'Geetaben Mehta'}</h4>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mt-1">{isGujarati ? 'બોડકદેવ, અમદાવાદ' : 'Bodakdev, Ahmedabad'}</p>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="h-auto">
              <div className="bg-white p-8 rounded-2xl border border-orange-100 shadow-soft flex flex-col justify-between h-full">
                <div>
                  <div className="flex text-amber-400 gap-1 text-xs mb-4">★★★★★</div>
                  <p className="text-sm text-stone-600 leading-relaxed italic">
                    {isGujarati
                      ? '“વાસ્તુપૂજામાં ૫૦ મહેમાનો માટે લાઈવ ખમણ અને ગોટા કાઉન્ટર બુક કર્યું હતું. સર્વિસ અને સ્વાદ બંને નંબર વન હતા!”'
                      : '“Booked live Dhokla and Gota counter for our Vastu Pooja (50 guests). Outstanding service and authentic Gujarati hospitality!”'}
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-orange-50">
                  <h4 className="font-bold text-sm text-stone-900 uppercase tracking-tight">{isGujarati ? 'હિતેશભાઈ પટેલ' : 'Hiteshbhai Patel'}</h4>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mt-1">{isGujarati ? 'નવરંગપુરા, અમદાવાદ' : 'Navrangpura, Ahmedabad'}</p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* 6. Catering Promotional Banner */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="rounded-3xl bg-stone-900 text-white p-10 sm:p-16 relative overflow-hidden shadow-xl border border-stone-800">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-saffron-600/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-8 space-y-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-saffron-600 text-white text-[10px] font-bold uppercase tracking-widest">
                {t('cateringBannerBadge')}
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
                {t('cateringBannerTitle')}
              </h2>
              <p className="text-sm sm:text-lg text-stone-400 max-w-xl leading-relaxed">
                {t('cateringBannerDesc')}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4">
              <Link
                to="/catering"
                className="w-full text-center py-4 px-8 rounded-xl bg-white text-stone-950 hover:bg-orange-50 font-bold text-sm uppercase tracking-wider transition-all active:scale-95"
              >
                {t('requestQuoteBtn')}
              </Link>
              <a
                href={`tel:${settings.contactPhone}`}
                className="w-full text-center py-4 px-8 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 font-bold text-sm text-white uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Phone className="w-5 h-5 text-saffron-600" />
                <span>{isGujarati ? 'ફોન કરો' : 'Call Now'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Frequently Asked Questions */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-saffron-700 bg-saffron-50 px-3.5 py-1 rounded-full border border-saffron-200">
            {isGujarati ? 'વારંવાર પૂછાતા પ્રશ્નો' : 'Got Questions?'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mt-2">
            {isGujarati ? 'ગ્રાહકોના સામાન્ય પ્રશ્નો' : 'Frequently Asked Questions'}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-cream-300 overflow-hidden shadow-soft"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-extrabold text-stone-900 hover:text-saffron-700 transition"
              >
                <span className="text-xs sm:text-base">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 sm:w-5 sm:h-5 text-stone-500 transition-transform shrink-0 ${
                    openFaq === idx ? 'rotate-180 text-saffron-600' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-cream-100 pt-3 font-normal">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
