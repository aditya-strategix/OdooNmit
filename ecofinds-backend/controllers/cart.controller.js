const Cart = require('../models/Cart');
const Product= require('../models/Product');

// @desc    Add product to user's cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user._id;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Find or create cart for user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    // Check if product already in cart
    const existingProductIndex = cart.products.findIndex(
      item => item.productId.toString() === productId
    );

    if (existingProductIndex > -1) {
      // Update quantity
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      // Add new product
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    await cart.populate('products.productId', 'title price image category');

    res.json({
      success: true,
      message: 'Product added to cart successfully',
      data: { cart }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all products in user's cart
// @route   GET /api/cart/:userId
// @access  Private
const getCart = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Check if user is accessing their own cart
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only view your own cart.'
      });
    }

    const cart = await Cart.findOne({ userId })
      .populate('products.productId', 'title price image category ownerId');

    if (!cart) {
      return res.json({
        success: true,
        data: { 
          cart: { 
            userId, 
            products: [],
            totalItems: 0,
            totalAmount: 0
          } 
        }
      });
    }

    // Calculate totals
    const totalItems = cart.products.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cart.products.reduce((sum, item) => {
      return sum + (item.productId.price * item.quantity);
    }, 0);

    res.json({
      success: true,
      data: { 
        cart: {
          ...cart.toObject(),
          totalItems,
          totalAmount
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove product from cart
// @route   DELETE /api/cart/:userId/:productId
// @access  Private
const removeFromCart = async (req, res, next) => {
  try {
    const { userId, productId } = req.params;

    // Check if user is accessing their own cart
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only modify your own cart.'
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    // Remove product from cart
    cart.products = cart.products.filter(
      item => item.productId.toString() !== productId
    );

    await cart.save();
    await cart.populate('products.productId', 'title price image category');

    res.json({
      success: true,
      message: 'Product removed from cart successfully',
      data: { cart }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart
};