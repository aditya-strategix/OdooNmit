import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Package, Eye, Star } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/animated-button';
import { GlassCard } from '@/components/ui/glass-card';

interface Purchase {
  id: string;
  title: string;
  price: number;
  purchaseDate: string;
  image: string;
  category: string;
  seller: string;
  status: 'Delivered' | 'In Transit' | 'Processing';
}

interface PurchaseHistoryProps {
  onViewDetails?: (purchase: Purchase) => void;
}

export const PurchaseHistory: React.FC<PurchaseHistoryProps> = ({ onViewDetails }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const purchases: Purchase[] = [
    {
      id: 'PH001',
      title: 'Upcycled Denim Tote Bag',
      price: 35.00,
      purchaseDate: '2023-11-15',
      image: '/api/placeholder/300/300',
      category: 'Accessories',
      seller: 'EcoCrafters',
      status: 'Delivered'
    },
    {
      id: 'PH002',
      title: 'Reusable Beeswax Food Wraps (Set of 3)',
      price: 18.50,
      purchaseDate: '2023-10-28',
      image: '/api/placeholder/300/300',
      category: 'Home Goods',
      seller: 'GreenKitchen',
      status: 'Delivered'
    },
    {
      id: 'PH003',
      title: 'Bamboo Toothbrush Set with Travel Case',
      price: 12.00,
      purchaseDate: '2023-09-01',
      image: '/api/placeholder/300/300',
      category: 'Personal Care',
      seller: 'EcoSupplies',
      status: 'Delivered'
    },
    {
      id: 'PH004',
      title: 'Refillable Glass Cleaning Spray Bottle',
      price: 9.99,
      purchaseDate: '2023-08-20',
      image: '/api/placeholder/300/300',
      category: 'Home Goods',
      seller: 'CleanGreen',
      status: 'Delivered'
    },
    {
      id: 'PH005',
      title: 'Stainless Steel Insulated Water Bottle',
      price: 25.00,
      purchaseDate: '2023-07-12',
      image: '/api/placeholder/300/300',
      category: 'Personal Care',
      seller: 'HydroEco',
      status: 'Delivered'
    },
    {
      id: 'PH006',
      title: 'Organic Cotton Reusable Produce Bags (Set of 5)',
      price: 14.95,
      purchaseDate: '2023-06-05',
      image: '/api/placeholder/300/300',
      category: 'Home Goods',
      seller: 'GreenGrocer',
      status: 'Delivered'
    }
  ];

  const filteredPurchases = purchases.filter(purchase =>
    purchase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    purchase.seller.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-100';
      case 'In Transit': return 'text-blue-600 bg-blue-100';
      case 'Processing': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

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
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Your Past Purchases
          </h1>
          <p className="text-xl text-muted-foreground">
            Review your sustainable shopping history
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search past orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
              </div>

              {/* Sort */}
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-foreground">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="price-low">Price: Low to High</option>
                </select>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Purchase Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {filteredPurchases.map((purchase, index) => (
            <motion.div
              key={purchase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="overflow-hidden" hover>
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={purchase.image}
                    alt={purchase.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(purchase.status)}`}>
                    {purchase.status}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  {/* Title & Category */}
                  <div>
                    <h3 className="font-semibold text-foreground line-clamp-2 mb-1">
                      {purchase.title}
                    </h3>
                    <p className="text-sm text-primary">{purchase.category}</p>
                  </div>

                  {/* Price & Date */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      ₹{purchase.price.toLocaleString('en-IN')}
                    </span>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(purchase.purchaseDate).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Seller */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      By {purchase.seller}
                    </span>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" />
                      4.8
                    </div>
                  </div>

                  {/* Action Button */}
                  <AnimatedButton
                    variant="glass"
                    size="sm"
                    className="w-full"
                    onClick={() => onViewDetails?.(purchase)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </AnimatedButton>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredPurchases.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard className="max-w-md mx-auto p-8">
              <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No purchases found
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery 
                  ? 'Try adjusting your search terms' 
                  : 'Start shopping for sustainable products to see your purchase history here'
                }
              </p>
              {!searchQuery && (
                <AnimatedButton variant="primary">
                  Start Shopping
                </AnimatedButton>
              )}
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  );
};