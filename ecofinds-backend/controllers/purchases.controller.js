const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');

// @desc    Mark products as purchased
// @route   POST /api/purchases
// @access  Private
const createPurchase = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Get user's cart
    const cart = await Cart.findOne({ userId })
      .populate('products.productId', 'title price');

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Calculate total amount
    let totalAmount = 0;
    const purchasedProducts = cart.products.map(item => {
      const itemTotal = item.productId.price * item.quantity;
      totalAmount += itemTotal;
      
      return {
        productId: item.productId._id,
        title: item.productId.title,
        price: item.productId.price,
        quantity: item.quantity
      };
    });

    // Create purchase record
    const purchase = new Purchase({
      userId,
      products: purchasedProducts,
      totalAmount
    });

    await purchase.save();

    // Clear the cart
    await Cart.findOneAndDelete({ userId });

    res.status(201).json({
      success: true,
      message: 'Purchase completed successfully',
      data: { purchase }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    View all previously purchased products
// @route   GET /api/purchases/:userId
// @access  Private
const getPurchaseHistory = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    // Check if user is accessing their own purchases
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only view your own purchases.'
      });
    }

    // Pagination
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const purchases = await Purchase.find({ userId })
      .sort({ purchaseDate: -1 })
      .skip(skip)
      .limit(limitNumber);

    const total = await Purchase.countDocuments({ userId });

    // Calculate totals
    const totalSpent = await Purchase.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    res.json({
      success: true,
      data: {
        purchases,
        pagination: {
          current: pageNumber,
          pages: Math.ceil(total / limitNumber),
          total,
          hasNext: pageNumber < Math.ceil(total / limitNumber),
          hasPrev: pageNumber > 1
        },
        summary: {
          totalOrders: total,
          totalSpent: totalSpent[0]?.total || 0
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPurchase,
  getPurchaseHistory
};