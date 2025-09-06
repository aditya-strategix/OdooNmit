import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Pages
import { Login } from "./pages/Login";
import { ProductFeed } from "./pages/ProductFeed";
import { AddProduct } from "./pages/AddProduct";
import { MyListings } from "./pages/MyListings";
import { Cart } from "./pages/Cart";
import { Dashboard } from "./pages/Dashboard";
import { PurchaseHistory } from "./pages/PurchaseHistory";
import NotFound from "./pages/NotFound";

// Components
// Update the import path to match the actual location and case of the Header component file
// Update the import path to match the actual location and case of the Header component file
import { Header } from "./components/layout/Header";

// Utils
import { uiConfig } from "./config/uiConfig";

const queryClient = new QueryClient();

const AppContent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    // Simulate authentication
    setIsAuthenticated(true);
    navigate('/');
  };

  const handleAddToCart = (product: any) => {
    setCartItems(prev => [...prev, product]);
    // Show toast notification
  };

  const handleProductClick = (product: any) => {
    // Navigate to product detail page (could be implemented as modal)
    console.log('Product clicked:', product);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: "tween" as const,
    ease: [0.2, 0.9, 0.2, 1] as const,
    duration: 0.45
  };

  if (!isAuthenticated) {
    return (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Login 
          onLogin={handleLogin}
          onSignupClick={() => console.log('Signup clicked')}
        />
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header
        cartCount={cartItems.length}
        onCartClick={() => navigate('/cart')}
        onAuthClick={() => navigate('/dashboard')}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <AnimatePresence mode="wait">
        <Routes>
          <Route
            path="/"
            element={
              <motion.div
                key="home"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <ProductFeed
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onProductClick={handleProductClick}
                  onAddToCart={handleAddToCart}
                />
              </motion.div>
            }
          />
          <Route
            path="/categories"
            element={
              <motion.div
                key="categories"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <ProductFeed
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onProductClick={handleProductClick}
                  onAddToCart={handleAddToCart}
                />
              </motion.div>
            }
          />
          <Route
            path="/sell"
            element={
              <motion.div
                key="sell"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <AddProduct
                  onSubmit={(data) => {
                    console.log('Product submitted:', data);
                    navigate('/my-listings');
                  }}
                  onCancel={() => navigate('/')}
                />
              </motion.div>
            }
          />
          <Route
            path="/my-listings"
            element={
              <motion.div
                key="my-listings"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <MyListings
                  onAddProduct={() => navigate('/sell')}
                  onEditProduct={(product) => console.log('Edit product:', product)}
                  onDeleteProduct={(id) => console.log('Delete product:', id)}
                />
              </motion.div>
            }
          />
          <Route
            path="/cart"
            element={
              <motion.div
                key="cart"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Cart
                  onContinueShopping={() => navigate('/')}
                  onCheckout={() => console.log('Proceed to checkout')}
                />
              </motion.div>
            }
          />
          <Route
            path="/dashboard"
            element={
              <motion.div
                key="dashboard"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Dashboard
                  onNavigate={(page) => navigate(page)}
                />
              </motion.div>
            }
          />
          <Route
            path="/purchases"
            element={
              <motion.div
                key="purchases"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <PurchaseHistory
                  onViewDetails={(purchase) => console.log('View purchase:', purchase)}
                />
              </motion.div>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
