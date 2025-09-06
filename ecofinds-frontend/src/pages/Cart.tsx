import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/animated-button';
import { GlassCard } from '@/components/ui/glass-card';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface CartProps {
  onContinueShopping?: () => void;
  onCheckout?: () => void;
}

export const Cart: React.FC<CartProps> = ({ onContinueShopping, onCheckout }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      title: 'Recycled Glass Vase',
      price: 24.99,
      quantity: 1,
      image: '/api/placeholder/300/300',
      category: 'Home Goods'
    },
    {
      id: 2,
      title: 'Organic Cotton T-Shirt',
      price: 18.50,
      quantity: 2,
      image: '/api/placeholder/300/300',
      category: 'Clothing'
    },
    {
      id: 3,
      title: 'Handmade Bamboo Cutlery Set',
      price: 12.00,
      quantity: 1,
      image: '/api/placeholder/300/300',
      category: 'Personal Care'
    }
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-primary/10 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">Your Cart</h1>
          <p className="text-xl text-muted-foreground">
            Review your sustainable product selections
          </p>
        </motion.div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard className="p-6">
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">
                          {item.title}
                        </h3>
                        <p className="text-sm text-primary">{item.category}</p>
                        <p className="text-lg font-bold text-primary mt-1">
                          ₹{item.price.toLocaleString('en-IN')}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <motion.button
                          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </motion.button>
                        
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        
                        <motion.button
                          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </motion.button>
                      </div>

                      {/* Remove Button */}
                      <motion.button
                        className="p-2 text-red-500 hover:text-red-600 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GlassCard className="p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  {/* Subtotal */}
                  <div className="flex justify-between">
                    <span className="text-foreground">Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between">
                    <span className="text-foreground">Shipping</span>
                    <span className="font-semibold text-green-600">
                      {shipping === 0 ? 'Free' : `₹${(shipping as number).toLocaleString('en-IN')}`}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/20 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-foreground">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        ₹{total.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <AnimatedButton
                    variant="primary"
                    size="lg"
                    className="w-full mt-6"
                    onClick={onCheckout}
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </AnimatedButton>

                  {/* Continue Shopping */}
                  <AnimatedButton
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    onClick={onContinueShopping}
                  >
                    Continue Shopping
                  </AnimatedButton>

                  {/* Sustainability Note */}
                  <div className="bg-primary/10 rounded-lg p-4 mt-6">
                    <p className="text-sm text-primary font-medium">
                      🌱 By shopping with EcoFinds, you're supporting sustainable practices and reducing waste. Thank you for being eco-conscious!
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        ) : (
          /* Empty Cart */
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="max-w-md mx-auto p-8">
              <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Your cart is empty
              </h3>
              <p className="text-muted-foreground mb-6">
                Discover amazing sustainable products and add them to your cart
              </p>
              <AnimatedButton
                variant="primary"
                onClick={onContinueShopping}
              >
                Start Shopping
              </AnimatedButton>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  );
};