'use client'

import { motion } from 'framer-motion'
import { progressAnimations } from '@/lib/animations'

interface ProgressBarProps {
  progress: number
  currentStage: number
  totalStages: number
}

export default function ProgressBar({ 
  progress, 
  currentStage, 
  totalStages 
}: ProgressBarProps) {
  return (
    <div className="w-full">
      {/* Progress Text */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-white">
          Stage {currentStage} of {totalStages}
        </span>
        <span className="text-sm font-medium text-white">
          {Math.round(progress)}% Complete
        </span>
      </div>

      {/* Progress Bar */}
      <div className="birthday-progress">
        <motion.div
          className="birthday-progress-bar"
          variants={progressAnimations.progressBar}
          initial="initial"
          animate="animate"
          custom={progress}
        />
      </div>

      {/* Stage Labels */}
      <div className="flex justify-between mt-2 text-xs text-white opacity-80">
        <span>Welcome</span>
        <span className="text-center">Games & Memories</span>
        <span>Celebration!</span>
      </div>
    </div>
  )
} 