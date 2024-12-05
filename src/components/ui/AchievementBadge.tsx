import React from 'react';
import { motion } from 'framer-motion';
import { AchievementBadgeProps } from '../../types';

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({ achievement, isUnlocked }) => {
  const categoryColors = {
    examination: 'bg-purple-900/20 border-purple-500 text-purple-400',
    training: 'bg-blue-900/20 border-blue-500 text-blue-400',
    health: 'bg-green-900/20 border-green-500 text-green-400',
    nutrition: 'bg-orange-900/20 border-orange-500 text-orange-400',
    general: 'bg-surface border-gray-500 text-text',
  };

  const baseClasses = `
    relative rounded-lg p-4 border-2
    transition-all duration-300 ease-in-out
    ${isUnlocked ? categoryColors[achievement.category] : 'bg-surface/50 border-surface text-text/50'}
  `;

  const iconVariants = {
    locked: { 
      scale: 1,
      opacity: 0.5,
      filter: 'grayscale(100%)'
    },
    unlocked: { 
      scale: 1,
      opacity: 1,
      filter: 'grayscale(0%)'
    }
  };

  const containerVariants = {
    locked: { 
      y: 0
    },
    unlocked: { 
      y: [0, -10, 0],
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className={baseClasses}
      initial="locked"
      animate={isUnlocked ? "unlocked" : "locked"}
      variants={containerVariants}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-start space-x-4">
        <motion.div
          className="w-12 h-12 flex items-center justify-center rounded-full bg-background shadow-sm"
          variants={iconVariants}
        >
          {/* Replace with actual icon component based on achievement.icon */}
          <span className="text-2xl">{achievement.icon}</span>
        </motion.div>

        <div className="flex-1">
          <h3 className="font-semibold mb-1 text-text">{achievement.name}</h3>
          <p className="text-sm text-text/80">{achievement.description}</p>
          
          {isUnlocked && achievement.unlockedAt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-xs font-medium text-text/70"
            >
              Odblokowano: {new Date(achievement.unlockedAt).toLocaleDateString()}
            </motion.div>
          )}
        </div>

        {isUnlocked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center"
          >
            <svg
              className="w-4 h-4 text-background"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        )}
      </div>

      {!isUnlocked && (
        <div className="absolute inset-0 bg-background/50 backdrop-filter backdrop-blur-sm rounded-lg flex items-center justify-center">
          <svg
            className="w-6 h-6 text-text/50"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 15v2m0 0v2m0-2h2m-2 0H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      )}
    </motion.div>
  );
};

export default AchievementBadge;
