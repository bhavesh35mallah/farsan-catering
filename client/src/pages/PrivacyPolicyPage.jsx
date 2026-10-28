import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const PrivacyPolicyPage = () => {
  const { settings } = useSettings();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="bg-white rounded-3xl border border-cream-300 p-8 sm:p-12 shadow-soft space-y-6 text-stone-700 text-xs sm:text-sm leading-relaxed">
        <div className="flex items-center gap-3 border-b border-cream-200 pb-4">
          <div className="w-10 h-10 rounded-xl bg-kothmir-100 text-kothmir-800 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900">
              Privacy Policy
            </h1>
            <p className="text-xs text-stone-500">{settings.businessName} &bull; Effective 2026</p>
          </div>
        </div>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-stone-900">1. Information We Collect</h2>
          <p>
            When you place an order or submit a catering enquiry, we collect your name, mobile phone number, delivery address, and email address solely for preparing, dispatching, and confirming your fresh food order.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-stone-900">2. How We Use Your Information</h2>
          <p>
            Your details are used exclusively to coordinate kitchen preparation times, send automated order confirmation emails, and enable our delivery driver to reach your address. We never sell, rent, or trade your personal information with any third-party advertisers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-stone-900">3. Local Storage</h2>
          <p>
            Our website uses your browser's local storage to save your food cart temporarily so that your selected items remain intact if you accidentally refresh the page.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-stone-900">4. Contacting Us Regarding Privacy</h2>
          <p>
            If you have any questions regarding your data or wish to update your records, please contact us at{' '}
            <a href={`mailto:${settings.email}`} className="text-saffron-700 font-semibold">{settings.email}</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
