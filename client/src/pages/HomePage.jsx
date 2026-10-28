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
    <div className={`space-y-12 sm:space-y-20 ${isGujarati ? 'font-gujarati' : ''}`}>
      {/* 1. Amazing Swiper Hero Showcase Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <HomeHeroSlider />

        {/* 3 Responsive Trust Guarantee Cards */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="bg-white rounded-2xl p-4 border border-cream-300 shadow-soft flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-saffron-700" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-stone-900">
                {isGujarati ? '૧૦૦% શુદ્ધ સીંગતેલ અને ઘી' : '100% Pure Groundnut Oil & Ghee'}
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                {isGujarati ? 'પામતેલ મુક્ત, ઘર જેવો પવિત્ર સ્વાદ' : 'Zero palm oil, pure homemade taste'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-cream-300 shadow-soft flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-kothmir-100 text-kothmir-700 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-kothmir-700" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-stone-900">
                {isGujarati ? 'ગરમાગરમ દૈનિક તાજી બેચ' : 'Daily Fresh Steamed & Fried'}
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                {isGujarati ? 'ઓર્ડર મુજબ તાજું પેકિંગ અને ડિલિવરી' : 'Packed hot right before scheduled delivery'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-cream-300 shadow-soft flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-saffron-100 text-saffron-700 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-saffron-700" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-stone-900">
                {isGujarati ? '૫૦૦+ પ્રસંગ માટે લાઈવ કેટરિંગ' : '500+ Catered Events'}
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                {isGujarati ? 'લગ્ન, પૂજા અને પાર્ટી લાઈવ કાઉન્ટર્સ' : 'Traditional halwai setups for 25-500+ guests'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-saffron-700 bg-saffron-50 px-3.5 py-1 rounded-full border border-saffron-200">
            {isGujarati ? 'હાથે બનાવેલી વાનગીઓ' : 'Handcrafted Varieties'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mt-2">
            {t('categoriesTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1.5">
            {t('categoriesSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              to={`/menu?category=${cat.slug}`}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-soft hover:shadow-hover border border-cream-200 bg-white p-2.5 sm:p-4 text-center transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden mb-2.5 bg-cream-100">
                <img
                  src={cat.image || 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&auto=format&fit=crop&q=80'}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-extrabold text-xs sm:text-base text-stone-900 group-hover:text-saffron-700 transition leading-snug">
                {getCategoryName(cat.name)}
              </h3>
              {isGujarati && getCategoryName(cat.name) !== cat.name && (
                <span className="text-[10px] text-stone-400 block font-medium truncate mt-0.5">{cat.name}</span>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured Products Grid with Interactive Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-kothmir-800 bg-kothmir-50 px-3.5 py-1 rounded-full border border-kothmir-200">
              {t('featuredBadge')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mt-2">
              {t('featuredTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {isGujarati ? 'અમારા રસોડાની સૌથી લોકપ્રિય અને દરરોજ ગરમાગરમ બનતી વાનગીઓ' : 'Our most loved and freshly prepared daily specialties.'}
            </p>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-saffron-700 hover:text-saffron-800 bg-saffron-50 px-4 py-2 rounded-xl border border-saffron-200 hover:bg-saffron-100 transition group"
          >
            <span>{t('viewFullMenu')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-3xl h-80 animate-pulse border border-cream-200"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 4. The Gujarati Purity & Heritage Promise */}
      <section className="bg-gradient-to-b from-cream-200/70 via-cream-100 to-cream-200/50 py-16 lg:py-20 border-y border-cream-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-wider text-saffron-700 bg-saffron-50 px-3.5 py-1 rounded-full border border-saffron-200">
              {isGujarati ? 'અમારો શુદ્ધતા સંકલ્પ' : 'Our Purity & Heritage Promise'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mt-2">
              {t('whyTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              {t('whySubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl shadow-soft border border-cream-300 hover:-translate-y-1 hover:border-saffron-300 transition duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-saffron-100 text-saffron-700 flex items-center justify-center mb-4 text-2xl shadow-xs">
                  🥜
                </div>
                <h3 className="font-extrabold text-lg text-stone-900 mb-2">{t('pureOilTitle')}</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  {t('pureOilDesc')}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-cream-200 text-[11px] font-bold text-saffron-700">
                ✓ {isGujarati ? 'ઝીરો પામ ઓઇલ ગેરંટી' : 'Zero Palm Oil Guarantee'}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-soft border border-cream-300 hover:-translate-y-1 hover:border-kothmir-300 transition duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-kothmir-100 text-kothmir-700 flex items-center justify-center mb-4 text-2xl shadow-xs">
                  📜
                </div>
                <h3 className="font-extrabold text-lg text-stone-900 mb-2">{t('tradRecipeTitle')}</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  {t('tradRecipeDesc')}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-cream-200 text-[11px] font-bold text-kothmir-700">
                ✓ {isGujarati ? 'કાઠિયાવાડી-સુરતી અસલ સ્વાદ' : 'Traditional Heirloom Recipes'}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-soft border border-cream-300 hover:-translate-y-1 hover:border-amber-300 transition duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 text-2xl shadow-xs">
                  🍲
                </div>
                <h3 className="font-extrabold text-lg text-stone-900 mb-2">{t('smallBatchTitle')}</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  {t('smallBatchDesc')}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-cream-200 text-[11px] font-bold text-amber-800">
                ✓ {isGujarati ? 'કઢાઈમાંથી સીધું ગરમાગરમ' : 'Fresh Out of the Kadai'}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-soft border border-cream-300 hover:-translate-y-1 hover:border-emerald-300 transition duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 text-2xl shadow-xs">
                  🌿
                </div>
                <h3 className="font-extrabold text-lg text-stone-900 mb-2">{t('jainFriendlyTitle')}</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  {t('jainFriendlyDesc')}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-cream-200 text-[11px] font-bold text-emerald-700">
                ✓ {isGujarati ? '૧૦૦% શુદ્ધ જૈન વાસણો' : 'Dedicated Jain Cookware'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How Ordering Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-kothmir-800 bg-kothmir-50 px-3.5 py-1 rounded-full border border-kothmir-200">
            {isGujarati ? 'સરળ ઓર્ડર પ્રક્રિયા' : 'Simple 3-Step Process'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mt-2">
            {t('howTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-cream-300 shadow-soft text-center relative group hover:border-saffron-300 transition">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-saffron-600 to-saffron-700 text-white font-extrabold text-xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-105 transition-transform">
              ૧
            </div>
            <h3 className="font-extrabold text-base sm:text-lg text-stone-900 mb-2">{t('step1Title')}</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              {t('step1Desc')}
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-cream-300 shadow-soft text-center relative group hover:border-saffron-300 transition">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-saffron-600 to-saffron-700 text-white font-extrabold text-xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-105 transition-transform">
              ૨
            </div>
            <h3 className="font-extrabold text-base sm:text-lg text-stone-900 mb-2">{t('step2Title')}</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              {t('step2Desc')}
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-cream-300 shadow-soft text-center relative group hover:border-saffron-300 transition">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-saffron-600 to-saffron-700 text-white font-extrabold text-xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-105 transition-transform">
              ૩
            </div>
            <h3 className="font-extrabold text-base sm:text-lg text-stone-900 mb-2">{t('step3Title')}</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              {t('step3Desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Customer Testimonials from Gujarati Families */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-saffron-700 bg-saffron-50 px-3.5 py-1 rounded-full border border-saffron-200">
            {isGujarati ? 'ગ્રાહકોનો સાચો પ્રેમ' : 'Customer Reviews'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mt-2">
            {isGujarati ? 'ગુજરાતી પરિવારોનો વિશ્વાસ' : 'Loved by 1,200+ Gujarati Families'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            {isGujarati ? 'અમદાવાદના સેટેલાઇટ, બોડકદેવ અને નવરંગપુરાના પરિવારોનો સાચો પ્રતિભાવ' : 'Real feedback from our happy families across Ahmedabad.'}
          </p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="pb-12"
          >
            <SwiperSlide className="h-auto">
              <div className="bg-white p-6 rounded-3xl border border-cream-300 shadow-soft flex flex-col justify-between h-full">
                <div>
                  <div className="flex text-amber-500 gap-1 text-sm mb-3">★★★★★</div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal italic">
                    {isGujarati
                      ? '“દિવાળી પર અમે ૧૫ કિલો મોહનથાળ અને નાયલોન સેવ મંગાવી હતી. શુદ્ધ ગાયના ઘીની એવી મહેક હતી કે બધા મહેમાનો વખાણ કરતાં થાક્યા નહીં!”'
                      : '“We ordered Mohan Thal and Nylon Sev for Diwali. The pure cow ghee aroma and authentic taste won over all our guests!”'}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-cream-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-stone-900">{isGujarati ? 'પ્રવીણભાઈ શાહ' : 'Pravinbhai Shah'}</h4>
                    <p className="text-[11px] text-stone-500">{isGujarati ? 'સેટેલાઇટ, અમદાવાદ' : 'Satellite, Ahmedabad'}</p>
                  </div>
                  <span className="text-[10px] bg-kothmir-50 text-kothmir-800 font-bold px-2 py-0.5 rounded-full border border-kothmir-200">
                    ✓ {isGujarati ? 'ચકાસાયેલ ગ્રાહક' : 'Verified'}
                  </span>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="h-auto">
              <div className="bg-white p-6 rounded-3xl border border-cream-300 shadow-soft flex flex-col justify-between h-full">
                <div>
                  <div className="flex text-amber-500 gap-1 text-sm mb-3">★★★★★</div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal italic">
                    {isGujarati
                      ? '“રવિવારે સવારે ગરમાગરમ ફાફડા અને પપૈયાનો સંભારો મંગાવ્યો. તેલ બિલકુલ હલકું અને ચોખ્ખું હતું, પેટમાં જરાય ભારે ન લાગ્યું.”'
                      : '“Sunday morning Fafda and Papaya Sambharo arrived piping hot. The groundnut oil was fresh and light on the stomach.”'}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-cream-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-stone-900">{isGujarati ? 'ગીતાબેન મહેતા' : 'Geetaben Mehta'}</h4>
                    <p className="text-[11px] text-stone-500">{isGujarati ? 'બોડકદેવ, અમદાવાદ' : 'Bodakdev, Ahmedabad'}</p>
                  </div>
                  <span className="text-[10px] bg-kothmir-50 text-kothmir-800 font-bold px-2 py-0.5 rounded-full border border-kothmir-200">
                    ✓ {isGujarati ? 'ચકાસાયેલ ગ્રાહક' : 'Verified'}
                  </span>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="h-auto">
              <div className="bg-white p-6 rounded-3xl border border-cream-300 shadow-soft flex flex-col justify-between h-full">
                <div>
                  <div className="flex text-amber-500 gap-1 text-sm mb-3">★★★★★</div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal italic">
                    {isGujarati
                      ? '“વાસ્તુપૂજામાં ૫૦ મહેમાનો માટે લાઈવ ખમણ અને ગોટા કાઉન્ટર બુક કર્યું હતું. સર્વિસ અને સ્વાદ બંને નંબર વન હતા!”'
                      : '“Booked live Dhokla and Gota counter for our Vastu Pooja (50 guests). Outstanding service and authentic Gujarati hospitality!”'}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-cream-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-stone-900">{isGujarati ? 'હિતેશભાઈ પટેલ' : 'Hiteshbhai Patel'}</h4>
                    <p className="text-[11px] text-stone-500">{isGujarati ? 'નવરંગપુરા, અમદાવાદ' : 'Navrangpura, Ahmedabad'}</p>
                  </div>
                  <span className="text-[10px] bg-kothmir-50 text-kothmir-800 font-bold px-2 py-0.5 rounded-full border border-kothmir-200">
                    ✓ {isGujarati ? 'ચકાસાયેલ ગ્રાહક' : 'Verified'}
                  </span>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="h-auto">
              <div className="bg-white p-6 rounded-3xl border border-cream-300 shadow-soft flex flex-col justify-between h-full">
                <div>
                  <div className="flex text-amber-500 gap-1 text-sm mb-3">★★★★★</div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal italic">
                    {isGujarati
                      ? '“મેથીના થેપલા અને કેરીનો છુંદો પ્રવાસ માટે લીધો હતો. ૪ દિવસ સુધી બિલકુલ નરમ અને તાજા રહ્યા. ઉત્તમ ક્વોલિટી!”'
                      : '“Packed Methi Thepla and Mango Chhundo for our outstation journey. Stayed soft and delicious for 4 days!”'}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-cream-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-stone-900">{isGujarati ? 'જયશ્રીબેન ત્રિવેદી' : 'Jayshreeben Trivedi'}</h4>
                    <p className="text-[11px] text-stone-500">{isGujarati ? 'પાલડી, અમદાવાદ' : 'Paldi, Ahmedabad'}</p>
                  </div>
                  <span className="text-[10px] bg-kothmir-50 text-kothmir-800 font-bold px-2 py-0.5 rounded-full border border-kothmir-200">
                    ✓ {isGujarati ? 'ચકાસાયેલ ગ્રાહક' : 'Verified'}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* 6. Catering Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white p-6 sm:p-10 lg:p-14 relative overflow-hidden shadow-2xl border border-stone-700">
          <div className="absolute top-0 right-0 w-80 h-80 bg-saffron-600/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3.5">
              <span className="inline-block px-3 py-1 rounded-full bg-saffron-600 text-white text-[11px] sm:text-xs font-extrabold tracking-wider uppercase">
                {t('cateringBannerBadge')}
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                {t('cateringBannerTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed font-normal">
                {t('cateringBannerDesc')}
              </p>
              <div className="flex flex-wrap gap-3 pt-1 text-xs text-stone-300 font-medium">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-kothmir-400 shrink-0" /> {isGujarati ? 'ગરમાગરમ લાઈવ કાઉન્ટર' : 'Live On-Site Counters'}</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-kothmir-400 shrink-0" /> {isGujarati ? 'સંપૂર્ણ શુદ્ધ જૈન મેનુ' : 'Complete Jain Menu'}</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-kothmir-400 shrink-0" /> {isGujarati ? '૨૫ થી ૫૦૦+ મહેમાનો' : '25 to 500+ Guests'}</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                to="/catering"
                className="w-full text-center py-3.5 px-6 rounded-2xl bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-500 hover:to-saffron-600 font-extrabold text-xs sm:text-sm text-white shadow-lg transition active:scale-95 glow-saffron"
              >
                {t('requestQuoteBtn')}
              </Link>
              <a
                href={`tel:${settings.contactPhone}`}
                className="w-full text-center py-3 px-6 rounded-2xl bg-stone-800/80 hover:bg-stone-700 border border-stone-600 font-bold text-xs sm:text-sm text-white transition flex items-center justify-center gap-2 active:scale-95"
              >
                <Phone className="w-4 h-4 text-saffron-400" />
                <span>{isGujarati ? 'ફોન કરો: ' : 'Call: '}{settings.contactPhone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
