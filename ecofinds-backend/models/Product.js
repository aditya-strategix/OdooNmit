const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true,
    maxlength: [100, 'Title must be less than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
    maxlength: [1000, 'Description must be less than 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    trim: true,
    enum: {
      values: ['electronics', 'clothing', 'books', 'home', 'sports', 'toys', 'beauty', 'automotive', 'other'],
      message: 'Invalid category'
    }
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price must be positive'],
    validate: {
      validator: function(v) {
        return v >= 0 && Number.isFinite(v);
      },
      message: 'Price must be a valid positive number'
    }
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/300x300?text=Product+Image',
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Image must be a valid URL'
    }
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Product owner is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient searching
productSchema.index({ title: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ ownerId: 1 });

module.exports = mongoose.model('Product', productSchema);
