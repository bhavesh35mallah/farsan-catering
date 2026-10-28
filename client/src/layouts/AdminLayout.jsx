import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  CalendarCheck2,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChefHat,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

const AdminLayout = () => {
  const { admin, isAuthenticated, loading, logout } = useAuth();
  const { settings } = useSettings();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-saffron-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-stone-400">Verifying Admin Session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Orders Management', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Products & Categories', path: '/admin/products', icon: Package },
    { name: 'Catering Enquiries', path: '/admin/catering', icon: CalendarCheck2 },
    { name: 'Store Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-stone-900 text-white p-4 flex items-center justify-between border-b border-stone-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-saffron-600 flex items-center justify-center text-white font-serif font-bold text-sm">
            श्री
          </div>
          <span className="font-serif font-bold text-base">Admin Portal</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar for Desktop & Mobile drawer */}
      <aside
        className={`fixed md:sticky top-0 inset-y-0 left-0 z-40 w-64 bg-stone-900 text-stone-300 flex flex-col justify-between p-5 transition-transform duration-200 ease-in-out md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand header */}
          <div className="flex items-center gap-3 pb-6 border-b border-stone-800">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-saffron-700 to-amber-500 text-white flex items-center justify-center font-serif text-lg font-bold shadow-md">
              श्री
            </div>
            <div>
              <h2 className="font-serif font-bold text-white text-base leading-tight">
                {settings.businessName.split(' ')[0]} Farsan
              </h2>
              <p className="text-[11px] text-saffron-400 font-semibold tracking-wider uppercase">
                Admin Panel
              </p>
            </div>
          </div>

          {/* Logged in Admin info */}
          <div className="my-4 p-3 bg-stone-800/80 rounded-xl border border-stone-700/60 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-saffron-600/30 text-saffron-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">{admin?.name || 'Administrator'}</p>
              <p className="text-[10px] text-stone-400 truncate">{admin?.email}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 mt-6">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.exact}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-saffron-600 text-white font-semibold shadow-md'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800'
                  }`
                }
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-stone-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            <span className="flex items-center gap-2">
              <ChefHat className="w-4 h-4 text-kothmir-400" /> View Live Website
            </span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Body */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1720px] mx-auto w-full overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
