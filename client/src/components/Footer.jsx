import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Heart, ShieldCheck, Truck, UtensilsCrossed, Lock, MessageCircle, Sparkles } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { settings } = useSettings();
  const { isGujarati, t } = useLanguage();

  return (
    <footer className={`bg-stone-900 text-stone-300 pt-14 pb-10 border-t-4 border-saffron-600 ${isGujarati ? 'font-gujarati' : ''}`}>
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Value Highlights with glass dark treatment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pb-12 border-b border-stone-800">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-stone-800/60 border border-stone-700/50">
            <div className="w-11 h-11 rounded-xl bg-saffron-600/20 text-saffron-400 flex items-center justify-center shrink-0 text-xl font-bold">
              🥜
            </div>
            <div>
              <h4 className="font-extrabold text-white text-sm sm:text-base">
                {isGujarati ? '૧૦૦% શુદ્ધ સીંગતેલ' : 'Pure Filtered Groundnut Oil'}
              </h4>
              <p className="text-xs text-stone-400 mt-0.5">
                {isGujarati ? 'ઝીરો પામતેલ, દરરોજ તાજા તેલમાં જ તળેલું ફરસાણ.' : 'Zero palm oil, never reused cooking oil.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-stone-800/60 border border-stone-700/50">
            <div className="w-11 h-11 rounded-xl bg-kothmir-600/20 text-kothmir-400 flex items-center justify-center shrink-0 text-xl font-bold">
              🧈
            </div>
            <div>
              <h4 className="font-extrabold text-white text-sm sm:text-base">
                {isGujarati ? 'શુદ્ધ ગાયના ઘીની મિઠાઈ' : 'Pure Cow Ghee Sweets'}
              </h4>
              <p className="text-xs text-stone-400 mt-0.5">
                {isGujarati ? 'મોહનથાળ અને મિઠાઈઓ ૧૦૦% દેશી ગાયના ઘીમાં તૈયાર.' : 'Artisanal Mohanthal & festive sweets in pure ghee.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-stone-800/60 border border-stone-700/50">
            <div className="w-11 h-11 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center shrink-0 text-xl font-bold">
              🚚
            </div>
            <div>
              <h4 className="font-extrabold text-white text-sm sm:text-base">
                {isGujarati ? 'સેમ-ડે તાજી હોમ ડિલિવરી' : 'Same-Day Fresh Delivery'}
              </h4>
              <p className="text-xs text-stone-400 mt-0.5">
                {isGujarati ? 'અમદાવાદમાં સમયસર ગરમાગરમ પેક કરીને ડિલિવર.' : 'Warmly packed and dispatched across Ahmedabad.'}
              </p>
            </div>
          </div>
        </div>

        {/* Links & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 py-10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-saffron-700 to-amber-500 text-white flex items-center justify-center font-serif text-xl font-extrabold shadow-md">
                શ્રી
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-wide block leading-tight">
                  {isGujarati ? 'શ્રીજી ઘરગથ્થુ ફરસાણ' : settings.businessName}
                </span>
                <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">
                  {isGujarati ? 'પરંપરાગત ગુજરાતી સ્વાદ' : 'Authentic Gujarati Heritage'}
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-normal">
              {isGujarati
                ? 'ઘર જેવી પવિત્રતા, દાદીમાના પારંપરિક મસાલા અને ૧૦૦% શુદ્ધ સામગ્રી સાથે તમારા દરેક ઉત્સવ અને પ્રસંગ માટે સ્વાદિષ્ટ ફરસાણ.'
                : `${settings.tagline} Bringing the warmth and hospitality of an authentic Gujarati mother's kitchen to your celebrations.`}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href={`https://wa.me/${settings.whatsappPhone || '919876543210'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold transition shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isGujarati ? 'વોટ્સએપ ઓર્ડર હેલ્પલાઇન' : 'WhatsApp Helpline'}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-base font-extrabold text-white mb-3 border-l-2 border-saffron-500 pl-2.5">
              {isGujarati ? 'ઝડપી લિંક્સ' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/" className="hover:text-saffron-400 transition">{t('home')}</Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-saffron-400 transition">{t('menu')}</Link>
              </li>
              <li>
                <Link to="/catering" className="hover:text-saffron-400 transition">{t('catering')}</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-saffron-400 transition">{t('contact')}</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-saffron-400 transition">{isGujarati ? 'ગોપનીયતા નીતિ' : 'Privacy Policy'}</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-saffron-400 transition">{isGujarati ? 'નિયમો અને શરતો' : 'Terms & Conditions'}</Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="lg:col-span-3">
            <h4 className="text-base font-extrabold text-white mb-3 border-l-2 border-kothmir-500 pl-2.5">
              {isGujarati ? 'વાનગીઓની શ્રેણી' : 'Categories'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/menu?category=farsan" className="hover:text-saffron-400 transition">{isGujarati ? 'ગરમાગરમ ફરસાણ (ખમણ/ખાંડવી)' : 'Steamed & Fried Farsan'}</Link>
              </li>
              <li>
                <Link to="/menu?category=namkeen" className="hover:text-saffron-400 transition">{isGujarati ? 'ક્રિસ્પી નમકીન (ગાંઠિયા/સેવ)' : 'Crunchy Dry Namkeen'}</Link>
              </li>
              <li>
                <Link to="/menu?category=gujarati-snacks" className="hover:text-saffron-400 transition">{isGujarati ? 'મેથીના થેપલા અને નાસ્તો' : 'Methi Thepla & Snacks'}</Link>
              </li>
              <li>
                <Link to="/menu?category=sweets" className="hover:text-saffron-400 transition">{isGujarati ? 'શુદ્ધ ઘીની મિઠાઈ (મોહનથાળ)' : 'Pure Ghee Sweets'}</Link>
              </li>
              <li>
                <Link to="/menu?category=festive-combos" className="hover:text-saffron-400 transition">{isGujarati ? 'તહેવાર ગિફ્ટ બોક્સ' : 'Festive Gift Boxes'}</Link>
              </li>
              <li>
                <Link to="/menu?category=catering-packages" className="hover:text-saffron-400 transition">{isGujarati ? 'લાઈવ કેટરિંગ પેકેજ' : 'Live Catering Packages'}</Link>
              </li>
            </ul>
          </div>

          {/* Business Hours & Contact */}
          <div className="lg:col-span-3 space-y-2.5 text-xs sm:text-sm">
            <h4 className="text-base font-extrabold text-white mb-3 border-l-2 border-amber-500 pl-2.5">
              {isGujarati ? 'રસોડું અને સમય' : 'Kitchen & Contact'}
            </h4>
            <p className="flex items-start gap-2 text-stone-400">
              <MapPin className="w-4 h-4 text-saffron-500 shrink-0 mt-0.5" />
              <span>{settings.address}, {settings.city}</span>
            </p>
            <p className="flex items-center gap-2 text-stone-400">
              <Phone className="w-4 h-4 text-saffron-500 shrink-0" />
              <a href={`tel:${settings.contactPhone}`} className="hover:text-white transition font-bold text-white">
                {settings.contactPhone}
              </a>
            </p>
            <p className="flex items-center gap-2 text-stone-400">
              <Mail className="w-4 h-4 text-saffron-500 shrink-0" />
              <a href={`mailto:${settings.email}`} className="hover:text-white transition">
                {settings.email}
              </a>
            </p>
            <div className="pt-2 text-[11px] text-stone-400 border-t border-stone-800">
              <p className="flex items-center gap-1.5 text-stone-300 font-bold mb-0.5">
                <Clock className="w-3.5 h-3.5 text-kothmir-400 shrink-0" /> {settings.businessHours}
              </p>
              <p className="text-stone-500">
                {isGujarati ? 'સવારની બેચ: ૮:૩૦ વાગ્યાથી • સાંજની બેચ: ૪:૩૦ વાગ્યાથી' : 'Morning batches from 8:30 AM • Evening from 4:30 PM'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Admin Portal Link */}
        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>
            &copy; {new Date().getFullYear()} {isGujarati ? 'શ્રીજી ઘરગથ્થુ ફરસાણ' : settings.businessName}. સર્વાધિકાર સુરક્ષિત.
          </p>

          <div className="flex items-center gap-3">
            <span>{isGujarati ? 'સમગ્ર અમદાવાદમાં હોમ ડિલિવરી' : 'Delivering across Ahmedabad'}</span>
            <span>•</span>
            <Link
              to="/admin/login"
              className="flex items-center gap-1 text-stone-500 hover:text-stone-300 transition"
              title="Admin Portal"
            >
              <Lock className="w-3 h-3" /> {t('adminLogin')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
