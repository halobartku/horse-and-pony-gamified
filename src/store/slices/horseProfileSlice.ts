import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HorseProfile } from '../../types';

const initialState: HorseProfile = {
  owner: {
    name: '',
    phone: '',
    email: '',
  },
  horse: {
    name: '',
    height: 0,
    breed: '',
    age: 0,
    weight: 0,
    location: '',
    gender: 'walach',
  },
  physicalCondition: {
    bcsScore: 0,
    muscling: 'dobrze umięśniony',
    temperament: '',
    coatChange: 'Przebieg prawidłowy',
    coatQuality: [],
    hoofCondition: [],
    hoofGrowth: 'prawidłowe',
  },
  activity: {
    type: '',
    trainingDaysPerWeek: 0,
    hoursPerDay: 0,
    competitionParticipation: false,
    carouselTraining: false,
  },
  health: {
    lastBloodwork: '',
    dewormingCount: 0,
    lastDentalCheck: '',
    existingConditions: [],
  },
  environment: {
    waterAccess: 'ciągły',
    waterSource: 'bieżące',
    currentDiet: '',
    hayAccess: 'dostępne ciągle',
    hayQuality: '',
    paddockAccess: false,
    pastureAccess: false,
  },
};

const horseProfileSlice = createSlice({
  name: 'horseProfile',
  initialState,
  reducers: {
    updateOwnerInfo: (state, action: PayloadAction<Partial<HorseProfile['owner']>>) => {
      state.owner = { ...state.owner, ...action.payload };
    },
    updateHorseInfo: (state, action: PayloadAction<Partial<HorseProfile['horse']>>) => {
      state.horse = { ...state.horse, ...action.payload };
    },
    updatePhysicalCondition: (state, action: PayloadAction<Partial<HorseProfile['physicalCondition']>>) => {
      state.physicalCondition = { ...state.physicalCondition, ...action.payload };
    },
    updateActivity: (state, action: PayloadAction<Partial<HorseProfile['activity']>>) => {
      state.activity = { ...state.activity, ...action.payload };
    },
    updateHealth: (state, action: PayloadAction<Partial<HorseProfile['health']>>) => {
      state.health = { ...state.health, ...action.payload };
    },
    updateEnvironment: (state, action: PayloadAction<Partial<HorseProfile['environment']>>) => {
      state.environment = { ...state.environment, ...action.payload };
    },
    resetProfile: () => initialState,
  },
});

export const {
  updateOwnerInfo,
  updateHorseInfo,
  updatePhysicalCondition,
  updateActivity,
  updateHealth,
  updateEnvironment,
  resetProfile,
} = horseProfileSlice.actions;

export default horseProfileSlice.reducer;
