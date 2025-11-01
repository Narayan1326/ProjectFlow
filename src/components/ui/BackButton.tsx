import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Button from './Button';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, label = 'Back to Dashboard' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="mb-6"
    >
      <Button
        variant="ghost"
        icon={ArrowLeft}
        onClick={onClick}
        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        {label}
      </Button>
    </motion.div>
  );
};

export default BackButton;