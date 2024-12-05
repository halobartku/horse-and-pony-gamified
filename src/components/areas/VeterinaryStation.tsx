import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import QuestionCard from '../ui/QuestionCard';
import { updateHealth } from '../../store/slices/horseProfileSlice';
import { completeSection, addExpertisePoints } from '../../store/slices/gameProgressSlice';
import type { RootState } from '../../store';

const VeterinaryStation: React.FC = () => {
  const dispatch = useDispatch();
  const health = useSelector((state: RootState) => state.horseProfile.health);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleHealthUpdate = (field: keyof typeof health, value: any) => {
    dispatch(updateHealth({ [field]: value }));
    dispatch(addExpertisePoints(10));
    if (Object.values(health).every(val => 
      Array.isArray(val) ? true : val !== '' && val !== 0
    )) {
      dispatch(completeSection('veterinary'));
    }
  };

  const healthConditions = [
    'nawracające kolki',
    'choroba wrzodowa',
    'przebyty ochwat',
    'zespół metaboliczny',
    'zespół Cushinga',
    'alergie i nietolerancje pokarmowe',
    'inne choroby układu pokarmowego',
    'syndrom EORTH',
    'RAO/COPD',
    'problemy z uzębieniem',
    'zbyt luźny kał',
    'woda kałowa',
    'choroby neurologiczne',
    'choroby ortopedyczne',
    'inne choroby'
  ];

  const questions = [
    {
      section: 'Badania',
      question: 'Czy w ciągu ostatniego roku wykonywane było badanie krwi, analiza włosa, rogu kopytowego i kału?',
      type: 'radio' as const,
      value: health.lastBloodwork,
      onChange: (value: string) => handleHealthUpdate('lastBloodwork', value),
      options: ['Tak', 'Nie'],
      validation: { required: true },
      tooltip: 'Regularne badania pomagają w monitorowaniu zdrowia konia'
    },
    {
      section: 'Profilaktyka',
      question: 'Liczba odrobaczeń w ciągu roku',
      type: 'number' as const,
      value: health.dewormingCount,
      onChange: (value: number) => handleHealthUpdate('dewormingCount', value),
      validation: { required: true, min: 0, max: 12 },
      tooltip: 'Standardowo zaleca się 2-4 odrobaczenia rocznie'
    },
    {
      section: 'Profilaktyka',
      question: 'Termin ostatniego tarnikowania zębów',
      type: 'text' as const,
      value: health.lastDentalCheck,
      onChange: (value: string) => handleHealthUpdate('lastDentalCheck', value),
      validation: { required: true },
      tooltip: 'Regularne kontrole stomatologiczne są kluczowe dla zdrowia konia'
    },
    {
      section: 'Stan Zdrowia',
      question: 'Występujące problemy zdrowotne',
      type: 'multiselect' as const,
      value: health.existingConditions,
      onChange: (value: string[]) => handleHealthUpdate('existingConditions', value),
      options: healthConditions,
      validation: { required: true },
      tooltip: 'Zaznacz wszystkie występujące problemy zdrowotne'
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
      <h2 className="text-xl font-bold mb-4 text-accent">Stacja Weterynaryjna</h2>
      
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
        <h3 className="text-base font-semibold text-accent mb-2">Wskazówki Weterynaryjne</h3>
        <ul className="list-disc list-inside space-y-1 text-text/80 text-sm">
          <li>Regularne badania krwi pomagają wcześnie wykryć potencjalne problemy zdrowotne</li>
          <li>Systematyczne odrobaczanie chroni przed pasożytami wewnętrznymi</li>
          <li>Kontrole stomatologiczne zapewniają prawidłowe żucie i trawienie</li>
          <li>Obserwuj swojego konia pod kątem nietypowych zachowań lub objawów</li>
        </ul>
      </div>

      {/* Progress bar with updated theme */}
      <div className="mt-3 p-2 bg-background/30 rounded-lg">
        <div className="flex justify-between text-xs text-text/70 mb-1">
          <span>Postęp Badania Weterynaryjnego</span>
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

export default VeterinaryStation;
