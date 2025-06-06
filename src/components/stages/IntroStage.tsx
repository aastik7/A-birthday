'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { containerAnimations, textAnimations, specialEffects } from '@/lib/animations'
import birthdayConfig from '@/config/birthdayConfig'
import { Stage } from '@/config/stageConfig'

interface IntroStageProps {
  stage: Stage
  onComplete: () => void
  onNext: () => void
  onPrevious: () => void
  isCompleted: boolean
  canGoNext: boolean
  canGoPrevious: boolean
}

export default function IntroStage({
  stage,
  onComplete,
  onNext,
  isCompleted,
}: IntroStageProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [showSparkles, setShowSparkles] = useState(false)

  const textBlocks = stage.config?.textBlocks || [
    "Welcome to your special day!",
    "Let's make this birthday unforgettable!"
  ]

  // Replace placeholders in text
  const processText = (text: string) => {
    return text
      .replace(/\{\{name\}\}/g, birthdayConfig.name)
      .replace(/\{\{hobby\}\}/g, birthdayConfig.hobbies[0] || 'adventure')
      .replace(/\{\{trait\}\}/g, birthdayConfig.personalTraits[0] || 'amazing')
  }

  // Auto-advance through text blocks
  useEffect(() => {
    if (currentTextIndex < textBlocks.length - 1) {
      const timer = setTimeout(() => {
        setCurrentTextIndex(prev => prev + 1)
      }, 3000)
      return () => clearTimeout(timer)
    } else {
      // Show sparkles when all text is shown
      const sparkleTimer = setTimeout(() => {
        setShowSparkles(true)
      }, 1000)
      return () => clearTimeout(sparkleTimer)
    }
  }, [currentTextIndex, textBlocks.length])

  const handleGetStarted = () => {
    onComplete()
    onNext()
  }

  return (
    <div className="text-center py-8 relative overflow-hidden">
      {/* Sparkle Effects */}
      {showSparkles && (
        <>
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="sparkle absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              variants={specialEffects.sparkle}
              initial="initial"
              animate="animate"
            />
          ))}
        </>
      )}

      {/* Main Title */}
      <motion.div
        className="birthday-title"
        variants={textAnimations.fadeInUp}
        initial="initial"
        animate="animate"
      >
        {processText(stage.title)}
      </motion.div>

      {/* Text Blocks Container */}
      <motion.div
        className="space-y-6 mb-8"
        variants={containerAnimations.stagger}
        initial="initial"
        animate="animate"
      >
        {textBlocks.slice(0, currentTextIndex + 1).map((text, index) => (
          <motion.div
            key={index}
            className="birthday-text text-lg"
            variants={textAnimations.fadeInUp}
            initial="initial"
            animate="animate"
          >
            {processText(text)}
          </motion.div>
        ))}
      </motion.div>

      {/* Personality Highlights */}
      {currentTextIndex >= textBlocks.length - 1 && (
        <motion.div
          className="mb-8"
          variants={textAnimations.fadeInUp}
          initial="initial"
          animate="animate"
        >
          <div className="birthday-subtitle mb-4">
            What makes you special, {birthdayConfig.name}:
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {birthdayConfig.personalTraits.slice(0, 3).map((trait, index) => (
              <motion.span
                key={trait}
                className="px-4 py-2 bg-gradient-birthday text-white rounded-full text-sm font-medium"
                variants={textAnimations.fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: index * 0.2 }}
              >
                ✨ {trait}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Get Started Button */}
      {currentTextIndex >= textBlocks.length - 1 && (
        <motion.div
          variants={textAnimations.fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={handleGetStarted}
            className="birthday-button text-xl px-12 py-4"
          >
            {isCompleted ? "Let's Continue! 🎉" : "Let's Begin! 🚀"}
          </button>
        </motion.div>
      )}

      {/* Fun Messages */}
      <motion.div
        className="mt-8 text-sm text-gray-600"
        variants={textAnimations.fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 1 }}
      >
        <div className="space-y-2">
          <div>🎮 Fun games ahead</div>
          <div>📸 Beautiful memories to explore</div>
          <div>🎂 A special surprise waiting</div>
        </div>
      </motion.div>
    </div>
  )
} 