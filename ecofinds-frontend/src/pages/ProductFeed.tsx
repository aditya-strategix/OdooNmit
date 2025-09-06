import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '@/components/common/ProductCard';
import { AnimatedButton } from '@/components/ui/animated-button';
import { GlassCard } from '@/components/ui/glass-card';
import { ProductRecommendations } from '@/components/common/ProductRecommendations';
import { Footer } from '@/components/layout/Footer';
import { uiConfig } from '@/config/uiConfig';

interface ProductFeedProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onProductClick?: (product: any) => void;
  onAddToCart?: (product: any) => void;
}

export const ProductFeed: React.FC<ProductFeedProps> = ({
  searchQuery = '',
  onSearchChange,
  onProductClick,
  onAddToCart
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [sortBy, setSortBy] = useState('Relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const sortOptions = ['Relevance', 'Price: Low to High', 'Price: High to Low', 'Newest', 'Rating'];

  const filteredProducts = uiConfig.sampleProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToggleFavorite = (productId: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-primary/10 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4">
            Shop by Category
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover sustainable second-hand treasures from our eco-conscious community
          </p>
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="p-6">
            {/* Top Bar */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6">
              {/* Search */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for sustainable products..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
              </div>

              {/* View Controls */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-white/10 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                <AnimatedButton
                  variant="glass"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </AnimatedButton>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {uiConfig.categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-white/10 text-foreground hover:bg-white/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Sort Options */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-white/20 pt-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      {sortOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </motion.div>

        {/* Results Count */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} sustainable products
            {selectedCategory !== 'All Products' && ` in ${selectedCategory}`}
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}
          layout
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.5,
                ease: [0.2, 0.9, 0.2, 1]
              }}
              layout
            >
              <ProductCard
                product={product}
                onProductClick={onProductClick}
                onAddToCart={onAddToCart}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.has(product.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No products found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or browse different categories
              </p>
              <AnimatedButton
                variant="primary"
                onClick={() => {
                  setSelectedCategory('All Products');
                  onSearchChange?.('');
                }}
              >
                Reset Filters
              </AnimatedButton>
            </div>
          </motion.div>
        )}
      </div>

      {/* Product Recommendations */}
      <ProductRecommendations 
        isLoggedIn={true}
        onProductClick={onProductClick}
        onAddToCart={onAddToCart}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};