import { useState, useEffect, useCallback } from 'react';

export interface Balloon {
  id: string;
  x: number;
  y: number;
  color: string;
}

export interface BalloonGameState {
  score: number;
  timeLeft: number;
  isGameActive: boolean;
  isGameComplete: boolean;
  showSummary: boolean;
  balloons: Balloon[];
}

const GAME_DURATION = 20; // 20 seconds
const BALLOON_COLORS = ['#FF6B8B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];

export const useBalloonGame = () => {
  const [gameState, setGameState] = useState<BalloonGameState>({
    score: 0,
    timeLeft: GAME_DURATION,
    isGameActive: false,
    isGameComplete: false,
    showSummary: false,
    balloons: [],
  });

  // Generate a balloon with simple positioning
  const generateBalloon = useCallback((): Balloon => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * 70 + 15, // 15% to 85% to keep balloons well within bounds
      y: Math.random() * 70 + 15, // 15% to 85% to keep balloons well within bounds
      color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
    };
  }, []);

  const startGame = useCallback(() => {
    // Start with 5 balloons
    const initialBalloons: Balloon[] = [];
    for (let i = 0; i < 5; i++) {
      initialBalloons.push(generateBalloon());
    }
    
    setGameState({
      score: 0,
      timeLeft: GAME_DURATION,
      isGameActive: true,
      isGameComplete: false,
      showSummary: false,
      balloons: initialBalloons,
    });
  }, [generateBalloon]);

  const popBalloon = useCallback((balloonId: string) => {
    setGameState(prev => {
      if (!prev.isGameActive) return prev;

      // Remove the popped balloon and add a new one
      const newBalloons = prev.balloons.filter(b => b.id !== balloonId);
      
      // Always maintain 5 balloons on screen
      while (newBalloons.length < 5) {
        newBalloons.push(generateBalloon());
      }

      return {
        ...prev,
        balloons: newBalloons,
        score: prev.score + 1,
      };
    });
  }, [generateBalloon]);

  const dismissSummary = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showSummary: false,
    }));
  }, []);

  // Timer countdown - Fixed: removed score dependency that was causing timer resets
  useEffect(() => {
    if (gameState.isGameActive && gameState.timeLeft > 0) {
      const timer = setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }));
      }, 1000);

      return () => clearTimeout(timer);
    } else if (gameState.isGameActive && gameState.timeLeft === 0) {
      // Game over - show summary first
      setGameState(prev => ({
        ...prev,
        isGameActive: false,
        isGameComplete: true,
        showSummary: true,
        balloons: [], // Clear balloons when game ends
      }));
      
      // Store score
      if (typeof window !== 'undefined') {
        localStorage.setItem('balloonGameScore', gameState.score.toString());
      }
    }
  }, [gameState.isGameActive, gameState.timeLeft]); // Removed gameState.score dependency

  return {
    gameState,
    startGame,
    popBalloon,
    dismissSummary,
  };
};