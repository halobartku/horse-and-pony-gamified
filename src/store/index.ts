import { configureStore } from '@reduxjs/toolkit';
import horseProfileReducer from './slices/horseProfileSlice';
import gameProgressReducer from './slices/gameProgressSlice';
import achievementsReducer from './slices/achievementsSlice';
import { HorseProfile, GameProgress, Achievements } from '../types';

// Define the shape of the entire store
export interface RootState {
  horseProfile: HorseProfile;
  gameProgress: GameProgress;
  achievements: Achievements;
}

export const store = configureStore({
  reducer: {
    horseProfile: horseProfileReducer,
    gameProgress: gameProgressReducer,
    achievements: achievementsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
