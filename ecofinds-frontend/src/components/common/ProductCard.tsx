import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Leaf } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { getCategoryColor } from '@/config/uiConfig';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  condition: string;
  description: string;
  seller: string;
  rating: number;
  images: string[];
  sustainabilityNote: string;
  tags: string[];
}

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (productId: number) => void;
  isFavorite?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onProductClick,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false
}) => {
  return (
    <GlassCard
      className="group relative overflow-hidden cursor-pointer"
      hover
      tilt
      glow
      onClick={() => onProductClick?.(product)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-t-2xl">
        <motion.img
          src={product.images?.[0] || `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop`}
          alt={product.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Favorite Button */}
        <motion.button
          className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.(product.id);
          }}
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? 'text-red-500 fill-current' : 'text-white'
            }`}
          />
        </motion.button>

        {/* Category Badge */}
        <div 
          className="absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-medium text-white backdrop-blur-sm"
          style={{ backgroundColor: getCategoryColor(product.category) + '80' }}
        >
          {product.category}
        </div>

        {/* Sustainability Icon */}
        <div className="absolute bottom-3 left-3 p-1.5 rounded-full bg-primary/80 backdrop-blur-sm">
          <Leaf className="w-3 h-3 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title & Rating */}
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs text-muted-foreground">{product.rating}</span>
              <span className="text-xs text-muted-foreground">• {product.seller}</span>
            </div>
            <span className="text-xs px-2 py-1 bg-secondary rounded-md font-medium">
              {product.condition}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Sustainability Note */}
        <div className="bg-primary/10 rounded-lg p-2">
          <p className="text-xs text-primary font-medium">
            🌱 {product.sustainabilityNote}
          </p>
        </div>

        {/* Add to Cart Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <AnimatedButton
            variant="primary"
            size="sm"
            className="w-full"
            onClick={() => onAddToCart?.(product)}
          >
            Add to Cart
          </AnimatedButton>
        </motion.div>
      </div>
    </GlassCard>
  );
};