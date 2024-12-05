import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import QuestionCard from '../ui/QuestionCard';
import { updateOwnerInfo, updateHorseInfo } from '../../store/slices/horseProfileSlice';
import { completeSection, addExpertisePoints } from '../../store/slices/gameProgressSlice';
import type { RootState } from '../../store';

const StableOffice: React.FC = () => {
  const dispatch = useDispatch();
  const { owner, horse } = useSelector((state: RootState) => state.horseProfile);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleOwnerUpdate = (field: keyof typeof owner, value: string) => {
    dispatch(updateOwnerInfo({ [field]: value }));
    dispatch(addExpertisePoints(10));
  };

  const handleHorseUpdate = (field: keyof typeof horse, value: any) => {
    dispatch(updateHorseInfo({ [field]: value }));
    dispatch(addExpertisePoints(10));
    if (Object.values(horse).every(val => val !== '' && val !== 0)) {
      dispatch(completeSection('office'));
    }
  };

  const questions = [
    // Owner Information
    {
      section: 'Dane Właściciela',
      question: 'Imię i Nazwisko',
      type: 'text' as const,
      value: owner.name,
      onChange: (value: string) => handleOwnerUpdate('name', value),
      validation: { required: true },
      tooltip: 'Podaj pełne imię i nazwisko właściciela'
    },
    {
      section: 'Dane Właściciela',
      question: 'Numer Telefonu',
      type: 'text' as const,
      value: owner.phone,
      onChange: (value: string) => handleOwnerUpdate('phone', value),
      validation: { required: true },
      tooltip: 'Numer telefonu do kontaktu'
    },
    {
      section: 'Dane Właściciela',
      question: 'Adres E-mail',
      type: 'text' as const,
      value: owner.email,
      onChange: (value: string) => handleOwnerUpdate('email', value),
      validation: { required: true },
      tooltip: 'Adres email do kontaktu i przesyłania zaleceń'
    },
    // Horse Information
    {
      section: 'Dane Konia',
      question: 'Imię Konia',
      type: 'text' as const,
      value: horse.name,
      onChange: (value: string) => handleHorseUpdate('name', value),
      validation: { required: true },
      tooltip: 'Podaj imię konia'
    },
    {
      section: 'Dane Konia',
      question: 'Wzrost (cm)',
      type: 'number' as const,
      value: horse.height,
      onChange: (value: number) => handleHorseUpdate('height', value),
      validation: { required: true, min: 100, max: 200 },
      tooltip: 'Wzrost konia w centymetrach'
    },
    {
      section: 'Dane Konia',
      question: 'Rasa',
      type: 'text' as const,
      value: horse.breed,
      onChange: (value: string) => handleHorseUpdate('breed', value),
      validation: { required: true },
      tooltip: 'Podaj rasę konia'
    },
    {
      section: 'Dane Konia',
      question: 'Wiek',
      type: 'number' as const,
      value: horse.age,
      onChange: (value: number) => handleHorseUpdate('age', value),
      validation: { required: true, min: 0, max: 40 },
      tooltip: 'Wiek konia w latach'
    },
    {
      section: 'Dane Konia',
      question: 'Masa Ciała (kg)',
      type: 'number' as const,
      value: horse.weight,
      onChange: (value: number) => handleHorseUpdate('weight', value),
      validation: { required: true, min: 200, max: 1000 },
      tooltip: 'Masa ciała konia w kilogramach'
    },
    {
      section: 'Dane Konia',
      question: 'Województwo',
      type: 'select' as const,
      value: horse.location,
      onChange: (value: string) => handleHorseUpdate('location', value),
      options: [
        'Dolnośląskie', 'Kujawsko-pomorskie', 'Lubelskie', 'Lubuskie',
        'Łódzkie', 'Małopolskie', 'Mazowieckie', 'Opolskie',
        'Podkarpackie', 'Podlaskie', 'Pomorskie', 'Śląskie',
        'Świętokrzyskie', 'Warmińsko-mazurskie', 'Wielkopolskie', 'Zachodniopomorskie'
      ],
      validation: { required: true },
      tooltip: 'Wybierz województwo, w którym przebywa koń'
    },
    {
      section: 'Dane Konia',
      question: 'Płeć',
      type: 'select' as const,
      value: horse.gender,
      onChange: (value: string) => handleHorseUpdate('gender', value),
      options: ['walach', 'klacz', 'ogier'],
      validation: { required: true },
      tooltip: 'Wybierz płeć konia'
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
      <h2 className="text-xl font-bold mb-4 text-accent">Biuro Stajni</h2>
      
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
        <h3 className="text-base font-semibold text-accent mb-2">Wskazówki</h3>
        <ul className="list-disc list-inside space-y-1 text-text/80 text-sm">
          <li>Dokładne dane kontaktowe pozwolą na sprawną komunikację</li>
          <li>Precyzyjne pomiary masy i wzrostu są kluczowe dla dobrania odpowiedniej diety</li>
          <li>Informacja o lokalizacji pomoże w uwzględnieniu regionalnych uwarunkowań</li>
          <li>Wiek i płeć konia mają wpływ na jego zapotrzebowanie żywieniowe</li>
        </ul>
      </div>

      {/* Progress bar with updated theme */}
      <div className="mt-3 p-2 bg-background/30 rounded-lg">
        <div className="flex justify-between text-xs text-text/70 mb-1">
          <span>Postęp Rejestracji</span>
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

export default StableOffice;
