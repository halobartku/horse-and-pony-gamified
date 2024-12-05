import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import QuestionCard from '../ui/QuestionCard';
import { updatePhysicalCondition } from '../../store/slices/horseProfileSlice';
import { completeSection, addExpertisePoints } from '../../store/slices/gameProgressSlice';
import type { RootState } from '../../store';

const ExaminationArea: React.FC = () => {
  const dispatch = useDispatch();
  const physicalCondition = useSelector((state: RootState) => state.horseProfile.physicalCondition);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleConditionUpdate = (field: keyof typeof physicalCondition, value: any) => {
    dispatch(updatePhysicalCondition({ [field]: value }));
    dispatch(addExpertisePoints(10));
    if (Object.values(physicalCondition).every(val => 
      Array.isArray(val) ? val.length > 0 : val !== '' && val !== 0
    )) {
      dispatch(completeSection('examination'));
    }
  };

  const questions = [
    {
      section: 'Ocena Kondycji',
      question: 'Kondycja według skali BCS',
      type: 'select' as const,
      value: physicalCondition.bcsScore,
      onChange: (value: string) => handleConditionUpdate('bcsScore', value),
      options: [
        'ekstremalnie chudy',
        'bardzo chudy',
        'chudy',
        'lekka niedowaga',
        'normalna kondycja',
        'lekka nadwaga',
        'otyłość',
        'ekstremalna otyłość'
      ],
      validation: { required: true },
      tooltip: 'Body Condition Score - skala oceny kondycji konia'
    },
    {
      section: 'Ocena Kondycji',
      question: 'Umięśnienie',
      type: 'select' as const,
      value: physicalCondition.muscling,
      onChange: (value: string) => handleConditionUpdate('muscling', value),
      options: [
        'bardzo słabo umięśniony',
        'słabo umięśniony',
        'dobrze umięśniony',
        'bardzo dobrze umięśniony'
      ],
      validation: { required: true },
      tooltip: 'Ocena rozwoju masy mięśniowej konia'
    },
    {
      section: 'Ocena Zachowania',
      question: 'Temperament konia',
      type: 'select' as const,
      value: physicalCondition.temperament,
      onChange: (value: string) => handleConditionUpdate('temperament', value),
      options: [
        'flegmatyczny / niechętny do ruchu',
        'spokojny',
        'wrażliwy',
        'zrównoważony',
        'energiczny',
        'nerwowy',
        'płochliwy',
        'nadpobudliwy'
      ],
      validation: { required: true },
      tooltip: 'Charakterystyka zachowania i usposobienia konia'
    },
    {
      section: 'Stan Fizyczny',
      question: 'Wymiana okrywy włosowej',
      type: 'select' as const,
      value: physicalCondition.coatChange,
      onChange: (value: string) => handleConditionUpdate('coatChange', value),
      options: [
        'Przebieg prawidłowy',
        'Przebieg problematyczny'
      ],
      validation: { required: true },
      tooltip: 'Ocena procesu wymiany sierści'
    },
    {
      section: 'Stan Fizyczny',
      question: 'Jakość sierści i włosa',
      type: 'multiselect' as const,
      value: physicalCondition.coatQuality,
      onChange: (value: string[]) => handleConditionUpdate('coatQuality', value),
      options: [
        'prawidłowa / błyszcząca',
        'matowa',
        'krucha',
        'zbyt długa',
        'skręcająca się',
        'wypadająca'
      ],
      validation: { required: true },
      tooltip: 'Stan okrywy włosowej jest wskaźnikiem ogólnego zdrowia'
    },
    {
      section: 'Stan Fizyczny',
      question: 'Jakość rogu kopytowego',
      type: 'multiselect' as const,
      value: physicalCondition.hoofCondition,
      onChange: (value: string[]) => handleConditionUpdate('hoofCondition', value),
      options: [
        'prawidłowy/sprężysty',
        'kruchy',
        'łamliwy',
        'obrączki kopytowe',
        'infekcje strzałki',
        'choroba linii białej'
      ],
      validation: { required: true },
      tooltip: 'Stan kopyt jest kluczowy dla zdrowia i użytkowania konia'
    },
    {
      section: 'Stan Fizyczny',
      question: 'Tempo wzrostu rogu kopytowego',
      type: 'select' as const,
      value: physicalCondition.hoofGrowth,
      onChange: (value: string) => handleConditionUpdate('hoofGrowth', value),
      options: [
        'prawidłowe',
        'wolne'
      ],
      validation: { required: true },
      tooltip: 'Ocena tempa wzrostu rogu kopytowego'
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
      <h2 className="text-xl font-bold mb-4 text-accent">Obszar Badań</h2>
      
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
        <h3 className="text-base font-semibold text-accent mb-2">Wskazówki do Badania</h3>
        <ul className="list-disc list-inside space-y-1 text-text/80 text-sm">
          <li>Oceniaj konia w neutralnym świetle i na równym podłożu</li>
          <li>Zwróć uwagę na symetrię umięśnienia</li>
          <li>Obserwuj zachowanie konia podczas badania</li>
          <li>Sprawdź jakość sierści na całym ciele</li>
          <li>Dokładnie obejrzyj wszystkie kopyta</li>
        </ul>
      </div>

      {/* Progress bar with updated theme */}
      <div className="mt-3 p-2 bg-background/30 rounded-lg">
        <div className="flex justify-between text-xs text-text/70 mb-1">
          <span>Postęp Badania</span>
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

export default ExaminationArea;
