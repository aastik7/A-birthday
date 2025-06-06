import { useState, useCallback, useEffect } from 'react';

export interface Balloon {
  id: string;
  x: number;
  y: number;
  color: string;
  size: number;
  popped: boolean;
  createdAt: number;
  velocityX: number;
  velocityY: number;
}

export interface BalloonPopState {
  balloons: Balloon[];
  score: number;
  goalCount: number;
  timeLimit: number;
  timeRemaining: number;
  isGameActive: boolean;
  isGameComplete: boolean;
  isGameWon: boolean;
}

const BALLOON_COLORS = ['#FF6B8B', '#5A3E7D', '#FFE66D', '#4ECDC4', '#45B7D1', '#96CEB4'];

export const useBalloonPop = (goalCount: number = 15, timeLimit: number = 20) => {
  const [gameState, setGameState] = useState<BalloonPopState>({
    balloons: [],
    score: 0,
    goalCount,
    timeLimit,
    timeRemaining: timeLimit,
    isGameActive: false,
    isGameComplete: false,
    isGameWon: false,
  });

  // Generate random balloon with better positioning and movement
  const generateBalloon = useCallback((): Balloon => {
    return {
      id: `balloon-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      x: Math.random() * 60 + 20, // 20-80% of screen width for better placement
      y: Math.random() * 60 + 20, // 20-80% of screen height for better placement
      color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
      size: 70, // Slightly smaller for more challenge
      popped: false,
      createdAt: Date.now(),
      // Add movement properties
      velocityX: (Math.random() - 0.5) * 2, // Random horizontal velocity
      velocityY: (Math.random() - 0.5) * 2, // Random vertical velocity
    };
  }, []);

  // Initialize game
  const startGame = useCallback(() => {
    const initialBalloons = Array.from({ length: 5 }, generateBalloon);
    setGameState({
      balloons: initialBalloons,
      score: 0,
      goalCount,
      timeLimit,
      timeRemaining: timeLimit,
      isGameActive: true,
      isGameComplete: false,
      isGameWon: false,
    });
  }, [goalCount, timeLimit, generateBalloon]);

  // Pop balloon
  const popBalloon = useCallback((balloonId: string) => {
    setGameState(prev => {
      if (!prev.isGameActive) return prev;

      const updatedBalloons = prev.balloons.map(balloon =>
        balloon.id === balloonId ? { ...balloon, popped: true } : balloon
      );

      const newScore = prev.score + 1;
      const isGameWon = newScore >= prev.goalCount;
      const isGameComplete = isGameWon;

      // Add new balloon if not game over and we have less than 8 active balloons
      if (!isGameComplete && updatedBalloons.filter(b => !b.popped).length < 8) {
        updatedBalloons.push(generateBalloon());
      }

      return {
        ...prev,
        balloons: updatedBalloons,
        score: newScore,
        isGameActive: !isGameComplete,
        isGameComplete,
        isGameWon,
      };
    });
  }, [generateBalloon]);

  // Reset game
  const resetGame = useCallback(() => {
    setGameState({
      balloons: [],
      score: 0,
      goalCount,
      timeLimit,
      timeRemaining: timeLimit,
      isGameActive: false,
      isGameComplete: false,
      isGameWon: false,
    });
  }, [goalCount, timeLimit]);

  // Timer effect
  useEffect(() => {
    if (!gameState.isGameActive || gameState.isGameComplete) return;

    const timer = setInterval(() => {
      setGameState(prev => {
        const newTimeRemaining = prev.timeRemaining - 1;
        const timeUp = newTimeRemaining <= 0;
        
        return {
          ...prev,
          timeRemaining: Math.max(0, newTimeRemaining),
          isGameActive: !timeUp,
          isGameComplete: timeUp,
          isGameWon: timeUp ? prev.score >= prev.goalCount : prev.isGameWon,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.isGameActive, gameState.isGameComplete]);

  // Balloon generation effect - keep adding balloons
  useEffect(() => {
    if (!gameState.isGameActive || gameState.isGameComplete) return;

    const balloonTimer = setInterval(() => {
      setGameState(prev => {
        const activeBalloons = prev.balloons.filter(b => !b.popped);
        // Keep 4-6 balloons active at all times
        if (activeBalloons.length < 4) {
          const newBalloons = Array.from({ length: 2 }, generateBalloon);
          return {
            ...prev,
            balloons: [...prev.balloons, ...newBalloons]
          };
        }
        return prev;
      });
    }, 1500); // Add balloons every 1.5 seconds if needed

    return () => clearInterval(balloonTimer);
  }, [gameState.isGameActive, gameState.isGameComplete, generateBalloon]);

  // Balloon movement effect
  useEffect(() => {
    if (!gameState.isGameActive || gameState.isGameComplete) return;

    const movementTimer = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        balloons: prev.balloons.map(balloon => {
          if (balloon.popped) return balloon;

          // Calculate new position
          let newX = balloon.x + balloon.velocityX;
          let newY = balloon.y + balloon.velocityY;
          let newVelocityX = balloon.velocityX;
          let newVelocityY = balloon.velocityY;

          // Bounce off walls
          if (newX <= 10 || newX >= 90) {
            newVelocityX = -newVelocityX;
            newX = Math.max(10, Math.min(90, newX));
          }
          if (newY <= 10 || newY >= 90) {
            newVelocityY = -newVelocityY;
            newY = Math.max(10, Math.min(90, newY));
          }

          return {
            ...balloon,
            x: newX,
            y: newY,
            velocityX: newVelocityX,
            velocityY: newVelocityY,
          };
        })
      }));
    }, 100); // Update movement every 100ms for smooth animation

    return () => clearInterval(movementTimer);
  }, [gameState.isGameActive, gameState.isGameComplete]);

  // Get game statistics
  const getGameStats = useCallback(() => {
    const totalBalloons = gameState.balloons.length;
    const poppedBalloons = gameState.balloons.filter(b => b.popped).length;
    const activeBalloons = totalBalloons - poppedBalloons;
    const progress = (gameState.score / gameState.goalCount) * 100;

    return {
      totalBalloons,
      poppedBalloons,
      activeBalloons,
      progress: Math.min(100, progress),
      timeProgress: (gameState.timeRemaining / gameState.timeLimit) * 100,
    };
  }, [gameState]);

  return {
    gameState,
    startGame,
    popBalloon,
    resetGame,
    getGameStats,
    activeBalloons: gameState.balloons.filter(b => !b.popped),
  };
}; 