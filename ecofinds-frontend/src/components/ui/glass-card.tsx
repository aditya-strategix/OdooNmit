import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  tilt?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  hover = false,
  tilt = false,
  glow = false,
  onClick
}) => {
  return (
    <motion.div
      className={cn(
        "backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-glass",
        "transition-all duration-300",
        hover && "hover:bg-white/15 hover:border-white/30 hover:shadow-lg",
        glow && "hover:shadow-glow",
        onClick && "cursor-pointer",
        className
      )}
      whileHover={
        tilt
          ? {
              scale: 1.02,
              rotateX: 5,
              rotateY: 5,
              transition: { duration: 0.2 }
            }
          : hover
          ? { scale: 1.02 }
          : {}
      }
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
    >
      {children}
    </motion.div>
  );
};