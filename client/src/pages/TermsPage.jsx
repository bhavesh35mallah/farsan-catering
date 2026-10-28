import React from 'react';
import { FileText } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const TermsPage = () => {
  const { settings } = useSettings();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="bg-white rounded-3xl border border-cream-300 p-8 sm:p-12 shadow-soft space-y-6 text-stone-700 text-xs sm:text-sm leading-relaxed">
        <div className="flex items-center gap-3 border-b border-cream-200 pb-4">
          <div className="w-10 h-10 rounded-xl bg-saffron-100 text-saffron-800 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900">
              Terms &amp; Conditions
            </h1>
            <p className="text-xs text-stone-500">{settings.businessName} &bull; Food Ordering &amp; Catering Terms</p>
          </div>
        </div>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-stone-900">1. Fresh Preparation &amp; Shelf Life</h2>
          <p>
            All our farsan and snacks are cooked without artificial chemical preservatives. Steamed farsan like Khaman Dhokla and Khandvi are best consumed on the day of delivery. Dry namkeen and chakri should be stored in an airtight container away from moisture.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-stone-900">2. Order Confirmation &amp; Cutoff Times</h2>
          <p>
            Orders are confirmed upon successful online submission. Since every batch is prepared fresh, cancellation requests must be made at least 2 hours prior to the scheduled delivery slot by calling us directly.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-stone-900">3. Payment Terms</h2>
          <p>
            We currently support Cash on Delivery, Cash on Pickup, and digital UPI upon delivery (Google Pay, PhonePe, Paytm). Payment is due when the food is handed over.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-base text-stone-900">4. Catering Enquiries</h2>
          <p>
            Catering enquiries submitted via the website are subject to mutual date availability and quotation confirmation. A small booking advance is usually requested for bulk events and live counters.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;
