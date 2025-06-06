import { useState, useEffect, useCallback, useRef } from 'react';

export interface Card {
  id: string;
  pairId: string;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface MemoryMatchState {
  cards: Card[];
  flippedCards: Card[];
  matches: number;
  attempts: number;
  isGameActive: boolean;
  isGameComplete: boolean;
  showSummary: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  isProcessing: boolean;
}

const CARD_CONTENTS = [
  'Heart', 'Star', 'Gift', 'Cake', 
  'Music', 'Sun', 'Moon', 'Cloud',
  'Flower', 'Sparkles', 'Crown', 'IceCream',
  'Rocket', 'Umbrella', 'Balloon'
];

const getGridSize = (difficulty: 'easy' | 'medium' | 'hard') => {
  switch (difficulty) {
    case 'easy': return { rows: 3, cols: 4, pairs: 6 };
    case 'medium': return { rows: 4, cols: 4, pairs: 8 };
    case 'hard': return { rows: 4, cols: 5, pairs: 10 };
    default: return { rows: 3, cols: 4, pairs: 6 };
  }
};

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useMemoryMatch = (difficulty: 'easy' | 'medium' | 'hard' = 'medium') => {
  const processingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const [gameState, setGameState] = useState<MemoryMatchState>(() => {
    const { pairs } = getGridSize(difficulty);
    const selectedContents = CARD_CONTENTS.slice(0, pairs);
    let initialCards: Card[] = [];
    selectedContents.forEach((content, index) => {
      const pairId = `pair_${index}`;
      initialCards.push({ id: `card_${index}_a`, pairId, content, isFlipped: false, isMatched: false });
      initialCards.push({ id: `card_${index}_b`, pairId, content, isFlipped: false, isMatched: false });
    });

    return {
      cards: shuffleArray(initialCards),
      flippedCards: [],
      matches: 0,
      attempts: 0,
      isGameActive: false,
      isGameComplete: false,
      showSummary: false,
      difficulty,
      isProcessing: false,
    };
  });

  const startGame = useCallback(() => {
    if (processingTimeoutRef.current) {
      clearTimeout(processingTimeoutRef.current);
    }
    
    setGameState(prev => ({
      ...prev,
      isGameActive: true,
      isGameComplete: false,
      showSummary: false,
      matches: 0,
      attempts: 0,
      flippedCards: [],
      isProcessing: false,
      cards: shuffleArray(prev.cards.map(c => ({ ...c, isFlipped: false, isMatched: false }))),
    }));
  }, []);

  const dismissSummary = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showSummary: false,
    }));
  }, []);

  const skipToComplete = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isGameActive: false,
      isGameComplete: true,
      showSummary: true,
      matches: getGridSize(prev.difficulty).pairs,
      attempts: getGridSize(prev.difficulty).pairs + 2, // Give a reasonable attempt count
    }));
  }, []);

  const flipCard = useCallback((cardId: string) => {
    setGameState(prev => {
      // Prevent flipping if conditions aren't met
      if (!prev.isGameActive || prev.isProcessing || prev.flippedCards.length >= 2) {
        return prev;
      }

      const cardToFlip = prev.cards.find(c => c.id === cardId);
      
      if (!cardToFlip || cardToFlip.isFlipped || cardToFlip.isMatched) {
        return prev;
      }

      if (prev.flippedCards.some(c => c.id === cardId)) {
        return prev;
      }

      const newFlippedCards = [...prev.flippedCards, cardToFlip];
      const updatedCards = prev.cards.map(c => 
        c.id === cardId ? { ...c, isFlipped: true } : c
      );

      const isProcessing = newFlippedCards.length === 2;

      return {
        ...prev,
        cards: updatedCards,
        flippedCards: newFlippedCards,
        isProcessing,
      };
    });
  }, []);

  // Fixed match checking logic
  useEffect(() => {
    if (gameState.flippedCards.length === 2 && !processingTimeoutRef.current) {
      const [firstCard, secondCard] = gameState.flippedCards;
      const isMatch = firstCard.pairId === secondCard.pairId;

      processingTimeoutRef.current = setTimeout(() => {
        setGameState(prev => {
          if (prev.flippedCards.length !== 2) {
            return { ...prev, isProcessing: false };
          }

          const newMatches = isMatch ? prev.matches + 1 : prev.matches;
          const updatedCards = prev.cards.map(card => {
            // If it's a match, keep both cards flipped and mark as matched
            if (isMatch && (card.id === firstCard.id || card.id === secondCard.id)) {
              return { ...card, isMatched: true, isFlipped: true };
            }
            // If no match, flip back only the two cards that were just flipped
            if (!isMatch && (card.id === firstCard.id || card.id === secondCard.id)) {
              return { ...card, isFlipped: false };
            }
            // Keep all other cards unchanged
            return card;
          });
          
          const gameComplete = newMatches === getGridSize(prev.difficulty).pairs;

          return {
            ...prev,
            cards: updatedCards,
            flippedCards: [],
            matches: newMatches,
            attempts: prev.attempts + 1,
            isGameComplete: gameComplete,
            isGameActive: !gameComplete,
            showSummary: gameComplete,
            isProcessing: false,
          };
        });
        
        processingTimeoutRef.current = null;
      }, 1000);
    }
  }, [gameState.flippedCards, gameState.difficulty]);

  useEffect(() => {
    return () => {
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
      }
    };
  }, []);

  return {
    gameState,
    startGame,
    flipCard,
    dismissSummary,
    skipToComplete,
    gridSize: getGridSize(gameState.difficulty),
  };
};