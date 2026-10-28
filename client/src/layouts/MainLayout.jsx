import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import StickyMobileCart from '../components/StickyMobileCart';
import WhatsAppButton from '../components/WhatsAppButton';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cream-100 text-[#2B231D]">
      <Navbar />
      <CartDrawer />
      <StickyMobileCart />
      <WhatsAppButton />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
