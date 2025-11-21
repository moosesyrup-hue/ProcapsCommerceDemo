import React, { useState, useEffect } from 'react';
import { ConversationQuestion } from '../../data/conversational-questions';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ConversationalQuestionScreenProps {
  question: ConversationQuestion;
  onAnswer: (questionId: string, selectedOptions: string[]) => void;
  showIntro: boolean; // Whether to show Andrew's intro
  acknowledgment?: string; // Previous question's acknowledgment
}

export function ConversationalQuestionScreen({
  question,
  onAnswer,
  showIntro,
  acknowledgment,
}: ConversationalQuestionScreenProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOptions([]);
    setIsSubmitting(false);
  }, [question.id]);

  const handleOptionClick = (optionId: string) => {
    if (question.type === 'single') {
      setSelectedOptions([optionId]);
      // Auto-submit after brief delay for single select
      setIsSubmitting(true);
      setTimeout(() => {
        onAnswer(question.id, [optionId]);
      }, 300);
    } else {
      setSelectedOptions((prev) =>
        prev.includes(optionId)
          ? prev.filter((id) => id !== optionId)
          : [...prev, optionId]
      );
    }
  };

  const handleContinue = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onAnswer(question.id, selectedOptions);
    }, 300);
  };

  const isSelected = (optionId: string) => selectedOptions.includes(optionId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#fafafa] to-[#f5f1e8] flex flex-col justify-center py-8 px-4 sm:px-6">
      <div className="max-w-4xl w-full mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={`question-${question.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="space-y-6"
          >
            {/* Andrew's Avatar & Chat Bubbles */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#009296] to-[#007a7d] flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                <span className="text-sm">AL</span>
              </div>
              
              <div className="flex-1 space-y-2.5 max-w-2xl">
                {/* Previous Acknowledgment - Chat Bubble */}
                {acknowledgment && !showIntro && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-[#e8e4d8]"
                  >
                    <p className="text-[#003b3c] leading-relaxed text-sm sm:text-base">{acknowledgment}</p>
                  </motion.div>
                )}

                {/* Andrew's Intro - Chat Bubble (only on first view) */}
                {showIntro && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-[#e8e4d8]"
                  >
                    <p className="text-[#003b3c] leading-relaxed text-sm sm:text-base">{question.andrewIntro}</p>
                  </motion.div>
                )}

                {/* The Question - Chat Bubble */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-[#009296] to-[#007a7d] text-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-md"
                >
                  <h2 className="text-lg sm:text-xl mb-1">{question.question}</h2>
                  {question.subtitle && (
                    <p className="text-white/80 text-xs sm:text-sm">{question.subtitle}</p>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Options - Compact Grid */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`grid gap-2.5 sm:gap-3 ${
                question.options.length > 4 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1 sm:grid-cols-2'
              }`}
            >
              {question.options.map((option, index) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + index * 0.02 }}
                  onClick={() => !isSubmitting && handleOptionClick(option.id)}
                  disabled={isSubmitting}
                  className={`
                    relative group text-left p-3.5 sm:p-4 rounded-xl border-2 transition-all duration-200
                    ${
                      isSelected(option.id)
                        ? 'border-[#009296] bg-[#009296]/5 shadow-md'
                        : 'border-[#e8e4d8] bg-white hover:border-[#009296]/50 hover:shadow-sm'
                    }
                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    {/* Icon */}
                    {option.icon && (
                      <div className="text-xl sm:text-2xl flex-shrink-0">{option.icon}</div>
                    )}
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="text-[#003b3c] text-sm sm:text-base mb-0.5">
                        {option.label}
                      </div>
                      {option.description && (
                        <div className="text-[#666666] text-xs sm:text-sm leading-snug line-clamp-2">
                          {option.description}
                        </div>
                      )}
                    </div>

                    {/* Check Mark */}
                    {isSelected(option.id) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#009296] flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* Continue Button (for multi-select) */}
            {question.type === 'multiple' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center pt-4"
              >
                <button
                  onClick={handleContinue}
                  disabled={isSubmitting}
                  className={`
                    px-10 sm:px-12 py-3.5 sm:py-4 rounded-2xl text-base sm:text-lg transition-all duration-300
                    ${
                      !isSubmitting
                        ? 'bg-gradient-to-r from-[#009296] to-[#007a7d] text-white hover:shadow-xl hover:scale-105'
                        : 'bg-[#e8e4d8] text-[#999999] cursor-not-allowed'
                    }
                  `}
                >
                  {selectedOptions.length > 0 ? 'Continue' : 'Skip'}
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
