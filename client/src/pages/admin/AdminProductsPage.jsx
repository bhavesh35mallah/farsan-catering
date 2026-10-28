import React, { useState, useEffect } from 'react';
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Upload,
  X,
  Sparkles,
  AlertCircle,
  FolderPlus,
} from 'lucide-react';
import { productService } from '../../services/productService';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Product Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    unit: '500 g',
    category: '',
    image: '',
    isAvailable: true,
    isFeatured: false,
    requiresAdvanceOrder: false,
    preparationTime: 'Fresh morning & evening batches daily',
    isVeg: true,
  });

  // Category Form state
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');

  const fetchProductsAndCategories = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        productService.getProducts({ limit: 100 }),
        productService.getAllCategoriesAdmin(),
      ]);
      setProducts(prodRes.products || []);
      setCategories(catRes.categories || []);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsAndCategories();
  }, []);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      unit: '500 g',
      category: categories[0]?._id || '',
      image: '',
      isAvailable: true,
      isFeatured: false,
      requiresAdvanceOrder: false,
      preparationTime: 'Fresh morning & evening batches daily',
      isVeg: true,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      unit: product.unit,
      category: product.category?._id || product.category || categories[0]?._id,
      image: product.image || '',
      isAvailable: product.isAvailable,
      isFeatured: product.isFeatured || false,
      requiresAdvanceOrder: product.requiresAdvanceOrder || false,
      preparationTime: product.preparationTime || '',
      isVeg: product.isVeg !== undefined ? product.isVeg : true,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const res = await productService.uploadImage(file);
      if (res.success && res.imageUrl) {
        setFormData((prev) => ({ ...prev, image: res.imageUrl }));
      }
    } catch (err) {
      alert(`Image upload failed: ${err.message}`);
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim() || formData.price === '' || !formData.category) {
      setFormError('Name, price, unit, and category are required.');
      return;
    }

    setFormSubmitting(true);

    try {
      if (editingProduct) {
        await productService.updateProduct(editingProduct._id, formData);
      } else {
        await productService.createProduct(formData);
      }
      setIsModalOpen(false);
      fetchProductsAndCategories();
    } catch (err) {
      setFormError(err.message || 'Failed to save product');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleToggleAvailability = async (product) => {
    try {
      await productService.updateProduct(product._id, {
        isAvailable: !product.isAvailable,
      });
      setProducts((prev) =>
        prev.map((p) => (p._id === product._id ? { ...p, isAvailable: !p.isAvailable } : p))
      );
    } catch (err) {
      alert(`Could not update stock status: ${err.message}`);
    }
  };

  const handleToggleFeatured = async (product) => {
    try {
      await productService.updateProduct(product._id, {
        isFeatured: !product.isFeatured,
      });
      setProducts((prev) =>
        prev.map((p) => (p._id === product._id ? { ...p, isFeatured: !p.isFeatured } : p))
      );
    } catch (err) {
      alert(`Could not update featured status: ${err.message}`);
    }
  };

  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${name}"?`)) return;
    try {
      await productService.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!catName.trim()) return;

    try {
      await productService.createCategory({ name: catName.trim(), description: catDesc.trim() });
      setCatName('');
      setCatDesc('');
      setIsCategoryModalOpen(false);
      fetchProductsAndCategories();
    } catch (err) {
      alert(err.message || 'Failed to create category');
    }
  };

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCat =
      selectedCat === 'all' ||
      p.category?._id === selectedCat ||
      p.category?.slug === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900">
            Product &amp; Inventory Management
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Configure sample farsan prices, unit sizes, daily availability, and advance order flags.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className="px-3.5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-stone-300"
          >
            <FolderPlus className="w-4 h-4" /> Add Category
          </button>
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 bg-saffron-600 hover:bg-saffron-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add New Product
          </button>
        </div>
      </div>

      {/* Toolbar: Search and Filter */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items by name..."
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/20"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-stone-500 font-bold shrink-0">Category:</span>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-stone-800 focus:outline-none"
          >
            <option value="all">All Categories ({products.length})</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-4 border-saffron-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-xs text-stone-500">
            No products match the selected criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-stone-50 text-stone-600 font-bold border-b border-stone-200">
                <tr>
                  <th className="p-3.5">Product</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Sample Price</th>
                  <th className="p-3.5">Unit</th>
                  <th className="p-3.5 text-center">In Stock Today</th>
                  <th className="p-3.5 text-center">Featured</th>
                  <th className="p-3.5">Pre-Order Notice</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredProducts.map((p) => (
                  <tr key={p._id} className="hover:bg-stone-50/60 transition">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image || 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=100&auto=format&fit=crop&q=80'}
                          alt={p.name}
                          className="w-11 h-11 rounded-lg object-cover border border-stone-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-serif font-bold text-stone-900 truncate max-w-[200px]">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-stone-500 line-clamp-1 max-w-[200px]">
                            {p.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 font-medium text-stone-700">
                      {p.category?.name || 'Uncategorized'}
                    </td>
                    <td className="p-3.5 font-bold text-stone-900">
                      ₹{p.price}
                    </td>
                    <td className="p-3.5">
                      <span className="bg-stone-100 text-stone-800 px-2 py-0.5 rounded text-[11px] font-semibold">
                        {p.unit}
                      </span>
                    </td>
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => handleToggleAvailability(p)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition border ${
                          p.isAvailable
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-stone-100 text-stone-500 border-stone-300 hover:bg-stone-200'
                        }`}
                      >
                        {p.isAvailable ? 'In Stock ✓' : 'Sold Out ✕'}
                      </button>
                    </td>
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => handleToggleFeatured(p)}
                        className={`p-1.5 rounded-lg transition ${
                          p.isFeatured
                            ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                            : 'text-stone-300 hover:text-stone-500 hover:bg-stone-100'
                        }`}
                        title="Toggle Featured"
                      >
                        <Sparkles className="w-4 h-4 fill-current" />
                      </button>
                    </td>
                    <td className="p-3.5 text-stone-500 text-[11px]">
                      {p.requiresAdvanceOrder ? (
                        <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-semibold">
                          Advance: {p.preparationTime || 'Notice required'}
                        </span>
                      ) : (
                        <span className="text-stone-400">Same-day ready</span>
                      )}
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-1.5 text-stone-600 hover:text-saffron-700 hover:bg-saffron-50 rounded-lg transition"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p._id, p.name)}
                          className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
              <h2 className="font-serif text-xl font-bold text-stone-900">
                {editingProduct ? 'Edit Product Details' : 'Add New Farsan Product'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="e.g. Nylon Khaman Dhokla"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron-500/20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron-500/20 font-medium"
                  >
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Sample Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    name="price"
                    value={formData.price}
                    onChange={handleFormChange}
                    placeholder="e.g. 140"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron-500/20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Unit / Packaging *</label>
                  <input
                    type="text"
                    required
                    name="unit"
                    value={formData.unit}
                    onChange={handleFormChange}
                    placeholder="e.g. 250 g, 500 g, 1 kg, piece, box"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Description</label>
                <textarea
                  rows="2"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Ingredients, taste profile, tempering details..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron-500/20"
                />
              </div>

              {/* Image Input and Upload */}
              <div className="space-y-2">
                <label className="block font-bold text-stone-700">Product Image URL or Upload</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleFormChange}
                    placeholder="https://images.unsplash.com/... or /uploads/..."
                    className="flex-1 px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none"
                  />
                  <label className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-xl cursor-pointer flex items-center gap-1.5 shrink-0 text-xs font-bold">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
                {formData.image && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={formData.image} alt="Preview" className="w-12 h-12 rounded-lg object-cover border" />
                    <span className="text-xs text-stone-500">Image preview</span>
                  </div>
                )}
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <label className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isAvailable"
                    checked={formData.isAvailable}
                    onChange={handleFormChange}
                    className="rounded text-saffron-600"
                  />
                  <span className="font-semibold text-xs text-stone-800">In Stock Today</span>
                </label>

                <label className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleFormChange}
                    className="rounded text-saffron-600"
                  />
                  <span className="font-semibold text-xs text-stone-800">Mark Featured</span>
                </label>

                <label className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer">
                  <input
                    type="checkbox"
                    name="requiresAdvanceOrder"
                    checked={formData.requiresAdvanceOrder}
                    onChange={handleFormChange}
                    className="rounded text-saffron-600"
                  />
                  <span className="font-semibold text-xs text-stone-800">Advance Order</span>
                </label>
              </div>

              {formData.requiresAdvanceOrder && (
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Advance Notice Requirement Note
                  </label>
                  <input
                    type="text"
                    name="preparationTime"
                    value={formData.preparationTime}
                    onChange={handleFormChange}
                    placeholder="e.g. Requires 4 hours advance order"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none"
                  />
                </div>
              )}

              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-bold hover:bg-stone-50 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-5 py-2.5 bg-saffron-600 hover:bg-saffron-700 text-white font-bold rounded-xl text-xs transition"
                >
                  {formSubmitting ? 'Saving...' : editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 animate-fade-in">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <h2 className="font-serif text-lg font-bold text-stone-900">Add New Category</h2>
              <button onClick={() => setIsCategoryModalOpen(false)} className="p-1 text-stone-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  placeholder="e.g. Festive Combos"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Short Description</label>
                <input
                  type="text"
                  value={catDesc}
                  onChange={(e) => setCatDesc(e.target.value)}
                  placeholder="e.g. Seasonal celebration gift hampers"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-3 py-2 rounded-xl text-stone-600 font-bold hover:bg-stone-100 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-saffron-600 hover:bg-saffron-700 text-white rounded-xl text-xs font-bold transition"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
