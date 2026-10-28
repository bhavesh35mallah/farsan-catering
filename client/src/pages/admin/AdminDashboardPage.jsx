import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  ArrowRight,
  Package,
  CalendarCheck2,
  Settings,
  Sparkles,
} from 'lucide-react';
import { orderService } from '../../services/orderService';
import { useSettings } from '../../context/SettingsContext';

const AdminDashboardPage = () => {
  const { settings } = useSettings();
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await orderService.getOrderStats();
        if (data.success) {
          setStats(data.stats);
          setRecentOrders(data.recentOrders || []);
        }
      } catch (err) {
        console.error('Error fetching dashboard stats', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-saffron-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900">
            Kitchen Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Real-time tracking of fresh orders, inventory availability, and catering enquiries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/orders"
            className="px-4 py-2 bg-saffron-600 hover:bg-saffron-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" /> Manage All Orders
          </Link>
          <Link
            to="/admin/products"
            className="px-4 py-2 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <Package className="w-4 h-4" /> Edit Products
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Sales</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif font-extrabold text-2xl sm:text-3xl text-stone-900">
            ₹{stats?.totalRevenue?.toLocaleString('en-IN') || 0}
          </div>
          <p className="text-[11px] text-stone-400 mt-1">Excludes cancelled orders</p>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
            <div className="w-8 h-8 rounded-lg bg-saffron-50 text-saffron-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif font-extrabold text-2xl sm:text-3xl text-stone-900">
            {stats?.totalOrders || 0}
          </div>
          <p className="text-[11px] text-stone-400 mt-1">Lifetime customer orders</p>
        </div>

        {/* New & Active Orders */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">New Action Needed</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif font-extrabold text-2xl sm:text-3xl text-blue-600">
            {stats?.newOrders || 0}
          </div>
          <p className="text-[11px] text-stone-400 mt-1">Pending kitchen acceptance</p>
        </div>

        {/* Preparing & Transit */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">In Kitchen / Transit</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif font-extrabold text-2xl sm:text-3xl text-amber-600">
            {(stats?.preparingOrders || 0) + (stats?.outForDeliveryOrders || 0) + (stats?.readyOrders || 0)}
          </div>
          <p className="text-[11px] text-stone-400 mt-1">Ready for pickup or out for delivery</p>
        </div>
      </div>

      {/* Secondary Quick Action Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/admin/products"
          className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm hover:border-saffron-300 transition flex items-center justify-between group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-saffron-100 text-saffron-700 flex items-center justify-center font-bold">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm">Product Catalogue</h3>
              <p className="text-xs text-stone-500">Edit prices, availability &amp; batches</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          to="/admin/catering"
          className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm hover:border-kothmir-300 transition flex items-center justify-between group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-kothmir-100 text-kothmir-700 flex items-center justify-center font-bold">
              <CalendarCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm">Catering Enquiries</h3>
              <p className="text-xs text-stone-500">Review quotes &amp; event requests</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          to="/admin/settings"
          className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm hover:border-stone-400 transition flex items-center justify-between group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center font-bold">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm">Business Settings</h3>
              <p className="text-xs text-stone-500">Delivery fees, store hours &amp; notification email</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h2 className="font-serif font-bold text-base text-stone-900">Recent Customer Orders</h2>
            <p className="text-xs text-stone-500">Latest incoming food orders</p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs font-bold text-saffron-700 hover:text-saffron-800 transition flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="p-8 text-center text-stone-400 text-xs">
            No orders placed yet. Orders will appear here as soon as customers submit them.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-stone-50 text-stone-600 font-bold border-b border-stone-200">
                <tr>
                  <th className="p-3.5">Order No</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Date &amp; Slot</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {recentOrders.map((ord) => (
                  <tr key={ord._id} className="hover:bg-stone-50/60 transition">
                    <td className="p-3.5 font-bold text-stone-900 font-mono">
                      {ord.orderNumber}
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-stone-900">{ord.customer.name}</div>
                      <div className="text-[11px] text-stone-400">{ord.customer.phone}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="text-stone-900 font-medium">{ord.requestedDate}</div>
                      <div className="text-[11px] text-stone-500">{ord.requestedTimeSlot}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="font-semibold text-stone-800">{ord.orderType}</span>
                    </td>
                    <td className="p-3.5 font-bold text-stone-900">
                      ₹{ord.grandTotal}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(
                          ord.orderStatus
                        )}`}
                      >
                        {ord.orderStatus}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <Link
                        to={`/admin/orders?ref=${ord.orderNumber}`}
                        className="text-xs font-bold text-saffron-700 hover:text-saffron-800 underline"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
