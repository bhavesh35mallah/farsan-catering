import { Product } from '../models/Product.js';
import { Category } from '../models/Category.js';

// Helper to generate slug
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');

export const getProducts = async (req, res, next) => {
  try {
    const { category, search, featured, available, sort, page = 1, limit = 50 } = req.query;

    const query = {};

    // Availability filter
    if (available === 'true') {
      query.isAvailable = true;
    }

    // Featured filter
    if (featured === 'true') {
      query.isFeatured = true;
    }

    // Category filter
    if (category && category !== 'all') {
      // Find category by slug or id
      const catDoc = await Category.findOne({
        $or: [{ slug: category }, { _id: category.match(/^[0-9a-fA-F]{24}$/) ? category : null }],
      });
      if (catDoc) {
        query.category = catDoc._id;
      } else {
        // If no matching category doc, return empty
        return res.json({
          success: true,
          count: 0,
          totalPages: 0,
          currentPage: Number(page),
          products: [],
        });
      }
    }

    // Search filter
    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [{ name: searchRegex }, { description: searchRegex }];
    }

    // Sorting
    let sortOption = { createdAt: -1 };
    if (sort === 'price-low') {
      sortOption = { price: 1 };
    } else if (sort === 'price-high') {
      sortOption = { price: -1 };
    } else if (sort === 'name-asc') {
      sortOption = { name: 1 };
    } else if (sort === 'name-desc') {
      sortOption = { name: -1 };
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      count: products.length,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      products,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let product;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id).populate('category', 'name slug');
    } else {
      product = await Product.findOne({ slug: id }).populate('category', 'name slug');
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      unit,
      category,
      image,
      isAvailable,
      isFeatured,
      isVeg,
      requiresAdvanceOrder,
      preparationTime,
      minOrderQty,
    } = req.body;

    if (!name || price === undefined || !unit || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, price, unit, and category.',
      });
    }

    // Validate category exists
    const catDoc = await Category.findById(category);
    if (!catDoc) {
      return res.status(400).json({
        success: false,
        message: 'Selected category does not exist.',
      });
    }

    let slug = slugify(name);
    // Ensure slug uniqueness
    const existing = await Product.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const product = await Product.create({
      name,
      slug,
      description: description || '',
      price: Number(price),
      unit,
      category,
      image: image || '',
      isAvailable: isAvailable !== undefined ? isAvailable : true,
      isFeatured: isFeatured || false,
      isVeg: isVeg !== undefined ? isVeg : true,
      requiresAdvanceOrder: requiresAdvanceOrder || false,
      preparationTime: preparationTime || 'Freshly prepared for daily orders',
      minOrderQty: minOrderQty ? Number(minOrderQty) : 1,
    });

    const populatedProduct = await Product.findById(product._id).populate('category', 'name slug');

    res.status(201).json({
      success: true,
      message: 'Product created successfully.',
      product: populatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    if (updates.name && !updates.slug) {
      updates.slug = slugify(updates.name);
    }

    if (updates.price !== undefined) {
      updates.price = Number(updates.price);
    }

    const product = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate('category', 'name slug');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    res.json({
      success: true,
      message: 'Product updated successfully.',
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

export const uploadProductImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No image file uploaded.',
    });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({
    success: true,
    imageUrl,
    filename: req.file.filename,
  });
};

// Category Controllers
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ orderIndex: 1, name: 1 });
    res.json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCategoriesAdmin = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ orderIndex: 1, name: 1 });
    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name, description, image, orderIndex } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Category name is required.' });
    }

    const slug = slugify(name);
    const category = await Category.create({
      name,
      slug,
      description: description || '',
      image: image || '',
      orderIndex: orderIndex ? Number(orderIndex) : 0,
    });

    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found.' });
    }
    res.json({ success: true, category });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Check if products exist in category
    const productsInCat = await Product.countDocuments({ category: id });
    if (productsInCat > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category because it contains ${productsInCat} active products. Please reassign or delete them first.`,
      });
    }

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found.' });
    }
    res.json({ success: true, message: 'Category deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
