// Horse Profile Types
export interface HorseProfile {
  owner: {
    name: string;
    phone: string;
    email: string;
  };
  horse: {
    name: string;
    height: number;
    breed: string;
    age: number;
    weight: number;
    location: string;
    gender: 'walach' | 'klacz' | 'ogier';
  };
  physicalCondition: {
    bcsScore: number;
    muscling: 'bardzo słabo umięśniony' | 'słabo umięśniony' | 'dobrze umięśniony' | 'bardzo dobrze umięśniony';
    temperament: string;
    coatChange: 'Przebieg prawidłowy' | 'Przebieg problematyczny';
    coatQuality: string[];
    hoofCondition: string[];
    hoofGrowth: 'prawidłowe' | 'wolne';
  };
  activity: {
    type: string;
    trainingDaysPerWeek: number;
    hoursPerDay: number;
    competitionParticipation: boolean;
    competitionFrequency?: string;
    carouselTraining: boolean;
    carouselDetails?: string;
  };
  health: {
    lastBloodwork: string;
    dewormingCount: number;
    lastDentalCheck: string;
    existingConditions: string[];
  };
  environment: {
    waterAccess: 'ciągły' | 'regulowany';
    waterSource: 'bieżące' | 'stałe';
    currentDiet: string;
    hayAccess: 'dostępne ciągle' | 'regulowane';
    hayQuality: string;
    paddockAccess: boolean;
    pastureAccess: boolean;
  };
}

// Game Progress Types
export interface GameProgress {
  currentArea: 'office' | 'examination' | 'training' | 'veterinary' | 'feed';
  completedSections: string[];
  expertisePoints: number;
  currentStep: number;
  totalSteps: number;
}

// Achievement Types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  category: 'examination' | 'training' | 'health' | 'nutrition' | 'general';
}

export interface Achievements {
  unlocked: Achievement[];
  available: Achievement[];
}

// UI Component Props Types
export interface QuestionCardProps {
  question: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'radio' | 'checkbox';
  options?: string[];
  value: any;
  onChange: (value: any) => void;
  tooltip?: string;
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: RegExp;
  };
}

export interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export interface AchievementBadgeProps {
  achievement: Achievement;
  isUnlocked: boolean;
}

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export interface NavigationButtonProps {
  area: GameProgress['currentArea'];
  isUnlocked: boolean;
  isCompleted: boolean;
  onClick: () => void;
}
