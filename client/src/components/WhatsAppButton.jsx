import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const WhatsAppButton = () => {
  const { settings } = useSettings();
  const phone = settings.whatsappPhone || '919876543210';
  const message = encodeURIComponent(`Namaste ${settings.businessName}, I would like to enquire about your fresh farsan / catering menu.`);

  return (
    <aside aria-label="WhatsApp quick contact" className="fixed bottom-20 md:bottom-6 right-5 z-30">
      <a
        href={`https://wa.me/${phone}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-1">
          WhatsApp Us
        </span>
      </a>
    </aside>
  );
};

export default WhatsAppButton;
