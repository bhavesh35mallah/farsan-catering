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
    <div className={`w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-12 sm:py-16 ${isGujarati ? 'font-gujarati' : ''}`}>
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-[10px] font-bold uppercase tracking-widest text-saffron-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
          {isGujarati ? 'શુદ્ધ ઘરગથ્થુ સ્વાદ' : 'Fresh Collection'}
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mt-6 tracking-tight">
          {isGujarati ? 'અમારું મેનુ' : 'Our Farsan Menu'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-4 leading-relaxed">
          {isGujarati
            ? '૧૦૦% શુદ્ધ ફિલ્ટર સીંગતેલ અને શુદ્ધ ગાયના ઘીમાં રાંધેલું.'
            : 'Cooked in pure groundnut oil and pure cow ghee for authentic taste.'}
        </p>
      </div>

      {/* Search and Sort Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-orange-100 shadow-soft mb-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg group">
          <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={isGujarati ? 'વાનગી શોધો...' : 'Search for snacks...'}
            className="w-full pl-10 pr-4 py-3 bg-orange-50/30 rounded-xl border border-orange-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-saffron-500/10 focus:border-saffron-300 transition-all"
          />
        </div>

        {/* Sort & Filter Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-orange-50/30 px-4 py-2 rounded-xl border border-orange-100">
            <SlidersHorizontal className="w-3.5 h-3.5 text-orange-600" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-bold text-stone-700 focus:outline-none cursor-pointer"
            >
              <option value="default">{isGujarati ? 'ખાસ' : 'Featured'}</option>
              <option value="price-low">{isGujarati ? 'ભાવ - ઓછા' : 'Price: Low'}</option>
              <option value="price-high">{isGujarati ? 'ભાવ - વધુ' : 'Price: High'}</option>
              <option value="name-asc">{isGujarati ? 'નામ' : 'Name'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-6 mb-8 no-scrollbar">
        <button
          onClick={() => handleCategorySelect('all')}
          className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
            selectedCategory === 'all'
              ? 'bg-saffron-600 text-white border-saffron-600 shadow-saffron'
              : 'bg-white text-stone-600 hover:bg-orange-50 border-orange-100'
          }`}
        >
          {isGujarati ? `બધી વાનગીઓ` : `All Selection`}
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => handleCategorySelect(cat.slug)}
            className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
              selectedCategory === cat.slug
                ? 'bg-saffron-600 text-white border-saffron-600 shadow-saffron'
                : 'bg-white text-stone-600 hover:bg-orange-50 border-orange-100'
            }`}
          >
            {getCategoryName(cat.name)}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-orange-50/50 rounded-2xl h-64 sm:h-80 animate-pulse border border-orange-100"></div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-3xl border border-orange-100 p-16 text-center max-w-lg mx-auto shadow-soft my-10">
          <h3 className="text-xl font-bold text-stone-900 uppercase tracking-tight">
            {isGujarati ? 'કોઈ વાનગી મળી નહીં' : 'No Results Found'}
          </h3>
          <button
            onClick={handleClearFilters}
            className="mt-8 px-8 py-3 bg-stone-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-saffron-600 transition-all"
          >
            {isGujarati ? 'બધી વાનગીઓ જુઓ' : 'Show Everything'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuPage;
