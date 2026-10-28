import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  Printer,
  Phone,
  MessageCircle,
  Mail,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  X,
  FileText,
} from 'lucide-react';
import { orderService } from '../../services/orderService';
import { useSettings } from '../../context/SettingsContext';

const AdminOrdersPage = () => {
  const [searchParams] = useSearchParams();
  const refParam = searchParams.get('ref') || '';

  const { settings } = useSettings();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(refParam);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Detail Modal
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [internalNotes, setInternalNotes] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const statuses = [
    'New',
    'Accepted',
    'Preparing',
    'Ready for Pickup',
    'Out for Delivery',
    'Completed',
    'Cancelled',
  ];

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await orderService.getOrdersAdmin({
        search: search.trim(),
        status: statusFilter,
        date: dateFilter,
        page,
        limit: 20,
      });
      setOrders(data.orders || []);
      setTotalPages(data.totalPages || 1);

      // If refParam is supplied in URL, automatically open modal for that order
      if (refParam && data.orders?.length > 0) {
        const found = data.orders.find((o) => o.orderNumber === refParam);
        if (found) {
          handleOpenModal(found);
        }
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [search, statusFilter, dateFilter, page]);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setInternalNotes(order.internalNotes || '');
  };

  const handleUpdateStatus = async (newStatus) => {
    if (!selectedOrder) return;
    setUpdatingStatus(true);
    try {
      const res = await orderService.updateOrderStatus(selectedOrder._id, {
        orderStatus: newStatus,
        internalNotes,
      });
      if (res.success && res.order) {
        setSelectedOrder(res.order);
        setOrders((prev) =>
          prev.map((o) => (o._id === res.order._id ? res.order : o))
        );
      }
    } catch (err) {
      alert(`Could not update order status: ${err.message}`);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedOrder) return;
    setUpdatingStatus(true);
    try {
      const res = await orderService.updateOrderStatus(selectedOrder._id, {
        internalNotes,
      });
      if (res.success && res.order) {
        setSelectedOrder(res.order);
        setOrders((prev) =>
          prev.map((o) => (o._id === res.order._id ? res.order : o))
        );
        alert('Internal notes saved.');
      }
    } catch (err) {
      alert(`Could not save notes: ${err.message}`);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Accepted':
      case 'Preparing':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Ready for Pickup':
      case 'Out for Delivery':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Cancelled':
        return 'bg-stone-200 text-stone-700 border-stone-300';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900">
            Order Fulfillment &amp; Tracking
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Manage preparation stages, customer delivery addresses, notes, and print kitchen slips.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search order #, customer, phone..."
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-stone-500 font-bold shrink-0">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              {statuses.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-stone-500 font-bold shrink-0">Date:</span>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                setPage(1);
              }}
              className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 focus:outline-none"
            />
          </div>

          {(search || statusFilter !== 'all' || dateFilter) && (
            <button
              onClick={() => {
                setSearch('');
                setStatusFilter('all');
                setDateFilter('');
              }}
              className="text-xs text-stone-500 hover:text-stone-800 underline px-2"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-4 border-saffron-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center text-xs text-stone-500">
            No orders found matching the filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-stone-50 text-stone-600 font-bold border-b border-stone-200">
                <tr>
                  <th className="p-3.5">Order Ref</th>
                  <th className="p-3.5">Customer Details</th>
                  <th className="p-3.5">Requested Date &amp; Slot</th>
                  <th className="p-3.5">Type &amp; Items</th>
                  <th className="p-3.5">Total Amount</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">View / Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-stone-50/60 transition">
                    <td className="p-3.5 font-bold font-mono text-stone-900">
                      {order.orderNumber}
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-stone-900">{order.customer.name}</div>
                      <div className="text-[11px] text-stone-500">{order.customer.phone}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-medium text-stone-900">{order.requestedDate}</div>
                      <div className="text-[11px] text-stone-500">{order.requestedTimeSlot}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-stone-800">{order.orderType}</div>
                      <div className="text-[11px] text-stone-500">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      </div>
                    </td>
                    <td className="p-3.5 font-bold text-stone-900">
                      ₹{order.grandTotal}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(
                          order.orderStatus
                        )}`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleOpenModal(order)}
                        className="px-3 py-1.5 bg-stone-100 hover:bg-saffron-50 hover:text-saffron-700 text-stone-800 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ml-auto border border-stone-200"
                      >
                        <Eye className="w-3.5 h-3.5" /> Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 max-h-[92vh] overflow-y-auto animate-fade-in space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-stone-200 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-saffron-700 bg-saffron-50 px-2 py-0.5 rounded-full">
                  Order Management
                </span>
                <h2 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                  Order #{selectedOrder.orderNumber}
                </h2>
                <p className="text-xs text-stone-400">
                  Placed on: {new Date(selectedOrder.createdAt).toLocaleString('en-IN')}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-bold flex items-center gap-1"
                  title="Print Kitchen Slip"
                >
                  <Printer className="w-3.5 h-3.5" /> Print
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Status Change Control */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-stone-700 block">Current Status:</span>
                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(selectedOrder.orderStatus)}`}>
                  {selectedOrder.orderStatus}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-600">Update To:</span>
                <select
                  value={selectedOrder.orderStatus}
                  onChange={(e) => handleUpdateStatus(e.target.value)}
                  disabled={updatingStatus}
                  className="bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-saffron-500/20"
                >
                  {statuses.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Customer & Delivery Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
                <h3 className="font-bold text-stone-900 border-b border-stone-200 pb-1.5 flex items-center justify-between">
                  <span>Customer Details</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${selectedOrder.customer.phone}`}
                      className="text-saffron-600 hover:text-saffron-700 p-1"
                      title="Call Customer"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={`https://wa.me/${selectedOrder.customer.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Namaste ${selectedOrder.customer.name}, Regarding your farsan order #${selectedOrder.orderNumber}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:opacity-80 p-1"
                      title="WhatsApp Customer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </h3>
                <p><strong>Name:</strong> {selectedOrder.customer.name}</p>
                <p><strong>Phone:</strong> {selectedOrder.customer.phone}</p>
                <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
                <p><strong>Payment:</strong> {selectedOrder.paymentMethod} ({selectedOrder.paymentStatus})</p>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
                <h3 className="font-bold text-stone-900 border-b border-stone-200 pb-1.5">
                  Fulfillment &amp; Scheduling
                </h3>
                <p><strong>Method:</strong> <span className="font-semibold">{selectedOrder.orderType}</span></p>
                <p><strong>Date:</strong> <span className="text-saffron-700 font-semibold">{selectedOrder.requestedDate}</span></p>
                <p><strong>Time Slot:</strong> {selectedOrder.requestedTimeSlot}</p>
                {selectedOrder.orderType === 'Delivery' ? (
                  <p><strong>Address:</strong> {selectedOrder.deliveryAddress?.address}, {selectedOrder.deliveryAddress?.city} - {selectedOrder.deliveryAddress?.postalCode}</p>
                ) : (
                  <p className="text-stone-500 italic">Direct kitchen pickup by customer</p>
                )}
              </div>
            </div>

            {/* Special Instructions */}
            {selectedOrder.specialInstructions && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                <strong>Customer Notes:</strong> {selectedOrder.specialInstructions}
              </div>
            )}

            {/* Itemized Table */}
            <div>
              <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-2">
                Items to Prepare
              </h3>
              <div className="border border-stone-200 rounded-xl overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-50 text-stone-600 font-bold border-b border-stone-200">
                    <tr>
                      <th className="p-2.5">Item</th>
                      <th className="p-2.5 text-center">Qty</th>
                      <th className="p-2.5 text-right">Price</th>
                      <th className="p-2.5 text-right">Line Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {selectedOrder.items.map((item, i) => (
                      <tr key={i}>
                        <td className="p-2.5 font-medium text-stone-900">
                          {item.name} <span className="text-stone-400">({item.unit})</span>
                        </td>
                        <td className="p-2.5 text-center font-bold text-stone-800">{item.quantity}</td>
                        <td className="p-2.5 text-right text-stone-600">₹{item.price}</td>
                        <td className="p-2.5 text-right font-bold text-stone-900">₹{item.lineTotal}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-stone-50 font-medium">
                    <tr>
                      <td colSpan="3" className="p-2 text-right text-stone-500">Subtotal:</td>
                      <td className="p-2 text-right font-bold text-stone-900">₹{selectedOrder.subtotal}</td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="p-2 text-right text-stone-500">Delivery Fee:</td>
                      <td className="p-2 text-right font-bold text-kothmir-700">
                        {selectedOrder.deliveryFee === 0 ? 'FREE' : `₹${selectedOrder.deliveryFee}`}
                      </td>
                    </tr>
                    <tr className="border-t border-stone-300 font-bold">
                      <td colSpan="3" className="p-2.5 text-right text-stone-900">Grand Total:</td>
                      <td className="p-2.5 text-right font-extrabold text-saffron-700 text-sm">
                        ₹{selectedOrder.grandTotal}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Email Status Indicator */}
            <div className="flex items-center justify-between text-xs p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-stone-600">Email Notification Status:</span>
              <span className="font-semibold text-stone-800">
                Owner Email: {selectedOrder.emailNotificationStatus?.businessEmailSent ? 'Sent ✓' : 'Logged / Pending'} &bull; Customer Email: {selectedOrder.emailNotificationStatus?.customerEmailSent ? 'Sent ✓' : 'Logged / Pending'}
              </span>
            </div>

            {/* Internal Kitchen Notes */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-700">
                Internal Kitchen &amp; Packaging Notes
              </label>
              <textarea
                rows="2"
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="e.g. Extra green chutney bottle packed. Called customer for gate code."
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none"
              />
              <button
                onClick={handleSaveNotes}
                disabled={updatingStatus}
                className="px-4 py-1.5 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-xs font-bold transition"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
