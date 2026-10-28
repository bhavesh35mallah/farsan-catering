import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Truck,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';

const ContactPage = () => {
  const { settings } = useSettings();
  const { language } = useLanguage();
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-10 sm:py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-saffron-700 bg-saffron-50 px-3 py-1 rounded-full border border-saffron-200">
          {language === 'gu' ? 'અમારો સંપર્ક કરો' : 'Get In Touch'}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 mt-2">
          {language === 'gu' ? 'રસોડું અને દુકાન સંપર્ક' : 'Contact Our Kitchen & Store'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-2">
          {language === 'gu'
            ? 'દરરોજની તાજી બેચ, પાર્ટી ઓર્ડર કે ખાસ ફરસાણ બોક્સ વિશે કોઈ પણ પ્રશ્ન હોય તો અમને જણાવો. અમે મદદ કરવા આતુર છીએ!'
            : 'Have queries about fresh daily batches, party orders, or customized farsan boxes? We are happy to help!'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-cream-300 shadow-soft space-y-5">
            <h2 className="font-serif text-lg font-bold text-stone-900 border-b border-cream-200 pb-3">
              {language === 'gu' ? 'રસોડાની માહિતી' : 'Kitchen Information'}
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-saffron-100 text-saffron-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">{language === 'gu' ? 'રસોડું અને પિકઅપ સરનામું' : 'Kitchen & Pickup Address'}</h4>
                  <p className="text-stone-600 mt-0.5">{settings.address}</p>
                  <p className="text-stone-600">{settings.city}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-kothmir-100 text-kothmir-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">{language === 'gu' ? 'ફોન અને ઓર્ડર હેલ્પલાઇન' : 'Phone & Order Helpline'}</h4>
                  <a href={`tel:${settings.contactPhone}`} className="text-saffron-700 font-bold hover:underline block mt-0.5">
                    {settings.contactPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">{language === 'gu' ? 'ઈમેલ એડ્રેસ' : 'Email Address'}</h4>
                  <a href={`mailto:${settings.email}`} className="text-stone-700 hover:text-saffron-700 block mt-0.5">
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">{language === 'gu' ? 'કામકાજના કલાકો' : 'Operational Hours'}</h4>
                  <p className="text-stone-600 mt-0.5">{settings.businessHours}</p>
                  <p className="text-[11px] text-stone-500">
                    {language === 'gu' ? 'સવારની બેચ: ૮:૩૦ વાગ્યાથી • સાંજની બેચ: ૪:૩૦ વાગ્યાથી' : 'Morning batches ready by 8:30 AM • Evening batches ready by 4:30 PM'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-cream-200">
              <a
                href={`https://wa.me/${settings.whatsappPhone || '919876543210'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{language === 'gu' ? 'વોટ્સએપ પર તરત વાત કરો' : 'Chat Instantly on WhatsApp'}</span>
              </a>
            </div>
          </div>

          {/* Service areas card */}
          <div className="bg-white p-6 rounded-2xl border border-cream-300 shadow-soft">
            <h3 className="font-serif text-base font-bold text-stone-900 mb-2 flex items-center gap-2">
              <Truck className="w-4 h-4 text-saffron-600" />
              {language === 'gu' ? 'હોમ ડિલિવરી વિસ્તારો' : 'Delivery Service Areas'}
            </h3>
            <p className="text-xs text-stone-600 mb-3">
              {language === 'gu'
                ? 'અમે અમદાવાદના નીચે જણાવેલ વિસ્તારોમાં ઝડપી ડિલિવરી પૂરી પાડીએ છીએ:'
                : 'We offer fast home delivery in the following Ahmedabad zones:'}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {settings.serviceAreas?.map((area, idx) => (
                <span
                  key={idx}
                  className="bg-cream-100 text-stone-700 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-cream-200"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Form & Map embed placeholder */}
        <div className="lg:col-span-7 space-y-6">
          {/* Quick contact form */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-cream-300 shadow-soft">
            <h2 className="font-serif text-lg font-bold text-stone-900 mb-1">
              {language === 'gu' ? 'અમને સંદેશો મોકલો' : 'Send Us a Message'}
            </h2>
            <p className="text-xs text-stone-500 mb-4">
              {language === 'gu'
                ? 'તમારો સંદેશો લખો, અમે તમને ફોન અથવા ઈમેલ પર ઝડપથી ઉત્તર આપીશું.'
                : 'Leave us a note and we will reply to your phone or email.'}
            </p>

            {sent ? (
              <div className="p-6 bg-kothmir-50 border border-kothmir-200 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-kothmir-700 mx-auto" />
                <h4 className="font-serif font-bold text-base text-stone-900">
                  {language === 'gu' ? 'સંદેશો મળી ગયો છે!' : 'Message Received!'}
                </h4>
                <p className="text-xs text-stone-600">
                  {language === 'gu'
                    ? 'સંપર્ક કરવા બદલ આભાર. અમે ટૂંક સમયમાં તમારો સંપર્ક કરીશું.'
                    : 'Thank you for reaching out. We will get back to you shortly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {language === 'gu' ? 'તમારું નામ' : 'Your Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={language === 'gu' ? 'દા.ત. કેતન શાહ' : 'e.g. Ketan Shah'}
                      className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {language === 'gu' ? 'મોબાઈલ નંબર' : 'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="9876543210"
                      className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {language === 'gu' ? 'ઈમેલ એડ્રેસ' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {language === 'gu' ? 'તમારો પ્રશ્ન / સંદેશો' : 'Your Query / Message'}
                  </label>
                  <textarea
                    rows="3"
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={language === 'gu' ? 'વાનગીઓ કે ઓર્ડર બાબતે તમને શી માહિતી જોઈએ છે?' : 'How can we assist you with our homemade farsan?'}
                    className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-saffron-600 hover:bg-saffron-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{language === 'gu' ? 'સંદેશો મોકલો' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Configurable Map Embed Placeholder */}
          <div className="bg-white p-4 rounded-2xl border border-cream-300 shadow-soft overflow-hidden">
            <h3 className="font-serif text-sm font-bold text-stone-900 mb-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-saffron-600" /> {language === 'gu' ? 'રસોડાનું સ્થાન / નકશો' : 'Kitchen Map Location'}
            </h3>
            <div className="w-full h-64 bg-cream-100 rounded-xl border border-cream-200 flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-saffron-100 text-saffron-700 flex items-center justify-center mb-2">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-stone-900 text-sm">{settings.businessName}</h4>
              <p className="text-xs text-stone-500 max-w-sm mt-0.5">
                {settings.address}, {settings.city}
              </p>
              <span className="mt-3 text-[11px] bg-white px-3 py-1 rounded-full text-stone-600 border border-cream-300 shadow-sm">
                {language === 'gu' ? 'સુભાષ ચોક / જૈન દેરાસર પાસે' : 'Near Subhash Chowk / Jain Derasar'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
