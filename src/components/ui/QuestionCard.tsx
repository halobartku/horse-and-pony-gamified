import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { incrementStep, decrementStep } from '../../store/slices/gameProgressSlice';

interface QuestionCardProps {
  question: string;
  type: 'text' | 'number' | 'select' | 'radio' | 'multiselect';
  value: any;
  onChange: (value: any) => void;
  options?: string[];
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
  };
  tooltip?: string;
  isActive?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  type,
  value,
  onChange,
  options = [],
  validation = {},
  tooltip,
  isActive = true,
  onNext,
  onPrevious,
  isFirst = false,
  isLast = false,
}) => {
  const dispatch = useDispatch();

  const handleNext = () => {
    if (!isLast && (!validation.required || value)) {
      if (onNext) {
        onNext();
      }
      dispatch(incrementStep());
    }
  };

  const handlePrevious = () => {
    if (!isFirst) {
      if (onPrevious) {
        onPrevious();
      }
      dispatch(decrementStep());
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && document.activeElement?.tagName !== 'TEXTAREA') {
        event.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [value, isLast, validation.required]);

  if (!isActive) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-surface/50 rounded-lg shadow-md p-3 sm:p-4 mb-3 max-w-2xl mx-auto"
    >
      <div className="mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-text mb-2">{question}</h3>
        {tooltip && (
          <p className="text-sm text-text/80 italic mb-3 leading-relaxed">{tooltip}</p>
        )}
      </div>

      <div className="mb-4">
        {type === 'text' && (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 text-sm bg-background text-text border border-surface rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-shadow duration-200"
            required={validation.required}
          />
        )}

        {type === 'number' && (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(Number(e.target.value))}
            min={validation.min}
            max={validation.max}
            className="w-full p-2 text-sm bg-background text-text border border-surface rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-shadow duration-200"
            required={validation.required}
          />
        )}

        {type === 'select' && (
          <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 text-sm bg-background text-text border border-surface rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-shadow duration-200"
            required={validation.required}
          >
            <option value="">Wybierz opcję...</option>
            {options.map((option) => (
              <option key={option} value={option} className="bg-background text-text">
                {option}
              </option>
            ))}
          </select>
        )}

        {type === 'radio' && (
          <div className="space-y-2">
            {options.map((option) => (
              <label key={option} className="flex items-center p-2 border border-surface rounded-lg hover:bg-background/50 transition-colors duration-200 cursor-pointer">
                <input
                  type="radio"
                  checked={value === option}
                  onChange={() => onChange(option)}
                  className="w-4 h-4 text-accent focus:ring-accent"
                  required={validation.required}
                />
                <span className="ml-2 text-sm text-text">{option}</span>
              </label>
            ))}
          </div>
        )}

        {type === 'multiselect' && (
          <div className="space-y-2">
            {options.map((option) => (
              <label key={option} className="flex items-center p-2 border border-surface rounded-lg hover:bg-background/50 transition-colors duration-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Array.isArray(value) && value.includes(option)}
                  onChange={(e) => {
                    const newValue = Array.isArray(value) ? [...value] : [];
                    if (e.target.checked) {
                      newValue.push(option);
                    } else {
                      const index = newValue.indexOf(option);
                      if (index > -1) {
                        newValue.splice(index, 1);
                      }
                    }
                    onChange(newValue);
                  }}
                  className="w-4 h-4 text-accent focus:ring-accent rounded"
                />
                <span className="ml-2 text-sm text-text">{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between gap-3 mt-4">
        <button
          onClick={handlePrevious}
          disabled={isFirst}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
            isFirst
              ? 'bg-surface text-text/50 cursor-not-allowed'
              : 'bg-accent hover:bg-accent/80 text-background shadow-sm hover:shadow'
          }`}
        >
          ← Poprzednie
        </button>
        <button
          onClick={handleNext}
          disabled={isLast || (validation.required && !value)}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
            isLast || (validation.required && !value)
              ? 'bg-surface text-text/50 cursor-not-allowed'
              : 'bg-accent hover:bg-accent/80 text-background shadow-sm hover:shadow'
          }`}
        >
          Następne →
        </button>
      </div>
    </motion.div>
  );
};

export default QuestionCard;
