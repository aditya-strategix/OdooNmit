const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./config/database');  
const errorHandler = require('./middlewares/errorHandler');

// Import routes
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/users.route');
const productRoutes = require('./routes/products.route');
const cartRoutes = require('./routes/cart.route');
const purchaseRoutes = require('./routes/purchases.route');
const aiRoutes = require('./routes/ai.route');   // 👈 AI Routes

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/ai', aiRoutes);

// ✅ Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware (last)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// ✅ Bind server first, then connect to DB
app.listen(PORT, '0.0.0.0', async () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);

  try {
    await connectDB();
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error(" MongoDB connection failed:", err.message);
  }
});

module.exports = app;
