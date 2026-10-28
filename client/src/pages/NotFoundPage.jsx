import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="w-20 h-20 rounded-full bg-saffron-100 text-saffron-700 flex items-center justify-center font-serif text-3xl font-extrabold mx-auto mb-6">
        404
      </div>
      <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900">
        Page Not Found
      </h1>
      <p className="text-xs sm:text-sm text-stone-600 mt-2 mb-8 leading-relaxed">
        The delicious page you are looking for might have been moved or is currently in the kitchen.
      </p>
      <div className="flex justify-center gap-3">
        <Link
          to="/"
          className="px-5 py-2.5 bg-saffron-600 hover:bg-saffron-700 text-white font-bold rounded-xl text-xs transition flex items-center gap-1.5 shadow-sm"
        >
          <Home className="w-4 h-4" /> Return to Home
        </Link>
        <Link
          to="/menu"
          className="px-5 py-2.5 bg-white hover:bg-cream-100 border border-cream-300 text-stone-800 font-bold rounded-xl text-xs transition flex items-center gap-1.5 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Browse Farsan Menu
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
