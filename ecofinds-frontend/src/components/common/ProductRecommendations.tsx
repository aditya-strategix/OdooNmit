import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, TrendingUp, Clock, Percent } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { GlassCard } from '@/components/ui/glass-card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Badge } from '@/components/ui/badge';
import { uiConfig } from '@/config/uiConfig';

interface ProductRecommendationsProps {
  isLoggedIn?: boolean;
  onProductClick?: (product: any) => void;
  onAddToCart?: (product: any) => void;
}

export const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({
  isLoggedIn = false,
  onProductClick,
  onAddToCart
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  // Create different product sets for different sections
  const previousPurchases = uiConfig.sampleProducts.slice(0, 4);
  const trending = uiConfig.sampleProducts.slice(4, 8);
  const onSale = uiConfig.sampleProducts.map(product => ({
    ...product,
    originalPrice: product.price * 1.3,
    discount: Math.floor(Math.random() * 40) + 10
  })).slice(2, 6);

  const SectionHeader = ({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle: string }) => (
    <motion.div 
      className="flex items-center justify-between mb-8"
      variants={sectionVariants}
    >
      <div className="flex items-center space-x-3">
        <GlassCard className="p-3">
          <Icon className="w-6 h-6 text-primary" />
        </GlassCard>
        <div>
          <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        </div>
      </div>
      <div className="hidden md:flex items-center space-x-2">
        <AnimatedButton variant="glass" size="sm">
          <ChevronLeft className="w-4 h-4" />
        </AnimatedButton>
        <AnimatedButton variant="glass" size="sm">
          <ChevronRight className="w-4 h-4" />
        </AnimatedButton>
      </div>
    </motion.div>
  );

  const ProductGrid = ({ products, showDiscount = false }: { products: any[], showDiscount?: boolean }) => (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={containerVariants}
    >
      {products.map((product, index) => (
        <motion.div
          key={`${product.id}-${index}`}
          variants={cardVariants}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          className="relative"
        >
          {showDiscount && (
            <motion.div
              className="absolute -top-2 -right-2 z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1, type: "spring" }}
            >
              <Badge 
                variant="destructive" 
                className="px-2 py-1 text-xs font-bold bg-red-500 text-white animate-pulse"
              >
                <Percent className="w-3 h-3 mr-1" />
                {product.discount}% OFF
              </Badge>
            </motion.div>
          )}
          <GlassCard className="overflow-hidden" hover glow>
            <div className="aspect-square relative overflow-hidden">
              <motion.img
                src={product.images?.[0] || `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop`}
                alt={product.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="p-4 space-y-3">
              <h3 className="font-medium text-foreground line-clamp-2 text-sm">
                {product.title}
              </h3>
              <div className="flex items-center justify-between">
                {showDiscount ? (
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-primary">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className="text-lg font-bold text-primary">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <AnimatedButton
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => onAddToCart?.(product)}
              >
                Add to Cart
              </AnimatedButton>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <motion.div
      className="max-w-7xl mx-auto px-6 py-16 space-y-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Previous Purchases or Trending */}
      <motion.section variants={sectionVariants}>
        {isLoggedIn ? (
          <>
            <SectionHeader 
              icon={Clock}
              title="Your Previous Buys"
              subtitle="Items you've purchased before"
            />
            <ProductGrid products={previousPurchases} />
          </>
        ) : (
          <>
            <SectionHeader 
              icon={TrendingUp}
              title="Trending Now"
              subtitle="Popular items in your area"
            />
            <ProductGrid products={trending} />
          </>
        )}
      </motion.section>

      {/* On Sale Today */}
      <motion.section variants={sectionVariants}>
        <SectionHeader 
          icon={Percent}
          title="On Sale Today"
          subtitle="Limited time offers - up to 40% off"
        />
        <ProductGrid products={onSale} showDiscount />
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        variants={sectionVariants}
        className="text-center py-16"
      >
        <GlassCard className="max-w-2xl mx-auto p-8 text-center" glow>
          <h3 className="text-3xl font-semibold text-foreground mb-4">
            Ready to Start Selling?
          </h3>
          <p className="text-muted-foreground mb-6 text-lg">
            Join thousands of sellers making money while helping the environment
          </p>
          <AnimatedButton variant="primary" size="lg">
            Start Selling Today
          </AnimatedButton>
        </GlassCard>
      </motion.section>
    </motion.div>
  );
};