import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import QuestionCard from '../ui/QuestionCard';
import { updateEnvironment } from '../../store/slices/horseProfileSlice';
import { completeSection, addExpertisePoints } from '../../store/slices/gameProgressSlice';
import type { RootState } from '../../store';

const FeedRoom: React.FC = () => {
  const dispatch = useDispatch();
  const environment = useSelector((state: RootState) => state.horseProfile.environment);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleEnvironmentUpdate = (field: keyof typeof environment, value: any) => {
    dispatch(updateEnvironment({ [field]: value }));
    dispatch(addExpertisePoints(10));
    if (Object.values(environment).every(val => 
      typeof val === 'boolean' ? true : val !== ''
    )) {
      dispatch(completeSection('feed'));
    }
  };

  const questions = [
    {
      section: 'Dostęp do Wody',
      question: 'Dostęp do wody',
      type: 'radio' as const,
      value: environment.waterAccess,
      onChange: (value: string) => handleEnvironmentUpdate('waterAccess', value),
      options: ['ciągły', 'regulowany'],
      validation: { required: true },
      tooltip: 'Odpowiedni dostęp do wody jest kluczowy dla zdrowia konia'
    },
    {
      section: 'Dostęp do Wody',
      question: 'Źródło wody',
      type: 'radio' as const,
      value: environment.waterSource,
      onChange: (value: string) => handleEnvironmentUpdate('waterSource', value),
      options: ['bieżące', 'stałe'],
      validation: { required: true },
      tooltip: 'Rodzaj źródła wody może wpływać na jej jakość i dostępność'
    },
    {
      section: 'Żywienie',
      question: 'Obecna dieta konia (rodzaje stosowanych pasz i suplementów)',
      type: 'text' as const,
      value: environment.currentDiet,
      onChange: (value: string) => handleEnvironmentUpdate('currentDiet', value),
      validation: { required: true },
      tooltip: 'Opisz szczegółowo wszystkie składniki diety'
    },
    {
      section: 'Siano',
      question: 'Dostęp do siana',
      type: 'radio' as const,
      value: environment.hayAccess,
      onChange: (value: string) => handleEnvironmentUpdate('hayAccess', value),
      options: ['dostępne ciągle', 'regulowane'],
      validation: { required: true },
      tooltip: 'Siano powinno stanowić podstawę diety konia'
    },
    {
      section: 'Siano',
      question: 'Jakość siana',
      type: 'select' as const,
      value: environment.hayQuality,
      onChange: (value: string) => handleEnvironmentUpdate('hayQuality', value),
      options: ['bardzo dobra', 'dobra', 'średnia', 'słaba', 'zła'],
      validation: { required: true },
      tooltip: 'Jakość siana ma kluczowe znaczenie dla zdrowia układu pokarmowego'
    },
    {
      section: 'Ruch',
      question: 'Czy koń jest padokowany?',
      type: 'radio' as const,
      value: environment.paddockAccess ? 'Tak' : 'Nie',
      onChange: (value: string) => handleEnvironmentUpdate('paddockAccess', value === 'Tak'),
      options: ['Tak', 'Nie'],
      validation: { required: true },
      tooltip: 'Regularne padokowanie wspiera zdrowie fizyczne i psychiczne konia'
    },
    {
      section: 'Pastwisko',
      question: 'Czy koń ma dostęp do pastwiska w sezonie?',
      type: 'radio' as const,
      value: environment.pastureAccess ? 'Tak' : 'Nie',
      onChange: (value: string) => handleEnvironmentUpdate('pastureAccess', value === 'Tak'),
      options: ['Tak', 'Nie'],
      validation: { required: true },
      tooltip: 'Pastwisko dostarcza naturalnego ruchu i świeżej paszy'
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const currentSection = currentQuestion.section;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-4 bg-surface rounded-xl shadow-lg max-h-[90vh] overflow-y-auto"
    >
      <h2 className="text-xl font-bold mb-4 text-accent">Pomieszczenie Paszowe</h2>
      
      <h3 className="text-lg font-semibold text-text mb-3">{currentSection}</h3>

      <QuestionCard
        {...currentQuestion}
        isActive={true}
        onNext={() => setCurrentQuestionIndex(prev => Math.min(prev + 1, questions.length - 1))}
        onPrevious={() => setCurrentQuestionIndex(prev => Math.max(prev - 1, 0))}
        isFirst={currentQuestionIndex === 0}
        isLast={currentQuestionIndex === questions.length - 1}
      />

      <div className="mt-4 p-3 bg-background/50 rounded-lg">
        <h3 className="text-base font-semibold text-accent mb-2">Wskazówki Żywieniowe</h3>
        <ul className="list-disc list-inside space-y-1 text-text/80 text-sm">
          <li>Zapewnij stały dostęp do świeżej, czystej wody</li>
          <li>Siano powinno stanowić minimum 1.5% masy ciała konia dziennie</li>
          <li>Wprowadzaj zmiany w diecie stopniowo</li>
          <li>Dostosuj ilość paszy do poziomu aktywności konia</li>
          <li>Regularnie monitoruj kondycję i dostosowuj dietę</li>
        </ul>
      </div>

      {/* Progress bar with updated theme */}
      <div className="mt-3 p-2 bg-background/30 rounded-lg">
        <div className="flex justify-between text-xs text-text/70 mb-1">
          <span>Postęp Żywienia</span>
          <span>{currentQuestionIndex + 1} / {questions.length}</span>
        </div>
        <div className="w-full bg-background rounded-full h-1">
          <div
            className="bg-accent h-1 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeedRoom;
