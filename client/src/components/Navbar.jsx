import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Phone, Clock, MapPin, Sparkles, ChefHat, Globe, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const { settings } = useSettings();
  const { language, toggleLanguage, t, isGujarati } = useLanguage();
  const navigate = useNavigate();

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('menu'), path: '/menu' },
    { name: t('catering'), path: '/catering' },
    { name: t('contact'), path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-orange-100 transition-all duration-300">
      {/* Top Notice Bar */}
      <div className="bg-orange-50 text-orange-800 text-[10px] sm:text-[11px] py-2 px-4 sm:px-8 font-bold uppercase tracking-widest border-b border-orange-100">
        <div className="w-full max-w-[1720px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <Sparkles className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span className="truncate opacity-90">
              {t('topBanner')}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 shrink-0">
            <span className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
              <Clock className="w-3.5 h-3.5 text-orange-500" /> {settings.businessHours}
            </span>
            <div className="w-px h-3 bg-orange-200"></div>
            <a
              href={`tel:${settings.contactPhone}`}
              className="hover:text-orange-600 transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-orange-500" /> {t('callKitchen')}: {settings.contactPhone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-10 xl:px-12">
        <div className="flex items-center justify-between h-14 sm:h-20 gap-2">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <div className="relative">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg bg-saffron-600 text-white flex items-center justify-center font-serif text-base sm:text-xl font-bold shadow-saffron transition-all duration-300">
                <span className="relative z-10">{isGujarati ? 'શ્રી' : 'S'}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="font-serif text-sm sm:text-2xl font-bold tracking-tight text-stone-900 group-hover:text-saffron-600 transition-colors duration-300 leading-none">
                {isGujarati ? 'શ્રીજી ઘરગથ્થુ' : 'Shreeji Homemade'}
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[8px] sm:text-[10px] uppercase tracking-wider text-orange-600 font-bold">
                  {isGujarati ? 'અસલ સ્વાદ' : 'Authentic Farsan'}
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'text-saffron-700 bg-orange-50'
                      : 'text-stone-600 hover:text-saffron-600 hover:bg-orange-50/50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border border-orange-100 bg-white hover:bg-orange-50 text-stone-700 text-[10px] font-bold uppercase tracking-wider transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-orange-500" />
              <span>{language === 'gu' ? 'EN' : 'ગુજરાતી'}</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 transition-all flex items-center justify-center active:scale-95 group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-saffron-600 text-white text-[9px] sm:text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Catering CTA desktop */}
            <Link
              to="/catering"
              className="hidden xl:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-saffron-600 text-white text-[10px] font-bold uppercase tracking-wider hover:bg-saffron-700 transition-all active:scale-95 shadow-sm"
            >
              <ChefHat className="w-4 h-4" />
              <span>{t('bookCatering')}</span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 transition-all active:scale-95 flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-cream-200 bg-white/98 backdrop-blur-lg px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fade-in">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-xl text-center text-sm font-bold transition flex items-center justify-center gap-1.5 ${
                    isActive ? 'text-saffron-800 bg-saffron-100/70 border border-saffron-200 shadow-sm' : 'text-stone-800 bg-cream-50 hover:bg-cream-100 border border-cream-200'
                  }`
                }
              >
                <span>{link.name}</span>
              </NavLink>
            ))}
          </div>

          <div className="pt-2 border-t border-cream-200 space-y-2">
            <Link
              to="/catering"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-kothmir-700 to-kothmir-800 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
            >
              <ChefHat className="w-4 h-4 text-amber-300" />
              <span>{t('bookCatering')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`tel:${settings.contactPhone}`}
              className="flex items-center justify-center gap-2 py-2.5 text-xs text-stone-700 font-bold bg-cream-50 rounded-xl border border-cream-200"
            >
              <Phone className="w-4 h-4 text-saffron-600" /> {t('callKitchen')}: {settings.contactPhone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
