import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, TrendingUp } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/animated-button';
import { GlassCard } from '@/components/ui/glass-card';
import { uiConfig } from '@/config/uiConfig';

interface MyListingsProps {
  onAddProduct?: () => void;
  onEditProduct?: (product: any) => void;
  onDeleteProduct?: (productId: number) => void;
}

export const MyListings: React.FC<MyListingsProps> = ({
  onAddProduct,
  onEditProduct,
  onDeleteProduct
}) => {
  const [listings] = useState(uiConfig.sampleProducts);
  const [selectedListing, setSelectedListing] = useState<number | null>(null);

  const stats = {
    totalListings: listings.length,
    totalValue: listings.reduce((sum, product) => sum + product.price, 0),
    avgRating: listings.reduce((sum, product) => sum + product.rating, 0) / listings.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-primary/10 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              My Listings
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage your sustainable product listings
            </p>
          </div>
          
          <motion.div
            className="mt-4 lg:mt-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <AnimatedButton
              variant="primary"
              size="lg"
              onClick={onAddProduct}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Product
            </AnimatedButton>
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Listings</p>
                <p className="text-3xl font-bold text-foreground">{stats.totalListings}</p>
              </div>
              <div className="p-3 bg-primary/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-3xl font-bold text-foreground">₹{stats.totalValue.toLocaleString('en-IN')}</p>
              </div>
              <div className="p-3 bg-accent/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-accent-foreground" />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                <p className="text-3xl font-bold text-foreground">{stats.avgRating.toFixed(1)}</p>
              </div>
              <div className="p-3 bg-primary/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Listings Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {listings.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard 
                className="overflow-hidden"
                hover
                tilt
              >
                {/* Product Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={`/api/placeholder/400/240`}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 bg-primary/80 backdrop-blur-sm rounded-lg text-xs font-medium text-white">
                    {product.condition}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="space-y-4">
                    {/* Title & Category */}
                    <div>
                      <h3 className="font-semibold text-lg text-foreground line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-sm text-primary font-medium mt-1">
                        {product.category}
                      </p>
                    </div>

                    {/* Price & Rating */}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        ${product.price.toFixed(2)}
                      </span>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-muted-foreground">
                          ⭐ {product.rating}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>

                    {/* Sustainability Note */}
                    <div className="bg-primary/10 rounded-lg p-3">
                      <p className="text-xs text-primary font-medium">
                        🌱 {product.sustainabilityNote}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <AnimatedButton
                        variant="glass"
                        size="sm"
                        className="flex-1"
                        onClick={() => onEditProduct?.(product)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </AnimatedButton>
                      
                      <AnimatedButton
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedListing(product.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </AnimatedButton>
                      
                      <AnimatedButton
                        variant="glass"
                        size="sm"
                        onClick={() => onDeleteProduct?.(product.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </AnimatedButton>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {listings.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard className="max-w-md mx-auto p-8">
              <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No listings yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Start selling your sustainable products to our eco-conscious community
              </p>
              <AnimatedButton
                variant="primary"
                onClick={onAddProduct}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Listing
              </AnimatedButton>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  );
};