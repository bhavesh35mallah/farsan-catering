import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { CartProvider } from './context/CartContext';
import { SettingsProvider } from './context/SettingsContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import CateringPage from './pages/CateringPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminCateringPage from './pages/admin/AdminCateringPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <LanguageProvider>
        <SettingsProvider>
          <AuthProvider>
            <CartProvider>
              <Routes>
                {/* Customer Routes */}
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="menu" element={<MenuPage />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="checkout" element={<CheckoutPage />} />
                  <Route path="order-success/:orderNumber" element={<OrderSuccessPage />} />
                  <Route path="catering" element={<CateringPage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="terms" element={<TermsPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>

                {/* Admin Auth Route */}
                <Route path="/admin/login" element={<AdminLoginPage />} />

                {/* Admin Dashboard Protected Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboardPage />} />
                  <Route path="orders" element={<AdminOrdersPage />} />
                  <Route path="products" element={<AdminProductsPage />} />
                  <Route path="catering" element={<AdminCateringPage />} />
                  <Route path="settings" element={<AdminSettingsPage />} />
                </Route>
              </Routes>
            </CartProvider>
          </AuthProvider>
        </SettingsProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
