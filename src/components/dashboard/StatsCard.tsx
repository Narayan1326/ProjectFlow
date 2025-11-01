import React from 'react';
import { motion } from 'framer-motion';
import { Divide as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import Card from '../ui/Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  color?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  color = 'text-primary-500',
}) => {
  const isPositive = change && change > 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <Card padding="lg" hover className="relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-full -translate-y-10 translate-x-10 opacity-50" />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <motion.p
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
          >
            {value}
          </motion.p>
          {change !== undefined && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center mt-3"
            >
              <TrendIcon
                className={`w-4 h-4 mr-1 ${
                  isPositive ? 'text-accent-500' : 'text-error-500'
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  isPositive ? 'text-accent-500' : 'text-error-500'
                }`}
              >
                {Math.abs(change)}%
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last month</span>
            </motion.div>
          )}
        </div>
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.1, rotate: 380 }}
          className={`p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-md relative z-10`}
        >
          <Icon className={`w-6 h-6 ${color}`} />
        </motion.div>
      </div>
    </Card>
  );
};

export default StatsCard;