// Import environment variables
require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use MongoDB URI from environment variable
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://demo:demo@cluster0.mongodb.net/ecommerce?retryWrites=true&w=majority';
    const conn = await mongoose.connect(mongoUri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed.');
      process.exit(0);
    });

  } catch (error) {
    console.error('Database connection error:', error);
    console.log('Continuing without database connection for demo purposes...');
  }
};

module.exports = connectDB;
