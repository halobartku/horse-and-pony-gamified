import React from 'react';
import { motion } from 'framer-motion';
import { NavigationButtonProps } from '../../types';
import styles from '../../styles/components/NavigationButton.module.css';

const areaIcons = {
  office: (
    <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  examination: (
    <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  training: (
    <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  veterinary: (
    <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  feed: (
    <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
};

const areaLabels = {
  office: 'Biuro Stajni',
  examination: 'Strefa Badań',
  training: 'Arena Treningowa',
  veterinary: 'Gabinet Weterynaryjny',
  feed: 'Magazyn Paszowy',
};

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  area,
  isUnlocked,
  isCompleted,
  onClick,
}) => {
  const containerClasses = `${styles.container} ${
    isUnlocked ? styles.containerUnlocked : styles.containerLocked
  } ${isCompleted ? styles.containerCompleted : ''}`;

  const iconContainerVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.1 },
  };

  const completionBadgeVariants = {
    initial: { scale: 0 },
    animate: { scale: 1 },
  };

  return (
    <motion.div
      className={containerClasses}
      onClick={isUnlocked ? onClick : undefined}
      whileHover={isUnlocked ? "hover" : "idle"}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div
        className={`${styles.iconContainer} ${
          isUnlocked ? styles.iconContainerUnlocked : styles.iconContainerLocked
        }`}
        variants={iconContainerVariants}
      >
        {areaIcons[area]}
      </motion.div>

      <div className={styles.contentContainer}>
        <h3 className={`${styles.title} ${isUnlocked ? styles.titleUnlocked : styles.titleLocked}`}>
          {areaLabels[area]}
        </h3>
        <p className={styles.status}>
          {isUnlocked 
            ? isCompleted
              ? 'Ukończono'
              : 'Dostępne'
            : 'Zablokowane'
          }
        </p>
      </div>

      {isCompleted && (
        <motion.div
          className={styles.completionBadge}
          variants={completionBadgeVariants}
          initial="initial"
          animate="animate"
        >
          <svg
            className={styles.completionIcon}
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

      {!isUnlocked && (
        <div className={styles.lockIcon}>
          <svg
            className={styles.lockIconSvg}
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

export default NavigationButton;
