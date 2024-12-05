import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import QuestionCard from '../ui/QuestionCard';
import { updateActivity } from '../../store/slices/horseProfileSlice';
import { completeSection, addExpertisePoints } from '../../store/slices/gameProgressSlice';
import type { RootState } from '../../store';

const TrainingArena: React.FC = () => {
  const dispatch = useDispatch();
  const activity = useSelector((state: RootState) => state.horseProfile.activity);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activeQuestions, setActiveQuestions] = useState<any[]>([]);

  const handleActivityUpdate = (field: keyof typeof activity, value: any) => {
    dispatch(updateActivity({ [field]: value }));
    dispatch(addExpertisePoints(10));
    if (Object.values(activity).every(val => 
      typeof val === 'boolean' ? true : val !== '' && val !== 0
    )) {
      dispatch(completeSection('training'));
    }
  };

  const questions = [
    {
      section: 'Użytkowanie',
      question: 'Sposób użytkowania',
      type: 'select' as const,
      value: activity.type,
      onChange: (value: string) => handleActivityUpdate('type', value),
      options: [
        'rekreacja',
        'skoki',
        'ujeżdżenie',
        'WKKW',
        'rajdy',
        'wyścigi',
        'western',
        'zaprzęgi',
        'hodowla',
        'rekonwalescencja',
        'niepracujący'
      ],
      validation: { required: true },
      tooltip: 'Wybierz główny rodzaj aktywności konia'
    },
    {
      section: 'Harmonogram',
      question: 'Ilość dni treningowych w tygodniu',
      type: 'number' as const,
      value: activity.trainingDaysPerWeek,
      onChange: (value: number) => handleActivityUpdate('trainingDaysPerWeek', value),
      validation: { required: true, min: 0, max: 7 },
      tooltip: 'Podaj liczbę dni w tygodniu, w których koń jest trenowany'
    },
    {
      section: 'Harmonogram',
      question: 'Ilość godzin pracy w ciągu dnia',
      type: 'number' as const,
      value: activity.hoursPerDay,
      onChange: (value: number) => handleActivityUpdate('hoursPerDay', value),
      validation: { required: true, min: 0, max: 8 },
      tooltip: 'Średnia liczba godzin treningu w dniu treningowym'
    },
    {
      section: 'Zawody',
      question: 'Czy koń startuje w zawodach?',
      type: 'radio' as const,
      value: activity.competitionParticipation ? 'Tak' : 'Nie',
      onChange: (value: string) => handleActivityUpdate('competitionParticipation', value === 'Tak'),
      options: ['Tak', 'Nie'],
      validation: { required: true },
      tooltip: 'Informacja o udziale w zawodach'
    },
    {
      section: 'Zawody',
      question: 'Z jaką częstotliwością startuje w zawodach?',
      type: 'text' as const,
      value: activity.competitionFrequency || '',
      onChange: (value: string) => handleActivityUpdate('competitionFrequency', value),
      validation: { required: activity.competitionParticipation },
      tooltip: 'Opisz częstotliwość startów w zawodach',
      isActive: activity.competitionParticipation
    },
    {
      section: 'Karuzela',
      question: 'Czy stajnia dysponuje karuzelą?',
      type: 'radio' as const,
      value: activity.carouselTraining ? 'Tak' : 'Nie',
      onChange: (value: string) => handleActivityUpdate('carouselTraining', value === 'Tak'),
      options: ['Tak', 'Nie'],
      validation: { required: true },
      tooltip: 'Informacja o dostępności karuzeli treningowej'
    },
    {
      section: 'Karuzela',
      question: 'Szczegóły treningu na karuzeli',
      type: 'text' as const,
      value: activity.carouselDetails || '',
      onChange: (value: string) => handleActivityUpdate('carouselDetails', value),
      validation: { required: activity.carouselTraining },
      tooltip: 'Opisz jak często i w jaki sposób koń korzysta z karuzeli',
      isActive: activity.carouselTraining
    }
  ];

  useEffect(() => {
    // Update active questions whenever activity state changes
    const newActiveQuestions = questions.filter(q => q.isActive !== false);
    setActiveQuestions(newActiveQuestions);
  }, [activity.competitionParticipation, activity.carouselTraining]);

  const currentQuestion = activeQuestions[currentQuestionIndex];
  const currentSection = currentQuestion?.section;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-4 bg-surface rounded-xl shadow-lg max-h-[90vh] overflow-y-auto"
    >
      <h2 className="text-xl font-bold mb-4 text-accent">Arena Treningowa</h2>
      
      <h3 className="text-lg font-semibold text-text mb-3">{currentSection}</h3>

      <QuestionCard
        {...currentQuestion}
        isActive={true}
        onNext={() => setCurrentQuestionIndex(prev => Math.min(prev + 1, activeQuestions.length - 1))}
        onPrevious={() => setCurrentQuestionIndex(prev => Math.max(prev - 1, 0))}
        isFirst={currentQuestionIndex === 0}
        isLast={currentQuestionIndex === activeQuestions.length - 1}
      />

      <div className="mt-4 p-3 bg-background/50 rounded-lg">
        <h3 className="text-base font-semibold text-accent mb-2">Wskazówki Treningowe</h3>
        <ul className="list-disc list-inside space-y-1 text-text/80 text-sm">
          <li>Dostosuj intensywność treningu do kondycji konia</li>
          <li>Pamiętaj o odpowiedniej rozgrzewce przed treningiem</li>
          <li>Zapewnij dni regeneracyjne między intensywnymi treningami</li>
          <li>Monitoruj reakcję konia na obciążenia treningowe</li>
          <li>Uwzględnij sezonowość w planowaniu treningów</li>
        </ul>
      </div>

      {/* Progress bar with updated theme */}
      <div className="mt-3 p-2 bg-background/30 rounded-lg">
        <div className="flex justify-between text-xs text-text/70 mb-1">
          <span>Postęp Treningu</span>
          <span>{currentQuestionIndex + 1} / {activeQuestions.length}</span>
        </div>
        <div className="w-full bg-background rounded-full h-1">
          <div
            className="bg-accent h-1 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / activeQuestions.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </motion.div>
  );
};

export default TrainingArena;
