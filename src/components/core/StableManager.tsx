import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState } from '../../store';
import ProgressBar from '../ui/ProgressBar';
import AchievementBadge from '../ui/AchievementBadge';
import StableMap from './StableMap';

// Import area components
import StableOffice from '../areas/StableOffice';
import ExaminationArea from '../areas/ExaminationArea';
import TrainingArena from '../areas/TrainingArena';
import VeterinaryStation from '../areas/VeterinaryStation';
import FeedRoom from '../areas/FeedRoom';

const areaComponents = {
  office: StableOffice,
  examination: ExaminationArea,
  training: TrainingArena,
  veterinary: VeterinaryStation,
  feed: FeedRoom,
};

export const StableManager: React.FC = () => {
  const gameProgress = useSelector((state: RootState) => state.gameProgress);
  const achievements = useSelector((state: RootState) => state.achievements);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get the current area component
  const CurrentAreaComponent = areaComponents[gameProgress.currentArea];

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="bg-surface shadow-sm flex-none h-16">
        <div className="h-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-full">
            {/* Logo and Title */}
            <div className="flex items-center">
              <img
                src="/logo_1_big.png"
                alt="Horse and Pony"
                className="h-10 w-auto mr-3"
              />
              <h1 className="text-xl font-bold text-text hidden sm:block">
                Zarządzanie Stajnią
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center space-x-4">
              <div className="bg-background px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-text">
                  Punkty Eksperckie: {gameProgress.expertisePoints}
                </span>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden p-2 rounded-md text-text hover:bg-background"
              aria-label="Menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="sm:hidden py-2 border-t border-surface"
              >
                <div className="px-4 py-2">
                  <div className="text-sm font-medium text-text">
                    Punkty Eksperckie: {gameProgress.expertisePoints}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 min-h-0 overflow-auto">
        <div className="h-full mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 max-w-7xl mx-auto h-full">
            {/* Map Section */}
            <div className="w-full md:w-1/2 bg-surface rounded-lg shadow-sm p-4">
              <StableMap />
            </div>

            {/* Right Column */}
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              {/* Progress Bar - Fixed at top */}
              <div className="bg-surface rounded-lg shadow-sm p-4">
                <ProgressBar
                  current={gameProgress.currentStep}
                  total={gameProgress.totalSteps}
                  label="Postęp Całkowity"
                />
              </div>

              {/* Content Area */}
              <div className="flex-1 min-h-0 overflow-auto">
                {/* Current Area Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={gameProgress.currentArea}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-surface rounded-lg shadow-sm p-4 mb-4"
                  >
                    <CurrentAreaComponent />
                  </motion.div>
                </AnimatePresence>

                {/* Recent Achievements */}
                {achievements.unlocked.length > 0 && (
                  <div className="bg-surface rounded-lg shadow-sm p-4">
                    <h2 className="text-lg font-semibold text-text mb-3">
                      Ostatnie Osiągnięcia
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.unlocked.slice(-2).map((achievement) => (
                        <AchievementBadge
                          key={achievement.id}
                          achievement={achievement}
                          isUnlocked={true}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface py-4 shadow-sm flex-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center space-x-4 text-sm text-text/70">
            <a
              href="/privacy-policy"
              className="hover:text-text transition-colors duration-200"
            >
              Polityka Prywatności
            </a>
            <span>•</span>
            <span>© 2024 Horse and Pony</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StableManager;
