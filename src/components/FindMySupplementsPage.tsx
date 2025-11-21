import React, { useState } from 'react';
import { ConversationalWelcomeScreen } from './FindMySupplements/ConversationalWelcomeScreen';
import { ConversationalQuestionScreen } from './FindMySupplements/ConversationalQuestionScreen';
import { AnalyzingScreen } from './FindMySupplements/AnalyzingScreen';
import { ResultsScreen } from './FindMySupplements/ResultsScreen';
import { ConversationalProgressIndicator } from './FindMySupplements/ConversationalProgressIndicator';
import { conversationalQuestions } from '../data/conversational-questions';

type Screen = 'welcome' | 'question' | 'analyzing' | 'results';

interface UserAnswers {
  [questionId: string]: string[];
}

interface FindMySupplementsPageProps {
  onClose?: () => void;
}

export default function FindMySupplementsPage({ onClose }: FindMySupplementsPageProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [lastAcknowledgment, setLastAcknowledgment] = useState<string>('');
  
  const currentQuestion = conversationalQuestions[currentQuestionIndex];
  const showIntro = currentQuestionIndex === 0;
  
  const handleStart = () => {
    setCurrentScreen('question');
  };
  
  const handleAnswer = (questionId: string, selectedOptions: string[]) => {
    const newAnswers = {
      ...answers,
      [questionId]: selectedOptions,
    };
    setAnswers(newAnswers);
    
    // Get acknowledgment for this answer
    const question = conversationalQuestions[currentQuestionIndex];
    if (question.acknowledgment) {
      const acknowledgment = question.acknowledgment(selectedOptions);
      setLastAcknowledgment(acknowledgment);
    }
    
    // Move to next question or analyzing screen
    if (currentQuestionIndex < conversationalQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentScreen('analyzing');
      
      // Show analyzing for 2.5 seconds then show results
      setTimeout(() => {
        setCurrentScreen('results');
      }, 2500);
    }
  };
  
  const handleStartOver = () => {
    setCurrentScreen('welcome');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setLastAcknowledgment('');
  };
  
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar - Only show during questions */}
      {currentScreen === 'question' && (
        <ConversationalProgressIndicator currentStep={currentQuestionIndex + 1} totalSteps={conversationalQuestions.length} />
      )}
      
      {/* Main Content */}
      {currentScreen === 'welcome' && (
        <ConversationalWelcomeScreen onStart={handleStart} onClose={handleClose} />
      )}
      
      {currentScreen === 'question' && (
        <ConversationalQuestionScreen
          question={currentQuestion}
          onAnswer={handleAnswer}
          showIntro={showIntro}
          acknowledgment={lastAcknowledgment}
        />
      )}
      
      {currentScreen === 'analyzing' && (
        <AnalyzingScreen answers={answers} />
      )}
      
      {currentScreen === 'results' && (
        <ResultsScreen answers={answers} onStartOver={handleStartOver} onClose={handleClose} />
      )}
    </div>
  );
}