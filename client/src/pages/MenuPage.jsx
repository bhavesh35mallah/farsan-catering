import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Sparkles, Filter, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { productService } from '../services/productService';
import { useLanguage } from '../context/LanguageContext';

const MenuPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  const { isGujarati, t, getCategoryName } = useLanguage();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState('default');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Sync category state when URL changes
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  // Load categories once
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const catRes = await productService.getCategories();
        setCategories(catRes.categories || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCats();
  }, []);

  // Fetch products with filters
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {
          category: selectedCategory,
          search: searchQuery.trim(),
          page,
          limit: 20,
        };

        if (sortBy === 'price-low') params.sort = 'price-low';
        else if (sortBy === 'price-high') params.sort = 'price-high';
        else if (sortBy === 'name-asc') params.sort = 'name-asc';

        const data = await productService.getProducts(params);
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchQuery, sortBy, page]);

  const handleCategorySelect = (slug) => {
    setSelectedCategory(slug);
    setPage(1);
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('default');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  return (
    <div className={`w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-8 sm:py-12 ${isGujarati ? 'font-gujarati' : ''}`}>
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-saffron-700 bg-saffron-50 px-3 py-1 rounded-full border border-saffron-200">
          {isGujarati ? 'શુદ્ધ ઘરગથ્થુ સ્વાદ' : 'Fresh Homemade Delights'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 mt-2">
          {isGujarati ? 'અમારું ગુજરાતી ફરસાણ મેનુ' : 'Our Gujarati Farsan Menu'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed font-normal">
          {isGujarati
            ? '૧૦૦% શુદ્ધ ફિલ્ટર સીંગતેલ અને શુદ્ધ ગાયના ઘીમાં રાંધેલું. તમારી પસંદગીનું ફરસાણ પસંદ કરો અને ગરમાગરમ સ્વાદ માણો.'
            : 'Cooked in pure groundnut oil and pure cow ghee. Select your favorite snacks, choose a delivery or pickup time, and enjoy homemade freshness.'}
        </p>
      </div>

      {/* Search and Sort Toolbar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl border border-cream-300 shadow-soft mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={isGujarati ? 'ખમણ, ખાંડવી, ફાફડા, ગાંઠિયા, થેપલા શોધો...' : 'Search dhokla, fafda, gathiya, thepla...'}
            className="w-full pl-10 pr-4 py-2.5 bg-cream-50 rounded-xl border border-cream-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/20 focus:border-saffron-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2.5 justify-end shrink-0">
          <span className="text-xs font-bold text-stone-600 flex items-center gap-1 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-saffron-600" /> {isGujarati ? 'ક્રમ:' : 'Sort:'}
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-cream-50 border border-cream-300 text-xs sm:text-sm font-bold rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-saffron-500/20"
          >
            <option value="default">{isGujarati ? 'ખાસ ભલામણ' : 'Featured'}</option>
            <option value="price-low">{isGujarati ? 'ભાવ: ઓછાથી વધુ' : 'Price: Low to High'}</option>
            <option value="price-high">{isGujarati ? 'ભાવ: વધુથી ઓછા' : 'Price: High to Low'}</option>
            <option value="name-asc">{isGujarati ? 'નામ: A થી Z' : 'Name: A to Z'}</option>
          </select>
        </div>
      </div>

      {/* Category Pills with smooth horizontal scrolling */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar scroll-smooth">
        <button
          onClick={() => handleCategorySelect('all')}
          className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-sm active:scale-95 ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-saffron-600 to-saffron-700 text-white shadow-saffron-600/30'
              : 'bg-white text-stone-700 hover:bg-cream-100 border border-cream-300'
          }`}
        >
          {isGujarati ? `બધી વાનગીઓ (${products.length})` : `All Items (${products.length})`}
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => handleCategorySelect(cat.slug)}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-sm active:scale-95 ${
              selectedCategory === cat.slug
                ? 'bg-gradient-to-r from-saffron-600 to-saffron-700 text-white shadow-saffron-600/30'
                : 'bg-white text-stone-700 hover:bg-cream-100 border border-cream-300'
            }`}
          >
            {getCategoryName(cat.name)}
          </button>
        ))}
      </div>

      {/* Active Filter Feedback */}
      {(searchQuery || selectedCategory !== 'all' || sortBy !== 'default') && (
        <div className="flex items-center justify-between mb-6 text-xs text-stone-600 bg-cream-50 p-2.5 sm:p-3 rounded-xl border border-cream-200">
          <span className="truncate mr-2">
            {isGujarati ? 'પરિણામો:' : 'Showing results for:'}{' '}
            <strong className="text-stone-900">
              {selectedCategory !== 'all' ? selectedCategory.replace('-', ' ') : isGujarati ? 'બધી વાનગીઓ' : 'All categories'}
            </strong>{' '}
            {searchQuery && <>{isGujarati ? `શોધ: "${searchQuery}"` : `matching "${searchQuery}"`}</>}
          </span>
          <button
            onClick={handleClearFilters}
            className="text-saffron-700 hover:underline font-bold flex items-center gap-1 shrink-0"
          >
            <X className="w-3.5 h-3.5" /> {isGujarati ? 'ફિલ્ટર હટાવો' : 'Clear'}
          </button>
        </div>
      )}

      {/* Product Grid - Responsive across mobile, tablet, and desktop */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl h-80 animate-pulse border border-cream-200"
            ></div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-3xl border border-cream-300 p-12 text-center max-w-lg mx-auto shadow-soft my-10">
          <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mx-auto text-stone-400 mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-stone-800">
            {isGujarati ? 'કોઈ વાનગી મળી નહીં' : 'No Farsan Items Found'}
          </h3>
          <p className="text-xs text-stone-500 mt-1 mb-6">
            {isGujarati
              ? 'તમારી શોધ મુજબ કોઈ વાનગી નથી મળી. ખમણ, ખાંડવી, ફાફડા શોધો અથવા બધા આઇટમ જુઓ.'
              : 'We couldn’t find any items matching your current filters. Try searching for "dhokla", "khandvi", or clear your search.'}
          </p>
          <button
            onClick={handleClearFilters}
            className="px-5 py-2.5 bg-saffron-600 text-white rounded-xl text-xs font-bold hover:bg-saffron-700 transition"
          >
            {isGujarati ? 'બધી વાનગીઓ જુઓ' : 'Show All Menu Items'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => {
                setPage(p);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`w-9 h-9 rounded-lg text-xs font-bold transition ${
                page === p
                  ? 'bg-saffron-600 text-white'
                  : 'bg-white border border-cream-300 text-stone-700 hover:bg-cream-100'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuPage;
