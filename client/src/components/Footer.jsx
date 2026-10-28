import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Heart, ShieldCheck, Truck, UtensilsCrossed, Lock, MessageCircle, Sparkles } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { settings } = useSettings();
  const { isGujarati, t } = useLanguage();

  return (
    <footer className={`bg-stone-50 text-stone-600 pt-16 pb-10 border-t border-orange-100 ${isGujarati ? 'font-gujarati' : ''}`}>
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Value Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 border-b border-orange-100">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-saffron-600 flex items-center justify-center text-2xl shadow-sm">
              🥜
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-base uppercase tracking-tight">
                {isGujarati ? '૧૦૦% શુદ્ધ સીંગતેલ' : 'Pure Groundnut Oil'}
              </h4>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed max-w-[220px]">
                {isGujarati ? 'ઝીરો પામતેલ, દરરોજ તાજા તેલમાં જ તળેલું ફરસાણ.' : 'Zero palm oil, never reused cooking oil.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-emerald-600 flex items-center justify-center text-2xl shadow-sm">
              🧈
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-base uppercase tracking-tight">
                {isGujarati ? 'શુદ્ધ ગાયના ઘીની મિઠાઈ' : 'Pure Cow Ghee'}
              </h4>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed max-w-[220px]">
                {isGujarati ? 'મોહનથાળ અને મિઠાઈઓ ૧૦૦% દેશી ગાયના ઘીમાં તૈયાર.' : 'Artisanal sweets prepared in 100% pure desi ghee.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-amber-600 flex items-center justify-center text-2xl shadow-sm">
              🚚
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-base uppercase tracking-tight">
                {isGujarati ? 'સેમ-ડે તાજી ડિલિવરી' : 'Fresh Delivery'}
              </h4>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed max-w-[220px]">
                {isGujarati ? 'અમદાવાદમાં સમયસર ગરમાગરમ પેક કરીને ડિલિવર.' : 'Warmly packed and dispatched across Ahmedabad.'}
              </p>
            </div>
          </div>
        </div>

        {/* Links & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 py-16">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-saffron-600 text-white flex items-center justify-center font-serif text-lg font-bold">
                શ્રી
              </div>
              <span className="font-bold text-xl text-stone-900 tracking-tight">
                {isGujarati ? 'શ્રીજી ઘરગથ્થુ ફરસાણ' : settings.businessName}
              </span>
            </div>
            <p className="text-sm text-stone-500 leading-relaxed max-w-md">
              {isGujarati
                ? 'ઘર જેવી પવિત્રતા, દાદીમાના પારંપરિક મસાલા અને ૧૦૦% શુદ્ધ સામગ્રી સાથે તમારા દરેક ઉત્સવ અને પ્રસંગ માટે સ્વાદિષ્ટ ફરસાણ.'
                : `${settings.tagline} Bringing authentic Gujarati kitchen warmth to your celebrations.`}
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href={`https://wa.me/${settings.whatsappPhone || '919876543210'}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-700 transition-all active:scale-95 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isGujarati ? 'વોટ્સએપ ઓર્ડર' : 'Order via WhatsApp'}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-widest mb-6">
              {isGujarati ? 'ઝડપી લિંક્સ' : 'Quick Links'}
            </h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-wider">
              <li><Link to="/" className="text-stone-500 hover:text-saffron-600 transition-colors">{t('home')}</Link></li>
              <li><Link to="/menu" className="text-stone-500 hover:text-saffron-600 transition-colors">{t('menu')}</Link></li>
              <li><Link to="/catering" className="text-stone-500 hover:text-saffron-600 transition-colors">{t('catering')}</Link></li>
              <li><Link to="/contact" className="text-stone-500 hover:text-saffron-600 transition-colors">{t('contact')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-widest mb-6">
              {isGujarati ? 'સંપર્ક' : 'Contact'}
            </h4>
            <div className="space-y-4 text-xs font-bold">
              <p className="flex items-start gap-3 text-stone-500">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>{settings.address}, {settings.city}</span>
              </p>
              <p className="flex items-center gap-3 text-stone-500">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <a href={`tel:${settings.contactPhone}`} className="text-stone-900 hover:text-saffron-600">
                  {settings.contactPhone}
                </a>
              </p>
              <p className="flex items-center gap-3 text-stone-900">
                <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                <span>{settings.businessHours}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-orange-100 flex flex-col sm:flex-row items-center justify-between gap-6 text-[10px] font-bold uppercase tracking-widest text-stone-400">
          <p>&copy; {new Date().getFullYear()} {isGujarati ? 'શ્રીજી ઘરગથ્થુ ફરસાણ' : settings.businessName}.</p>
          <div className="flex items-center gap-6">
            <Link to="/admin/login" className="hover:text-stone-600 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> {t('adminLogin')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
