import React, { useState } from 'react';
import { Question, QuestionOption } from '../../data/supplement-questions';
import { ChevronLeft, Info } from 'lucide-react';

interface QuestionScreenProps {
  question: Question;
  onAnswer: (questionId: string, selectedOptions: string[]) => void;
  onBack: () => void;
  canGoBack: boolean;
}

export function QuestionScreen({ question, onAnswer, onBack, canGoBack }: QuestionScreenProps) {
  const [selected, setSelected] = useState<string[]>([]);
  
  const handleOptionClick = (optionId: string) => {
    if (question.type === 'single') {
      // For single select, immediately move to next question
      onAnswer(question.id, [optionId]);
    } else {
      // For multiple select, toggle selection
      setSelected(prev => 
        prev.includes(optionId)
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    }
  };
  
  const handleContinue = () => {
    onAnswer(question.id, selected);
  };
  
  const handleSkip = () => {
    onAnswer(question.id, []);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#fafafa] to-[#f5f1e8] px-8 py-24">
      <div className="max-w-5xl w-full">
        {/* Back Button */}
        {canGoBack && (
          <button
            onClick={onBack}
            className="mb-8 flex items-center gap-2 text-[#666666] hover:text-[#003b3c] transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>
        )}
        
        {/* Question Header */}
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-[#003b3c] text-5xl">
            {question.title}
          </h2>
          {question.subtitle && (
            <p className="text-[#666666] text-xl">
              {question.subtitle}
            </p>
          )}
        </div>
        
        {/* Options Grid */}
        <div className={`grid gap-4 mb-8 ${
          question.options.length > 6 
            ? 'grid-cols-4' 
            : question.options.length > 4 
            ? 'grid-cols-3' 
            : 'grid-cols-2'
        }`}>
          {question.options.map((option) => (
            <OptionCard
              key={option.id}
              option={option}
              isSelected={selected.includes(option.id)}
              onClick={() => handleOptionClick(option.id)}
              showDescription={question.options.length <= 8}
            />
          ))}
        </div>
        
        {/* Educational Note */}
        {question.educationalNote && (
          <div className="bg-gradient-to-br from-[#f5f1e8] to-[#e8e4d8] rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-[#009296]" />
              </div>
              <div>
                <div className="text-[#003b3c] mb-1">Why I'm asking this</div>
                <div className="text-[#666666] leading-relaxed">
                  {question.educationalNote}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Continue/Skip Buttons - Only for multiple select */}
        {question.type === 'multiple' && (
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleContinue}
              disabled={selected.length === 0}
              className="px-12 py-5 bg-gradient-to-r from-[#009296] to-[#007a7d] text-white rounded-2xl hover:shadow-xl transition-all text-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center gap-3 group"
            >
              <span>Continue</span>
              <svg 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            
            <button
              onClick={handleSkip}
              className="px-12 py-5 border-2 border-[#e8e4d8] text-[#666666] rounded-2xl hover:border-[#009296] hover:text-[#009296] transition-all text-lg"
            >
              Skip
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function OptionCard({
  option,
  isSelected,
  onClick,
  showDescription,
}: {
  option: QuestionOption;
  isSelected: boolean;
  onClick: () => void;
  showDescription: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative p-6 rounded-2xl border-2 transition-all text-left ${
        isSelected
          ? 'border-[#009296] bg-gradient-to-br from-[#009296] to-[#007a7d] text-white shadow-xl scale-105'
          : 'border-[#e8e4d8] bg-white hover:border-[#009296] hover:shadow-lg'
      }`}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white flex items-center justify-center">
          <svg className="w-4 h-4 text-[#009296]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
      
      {/* Icon */}
      {option.icon && (
        <div className={`text-4xl mb-4 ${isSelected ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'} transition-opacity`}>
          {option.icon}
        </div>
      )}
      
      {/* Label */}
      <div className={`mb-2 text-lg ${isSelected ? 'text-white' : 'text-[#003b3c]'}`}>
        {option.label}
      </div>
      
      {/* Description */}
      {showDescription && option.description && (
        <div className={`text-sm leading-relaxed ${isSelected ? 'text-white/90' : 'text-[#666666]'}`}>
          {option.description}
        </div>
      )}
    </button>
  );
}
