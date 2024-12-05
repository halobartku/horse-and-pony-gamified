import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameProgress } from '../../types';

const initialState: GameProgress = {
  currentArea: 'office',
  completedSections: [],
  expertisePoints: 0,
  currentStep: 1,
  totalSteps: 35, // Total questions: Office(10) + Examination(7) + Feed(7) + Training(7) + Veterinary(4)
};

const gameProgressSlice = createSlice({
  name: 'gameProgress',
  initialState,
  reducers: {
    setCurrentArea: (state, action: PayloadAction<GameProgress['currentArea']>) => {
      state.currentArea = action.payload;
    },
    completeSection: (state, action: PayloadAction<string>) => {
      if (!state.completedSections.includes(action.payload)) {
        state.completedSections.push(action.payload);
        // Award expertise points for completing a section
        state.expertisePoints += 100;
      }
    },
    addExpertisePoints: (state, action: PayloadAction<number>) => {
      state.expertisePoints += action.payload;
    },
    incrementStep: (state) => {
      if (state.currentStep < state.totalSteps) {
        state.currentStep += 1;
      }
    },
    decrementStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    setStep: (state, action: PayloadAction<number>) => {
      if (action.payload >= 1 && action.payload <= state.totalSteps) {
        state.currentStep = action.payload;
      }
    },
    resetProgress: () => initialState,
  },
});

export const {
  setCurrentArea,
  completeSection,
  addExpertisePoints,
  incrementStep,
  decrementStep,
  setStep,
  resetProgress,
} = gameProgressSlice.actions;

// Selectors
export const selectProgress = (state: { gameProgress: GameProgress }) => ({
  percentComplete: (state.gameProgress.currentStep / state.gameProgress.totalSteps) * 100,
  expertiseLevel: Math.floor(state.gameProgress.expertisePoints / 500), // Every 500 points = 1 level
  isAreaComplete: (area: string) => state.gameProgress.completedSections.includes(area),
});

export default gameProgressSlice.reducer;
