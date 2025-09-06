import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, X, DollarSign, Package, Tag } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/animated-button';
import { GlassCard } from '@/components/ui/glass-card';
import { uiConfig } from '@/config/uiConfig';

interface AddProductProps {
  onSubmit?: (productData: any) => void;
  onCancel?: () => void;
}

export const AddProduct: React.FC<AddProductProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    condition: 'Like New',
    price: '',
    sustainabilityNote: '',
    tags: ''
  });
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const conditions = ['New', 'Like New', 'Good', 'Fair', 'Poor'];
  const categories = uiConfig.categories.filter(cat => cat !== 'All Products');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // In a real app, you'd upload to a server here
    const newImages = files.map((file, index) => `/api/placeholder/300/300?${Date.now()}-${index}`);
    setUploadedImages(prev => [...prev, ...newImages].slice(0, 5)); // Max 5 images
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const productData = {
      ...formData,
      images: uploadedImages,
      id: Date.now(),
      seller: 'You',
      rating: 0,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };

    onSubmit?.(productData);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-primary/10 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">
            List Your Sustainable Product
          </h1>
          <p className="text-xl text-muted-foreground">
            Fill in the details for your eco-friendly product.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Product Details Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground flex items-center">
                  <Package className="w-6 h-6 mr-3 text-primary" />
                  Product Details
                </h2>

                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Organic Cotton T-Shirt"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    required
                  />
                </div>

                {/* Category & Condition */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Condition *
                    </label>
                    <select
                      value={formData.condition}
                      onChange={(e) => handleInputChange('condition', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    >
                      {conditions.map(condition => (
                        <option key={condition} value={condition}>{condition}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Description *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your product's features, condition, and sustainability aspects..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
                    required
                  />
                </div>
              </div>

              {/* Price Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-primary" />
                  Price
                </h3>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Price (USD) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Images Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2 text-primary" />
                  Product Images
                </h3>

                {/* Upload Area */}
                <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-foreground font-medium mb-2">
                      Drag and drop images here, or click to upload
                    </p>
                    <p className="text-sm text-muted-foreground">
                      PNG, JPG, GIF up to 10MB (Max 5 images)
                    </p>
                  </label>
                </div>

                {/* Uploaded Images */}
                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {uploadedImages.map((image, index) => (
                      <motion.div
                        key={index}
                        className="relative aspect-square rounded-xl overflow-hidden"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <img
                          src={image}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sustainability Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground flex items-center">
                  <Tag className="w-5 h-5 mr-2 text-primary" />
                  Sustainability Information
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Sustainability Note
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Made from recycled materials, reduces waste"
                      value={formData.sustainabilityNote}
                      onChange={(e) => handleInputChange('sustainabilityNote', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., organic, fair-trade, zero-waste"
                      value={formData.tags}
                      onChange={(e) => handleInputChange('tags', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <AnimatedButton
                  type="button"
                  variant="secondary"
                  size="lg"
                  className="flex-1"
                  onClick={onCancel}
                >
                  Cancel
                </AnimatedButton>
                
                <AnimatedButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    'List Product'
                  )}
                </AnimatedButton>
              </div>
            </form>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};