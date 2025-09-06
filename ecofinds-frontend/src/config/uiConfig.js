export const uiConfig = {
  // Brand Colors
  primaryColor: 'hsl(158, 64%, 35%)',
  accentColor: 'hsl(45, 100%, 85%)',
  
  // Layout & Styling
  radius: '16px',
  cardStyle: 'glass', // 'glass' | 'flat' | 'neuro'
  
  // Animation Settings
  animationsEnabled: true,
  revealStaggerMs: 80,
  heroParallaxIntensity: 0.5,
  
  // Page Transition
  pageTransition: {
    duration: 0.45,
    ease: [0.2, 0.9, 0.2, 1]
  },
  
  // Scroll Reveal
  scrollReveal: {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  },
  
  // Product Card Hover
  cardHover: {
    scale: 1.03,
    glowIntensity: 0.4,
    tiltAngle: 5
  },
  
  // Navigation
  navigation: {
    stickyOffset: 30,
    backdropBlur: true,
    mobileSlideDirection: 'right' // 'right' | 'left' | 'top'
  },
  
  // Categories
  categories: [
    'All Products',
    'Clothing', 
    'Home Goods',
    'Electronics',
    'Books',
    'Personal Care',
    'Outdoor Gear',
    'Upcycled Crafts',
    'Sustainable Living'
  ],
  
  // Sample Data
  sampleProducts: [
    {
      id: 1,
      title: 'Bamboo Eco-Friendly Toothbrush',
      price: 499,
      category: 'Personal Care',
      condition: 'New',
      description: 'Sustainable bamboo toothbrush with soft bristles. Perfect for eco-conscious oral care.',
      seller: 'EcoSupplies',
      rating: 4.8,
      images: ['https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=300&h=300&fit=crop'],
      sustainabilityNote: 'Biodegradable bamboo handle',
      tags: ['zero-waste', 'biodegradable', 'sustainable']
    },
    {
      id: 2,
      title: 'Organic Cotton Reusable Tote Bag',
      price: 1350,
      category: 'Clothing',
      condition: 'Like New',
      description: 'Durable organic cotton tote bag perfect for shopping and daily use.',
      seller: 'GreenThreads',
      rating: 4.9,
      images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop'],
      sustainabilityNote: 'Made from 100% organic cotton',
      tags: ['organic', 'reusable', 'fair-trade']
    },
    {
      id: 3,
      title: 'Handcrafted Ceramic Coffee Mug',
      price: 1850,
      category: 'Home Goods',
      condition: 'Excellent',
      description: 'Beautiful handcrafted ceramic mug with unique glaze finish.',
      seller: 'ArtisanCrafts',
      rating: 4.7,
      images: ['https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=300&h=300&fit=crop'],
      sustainabilityNote: 'Locally made, reduces shipping emissions',
      tags: ['handmade', 'ceramic', 'local']
    },
    {
      id: 4,
      title: 'Stainless Steel Reusable Straw Set',
      price: 950,
      category: 'Personal Care',
      condition: 'New',
      description: 'Complete set of stainless steel straws with cleaning brush and carrying case.',
      seller: 'ZeroWasteShop',
      rating: 4.6,
      images: ['https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=300&fit=crop'],
      sustainabilityNote: 'Replaces thousands of plastic straws',
      tags: ['zero-waste', 'stainless-steel', 'reusable']
    },
    {
      id: 5,
      title: 'Recycled Laptop Backpack',
      price: 2850,
      category: 'Electronics',
      condition: 'Like New',
      description: 'Durable backpack made from recycled plastic bottles. Perfect for work and travel.',
      seller: 'EcoTech',
      rating: 4.5,
      images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop'],
      sustainabilityNote: 'Made from 15 recycled plastic bottles',
      tags: ['recycled', 'durable', 'tech']
    },
    {
      id: 6,
      title: 'Vintage Denim Jacket',
      price: 1950,
      category: 'Clothing',
      condition: 'Good',
      description: 'Classic vintage denim jacket in excellent condition. Perfect for layering.',
      seller: 'VintageFinds',
      rating: 4.3,
      images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop'],
      sustainabilityNote: 'Second-hand reduces textile waste',
      tags: ['vintage', 'denim', 'classic']
    },
    {
      id: 7,
      title: 'Organic Face Cream',
      price: 1250,
      category: 'Personal Care',
      condition: 'New',
      description: 'Natural organic face cream with shea butter and essential oils.',
      seller: 'NaturalBeauty',
      rating: 4.7,
      images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop'],
      sustainabilityNote: 'Cruelty-free and organic ingredients',
      tags: ['organic', 'natural', 'cruelty-free']
    },
    {
      id: 8,
      title: 'Solar Power Bank',
      price: 3500,
      category: 'Electronics',
      condition: 'Like New',
      description: 'Portable solar power bank with 20,000mAh capacity. Great for outdoor adventures.',
      seller: 'SolarTech',
      rating: 4.4,
      images: ['https://images.unsplash.com/photo-1573160813959-df05c1b69fbc?w=300&h=300&fit=crop'],
      sustainabilityNote: 'Renewable solar energy charging',
      tags: ['solar', 'renewable', 'portable']
    }
  ]
};

// Helper function to get category colors
export const getCategoryColor = (category) => {
  const colorMap = {
    'Clothing': 'hsl(280, 60%, 70%)',
    'Home Goods': 'hsl(45, 80%, 65%)',
    'Electronics': 'hsl(200, 60%, 70%)',
    'Books': 'hsl(25, 60%, 70%)',
    'Personal Care': 'hsl(158, 60%, 70%)',
    'Outdoor Gear': 'hsl(120, 60%, 70%)',
    'Upcycled Crafts': 'hsl(320, 60%, 70%)',
    'Sustainable Living': 'hsl(158, 60%, 70%)'
  };
  return colorMap[category] || 'hsl(158, 60%, 70%)';
};

export default uiConfig;