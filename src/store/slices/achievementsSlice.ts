import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Achievement, Achievements } from '../../types';

const defaultAchievements: Achievement[] = [
  {
    id: 'stable_manager_novice',
    name: 'Początkujący Zarządca Stajni',
    description: 'Rozpocznij swoją przygodę jako zarządca stajni',
    icon: 'stable',
    category: 'general'
  },
  {
    id: 'detailed_examiner',
    name: 'Dokładny Obserwator',
    description: 'Wypełnij wszystkie pola w sekcji badania konia',
    icon: 'magnifier',
    category: 'examination'
  },
  {
    id: 'training_master',
    name: 'Mistrz Treningu',
    description: 'Uzupełnij szczegółowy plan treningowy',
    icon: 'training',
    category: 'training'
  },
  {
    id: 'health_guardian',
    name: 'Strażnik Zdrowia',
    description: 'Zapisz kompletną historię zdrowia',
    icon: 'health',
    category: 'health'
  },
  {
    id: 'nutrition_expert',
    name: 'Ekspert Żywienia',
    description: 'Stwórz zbilansowany plan żywieniowy',
    icon: 'nutrition',
    category: 'nutrition'
  },
  {
    id: 'perfect_caretaker',
    name: 'Perfekcyjny Opiekun',
    description: 'Ukończ wszystkie sekcje z najwyższą dokładnością',
    icon: 'star',
    category: 'general'
  }
];

const initialState: Achievements = {
  unlocked: [],
  available: defaultAchievements,
};

const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    unlockAchievement: (state, action: PayloadAction<string>) => {
      const achievement = state.available.find(a => a.id === action.payload);
      if (achievement && !state.unlocked.find(a => a.id === action.payload)) {
        const achievementWithTimestamp = {
          ...achievement,
          unlockedAt: new Date()
        };
        state.unlocked.push(achievementWithTimestamp);
      }
    },
    resetAchievements: () => initialState,
    addCustomAchievement: (state, action: PayloadAction<Achievement>) => {
      if (!state.available.find(a => a.id === action.payload.id)) {
        state.available.push(action.payload);
      }
    }
  },
});

export const {
  unlockAchievement,
  resetAchievements,
  addCustomAchievement
} = achievementsSlice.actions;

// Selectors
export const selectAchievements = (state: { achievements: Achievements }) => ({
  unlockedCount: state.achievements.unlocked.length,
  totalCount: state.achievements.available.length,
  progressPercentage: (state.achievements.unlocked.length / state.achievements.available.length) * 100,
  isAchievementUnlocked: (id: string) => state.achievements.unlocked.some(a => a.id === id),
  getAchievementsByCategory: (category: Achievement['category']) => 
    state.achievements.available.filter(a => a.category === category),
  getUnlockedAchievementsByCategory: (category: Achievement['category']) => 
    state.achievements.unlocked.filter(a => a.category === category),
});

export default achievementsSlice.reducer;
