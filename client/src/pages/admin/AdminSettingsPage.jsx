import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, AlertCircle, Plus, X } from 'lucide-react';
import { settingsService } from '../../services/settingsService';
import { useSettings } from '../../context/SettingsContext';

const AdminSettingsPage = () => {
  const { refreshSettings } = useSettings();

  const [formData, setFormData] = useState({
    businessName: '',
    tagline: '',
    contactPhone: '',
    whatsappPhone: '',
    email: '',
    notificationEmail: '',
    address: '',
    city: '',
    serviceAreas: [],
    businessHours: '',
    minimumOrderAmount: 200,
    deliveryFee: 40,
    freeDeliveryThreshold: 800,
    advanceBookingHours: 4,
    orderTimeSlots: [],
    isStoreOpen: true,
    closureNotice: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Local helper for adding a new service area
  const [newArea, setNewArea] = useState('');
  const [newSlot, setNewSlot] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await settingsService.getAdminSettings();
        if (data.success && data.settings) {
          setFormData(data.settings);
        }
      } catch (err) {
        console.error('Error fetching admin settings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleAddArea = () => {
    if (!newArea.trim()) return;
    setFormData((prev) => ({
      ...prev,
      serviceAreas: [...prev.serviceAreas, newArea.trim()],
    }));
    setNewArea('');
  };

  const handleRemoveArea = (index) => {
    setFormData((prev) => ({
      ...prev,
      serviceAreas: prev.serviceAreas.filter((_, i) => i !== index),
    }));
  };

  const handleAddSlot = () => {
    if (!newSlot.trim()) return;
    setFormData((prev) => ({
      ...prev,
      orderTimeSlots: [...prev.orderTimeSlots, newSlot.trim()],
    }));
    setNewSlot('');
  };

  const handleRemoveSlot = (index) => {
    setFormData((prev) => ({
      ...prev,
      orderTimeSlots: prev.orderTimeSlots.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const payload = {
        ...formData,
        minimumOrderAmount: Number(formData.minimumOrderAmount),
        deliveryFee: Number(formData.deliveryFee),
        freeDeliveryThreshold: Number(formData.freeDeliveryThreshold),
        advanceBookingHours: Number(formData.advanceBookingHours),
      };

      const res = await settingsService.updateSettings(payload);
      if (res.success) {
        setSuccessMsg('Settings updated successfully!');
        refreshSettings();
      } else {
        throw new Error(res.message || 'Update failed');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-saffron-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900">
          Website &amp; Store Configuration
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Configure business profile, order delivery fees, operating hours, notification email, and online ordering availability.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs sm:text-sm">
        {/* Store Open / Closed Status Card */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <h2 className="font-serif text-base font-bold text-stone-900 border-b border-stone-200 pb-2">
            Store Availability &amp; Holiday Status
          </h2>

          <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
            <div>
              <span className="font-bold text-stone-900 block text-sm">Accept Online Orders</span>
              <p className="text-xs text-stone-500">
                When turned off, customers cannot checkout online and will see your closure notice.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isStoreOpen"
                checked={formData.isStoreOpen}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {!formData.isStoreOpen && (
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Temporary Closure Notice / Holiday Message
              </label>
              <textarea
                rows="2"
                name="closureNotice"
                value={formData.closureNotice}
                onChange={handleChange}
                placeholder="e.g. We are closed for Diwali celebrations until Nov 5. For urgent bulk orders, please call us directly."
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Business Branding */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <h2 className="font-serif text-base font-bold text-stone-900 border-b border-stone-200 pb-2">
            Business Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-stone-700 mb-1">Business Name</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Tagline</label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-stone-700 mb-1">Display Phone</label>
              <input
                type="text"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">WhatsApp Number (with country code)</label>
              <input
                type="text"
                name="whatsappPhone"
                value={formData.whatsappPhone}
                onChange={handleChange}
                placeholder="919876543210"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Public Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">
              Owner Notification Email (Receives New Orders &amp; Catering Alerts) *
            </label>
            <input
              type="email"
              required
              name="notificationEmail"
              value={formData.notificationEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-stone-700 mb-1">Kitchen Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">City &amp; State</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">Business Hours Display</label>
            <input
              type="text"
              name="businessHours"
              value={formData.businessHours}
              onChange={handleChange}
              placeholder="e.g. Monday - Sunday: 8:00 AM - 9:00 PM"
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none"
            />
          </div>
        </div>

        {/* Pricing & Delivery Settings */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <h2 className="font-serif text-base font-bold text-stone-900 border-b border-stone-200 pb-2">
            Pricing, Delivery &amp; Booking Rules
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-stone-700 mb-1">Minimum Order Amount (₹)</label>
              <input
                type="number"
                min="0"
                name="minimumOrderAmount"
                value={formData.minimumOrderAmount}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Standard Delivery Fee (₹)</label>
              <input
                type="number"
                min="0"
                name="deliveryFee"
                value={formData.deliveryFee}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Free Delivery Threshold (₹)</label>
              <input
                type="number"
                min="0"
                name="freeDeliveryThreshold"
                value={formData.freeDeliveryThreshold}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Service Areas */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <h2 className="font-serif text-base font-bold text-stone-900 border-b border-stone-200 pb-2">
            Configured Delivery Areas
          </h2>

          <div className="flex flex-wrap gap-2">
            {formData.serviceAreas.map((area, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 text-stone-800 rounded-xl border border-stone-200 font-medium"
              >
                <span>{area}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveArea(idx)}
                  className="text-stone-400 hover:text-red-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2 max-w-sm">
            <input
              type="text"
              value={newArea}
              onChange={(e) => setNewArea(e.target.value)}
              placeholder="e.g. Chandkheda, Satellite"
              className="flex-1 px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddArea}
              className="px-3 py-1.5 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-bold"
            >
              Add Area
            </button>
          </div>
        </div>

        {/* Order Time Slots */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <h2 className="font-serif text-base font-bold text-stone-900 border-b border-stone-200 pb-2">
            Available Order Time Slots
          </h2>

          <div className="space-y-2">
            {formData.orderTimeSlots.map((slot, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs font-semibold text-stone-800"
              >
                <span>{slot}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSlot(idx)}
                  className="text-stone-400 hover:text-red-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2 max-w-md">
            <input
              type="text"
              value={newSlot}
              onChange={(e) => setNewSlot(e.target.value)}
              placeholder="e.g. 02:00 PM - 04:00 PM (Afternoon)"
              className="flex-1 px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddSlot}
              className="px-3 py-1.5 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-bold shrink-0"
            >
              Add Time Slot
            </button>
          </div>
        </div>

        {/* Save button */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-saffron-600 hover:bg-saffron-700 disabled:bg-stone-400 text-white font-bold rounded-xl text-xs sm:text-sm transition flex items-center gap-2 shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Settings...' : 'Save All Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettingsPage;
