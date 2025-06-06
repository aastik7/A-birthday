'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMemoryMatch, Card as MemoryCardType } from '@/lib/gameEngine/useMemoryMatch';
import birthdayConfig from '@/config/birthdayConfig';
import { Stage } from '@/config/stageConfig';
import { icons, HelpCircle } from 'lucide-react';
import { specialEffects } from '@/lib/animations';

// Helper to get a Lucide icon component by name
const LucideIcon = ({ name, ...props }: { name: string; [key: string]: any }) => {
  const IconComponent = icons[name as keyof typeof icons] || HelpCircle;
  return <IconComponent {...props} />;
};

interface MemoryGameProps {
  stage: Stage;
  onComplete: () => void;
  onNext: () => void;
  isCompleted: boolean;
  isDev?: boolean;
}

export default function MemoryGame({
  stage,
  onComplete,
  onNext,
  isCompleted,
  isDev = false,
}: MemoryGameProps) {
  const difficulty = 'medium' as const; // Default difficulty for memory game
  const { gameState, startGame, flipCard, dismissSummary, skipToComplete, gridSize } = useMemoryMatch(difficulty);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!isCompleted) {
      startGame();
    }
  }, [startGame, isCompleted]);

  const handleCardClick = (cardId: string) => {
    // Add additional validation in the component
    if (gameState.isGameActive && 
        !gameState.isProcessing && 
        gameState.flippedCards.length < 2 &&
        !gameState.cards.find(c => c.id === cardId)?.isMatched &&
        !gameState.cards.find(c => c.id === cardId)?.isFlipped) {
      flipCard(cardId);
    }
  };

  const CardComponent = ({ card }: { card: MemoryCardType }) => {
    const isClickable = gameState.isGameActive && 
                       !gameState.isProcessing && 
                       !card.isMatched && 
                       !card.isFlipped &&
                       gameState.flippedCards.length < 2;

    return (
      <div className="w-full h-full perspective">
        <motion.div
          className={`relative w-full h-full preserve-3d ${
            isClickable ? 'cursor-pointer' : 'cursor-not-allowed'
          }`}
          onClick={() => handleCardClick(card.id)}
          animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            pointerEvents: isClickable ? 'auto' : 'none'
          }}
        >
          {/* Card Back */}
          <div className="absolute w-full h-full rounded-lg bg-slate-800 border-2 border-slate-700 shadow-lg backface-hidden flex items-center justify-center">
            <div className="w-full h-full rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
              <div className="text-2xl font-bold text-slate-600">?</div>
            </div>
          </div>

          {/* Card Front */}
          <div 
            className={`absolute w-full h-full rounded-lg ${
              card.isMatched ? 'bg-green-500' : 'bg-pink-500'
            } border-2 ${
              card.isMatched ? 'border-green-400' : 'border-pink-400'
            } shadow-lg backface-hidden rotate-y-180 flex items-center justify-center`}
          >
            <div className="text-white">
              {card.content && <LucideIcon name={card.content} size={36} />}
            </div>
          </div>
        </motion.div>
      </div>
    );
  };
  
  useEffect(() => {
    if (gameState.isGameComplete && !gameState.showSummary && !isCompleted) {
      onComplete();
    }
  }, [gameState.isGameComplete, gameState.showSummary, isCompleted, onComplete]);

  // Game summary screen - show before allowing progression
  if (gameState.showSummary && gameState.isGameComplete) {
    const getPerformanceRating = (attempts: number, pairs: number) => {
      const efficiency = pairs / attempts;
      if (efficiency >= 0.8) return { rating: "🏆 PERFECT!", color: "text-purple-600", description: "Incredible memory skills!" };
      if (efficiency >= 0.6) return { rating: "⭐ EXCELLENT!", color: "text-green-600", description: "Outstanding performance!" };
      if (efficiency >= 0.4) return { rating: "🎯 GREAT JOB!", color: "text-blue-600", description: "Well done!" };
      if (efficiency >= 0.3) return { rating: "👍 GOOD WORK!", color: "text-orange-600", description: "Nice effort!" };
      return { rating: "🧠 COMPLETED!", color: "text-pink-600", description: "Every attempt counts!" };
    }

    const performance = getPerformanceRating(gameState.attempts, gridSize.pairs);

    return (
      <div className="text-center py-8 max-w-2xl mx-auto">
        {/* Confetti Effect */}
        <AnimatePresence>
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none z-50">
              {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: ['#FF6B8B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'][i % 6],
                    left: Math.random() * window.innerWidth,
                    top: -20
                  }}
                  variants={specialEffects.confetti}
                  initial="initial"
                  animate="animate"
                  custom={i}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl p-8 border-2 border-green-200"
        >
          <div className={`birthday-title mb-6 ${performance.color}`}>
            {performance.rating}
          </div>
          
          <div className="birthday-text mb-6">
            <p className="text-2xl font-bold mb-4">
              🧠 Memory Challenge Complete! 🧠
            </p>
            <p className="text-lg mb-4 text-white">{performance.description}</p>
            <p className="mb-4">
              You found all <span className="font-bold text-green-600">{gridSize.pairs} pairs</span> in just <span className="font-bold text-blue-600">{gameState.attempts} attempts</span>, {birthdayConfig.name}!
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
            <div className="bg-white bg-opacity-50 rounded-lg p-3">
              <div className="font-bold text-gray-700">Pairs Found</div>
              <div className="text-lg">{gameState.matches}/{gridSize.pairs}</div>
            </div>
            <div className="bg-white bg-opacity-50 rounded-lg p-3">
              <div className="font-bold text-gray-700">Total Attempts</div>
              <div className="text-lg">{gameState.attempts}</div>
            </div>
            <div className="bg-white bg-opacity-50 rounded-lg p-3">
              <div className="font-bold text-gray-700">Efficiency</div>
              <div className="text-lg">{Math.round((gridSize.pairs / gameState.attempts) * 100)}%</div>
            </div>
          </div>

          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => {
                dismissSummary();
                startGame(); // Restart the game
              }}
              className="birthday-button bg-orange-500 hover:bg-orange-600 text-lg px-6 py-3"
            >
              Try Again! 🔄
            </button>
            <button
              onClick={() => {
                dismissSummary();
                onNext();
              }}
              className="birthday-button bg-green-500 hover:bg-green-600 text-lg px-6 py-3"
            >
              Continue Adventure! ➡️
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  // Initial state or if already completed
  if ((!gameState.isGameActive && !gameState.isGameComplete && !isCompleted) || (isCompleted && !gameState.isGameActive)) {
    const title = isCompleted ? "🎉 Already Conquered! 🎉" : "🧠 Memory Match Game 🧠";
    const text = isCompleted ? `You masterfully matched all pairs, ${birthdayConfig.name}!` : `Find all ${gridSize.pairs} matching pairs!`;
    const buttonText = isCompleted ? "Continue Your Adventure! ➡️" : "Start Game";
    const buttonAction = isCompleted ? onNext : startGame;

    return (
      <div className="text-center py-8 flex flex-col items-center justify-center min-h-[450px]">
        <div className={`birthday-title mb-6 ${isCompleted ? 'text-green-700' : ''}`}>{title}</div>
        <div className={`birthday-text mb-4 ${isCompleted ? 'text-green-600' : ''}`}>
          {!isCompleted && <p>Difficulty: <span className='capitalize'>{gameState.difficulty}</span></p>}
          <p className="mt-2">{text}</p>
        </div>
        <button
          onClick={buttonAction}
          className={`birthday-button text-xl px-8 py-4 mt-4 ${isCompleted ? 'bg-green-500 hover:bg-green-600' : ''}`}
        >
          {buttonText}
        </button>
      </div>
    );
  }

  return (
    <div className="text-center py-4 sm:py-8 flex flex-col items-center min-h-[450px] w-full max-w-2xl mx-auto px-2 sm:px-0">
      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ['#FF6B8B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'][i % 6],
                  left: Math.random() * window.innerWidth,
                  top: -20
                }}
                variants={specialEffects.confetti}
                initial="initial"
                animate="animate"
                custom={i}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="birthday-title mb-2">
        🧠 Memory Match Game 🧠
      </div>
      <div className="birthday-text mb-6 bg-slate-800 bg-opacity-80 p-2 rounded-lg">
        <p>Matches: <span className='font-bold'>{gameState.matches}</span> / {gridSize.pairs} | Attempts: <span className='font-bold'>{gameState.attempts}</span></p>
      </div>

      {/* Development skip button */}
      {gameState.isGameActive && isDev && (
        <div className="mb-4">
          <button
            onClick={() => {
              // Simulate winning the game for development
              skipToComplete();
            }}
            className="birthday-button bg-yellow-500 hover:bg-yellow-600 text-sm px-4 py-2"
          >
            🚀 Skip Game (Dev) 
          </button>
        </div>
      )}

      <div 
        className="grid gap-3 p-4 bg-slate-900 bg-opacity-70 rounded-xl shadow-inner w-full"
        style={{ 
          gridTemplateColumns: `repeat(${gridSize.cols}, minmax(0, 1fr))`,
          maxWidth: `${gridSize.cols * 80}px`,
          margin: '0 auto'
        }}
      >
        {gameState.cards.map((card) => (
          <div key={card.id} className="aspect-square w-full">
            <CardComponent card={card} />
          </div>
        ))}
      </div>

      {gameState.isGameComplete && (
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "backOut" }}
          className="mt-8 p-6 bg-gradient-to-br from-green-100 to-green-200 rounded-xl shadow-2xl w-full max-w-md border-2 border-green-300"
        >
          <motion.div 
            className="text-4xl font-bold text-green-700 mb-3"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.6, repeat: 2 }}
          >
            🎉 AMAZING! 🎉
          </motion.div>
          <div className="text-lg text-green-600 mb-4">
            Fantastic work, {birthdayConfig.name}! You found all pairs in just {gameState.attempts} attempts!
          </div>
          <motion.button
            onClick={onNext}
            className="birthday-button bg-green-500 hover:bg-green-600 text-xl px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue Your Journey! ✨➡️
          </motion.button>
        </motion.div>
      )}

      <style jsx global>{`
        .perspective {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}

// Add these utility classes to your globals.css or a relevant CSS file if they don't exist
/*
.perspective {
  perspective: 1000px;
}
.preserve-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}
*/