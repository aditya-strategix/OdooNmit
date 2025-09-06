import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Package, ShoppingCart, History, Star, Camera, Save } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/animated-button';
import { GlassCard } from '@/components/ui/glass-card';

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: 'Jane Doe',
    email: 'jane.doe@ecofinds.com',
    bio: 'Passionate about sustainable living and second-hand treasures',
    joinDate: '2023-01-15'
  });

  const [editedInfo, setEditedInfo] = useState(userInfo);

  const handleSave = () => {
    setUserInfo(editedInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedInfo(userInfo);
    setIsEditing(false);
  };

  const quickActions = [
    {
      title: 'My Listings',
      description: 'Manage your product listings',
      icon: Package,
      action: () => onNavigate?.('/my-listings'),
      count: 8
    },
    {
      title: 'Cart',
      description: 'View items in your cart',
      icon: ShoppingCart,
      action: () => onNavigate?.('/cart'),
      count: 3
    },
    {
      title: 'Previous Purchases',
      description: 'View your order history',
      icon: History,
      action: () => onNavigate?.('/purchases'),
      count: 12
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-primary/10 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-24 h-24 mx-auto mb-6">
            <img
              src="/api/placeholder/150/150"
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-primary/20"
            />
            <motion.button
              className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Camera className="w-4 h-4" />
            </motion.button>
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Welcome, {userInfo.username}!
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your profile information and access your EcoFinds account features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-foreground flex items-center">
                  <User className="w-6 h-6 mr-3 text-primary" />
                  Profile Information
                </h2>
                
                {!isEditing ? (
                  <AnimatedButton
                    variant="glass"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </AnimatedButton>
                ) : (
                  <div className="flex space-x-2">
                    <AnimatedButton
                      variant="primary"
                      size="sm"
                      onClick={handleSave}
                    >
                      <Save className="w-4 h-4 mr-1" />
                      Save
                    </AnimatedButton>
                    <AnimatedButton
                      variant="secondary"
                      size="sm"
                      onClick={handleCancel}
                    >
                      Cancel
                    </AnimatedButton>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Username */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Username</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedInfo.username}
                      onChange={(e) => setEditedInfo(prev => ({ ...prev, username: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-muted/20 rounded-xl text-foreground">
                      {userInfo.username}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedInfo.email}
                      onChange={(e) => setEditedInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-muted/20 rounded-xl text-foreground">
                      {userInfo.email}
                    </p>
                  )}
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Bio</label>
                  {isEditing ? (
                    <textarea
                      rows={3}
                      value={editedInfo.bio}
                      onChange={(e) => setEditedInfo(prev => ({ ...prev, bio: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-muted/20 rounded-xl text-foreground">
                      {userInfo.bio}
                    </p>
                  )}
                </div>

                {/* Join Date */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Member Since</label>
                  <p className="px-4 py-3 bg-muted/20 rounded-xl text-foreground">
                    {new Date(userInfo.joinDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-foreground">Quick Actions</h2>
            
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <GlassCard 
                  className="p-6 cursor-pointer group"
                  hover
                  onClick={action.action}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-primary/20 rounded-xl group-hover:bg-primary/30 transition-colors">
                        <action.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary">
                        {action.count}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}

            {/* Account Stats */}
            <GlassCard className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-primary" />
                Account Stats
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Items Sold</span>
                  <span className="font-semibold text-foreground">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Items Purchased</span>
                  <span className="font-semibold text-foreground">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Seller Rating</span>
                  <span className="font-semibold text-foreground">4.8 ⭐</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Eco Impact</span>
                  <span className="font-semibold text-primary">🌱 High</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};