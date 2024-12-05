import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState } from '../../store';
import { setCurrentArea } from '../../store/slices/gameProgressSlice';
import styles from '../../styles/components/StableMap.module.css';

const StableMap: React.FC = () => {
  const dispatch = useDispatch();
  const gameProgress = useSelector((state: RootState) => state.gameProgress);
  const [mapScale, setMapScale] = useState(0.8);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setMapScale(0.4);
      } else if (width < 768) {
        setMapScale(0.6);
      } else {
        setMapScale(0.8);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const areaDescriptions = {
    office: "Centrum zarządzania stajnią. Tu rozpoczyna się Twoja przygoda!",
    feed: "Miejsce przechowywania i przygotowywania pasz. Dowiedz się więcej o żywieniu koni.",
    training: "Przestrzeń do treningu i rozwoju umiejętności jeździeckich.",
    veterinary: "Centrum opieki zdrowotnej dla koni. Poznaj aspekty weterynaryjne.",
    examination: "Strefa diagnostyczna do oceny stanu zdrowia i kondycji koni."
  };

  const areas = [
    {
      id: 'office',
      name: 'Biuro',
      x: 16.67,
      y: 35,
      isUnlocked: true,
      isCompleted: gameProgress.completedSections.includes('office')
    },
    {
      id: 'feed',
      name: 'Pomieszczenie Paszowe',
      x: 16.67,
      y: 65,
      isUnlocked: gameProgress.completedSections.includes('office'),
      isCompleted: gameProgress.completedSections.includes('feed')
    },
    {
      id: 'training',
      name: 'Arena Treningowa',
      x: 75,
      y: 65,
      isUnlocked: gameProgress.completedSections.includes('office'),
      isCompleted: gameProgress.completedSections.includes('training')
    },
    {
      id: 'veterinary',
      name: 'Stacja Weterynaryjna',
      x: 83.33,
      y: 35,
      isUnlocked: gameProgress.completedSections.includes('office'),
      isCompleted: gameProgress.completedSections.includes('veterinary')
    },
    {
      id: 'examination',
      name: 'Obszar Badań',
      x: 50,
      y: 25,
      isUnlocked: gameProgress.completedSections.includes('office'),
      isCompleted: gameProgress.completedSections.includes('examination')
    }
  ];

  const handleAreaClick = (areaId: string, isUnlocked: boolean) => {
    if (isUnlocked) {
      dispatch(setCurrentArea(areaId as any));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <img 
          src="/equestrian centre reiterwelt.png"
          alt="Stable Map"
          className={styles.mapImage}
        />

        {areas.map((area) => (
          <motion.div
            key={area.id}
            className={`${styles.areaContainer} ${!area.isUnlocked ? styles.areaContainerLocked : ''}`}
            style={{ 
              left: `${area.x}%`, 
              top: `${area.y}%`,
              transform: `scale(${mapScale}) translate(-50%, -50%)`
            }}
            whileHover={area.isUnlocked ? { scale: mapScale * 1.1 } : {}}
            onHoverStart={() => setHoveredArea(area.id)}
            onHoverEnd={() => setHoveredArea(null)}
            onClick={() => handleAreaClick(area.id, area.isUnlocked)}
          >
            {/* Glow effect */}
            <div className={`${styles.areaGlow} ${
              area.isCompleted
                ? styles.areaGlowCompleted
                : area.isUnlocked
                ? styles.areaGlowUnlocked
                : styles.areaGlowLocked
            }`} />

            {/* Area icon */}
            <div className={`${styles.areaIcon} ${
              area.isCompleted
                ? styles.areaIconCompleted
                : area.isUnlocked
                ? styles.areaIconUnlocked
                : styles.areaIconLocked
            }`}>
              <span className={styles.areaIconText}>
                {area.isCompleted ? '✓' : area.isUnlocked ? '!' : '🔒'}
              </span>
            </div>
            
            {/* Area name */}
            <div className={styles.areaName}>
              <span className={`${styles.areaNameText} ${
                area.isCompleted
                  ? styles.areaNameCompleted
                  : area.isUnlocked
                  ? styles.areaNameUnlocked
                  : styles.areaNameLocked
              }`}>
                {area.name}
              </span>
            </div>

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredArea === area.id && area.isUnlocked && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={styles.tooltip}
                >
                  <div className={styles.tooltipContent}>
                    {areaDescriptions[area.id as keyof typeof areaDescriptions]}
                    <div className={styles.tooltipArrow} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className={styles.legend}>
        <div className={styles.legendGrid}>
          <div className={styles.legendItem}>
            <div className={`${styles.legendDot} ${styles.legendDotAvailable}`}></div>
            <span className={styles.legendText}>Dostępne</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendDot} ${styles.legendDotCompleted}`}></div>
            <span className={styles.legendText}>Ukończone</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendDot} ${styles.legendDotLocked}`}></div>
            <span className={styles.legendText}>Zablokowane</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StableMap;
