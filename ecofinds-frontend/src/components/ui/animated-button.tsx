import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'glass' | 'neuro';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  disabled = false,
  type = 'button'
}) => {
  const baseClasses = "relative font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/30";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary-hover shadow-md hover:shadow-lg active:scale-95",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md",
    glass: "glass-button text-foreground hover:scale-105",
    neuro: "neuro-button text-foreground"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base", 
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      whileHover={!disabled ? { scale: variant === 'glass' ? 1.05 : 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      type={type}
    >
      <motion.span
        className="relative z-10"
        initial={{ opacity: 1 }}
        whileHover={variant === 'primary' ? { opacity: 0.9 } : {}}
      >
        {children}
      </motion.span>
      
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-glow/0 via-primary-glow/30 to-primary-glow/0"
          initial={{ x: '-100%', opacity: 0 }}
          whileHover={{ x: '100%', opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.button>
  );
};