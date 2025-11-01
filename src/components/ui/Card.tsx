import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  glass = false,
  padding = 'md',
}) => {
  const baseClasses = 'rounded-xl shadow-sm border overflow-hidden';
  const glassClasses = glass ? 'glass-card' : 'bg-white border-gray-200';
  const hoverClasses = hover ? 'card-hover cursor-pointer' : '';
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${baseClasses} ${glassClasses} ${hoverClasses} ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;