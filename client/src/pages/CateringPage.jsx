import React, { useState } from 'react';
import {
  ChefHat,
  Users,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Phone,
  MessageCircle,
  AlertCircle,
  Utensils,
} from 'lucide-react';
import { cateringService } from '../services/cateringService';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';

const CateringPage = () => {
  const { settings } = useSettings();
  const { language } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Family Function / Pooja',
    eventDate: '',
    guestCount: 30,
    eventLocation: '',
    requiredItems: '',
    estimatedBudget: '',
    additionalRequirements: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const eventTypesEn = [
    'Family Function / Pooja',
    'Birthday / Anniversary Party',
    'Wedding / Engagement / Sangeet',
    'Office / Corporate Lunch',
    'High Tea Live Farsan Counter',
    'Festive Get-Together (Diwali/Holi)',
    'Other Event',
  ];

  const eventTypesGu = [
    'પારિવારિક પૂજા / પ્રસંગ',
    'જન્મદિવસ / એનિવર્સરી પાર્ટી',
    'લગ્નપ્રસંગ / સગાઈ / સંગીત સંધ્યા',
    'ઑફિસ / કૉર્પોરેટ લંચ',
    'લાઈવ હાઈ-ટી ફરસાણ કાઉન્ટર',
    'તહેવાર ગેટ-ટુગેધર (દિવાળી/હોળી)',
    'અન્ય ખાસ પ્રસંગ',
  ];

  const popularMenusEn = [
    {
      title: 'Traditional Gujarati Bhojan Package',
      items: 'Mohan Thal or Kaju Katli, Nylon Khaman, Silky Khandvi, Methi Thepla, Gujarati Kadhi-Khichdi or Dal-Rice, Sambharo, and Fresh Chutneys.',
      badge: 'Most Popular',
    },
    {
      title: 'Live High Tea & Evening Party Counter',
      items: 'Live Steaming Khaman Dhokla, Crispy Dakori Methi Gota, Cocktail Samosa, Sev Khamani, Masala Chai, and Assorted Chutneys.',
      badge: 'Live Counter',
    },
    {
      title: 'Sunday Morning Fafda-Jalebi Feast',
      items: 'Crispy Wooden-Board Fafda, Hot Crispy Jalebi in Pure Ghee, Raw Papaya Sambharo, Kadhi, and Fried Green Chilies.',
      badge: 'Weekend Special',
    },
  ];

  const popularMenusGu = [
    {
      title: 'પારંપરિક ગુજરાતી ભોજન થાળી પેકેજ',
      items: 'શુદ્ધ ઘીનો મોહનથાળ અથવા કાજુ કતરી, નાયલોન ખમણ, સિલ્કી ખાંડવી, ગરમાગરમ મેથીના થેપલા, ગુજરાતી કઢી-ખીચડી અથવા દાળ-ભાત, સંભારો અને ચટણી.',
      badge: 'સૌથી વધુ પસંદગી',
    },
    {
      title: 'લાઈવ હાઈ-ટી અને સાંજની પાર્ટી કાઉન્ટર',
      items: 'ગરમાગરમ લાઈવ ખમણ ઢોકળા, ડાકોરી ક્રિસ્પી મેથીના ગોટા, કોકટેલ સમોસા, સેવ ખમણી, આદુવાળી મસાલા ચા અને સ્વાદિષ્ટ ચટણીઓ.',
      badge: 'લાઈવ કાઉન્ટર',
    },
    {
      title: 'રવિવાર મોર્નિંગ ફાફડા-જલેબી દાવત',
      items: 'પાટિયા પર વણેલા ક્રિસ્પી ફાફડા, શુદ્ધ ઘીની ગરમાગરમ જલેબી, કાચા પપૈયાનો સંભારો, બેસનની કઢી અને તળેલા લીલાં મરચાં.',
      badge: 'વીકએન્ડ સ્પેશિયલ',
    },
  ];

  const popularMenus = language === 'gu' ? popularMenusGu : popularMenusEn;
  const eventTypes = language === 'gu' ? eventTypesGu : eventTypesEn;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setError('Please provide your name, phone, and email.');
      return;
    }

    if (!formData.eventDate || !formData.eventLocation.trim() || !formData.requiredItems.trim()) {
      setError('Please provide event date, venue location, and your preferred food menu.');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        customer: {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
        },
        eventType: formData.eventType,
        eventDate: formData.eventDate,
        guestCount: Number(formData.guestCount),
        eventLocation: formData.eventLocation.trim(),
        requiredItems: formData.requiredItems.trim(),
        estimatedBudget: formData.estimatedBudget.trim(),
        additionalRequirements: formData.additionalRequirements.trim(),
      };

      const response = await cateringService.createEnquiry(payload);
      if (response.success) {
        setSubmitted(true);
      } else {
        throw new Error(response.message || 'Failed to submit catering enquiry');
      }
    } catch (err) {
      console.error('Catering submission error:', err);
      setError(err.message || 'An error occurred while submitting your enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-stone-950 via-stone-900 to-stone-900 text-white py-16 sm:py-24 border-b-4 border-saffron-600 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-saffron-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-kothmir-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-saffron-600/25 text-amber-300 text-xs font-extrabold uppercase tracking-wider border border-saffron-500/30 mb-4 shadow-sm">
            <ChefHat className="w-4 h-4 text-amber-300" /> {language === 'gu' ? 'અસલ ગુજરાતી કેટરિંગ અને બલ્ક ઓર્ડર સેવા' : 'Authentic Gujarati Catering & Bulk Orders'}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white max-w-4xl mx-auto leading-tight">
            {language === 'gu' ? 'શુદ્ધ ઘરગથ્થુ સ્વાદ સાથે પ્રસંગ ઉજવો' : 'Celebrate with Pure Homemade Flavours'}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-stone-300 max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
            {language === 'gu'
              ? '૧૫ મહેમાનોની નાની પારિવારિક પૂજાથી લઈને ૫૦૦+ મહેમાનોના ભવ્ય લગ્નપ્રસંગ સુધી. લાઈવ ગરમાગરમ ફરસાણ કાઉન્ટર, પારંપરિક ગુજરાતી મિઠાઈ અને આતિથ્ય સત્કાર.'
              : 'From intimate gatherings of 15 guests to grand weddings of 500+ guests. We bring fresh live farsan counters, traditional Gujarati delicacies, and warm hospitality.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-xs text-stone-300">
            <span className="bg-stone-800/80 px-3 py-1.5 rounded-full border border-stone-700 font-bold">✨ ૨૫ થી ૫૦૦+ મહેમાનો</span>
            <span className="bg-stone-800/80 px-3 py-1.5 rounded-full border border-stone-700 font-bold">🔥 લાઈવ ગરમાગરમ કાઉન્ટર</span>
            <span className="bg-stone-800/80 px-3 py-1.5 rounded-full border border-stone-700 font-bold">🌿 ૧૦૦% શુદ્ધ જૈન વ્યવસ્થા</span>
          </div>
        </div>
      </section>

      {/* Popular Sample Menus */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-saffron-700 bg-saffron-50 px-3.5 py-1 rounded-full border border-saffron-200">
            {language === 'gu' ? 'લોકપ્રિય પેકેજ' : 'Curated Packages'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mt-2">
            {language === 'gu' ? 'કેટરિંગ માટે લોકપ્રિય ગુજરાતી મેનુ' : 'Popular Catering Menus'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            {language === 'gu' ? 'તમારી પસંદગી, મહેમાનોની સંખ્યા અને બજેટ મુજબ મેનુ બદલી શકાય છે.' : 'All packages are customizable to your preference, dietary needs, and guest count.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularMenus.map((menu, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl border border-cream-300 shadow-soft p-6 sm:p-7 flex flex-col justify-between hover:border-saffron-400 hover:shadow-hover transition-all duration-300"
            >
              <div>
                <span className="inline-block bg-kothmir-50 text-kothmir-800 text-xs font-extrabold px-3 py-1 rounded-full border border-kothmir-200 mb-3 shadow-2xs">
                  {menu.badge}
                </span>
                <h3 className="font-extrabold text-lg sm:text-xl text-stone-900 mb-2">
                  {menu.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  {menu.items}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-cream-200">
                <button
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      requiredItems: `${menu.title}: ${menu.items}`,
                    }));
                    window.scrollTo({
                      top: document.getElementById('enquiry-form')?.offsetTop - 80,
                      behavior: 'smooth',
                    });
                  }}
                  className="w-full text-center py-2.5 bg-cream-100 hover:bg-saffron-600 text-saffron-800 hover:text-white text-xs font-extrabold rounded-xl border border-cream-300 hover:border-saffron-600 transition shadow-xs active:scale-95"
                >
                  {language === 'gu' ? 'આ મેનુ પેકેજ પસંદ કરો' : 'Select this Menu Package'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Catering Form Section */}
      <section id="enquiry-form" className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="bg-white rounded-3xl border border-cream-300 shadow-soft p-6 sm:p-10">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-kothmir-100 text-kothmir-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900">
                {language === 'gu' ? 'કેટરિંગ પૂછપરછ સફળતાપૂર્વક મોકલાઈ ગઈ છે!' : 'Enquiry Submitted Successfully!'}
              </h2>
              <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                {language === 'gu'
                  ? `આભાર, ${formData.name}. અમારા કેટરિંગ મેનેજર તમારી વિગતો (${formData.guestCount} મહેમાનો, તારીખ ${formData.eventDate}) તપાસીને તમને ${formData.phone} પર કૉલ કરશે.`
                  : `Thank you, ${formData.name}. Our catering manager will review your requirement for ${formData.guestCount} guests on ${formData.eventDate} and call you on ${formData.phone} with custom options and quote.`}
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 bg-cream-100 hover:bg-cream-200 text-stone-800 text-xs font-bold rounded-xl transition"
                >
                  {language === 'gu' ? 'બીજી પૂછપરછ મોકલો' : 'Submit Another Enquiry'}
                </button>
                <a
                  href={`tel:${settings.contactPhone}`}
                  className="px-5 py-2.5 bg-saffron-600 hover:bg-saffron-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" /> {language === 'gu' ? 'સીધો ફોન કરો:' : 'Call Directly:'} {settings.contactPhone}
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-cream-200 pb-4">
                <h2 className="font-serif text-2xl font-extrabold text-stone-900">
                  {language === 'gu' ? 'કેટરિંગ ભાવપત્રક અને માહિતી મેળવો' : 'Request a Custom Catering Quote'}
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  {language === 'gu'
                    ? 'તમારા પ્રસંગની વિગતો ભરો. અમે તમને યોગ્ય મેનુ વિકલ્પો અને વ્યાજબી ભાવ સાથે સંપર્ક કરીશું.'
                    : 'Fill in your event details and our kitchen coordinator will get back to you with menu options and pricing.'}
                </p>
              </div>

              {error && (
                <div className="p-3.5 bg-red-50 text-red-800 rounded-xl text-xs flex items-center gap-2 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {language === 'gu' ? 'તમારું પૂરું નામ *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={language === 'gu' ? 'દા.ત. ભાવેશભાઈ પટેલ' : 'e.g. Bhavin Shah'}
                    className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {language === 'gu' ? 'મોબાઈલ નંબર *' : 'Mobile Number *'}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {language === 'gu' ? 'ઈમેલ એડ્રેસ *' : 'Email Address *'}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/20"
                  />
                </div>
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {language === 'gu' ? 'પ્રસંગનો પ્રકાર *' : 'Event Type *'}
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/20 font-medium"
                  >
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-saffron-600" /> {language === 'gu' ? 'પ્રસંગની તારીખ *' : 'Event Date *'}
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    required
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-saffron-600" /> {language === 'gu' ? 'અંદાજિત મહેમાનો *' : 'Expected Guests *'}
                  </label>
                  <input
                    type="number"
                    name="guestCount"
                    min="5"
                    required
                    value={formData.guestCount}
                    onChange={handleChange}
                    placeholder="50"
                    className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/20"
                  />
                </div>
              </div>

              {/* Location & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-saffron-600" /> {language === 'gu' ? 'પ્રસંગનું સ્થળ / વિસ્તાર *' : 'Event Location / Venue Area *'}
                  </label>
                  <input
                    type="text"
                    name="eventLocation"
                    required
                    value={formData.eventLocation}
                    onChange={handleChange}
                    placeholder={language === 'gu' ? 'દા.ત. સેટેલાઇટ / બોડકદેવ, અમદાવાદ' : 'e.g. Rajpath Club Lawns, SG Highway, Ahmedabad'}
                    className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {language === 'gu' ? 'અંદાજિત બજેટ (વૈકલ્પિક)' : 'Estimated Budget (Optional)'}
                  </label>
                  <input
                    type="text"
                    name="estimatedBudget"
                    value={formData.estimatedBudget}
                    onChange={handleChange}
                    placeholder={language === 'gu' ? 'દા.ત. ₹૨૫૦ પ્રતિ વ્યક્તિ' : 'e.g. ₹200 - ₹350 per person or ₹15,000 total'}
                    className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/20"
                  />
                </div>
              </div>

              {/* Menu and Requirements */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {language === 'gu' ? 'જરૂરી ફરસાણ / મનપસંદ વાનગીઓની યાદી *' : 'Required Food Items / Preferred Menu *'}
                </label>
                <textarea
                  rows="3"
                  name="requiredItems"
                  required
                  value={formData.requiredItems}
                  onChange={handleChange}
                  placeholder={language === 'gu' ? 'દા.ત. નાયલોન ખમણ, ખાંડવી, મેથીના ગોટા, મસાલા ચા, મોહનથાળ અને થેપલા' : 'e.g. Nylon Khaman, Khandvi, Methi Gota, Masala Chai, Mohan Thal, and Thepla'}
                  className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {language === 'gu' ? 'વિશેષ નોંધ / જૈન ભોજન સૂચના' : 'Additional Dietary Instructions / Notes'}
                </label>
                <textarea
                  rows="2"
                  name="additionalRequirements"
                  value={formData.additionalRequirements}
                  onChange={handleChange}
                  placeholder={language === 'gu' ? 'દા.ત. ૧૫ જૈન થાળી (કંદમૂળ વગર) અને ૨ સર્વિંગ સ્ટાફની જરૂર છે.' : 'e.g. Need 15 Jain plates without root vegetables/onion/garlic. Require 2 service staff members.'}
                  className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/20"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-saffron-600 hover:bg-saffron-700 disabled:bg-stone-400 text-white font-bold rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-md"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{language === 'gu' ? 'પૂછપરછ મોકલાઈ રહી છે...' : 'Submitting Enquiry...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{language === 'gu' ? 'કેટરિંગ પૂછપરછ મોકલો' : 'Submit Catering Enquiry'}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default CateringPage;
