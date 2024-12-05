import React from 'react';
import { motion } from 'framer-motion';
import { ProgressBarProps } from '../../types';

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, label }) => {
  const percentage = Math.min(Math.round((current / total) * 100), 100);

  return (
    <div className="w-full p-2 bg-background/30 rounded-lg">
      <div className="flex justify-between text-xs text-text/70 mb-1">
        <span>{label}</span>
        <span>{current} / {total}</span>
      </div>
      <div className="w-full bg-background rounded-full h-1">
        <motion.div
          className="h-1 bg-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      {percentage === 100 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-accent/90 font-medium mt-1 text-right"
        >
          Ukończono!
        </motion.div>
      )}
    </div>
  );
};

export default ProgressBar;
