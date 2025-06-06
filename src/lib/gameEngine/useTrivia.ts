import { useState, useCallback, useEffect } from 'react';
import birthdayConfig from '@/config/birthdayConfig';

export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

export interface TriviaState {
  questions: TriviaQuestion[];
  currentQuestionIndex: number;
  score: number;
  totalQuestions: number;
  timeLimit: number;
  timeRemaining: number;
  selectedAnswer: number | null;
  isAnswered: boolean;
  isGameActive: boolean;
  isGameComplete: boolean;
  isGameWon: boolean;
}

// [CUSTOMIZE] Add more birthday-themed trivia questions here
const generateBirthdayQuestions = (): TriviaQuestion[] => [
  {
    id: '1',
    question: `What is ${birthdayConfig.name}'s favorite hobby?`,
    options: birthdayConfig.hobbies.slice(0, 4),
    correctAnswer: 0,
    category: 'Personal'
  },
  {
    id: '2', 
    question: `Which personality trait best describes ${birthdayConfig.name}?`,
    options: [...birthdayConfig.personalTraits.slice(0, 3), 'Mysterious'],
    correctAnswer: 0,
    category: 'Personality'
  },
  {
    id: '3',
    question: 'What makes the perfect birthday celebration?',
    options: ['Surprise parties', 'Quiet dinners', 'Big adventures', 'Movie marathons'],
    correctAnswer: 0,
    category: 'Preferences'
  },
  {
    id: '4',
    question: `What is one of ${birthdayConfig.name}'s favorite memories?`,
    options: [
      birthdayConfig.memories[0] || 'Beach adventures',
      'Boring meetings',
      'Traffic jams', 
      'Rainy days'
    ],
    correctAnswer: 0,
    category: 'Memories'
  },
  {
    id: '5',
    question: 'What is the best birthday dessert?',
    options: ['Chocolate cake', 'Vanilla ice cream', 'Fruit salad', 'Cookies'],
    correctAnswer: 0,
    category: 'Food'
  },
  {
    id: '6',
    question: `What does ${birthdayConfig.name} love most about birthdays?`,
    options: ['Making memories with friends', 'Getting presents', 'Having cake', 'Being the center of attention'],
    correctAnswer: 0,
    category: 'Birthday Spirit'
  }
];

export const useTrivia = (timeLimit: number = 120) => {
  const questions = generateBirthdayQuestions();
  
  const [gameState, setGameState] = useState<TriviaState>({
    questions,
    currentQuestionIndex: 0,
    score: 0,
    totalQuestions: questions.length,
    timeLimit,
    timeRemaining: timeLimit,
    selectedAnswer: null,
    isAnswered: false,
    isGameActive: false,
    isGameComplete: false,
    isGameWon: false,
  });

  // Start game
  const startGame = useCallback(() => {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    setGameState({
      questions: shuffledQuestions,
      currentQuestionIndex: 0,
      score: 0,
      totalQuestions: shuffledQuestions.length,
      timeLimit,
      timeRemaining: timeLimit,
      selectedAnswer: null,
      isAnswered: false,
      isGameActive: true,
      isGameComplete: false,
      isGameWon: false,
    });
  }, [questions, timeLimit]);

  // Select answer
  const selectAnswer = useCallback((answerIndex: number) => {
    if (gameState.isAnswered || !gameState.isGameActive) return;

    const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    setGameState(prev => ({
      ...prev,
      selectedAnswer: answerIndex,
      isAnswered: true,
      score: isCorrect ? prev.score + 1 : prev.score,
    }));
  }, [gameState.isAnswered, gameState.isGameActive, gameState.questions, gameState.currentQuestionIndex]);

  // Next question
  const nextQuestion = useCallback(() => {
    setGameState(prev => {
      const nextIndex = prev.currentQuestionIndex + 1;
      const isComplete = nextIndex >= prev.totalQuestions;
      const passingScore = Math.ceil(prev.totalQuestions * 0.6); // 60% to win
      
      return {
        ...prev,
        currentQuestionIndex: nextIndex,
        selectedAnswer: null,
        isAnswered: false,
        isGameActive: !isComplete,
        isGameComplete: isComplete,
        isGameWon: isComplete ? prev.score >= passingScore : false,
      };
    });
  }, []);

  // Timer effect
  useEffect(() => {
    if (!gameState.isGameActive || gameState.isGameComplete) return;

    const timer = setInterval(() => {
      setGameState(prev => {
        const newTimeRemaining = prev.timeRemaining - 1;
        const timeUp = newTimeRemaining <= 0;
        const passingScore = Math.ceil(prev.totalQuestions * 0.6);
        
        return {
          ...prev,
          timeRemaining: Math.max(0, newTimeRemaining),
          isGameActive: !timeUp,
          isGameComplete: timeUp,
          isGameWon: timeUp ? prev.score >= passingScore : prev.isGameWon,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.isGameActive, gameState.isGameComplete]);

  // Reset game
  const resetGame = useCallback(() => {
    setGameState({
      questions,
      currentQuestionIndex: 0,
      score: 0,
      totalQuestions: questions.length,
      timeLimit,
      timeRemaining: timeLimit,
      selectedAnswer: null,
      isAnswered: false,
      isGameActive: false,
      isGameComplete: false,
      isGameWon: false,
    });
  }, [questions, timeLimit]);

  // Get current question
  const getCurrentQuestion = useCallback(() => {
    return gameState.questions[gameState.currentQuestionIndex];
  }, [gameState.questions, gameState.currentQuestionIndex]);

  // Get game statistics
  const getGameStats = useCallback(() => {
    const progress = ((gameState.currentQuestionIndex + (gameState.isAnswered ? 1 : 0)) / gameState.totalQuestions) * 100;
    const timeProgress = (gameState.timeRemaining / gameState.timeLimit) * 100;
    const accuracy = gameState.currentQuestionIndex > 0 ? (gameState.score / Math.max(1, gameState.currentQuestionIndex + (gameState.isAnswered ? 1 : 0))) * 100 : 0;

    return {
      progress: Math.min(100, progress),
      timeProgress,
      accuracy,
      questionsRemaining: gameState.totalQuestions - gameState.currentQuestionIndex - (gameState.isAnswered ? 1 : 0),
    };
  }, [gameState]);

  return {
    gameState,
    startGame,
    selectAnswer,
    nextQuestion,
    resetGame,
    getCurrentQuestion,
    getGameStats,
  };
}; 