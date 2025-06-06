'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { specialEffects, textAnimations } from '@/lib/animations'
import birthdayConfig from '@/config/birthdayConfig'
import { Stage } from '@/config/stageConfig'
import { useSound } from '@/lib/useSound'; // Import the new hook

interface CakeStageProps {
  stage: Stage
  onComplete: () => void
  onNext: () => void
  onPrevious: () => void
  isCompleted: boolean
  canGoNext: boolean
  canGoPrevious: boolean
}

export default function CakeStage({
  stage,
  onComplete,
  onNext,
}: CakeStageProps) {
  const [candlesBlown, setCandlesBlown] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [confetti, setConfetti] = useState<number[]>([])
  const [showFireworks, setShowFireworks] = useState(false)

  const playConfettiSound = useSound('/sounds/confetti.mp3');
  const playButtonClickSound = useSound('/sounds/button-click.mp3');

  const age = birthdayConfig.age || 25
  const candles = Array.from({ length: Math.min(age, 10) }, (_, i) => i)

  const handleBlowCandles = () => {
    setCandlesBlown(true)
    playButtonClickSound(); // Play click sound
    
    // Play firework soundtrack
    const fireworkAudio = new Audio('/audio/fireworks-soundtrack.mp3')
    fireworkAudio.volume = 0.6
    fireworkAudio.play().catch(e => console.log('Audio autoplay prevented:', e))
    
    // Trigger celebration after a short delay
    setTimeout(() => {
      setShowCelebration(true)
      setShowFireworks(true)
      playConfettiSound(); // Play confetti sound
      
      // Generate confetti
      const confettiPieces = Array.from({ length: 30 }, (_, i) => i)
      setConfetti(confettiPieces)
      
      // Stop fireworks after 5 seconds
      setTimeout(() => setShowFireworks(false), 5000)
      
      // Complete stage after celebration
      setTimeout(() => {
        onComplete()
      }, 2000)
    }, 1000)
  }

  const handleContinue = () => {
    playButtonClickSound(); // Play click sound
    onNext()
  }

  return (
    <div className="text-center py-8 relative overflow-hidden">
      {/* Fireworks Animation */}
      {showFireworks && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`firework-${i}`}
              className="absolute"
              style={{
                left: Math.random() * 100 + '%',
                top: Math.random() * 60 + 20 + '%',
                fontSize: Math.random() * 30 + 40 + 'px',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1.5, 0],
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 1 + Math.random() * 1.5,
                delay: i * 0.2,
                repeat: 3,
                ease: "easeOut"
              }}
            >
              {['🎆', '✨', '🎇', '💥', '⭐'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
          
          {/* Additional sparkle effects */}
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute"
              style={{
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                fontSize: Math.random() * 15 + 15 + 'px',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0],
                y: -100,
                x: Math.random() * 200 - 100,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: i * 0.1,
                repeat: 2,
                ease: "easeOut"
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>
      )}

      {/* Confetti */}
      {showCelebration && confetti.map((i) => (
        <motion.div
          key={i}
          className="confetti absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-50px`,
            backgroundColor: i % 2 === 0 ? '#FF6B8B' : '#FFE66D'
          }}
          variants={specialEffects.confetti}
          initial="initial"
          animate="animate"
          custom={i}
        />
      ))}

      {/* Title */}
      <motion.div
        className="birthday-title mb-8"
        variants={textAnimations.fadeInUp}
        initial="initial"
        animate="animate"
      >
        🎂 Happy Birthday {birthdayConfig.name}! 🎂
      </motion.div>

      {/* Cake */}
      <motion.div
        className="relative inline-block mb-8"
        variants={textAnimations.fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.3 }}
      >
        <div className="text-8xl mb-4">🎂</div>
        
        {/* Candles */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {candles.map((i) => (
            <motion.div
              key={i}
              className="text-2xl"
              animate={candlesBlown ? { scale: 0, opacity: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              🕯️
            </motion.div>
          ))}
        </div>

        {/* Blown candles effect */}
        {candlesBlown && (
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 text-4xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            💨
          </motion.div>
        )}
      </motion.div>

      {/* Birthday Message */}
      <motion.div
        className="birthday-text mb-8 max-w-2xl mx-auto"
        variants={textAnimations.fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.6 }}
      >
        <div className="text-xl mb-4">
          Make a wish, {birthdayConfig.name}! ✨
        </div>
        <div className="text-lg text-gray-600">
          {candlesBlown 
            ? "Your wish has been sent to the universe! 🌟" 
            : "Close your eyes, make a wish, and blow out the candles!"
          }
        </div>
      </motion.div>

      {/* Interactive Elements */}
      {!candlesBlown ? (
        <motion.button
          onClick={handleBlowCandles} // Sound is now played inside handleBlowCandles
          className="birthday-button text-xl px-12 py-4"
          variants={textAnimations.fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Blow Out Candles! 💨
        </motion.button>
      ) : showCelebration ? (
        <motion.div
          variants={textAnimations.fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 1.2 }}
        >
          <div className="birthday-subtitle mb-6 text-green-600">
            🎉 Happy Birthday! 🎉
          </div>
          <div className="mb-6 text-lg">
            Hope all your wishes come true this year! 🌈
          </div>
          <button
            onClick={handleContinue} // Sound is now played inside handleContinue
            className="birthday-button text-xl px-8 py-4"
          >
            Continue Celebration! 🎊
          </button>
        </motion.div>
      ) : (
        <motion.div
          className="text-lg text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Making your wish come true... ✨
        </motion.div>
      )}

      {/* Birthday Facts */}
      <motion.div
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        variants={textAnimations.fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 1.5 }}
      >
        <div className="text-center p-4 bg-pink-50 rounded-xl">
          <div className="text-3xl mb-2">🎈</div>
          <div className="font-semibold">Age</div>
          <div className="text-lg">{age} years amazing!</div>
        </div>
        <div className="text-center p-4 bg-yellow-50 rounded-xl">
          <div className="text-3xl mb-2">🌟</div>
          <div className="font-semibold">Special Trait</div>
          <div className="text-lg">{birthdayConfig.personalTraits[0]}</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-xl">
          <div className="text-3xl mb-2">🎯</div>
          <div className="font-semibold">Passion</div>
          <div className="text-lg">{birthdayConfig.hobbies[0]}</div>
        </div>
      </motion.div>
    </div>
  )
}