import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShoppingBag,
  Truck,
  Store,
  Calendar,
  Clock,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';
import { orderService } from '../services/orderService';

const CheckoutPage = () => {
  const { cart, subtotal, clearCart } = useCart();
  const { settings } = useSettings();
  const { isGujarati, t, getProductName } = useLanguage();
  const navigate = useNavigate();

  const getTodayDateStr = () => new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    orderType: 'Delivery', // Delivery or Pickup
    address: '',
    city: 'Ahmedabad',
    postalCode: '',
    landmark: '',
    requestedDate: getTodayDateStr(),
    requestedTimeSlot: settings.orderTimeSlots?.[0] || '11:00 AM - 01:00 PM (Lunch Hours)',
    paymentMethod: 'Cash on Delivery',
    specialInstructions: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  if (cart.length === 0) {
    return (
      <div className={`max-w-xl mx-auto px-4 py-16 text-center ${isGujarati ? 'font-gujarati' : ''}`}>
        <div className="w-16 h-16 rounded-full bg-cream-200 flex items-center justify-center mx-auto text-stone-400 mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-stone-900">{t('cartEmpty')}</h2>
        <p className="text-xs text-stone-500 mt-1 mb-6">
          {isGujarati
            ? 'ઓર્ડર કરવા માટે કૃપા કરીને પહેલાં કાર્ટમાં વાનગીઓ ઉમેરો.'
            : 'Please add items to your cart before proceeding to checkout.'}
        </p>
        <Link
          to="/menu"
          className="px-5 py-2.5 bg-saffron-600 text-white rounded-xl text-xs font-bold hover:bg-saffron-700 transition"
        >
          {isGujarati ? 'મેનુ પર પાછા જાઓ' : 'Return to Menu'}
        </Link>
      </div>
    );
  }

  const freeThreshold = settings.freeDeliveryThreshold || 800;
  const deliveryFee = formData.orderType === 'Pickup' ? 0 : subtotal >= freeThreshold ? 0 : settings.deliveryFee || 40;
  const grandTotal = subtotal + deliveryFee;

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = isGujarati ? 'નામ લખવું જરૂરી છે' : 'Full name is required';

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10 || cleanPhone.length > 13) {
      newErrors.phone = isGujarati ? 'સાચો ૧૦ અંકનો મોબાઈલ નંબર લખો' : 'Please enter a valid 10-digit mobile number';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = isGujarati ? 'સાચું ઈમેલ એડ્રેસ લખો' : 'Please enter a valid email address';
    }

    if (formData.orderType === 'Delivery') {
      if (!formData.address.trim()) newErrors.address = isGujarati ? 'ડિલિવરીનું સરનામું લખવું જરૂરી છે' : 'Delivery address is required';
      if (!formData.city.trim()) newErrors.city = isGujarati ? 'શહેર લખવું જરૂરી છે' : 'City is required';
    }

    if (!formData.requestedDate) {
      newErrors.requestedDate = isGujarati ? 'તારીખ પસંદ કરો' : 'Preferred date is required';
    } else if (formData.requestedDate < getTodayDateStr()) {
      newErrors.requestedDate = isGujarati ? 'ભૂતકાળની તારીખ પસંદ ન કરી શકાય' : 'Date cannot be in the past';
    }

    if (!formData.requestedTimeSlot) {
      newErrors.requestedTimeSlot = isGujarati ? 'સમય સ્લોટ પસંદ કરો' : 'Please select a preferred time slot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    setServerError('');
  };

  const handleOrderTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      orderType: type,
      paymentMethod: type === 'Pickup' ? 'Cash on Pickup' : 'Cash on Delivery',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
        items: cart.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        orderType: formData.orderType,
        deliveryAddress:
          formData.orderType === 'Delivery'
            ? {
                address: formData.address.trim(),
                city: formData.city.trim(),
                postalCode: formData.postalCode.trim(),
                landmark: formData.landmark.trim(),
              }
            : undefined,
        requestedDate: formData.requestedDate,
        requestedTimeSlot: formData.requestedTimeSlot,
        paymentMethod: formData.paymentMethod,
        specialInstructions: formData.specialInstructions.trim(),
      };

      const response = await orderService.createOrder(payload);

      if (response.success && response.order) {
        clearCart();
        navigate(`/order-success/${response.order.orderNumber}`, {
          state: { order: response.order },
        });
      } else {
        throw new Error(response.message || 'Failed to create order');
      }
    } catch (err) {
      console.error('Order submission error:', err);
      setServerError(err.message || 'Failed to submit order. Please check your details and try again.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-8 sm:py-12 ${isGujarati ? 'font-gujarati' : ''}`}>
      <div className="mb-8">
        <Link to="/cart" className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-saffron-600 transition mb-2">
          <ArrowLeft className="w-4 h-4" /> {isGujarati ? 'કાર્ટ પર પાછા જાઓ' : 'Back to Cart'}
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900">
          {t('checkoutTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 font-normal">
          {t('checkoutSubtitle')}
        </p>
      </div>

      {serverError && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-sm animate-fade-in">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
          <div>
            <h4 className="font-bold">{isGujarati ? 'ઓર્ડરમાં ક્ષતિ' : 'Order Submission Notice'}</h4>
            <p className="text-xs mt-0.5">{serverError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Order Type Selection */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-cream-300 shadow-soft">
            <h2 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-saffron-600 text-white text-xs flex items-center justify-center font-bold">૧</span>
              {t('howReceive')}
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleOrderTypeChange('Delivery')}
                className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  formData.orderType === 'Delivery'
                    ? 'border-saffron-600 bg-saffron-50/50 shadow-sm ring-2 ring-saffron-500/20'
                    : 'border-cream-300 hover:border-cream-400 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Truck className={`w-5 h-5 ${formData.orderType === 'Delivery' ? 'text-saffron-600' : 'text-stone-500'}`} />
                  {formData.orderType === 'Delivery' && <CheckCircle2 className="w-4 h-4 text-saffron-600" />}
                </div>
                <div className="font-bold text-sm text-stone-900">{t('homeDelivery')}</div>
                <p className="text-[11px] text-stone-500 mt-0.5 font-normal">
                  {isGujarati ? `ઘરે બેઠાં ગરમાગરમ ડિલિવરી. ₹${freeThreshold} ઉપર મફત.` : `Delivered warm to your doorstep. Free above ₹${freeThreshold}.`}
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleOrderTypeChange('Pickup')}
                className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  formData.orderType === 'Pickup'
                    ? 'border-kothmir-700 bg-kothmir-50/50 shadow-sm ring-2 ring-kothmir-700/20'
                    : 'border-cream-300 hover:border-cream-400 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Store className={`w-5 h-5 ${formData.orderType === 'Pickup' ? 'text-kothmir-700' : 'text-stone-500'}`} />
                  {formData.orderType === 'Pickup' && <CheckCircle2 className="w-4 h-4 text-kothmir-700" />}
                </div>
                <div className="font-bold text-sm text-stone-900">{t('kitchenPickup')}</div>
                <p className="text-[11px] text-stone-500 mt-0.5 font-normal">
                  {isGujarati ? 'રસોડેથી સીધું ગરમાગરમ પિકઅપ (ઝીરો ડિલિવરી ચાર્જ).' : 'Pick up hot from our kitchen location (Zero delivery fee).'}
                </p>
              </button>
            </div>

            {formData.orderType === 'Pickup' && (
              <div className="mt-4 p-3 bg-cream-50 border border-cream-200 rounded-xl text-xs text-stone-700">
                <strong>{isGujarati ? 'પિકઅપ સરનામું:' : 'Pickup Location:'}</strong> {settings.address}, {settings.city}
              </div>
            )}
          </div>

          {/* 2. Customer Contact Details */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-cream-300 shadow-soft space-y-4">
            <h2 className="text-base font-bold text-stone-900 mb-1 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-saffron-600 text-white text-xs flex items-center justify-center font-bold">૨</span>
              {t('contactInfo')}
            </h2>
            <p className="text-xs text-stone-500 mb-4 font-normal">
              {isGujarati ? 'ઓર્ડર કન્ફર્મેશન અને બિલ આ નંબર અને ઈમેલ પર મોકલવામાં આવશે.' : 'Order notifications and email receipts will be dispatched here.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t('fullName')} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={isGujarati ? 'દા.ત. રમેશભાઈ પટેલ' : 'e.g. Ramesh Patel'}
                  className={`w-full px-3.5 py-2.5 bg-cream-50 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                    errors.name ? 'border-red-500 focus:ring-red-500/20' : 'border-cream-300 focus:ring-saffron-500/20 focus:border-saffron-500'
                  }`}
                />
                {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t('phone')} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className={`w-full px-3.5 py-2.5 bg-cream-50 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                    errors.phone ? 'border-red-500 focus:ring-red-500/20' : 'border-cream-300 focus:ring-saffron-500/20 focus:border-saffron-500'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {t('email')} *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ramesh.patel@gmail.com"
                className={`w-full px-3.5 py-2.5 bg-cream-50 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                  errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-cream-300 focus:ring-saffron-500/20 focus:border-saffron-500'
                }`}
              />
              {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* 3. Delivery Address (if Delivery selected) */}
          {formData.orderType === 'Delivery' && (
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-cream-300 shadow-soft space-y-4">
              <h2 className="text-base font-bold text-stone-900 mb-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-saffron-600 text-white text-xs flex items-center justify-center font-bold">૩</span>
                {t('deliveryAddress')}
              </h2>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isGujarati ? 'ઘર/ફ્લેટ નં., સોસાયટી, રોડનું નામ *' : 'Street / Flat No / Society / Building Name *'}
                </label>
                <textarea
                  rows="2"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder={isGujarati ? 'દા.ત. ફ્લેટ ૪૦૨, શિવમ રેસિડેન્સી, સોમેશ્વર મંદિર પાસે' : 'e.g. Flat 402, Shivam Elegance, Near Someshwar Complex'}
                  className={`w-full px-3.5 py-2 bg-cream-50 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                    errors.address ? 'border-red-500 focus:ring-red-500/20' : 'border-cream-300 focus:ring-saffron-500/20 focus:border-saffron-500'
                  }`}
                />
                {errors.address && <p className="text-[11px] text-red-600 mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {isGujarati ? 'વિસ્તાર / શહેર *' : 'City / Area *'}
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-cream-50 rounded-xl border border-cream-300 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/20"
                  />
                  {errors.city && <p className="text-[11px] text-red-600 mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {isGujarati ? 'પીનકોડ' : 'Pincode'}
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="380015"
                    className="w-full px-3 py-2 bg-cream-50 rounded-xl border border-cream-300 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {isGujarati ? 'ઓળખ ચિહ્ન (લેન્ડમાર્ક)' : 'Landmark'}
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    placeholder={isGujarati ? 'દા.ત. જૈન દેરાસર સામે' : 'e.g. Opp Jain Temple'}
                    className="w-full px-3 py-2 bg-cream-50 rounded-xl border border-cream-300 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/20"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 4. Scheduling */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-cream-300 shadow-soft space-y-4">
            <h2 className="text-base font-bold text-stone-900 mb-1 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-saffron-600 text-white text-xs flex items-center justify-center font-bold">
                {formData.orderType === 'Delivery' ? '૪' : '૩'}
              </span>
              {t('scheduleTitle')}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-saffron-600" /> {t('dateLabel')} *
                </label>
                <input
                  type="date"
                  name="requestedDate"
                  min={getTodayDateStr()}
                  value={formData.requestedDate}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2.5 bg-cream-50 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                    errors.requestedDate ? 'border-red-500 focus:ring-red-500/20' : 'border-cream-300 focus:ring-saffron-500/20 focus:border-saffron-500'
                  }`}
                />
                {errors.requestedDate && <p className="text-[11px] text-red-600 mt-1">{errors.requestedDate}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-saffron-600" /> {t('timeSlotLabel')} *
                </label>
                <select
                  name="requestedTimeSlot"
                  value={formData.requestedTimeSlot}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-cream-50 rounded-xl border border-cream-300 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/20 font-medium"
                >
                  {settings.orderTimeSlots?.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.requestedTimeSlot && <p className="text-[11px] text-red-600 mt-1">{errors.requestedTimeSlot}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {t('specialNotes')}
              </label>
              <textarea
                rows="2"
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleChange}
                placeholder={isGujarati ? 'દા.ત. ખાસ તીખી અને ગળી ચટણી અલગ પેક કરવી, ૧૦૦% જૈન બનાવવું' : 'e.g. Please pack extra chutney, strictly Jain preparation'}
                className="w-full px-3.5 py-2 bg-cream-50 rounded-xl border border-cream-300 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/20"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Order Items Summary & Submit */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-cream-300 shadow-soft p-5 sm:p-6 space-y-5 sticky top-28">
            <h2 className="text-lg font-bold text-stone-900 border-b border-cream-200 pb-3 flex items-center justify-between">
              <span>{isGujarati ? 'ઓર્ડર વિગત' : 'Order Summary'}</span>
              <span className="text-xs bg-saffron-100 text-saffron-800 font-bold px-2 py-0.5 rounded-full">
                {cart.length} {isGujarati ? 'વાનગીઓ' : 'items'}
              </span>
            </h2>

            {/* Item list */}
            <div className="max-h-64 overflow-y-auto divide-y divide-cream-100 pr-1">
              {cart.map((item) => (
                <div key={item._id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="min-w-0 pr-2">
                    <p className="font-bold text-stone-900 truncate">{getProductName(item.name)}</p>
                    <p className="text-stone-500 text-[11px]">
                      {item.quantity} &times; ₹{item.price} ({item.unit})
                    </p>
                  </div>
                  <span className="font-bold text-stone-900 shrink-0">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-3 border-t border-cream-200 space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between text-stone-600">
                <span>{t('subtotal')}:</span>
                <span className="font-semibold text-stone-900">₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-stone-600">
                <span>
                  {formData.orderType === 'Delivery' ? `${t('deliveryFee')}:` : isGujarati ? 'રસોડેથી પિકઅપ:' : 'Kitchen Pickup:'}
                </span>
                <span className="font-semibold text-kothmir-700">
                  {deliveryFee === 0 ? t('freeDelivery') : `₹${deliveryFee}`}
                </span>
              </div>

              <div className="pt-3 border-t border-cream-300 flex justify-between items-baseline">
                <span className="font-bold text-base text-stone-900">{t('grandTotal')}:</span>
                <span className="font-serif font-extrabold text-2xl text-saffron-700">
                  ₹{grandTotal}
                </span>
              </div>
            </div>

            {/* Payment Method Badge */}
            <div className="bg-cream-50 p-3 rounded-xl border border-cream-200 text-xs">
              <span className="font-bold text-stone-800 block mb-0.5">
                {isGujarati ? 'ચુકવણી પદ્ધતિ:' : 'Payment Method:'}
              </span>
              <p className="text-stone-600">
                {formData.orderType === 'Delivery'
                  ? isGujarati ? '💵 ડિલિવરી વખતે રોકડા અથવા UPI (Google Pay / PhonePe / Paytm સ્વીકાર્ય)' : '💵 Cash or UPI on Delivery (Google Pay / PhonePe / Paytm accepted)'
                  : isGujarati ? '🏪 રસોડે પિકઅપ વખતે રોકડા અથવા UPI' : '🏪 Cash or UPI at Kitchen Pickup counter'}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 px-4 bg-saffron-600 hover:bg-saffron-700 disabled:bg-stone-400 disabled:cursor-not-allowed text-white font-bold rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg hover:shadow-saffron-600/30 active:scale-95"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{isGujarati ? 'ઓર્ડર નોંધાઈ રહ્યો છે...' : 'Saving & Notifying Kitchen...'}</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>{t('placeOrderBtn')} (₹{grandTotal})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
