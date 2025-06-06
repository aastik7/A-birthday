'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { stageConfig, getStageById } from '@/config/stageConfig'
import { stageTransitions } from '@/lib/animations'
import { useSoundEffects } from '@/lib/soundEffects'; // Updated import
import { useEffect } from 'react'; // Add missing useEffect import

// Dynamic imports for stage components
import IntroStage from './IntroStage'
import BalloonGame from './BalloonGame'
import MemoryStage from './MemoryStage'
import MemoryGame from './MemoryGame'
import TraitsStage from './TraitsStage'
import TriviaGame from './TriviaGame'
import CakeStage from './CakeStage'
import WishesStage from './WishesStage'

interface StageRouterProps {
  currentStageId: number
  onStageComplete: (stageId: number) => void
  onStageChange: (stageId: number) => void
  completedStages: number[]
  isDev?: boolean
}

// Component mapping for dynamic rendering
const stageComponents = {
  IntroStage,
  BalloonGame,
  MemoryStage,
  MemoryGame,
  TraitsStage,
  TriviaGame,
  CakeStage,
  WishesStage,
}

export default function StageRouter({
  currentStageId,
  onStageComplete,
  onStageChange,
  completedStages,
  isDev = false,
}: StageRouterProps) {
  const currentStage = getStageById(currentStageId);
  const { buttonClick, stageTransition } = useSoundEffects();
  
  // Add this effect to play stage transition sound
  useEffect(() => {
    stageTransition();
  }, [currentStageId, stageTransition]);

  if (!currentStage) {
    return (
      <div className="text-center py-12">
        <div className="birthday-title text-red-500">
          Stage Not Found! 🚫
        </div>
        <div className="birthday-text mt-4">
          The requested stage could not be found. Please check your stage configuration.
        </div>
        <button
          onClick={() => {
            buttonClick();
            onStageChange(1);
          }}
          className="birthday-button mt-6"
        >
          Go to Start
        </button>
      </div>
    )
  }

  // Get the component for the current stage
  const StageComponent = stageComponents[currentStage.component as keyof typeof stageComponents]

  if (!StageComponent) {
    return (
      <div className="text-center py-12">
        <div className="birthday-title text-yellow-500">
          Component Not Implemented! ⚠️
        </div>
        <div className="birthday-text mt-4">
          The component &quot;{currentStage.component}&quot; has not been implemented yet.
        </div>
        <div className="mt-6 space-x-4">
          {currentStageId > 1 && (
            <button
              onClick={() => {
                buttonClick();
                onStageChange(currentStageId - 1);
              }}
              className="birthday-button bg-gray-500"
            >
              Previous Stage
            </button>
          )}
          <button
            onClick={() => {
              buttonClick();
              onStageComplete(currentStageId);
            }}
            className="birthday-button"
          >
            Skip This Stage
          </button>
        </div>
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStageId}
        variants={stageTransitions}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full"
      >
        <StageComponent
          stage={currentStage}
          onComplete={() => onStageComplete(currentStageId)}
          onNext={() => {
            buttonClick();
            const nextStageId = currentStageId + 1;
            if (nextStageId <= stageConfig.length) {
              onStageChange(nextStageId);
            }
          }}
          onPrevious={() => {
            buttonClick();
            const prevStageId = currentStageId - 1;
            if (prevStageId >= 1) {
              onStageChange(prevStageId);
            }
          }}
          isCompleted={completedStages.includes(currentStageId)}
          canGoNext={currentStageId < stageConfig.length}
          canGoPrevious={currentStageId > 1}
          isDev={isDev}
        />
      </motion.div>
    </AnimatePresence>
  );
}