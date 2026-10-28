import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import {
  CheckCircle,
  Printer,
  ShoppingBag,
  Clock,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Calendar,
} from 'lucide-react';
import { orderService } from '../services/orderService';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';

const OrderSuccessPage = () => {
  const { orderNumber } = useParams();
  const location = useLocation();
  const { settings } = useSettings();
  const { language, t, getProductName } = useLanguage();

  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(!order);

  useEffect(() => {
    if (!order && orderNumber) {
      const fetchOrder = async () => {
        try {
          const data = await orderService.getOrderById(orderNumber);
          setOrder(data.order || null);
        } catch (err) {
          console.error('Failed to fetch order details', err);
        } finally {
          setLoading(false);
        }
      };
      fetchOrder();
    }
  }, [orderNumber, order]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-saffron-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h2 className="font-serif text-2xl font-bold text-stone-900">Order Not Found</h2>
        <p className="text-xs text-stone-500 mt-2 mb-6">
          Could not locate order details for reference #{orderNumber}.
        </p>
        <Link
          to="/"
          className="px-5 py-2.5 bg-saffron-600 text-white rounded-xl text-xs font-bold hover:bg-saffron-700 transition"
        >
          Return Home
        </Link>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Namaste ${settings.businessName}, I placed order #${order.orderNumber} for ${order.requestedDate} (${order.requestedTimeSlot}). Could you please confirm preparation?`
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Success Card */}
      <div className="bg-white rounded-3xl border border-cream-300 shadow-soft overflow-hidden">
        {/* Banner */}
        <div className="bg-gradient-to-r from-kothmir-700 via-kothmir-800 to-kothmir-900 text-white p-6 sm:p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-white text-kothmir-700 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CheckCircle className="w-10 h-10 fill-kothmir-700 text-white" />
          </div>
          <span className="text-xs uppercase font-bold tracking-widest text-kothmir-200 bg-kothmir-900/50 px-3 py-1 rounded-full">
            {language === 'gu' ? 'ઓર્ડર સફળતાપૂર્વક નોંધાયો' : 'Order Confirmed & Recorded'}
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl font-extrabold mt-2 text-white">
            {t('orderSuccessTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-kothmir-100 mt-2 max-w-lg mx-auto">
            {language === 'gu' ? 'ઓર્ડર નંબર:' : 'Order Reference:'} <strong className="text-white tracking-wide">{order.orderNumber}</strong>. {language === 'gu' ? 'અમે વિગતોનો ઈમેલ આ સરનામે મોકલી આપ્યો છે:' : 'We have sent an email confirmation to'} <span className="underline">{order.customer.email}</span>.
          </p>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Quick Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-cream-50 border border-cream-200 text-xs">
            <div>
              <span className="text-stone-500 font-semibold block">{language === 'gu' ? 'ઓર્ડરનો પ્રકાર:' : 'Order Type:'}</span>
              <span className="font-bold text-sm text-stone-900">
                {order.orderType === 'Delivery' ? (language === 'gu' ? 'હોમ ડિલિવરી' : 'Delivery') : (language === 'gu' ? 'રસોડેથી પિકઅપ' : 'Pickup')}
              </span>
            </div>
            <div>
              <span className="text-stone-500 font-semibold block">{language === 'gu' ? 'ઓર્ડર તારીખ:' : 'Scheduled Date:'}</span>
              <span className="font-bold text-sm text-saffron-700">{order.requestedDate}</span>
            </div>
            <div>
              <span className="text-stone-500 font-semibold block">{language === 'gu' ? 'સમય સ્લોટ:' : 'Preferred Slot:'}</span>
              <span className="font-bold text-sm text-stone-900">{order.requestedTimeSlot}</span>
            </div>
          </div>

          {/* Customer & Address Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="space-y-1.5 p-4 rounded-xl border border-cream-200 bg-white">
              <h3 className="font-serif font-bold text-base text-stone-900 border-b border-cream-200 pb-2 mb-2">
                {language === 'gu' ? 'ગ્રાહકની માહિતી' : 'Customer Information'}
              </h3>
              <p><strong>{language === 'gu' ? 'નામ:' : 'Name:'}</strong> {order.customer.name}</p>
              <p><strong>{language === 'gu' ? 'મોબાઈલ:' : 'Phone:'}</strong> {order.customer.phone}</p>
              <p><strong>{language === 'gu' ? 'ઈમેલ:' : 'Email:'}</strong> {order.customer.email}</p>
              <p><strong>{language === 'gu' ? 'ચુકવણી:' : 'Payment Mode:'}</strong> {order.paymentMethod} ({order.paymentStatus === 'Pending' && language === 'gu' ? 'બાકી' : order.paymentStatus})</p>
            </div>

            <div className="space-y-1.5 p-4 rounded-xl border border-cream-200 bg-white">
              <h3 className="font-serif font-bold text-base text-stone-900 border-b border-cream-200 pb-2 mb-2">
                {order.orderType === 'Delivery' ? (language === 'gu' ? 'ડિલિવરી સરનામું' : 'Delivery Address') : (language === 'gu' ? 'પિકઅપ સૂચના' : 'Pickup Instructions')}
              </h3>
              {order.orderType === 'Delivery' ? (
                <>
                  <p>{order.deliveryAddress?.address}</p>
                  <p>{order.deliveryAddress?.city} - {order.deliveryAddress?.postalCode}</p>
                  {order.deliveryAddress?.landmark && (
                    <p className="text-stone-500">{language === 'gu' ? 'લેન્ડમાર્ક:' : 'Landmark:'} {order.deliveryAddress.landmark}</p>
                  )}
                </>
              ) : (
                <>
                  <p className="font-semibold text-kothmir-800">{language === 'gu' ? 'રસોડેથી સીધું પિકઅપ:' : 'Direct Kitchen Pickup:'}</p>
                  <p>{settings.address}</p>
                  <p>{settings.city}</p>
                  <p className="text-xs text-stone-500 mt-1">{language === 'gu' ? `પિકઅપ વખતે કૃપા કરીને ઓર્ડર #${order.orderNumber} બતાવો.` : `Please show order #${order.orderNumber} upon arrival.`}</p>
                </>
              )}
            </div>
          </div>

          {/* Special notes */}
          {order.specialInstructions && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
              <strong>{language === 'gu' ? 'ખાસ સૂચના:' : 'Special Instructions:'}</strong> {order.specialInstructions}
            </div>
          )}

          {/* Items Summary Table */}
          <div>
            <h3 className="font-serif font-bold text-base text-stone-900 mb-3 border-b border-cream-200 pb-2">
              {language === 'gu' ? 'ઓર્ડર કરેલ વાનગીઓની યાદી' : 'Itemized Order Summary'}
            </h3>
            <div className="border border-cream-200 rounded-xl overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-cream-100 text-stone-700 font-bold border-b border-cream-200">
                  <tr>
                    <th className="p-3">{language === 'gu' ? 'વાનગી' : 'Item'}</th>
                    <th className="p-3 text-center">{language === 'gu' ? 'જથ્થો' : 'Quantity'}</th>
                    <th className="p-3 text-right">{language === 'gu' ? 'ભાવ' : 'Price'}</th>
                    <th className="p-3 text-right">{language === 'gu' ? 'કુલ' : 'Total'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-100">
                  {order.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-3 font-medium text-stone-900">
                        {getProductName(item.name)} <span className="text-stone-500 font-normal">({item.unit})</span>
                      </td>
                      <td className="p-3 text-center text-stone-700">{item.quantity}</td>
                      <td className="p-3 text-right text-stone-700">₹{item.price}</td>
                      <td className="p-3 text-right font-bold text-stone-900">₹{item.lineTotal}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-cream-50 font-medium">
                  <tr>
                    <td colSpan="3" className="p-2.5 text-right text-stone-500">{t('subtotal')}:</td>
                    <td className="p-2.5 text-right font-bold text-stone-900">₹{order.subtotal}</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="p-2 text-right text-stone-500">{t('deliveryFee')}:</td>
                    <td className="p-2 text-right font-bold text-kothmir-700">
                      {order.deliveryFee === 0 ? t('freeDelivery') : `₹${order.deliveryFee}`}
                    </td>
                  </tr>
                  <tr className="border-t-2 border-saffron-600 bg-saffron-50/50">
                    <td colSpan="3" className="p-3 text-right font-serif font-bold text-sm text-saffron-800">
                      {t('grandTotal')}:
                    </td>
                    <td className="p-3 text-right font-serif font-extrabold text-base text-saffron-800">
                      ₹{order.grandTotal}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-cream-200">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl border border-cream-400 bg-white hover:bg-cream-100 text-stone-800 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
              >
                <Printer className="w-4 h-4 text-stone-600" />
                <span>{t('printReceipt')}</span>
              </button>

              <a
                href={`https://wa.me/${settings.whatsappPhone || '919876543210'}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t('followUpWhatsApp')}</span>
              </a>
            </div>

            <Link
              to="/menu"
              className="px-5 py-2.5 bg-saffron-600 hover:bg-saffron-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              {language === 'gu' ? 'વધુ ફરસાણ ઓર્ડર કરો' : 'Order More Farsan'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
