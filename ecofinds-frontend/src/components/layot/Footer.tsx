import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Globe, Flag } from 'lucide-react';
import {GlassCard} from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';

export const Footer: React.FC = () => {
  const footerSections = [
    {
      title: "Get to Know Us",
      links: [
        "About EcoFinds",
        "Careers",
        "Press Releases",
        "EcoFinds Science",
        "Sustainability",
        "Investor Relations"
      ]
    },
    {
      title: "Connect with Us",
      links: [
        "Facebook",
        "Twitter",
        "Instagram",
        "LinkedIn",
        "Blog",
        "Newsletter"
      ]
    },
    {
      title: "Make Money with Us",
      links: [
        "Sell products on EcoFinds",
        "Sell apps on EcoFinds",
        "Become an Affiliate",
        "Advertise Your Products",
        "Self-Publish with Us",
        "Host an EcoFinds Hub"
      ]
    },
    {
      title: "Let Us Help You",
      links: [
        "Your Account",
        "Your Orders",
        "Shipping Rates & Policies",
        "Returns & Replacements",
        "Manage Your Content",
        "Help"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.footer
      className="mt-24 bg-background-secondary/50 backdrop-blur-sm border-t border-border/20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
        >
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              variants={itemVariants}
              className="space-y-4"
            >
              <h3 className="font-semibold text-foreground text-lg">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Language & Country Selector */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-between border-t border-border/20 pt-8 mb-8"
        >
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <GlassCard 
              className="flex items-center space-x-2 px-4 py-2 cursor-pointer"
              hover
            >
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">English</span>
            </GlassCard>
            
            <GlassCard 
              className="flex items-center space-x-2 px-4 py-2 cursor-pointer"
              hover
            >
              <Flag className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">United States</span>
            </GlassCard>
          </div>

          <div className="flex items-center space-x-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Cookies Settings
            </a>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-border/20"
        >
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <Leaf className="w-6 h-6 text-primary" />
            <span className="text-xl font-semibold text-foreground">
              EcoFinds
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © 2024 EcoFinds, Inc. All rights reserved. • Sustainable marketplace for a greener future.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};