import React, { createContext, useContext, useState, useEffect } from 'react';
import { settingsService } from '../services/settingsService';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    businessName: 'Shreeji Homemade Farsan & Catering',
    tagline: 'Authentic Gujarati Farsan & Homemade Catering, Made Fresh with Love',
    contactPhone: '+91 98765 43210',
    whatsappPhone: '919876543210',
    email: 'contact@shreejifarsan.com',
    address: 'A-12, Ambica Krupa Society, Subhash Chowk',
    city: 'Ahmedabad, Gujarat 380052',
    serviceAreas: ['Navrangpura', 'Paldi', 'Satellite', 'Bodakdev', 'Vastrapur', 'Naranpura', 'Ghatlodia'],
    businessHours: 'Monday - Sunday: 8:00 AM - 9:00 PM',
    minimumOrderAmount: 200,
    deliveryFee: 40,
    freeDeliveryThreshold: 800,
    orderTimeSlots: [
      '09:00 AM - 11:00 AM (Morning Batch)',
      '11:00 AM - 01:00 PM (Lunch Hours)',
      '03:00 PM - 05:00 PM (Afternoon Tea/Snacks)',
      '05:00 PM - 07:00 PM (Evening Fresh Batch)',
      '07:00 PM - 09:00 PM (Dinner & Night)',
    ],
    isStoreOpen: true,
    closureNotice: '',
    currencySymbol: '₹',
  });
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const data = await settingsService.getPublicSettings();
      if (data && data.settings) {
        setSettings(data.settings);
      }
    } catch (err) {
      console.warn('Could not load online settings, using defaults.', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
