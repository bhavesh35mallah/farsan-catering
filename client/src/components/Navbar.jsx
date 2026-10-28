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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-cream-300 shadow-sm transition-all">
      {/* Top Notice Bar */}
      <div className="bg-gradient-to-r from-saffron-700 via-saffron-600 to-amber-600 text-white text-[11px] sm:text-xs py-1.5 px-3 sm:px-6 font-medium">
        <div className="w-full max-w-[1720px] mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 truncate">
            <Sparkles className="w-3.5 h-3.5 text-amber-200 shrink-0 animate-pulse" />
            <span className="truncate">
              {t('topBanner')}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs text-saffron-100 shrink-0">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {settings.businessHours}
            </span>
            <span>•</span>
            <a
              href={`tel:${settings.contactPhone}`}
              className="hover:text-white transition flex items-center gap-1 font-bold"
            >
              <Phone className="w-3.5 h-3.5" /> {t('callKitchen')}: {settings.contactPhone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-saffron-700 via-saffron-600 to-amber-500 text-white flex items-center justify-center font-serif text-lg sm:text-xl font-bold shadow-md ring-2 ring-saffron-100 group-hover:scale-105 transition-transform duration-200">
              શ્રી
            </div>
            <div>
              <div className="font-serif text-lg sm:text-2xl font-extrabold tracking-tight text-stone-900 group-hover:text-saffron-700 transition leading-tight">
                {isGujarati ? 'શ્રીજી ઘરગથ્થુ' : 'Shreeji Homemade'}{' '}
                <span className="text-saffron-600 font-normal">
                  {isGujarati ? 'ફરસાણ' : 'Farsan'}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-kothmir-800 font-bold flex items-center gap-1">
                <ChefHat className="w-3 h-3 text-kothmir-600 shrink-0" />
                <span className="truncate">{isGujarati ? 'અસલ કાઠિયાવાડી-સુરતી રસોડું' : 'Pure Groundnut Oil & Cow Ghee'}</span>
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-sm font-bold transition-all duration-150 ${
                    isActive
                      ? 'text-saffron-700 bg-saffron-50 shadow-sm'
                      : 'text-stone-700 hover:text-saffron-600 hover:bg-cream-100'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons: Language Toggle + Catering Button + Cart */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Language Switcher Pill */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border border-cream-300 bg-cream-50 hover:bg-cream-100 text-stone-800 text-xs font-bold transition shadow-sm active:scale-95"
              title="Switch Language / ભાષા બદલો"
              aria-label="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-saffron-600 shrink-0" />
              <span className={language === 'gu' ? 'font-extrabold text-saffron-700' : 'text-stone-500'}>
                ગુજરાતી
              </span>
              <span className="text-stone-300">/</span>
              <span className={language === 'en' ? 'font-extrabold text-saffron-700' : 'text-stone-500'}>
                EN
              </span>
            </button>

            {/* Catering CTA desktop */}
            <Link
              to="/catering"
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-kothmir-700 to-kothmir-800 text-white text-xs font-bold uppercase tracking-wider hover:from-kothmir-800 hover:to-kothmir-900 transition shadow-sm active:scale-95"
            >
              <ChefHat className="w-3.5 h-3.5 text-amber-300" />
              <span>{t('bookCatering')}</span>
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative p-2 sm:p-2.5 rounded-full bg-cream-100 hover:bg-saffron-50 text-stone-800 hover:text-saffron-600 transition flex items-center justify-center active:scale-95"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-saffron-600 text-white text-[10px] sm:text-[11px] font-extrabold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-stone-700 hover:bg-cream-100 active:scale-95"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-stone-900" /> : <Menu className="w-6 h-6 text-stone-900" />}
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
