const Product = require('../models/Product');

// @desc    Create a new product listing
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res, next) => {
    try {
        const { title, description, category, price, image } = req.body;

        const product = new Product({
            title,
            description,
            category,
            price,
            image,
            ownerId: req.user._id
        });

        await product.save();
        await product.populate('ownerId', 'username email');

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: { product }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    List all products with optional filtering and search
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    // Build query
    let query = {};

    // Category filter
    if (category) {
      query.category = category;
    }

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Pagination
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute query
    const products = await Product.find(query)
      .populate('ownerId', 'username')
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNumber);

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          current: pageNumber,
          pages: Math.ceil(total / limitNumber),
          total,
          hasNext: pageNumber < Math.ceil(total / limitNumber),
          hasPrev: pageNumber > 1
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get details of a single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('ownerId', 'username email');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: { product }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Edit product listing (only by owner)
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if user is the owner
    if (product.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only edit your own products.'
      });
    }

    const { title, description, category, price, image } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { title, description, category, price, image },
      { new: true, runValidators: true }
    ).populate('ownerId', 'username email');

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: { product: updatedProduct }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product listing (only by owner)
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if user is the owner
    if (product.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only delete your own products.'
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};