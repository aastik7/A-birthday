'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import birthdayConfig from '@/config/birthdayConfig'
import { Stage } from '@/config/stageConfig'
import { useBalloonGame } from '@/lib/gameEngine/useBalloonGame'
import { useSoundEffects } from '@/lib/soundEffects'

interface BalloonGameProps {
  stage: Stage
  onComplete: () => void
  onNext: () => void
  isCompleted: boolean
  isDev?: boolean
}

export default function BalloonGame({
  stage,
  onComplete,
  onNext,
  isCompleted,
  isDev = false,
}: BalloonGameProps) {
  const { gameState, startGame, popBalloon, dismissSummary } = useBalloonGame()
  const { buttonClick, confettiPop } = useSoundEffects()

  useEffect(() => {
    if (gameState.isGameComplete && !gameState.showSummary && !isCompleted) {
      onComplete()
    }
  }, [gameState.isGameComplete, gameState.showSummary, isCompleted, onComplete])

  const handleBalloonPop = (balloonId: string) => {
    confettiPop()
    popBalloon(balloonId)
  }

  const handleStartGame = () => {
    buttonClick()
    startGame()
  }

  const handleNext = () => {
    buttonClick()
    dismissSummary()
    onNext()
  }

  const handleSummaryDismiss = () => {
    buttonClick()
    dismissSummary()
  }

  // Intro screen
  if (!gameState.isGameActive && !gameState.isGameComplete && !isCompleted) {
    return (
      <div className="text-center py-8">
        <div className="birthday-title mb-6">🎈 Balloon Pop Challenge! 🎈</div>
        <div className="birthday-text mb-8">
          <p className="mb-4">Ready for some fun, {birthdayConfig.name}?</p>
          <p className="mb-4">Pop as many balloons as you can in 20 seconds!</p>
          <p className="text-sm text-white">Each balloon you pop adds to your life longevity bonus! 🌟</p>
        </div>
        <button
          onClick={handleStartGame}
          className="birthday-button text-xl px-8 py-4"
        >
          Start Popping! 🎈
        </button>
      </div>
    )
  }

  // Game summary screen - show before allowing progression
  if (gameState.showSummary && gameState.isGameComplete) {
    const getPerformanceMessage = (score: number) => {
      if (score >= 20) return { message: "🔥 INCREDIBLE! 🔥", color: "text-purple-600", description: "You're a balloon-popping legend!" }
              if (score >= 15) return { message: "🌟 AMAZING! 🌟", color: "text-green-600", description: "Outstanding reflexes!" }
      if (score >= 10) return { message: "🎯 GREAT JOB! 🎯", color: "text-blue-600", description: "Nice balloon-popping skills!" }
      if (score >= 5) return { message: "👍 WELL DONE! 👍", color: "text-orange-600", description: "Good effort!" }
      return { message: "🎈 NICE TRY! 🎈", color: "text-pink-600", description: "Every balloon counts!" }
    }

    const performance = getPerformanceMessage(gameState.score)

    return (
      <div className="text-center py-8 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 border-2 border-blue-200"
        >
          <div className={`birthday-title mb-6 ${performance.color}`}>
            {performance.message}
          </div>
          
          <div className="birthday-text mb-6">
            <p className="text-2xl font-bold mb-4">
              🎈 {gameState.score} Balloons Popped! 🎈
            </p>
            <p className="text-lg mb-4 text-white">{performance.description}</p>
            <p className="mb-4">
              That's <span className="font-bold text-green-600">+{gameState.score} years</span> of magical life longevity, {birthdayConfig.name}!
            </p>
            <p className="text-sm text-white">
              (This bonus will be revealed in your final celebration!)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div className="bg-white bg-opacity-50 rounded-lg p-3">
              <div className="font-bold text-gray-700">Time Duration</div>
              <div className="text-lg">{20} seconds</div>
            </div>
            <div className="bg-white bg-opacity-50 rounded-lg p-3">
              <div className="font-bold text-gray-700">Balloons Per Second</div>
              <div className="text-lg">{(gameState.score / 20).toFixed(1)}</div>
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
              onClick={handleNext}
              className="birthday-button bg-green-500 hover:bg-green-600 text-lg px-6 py-3"
            >
              Continue Adventure! ➡️
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  // Final completion screen (after summary dismissed)
  if (gameState.isGameComplete || isCompleted) {
    return (
      <div className="text-center py-8">
        <div className="birthday-title mb-6 text-green-600">🎉 Ready to Continue! 🎉</div>
        <div className="birthday-text mb-8">
          <p className="mb-4">Your balloon-popping adventure is complete!</p>
          <p className="text-sm text-gray-600">
            Your {gameState.score} balloon bonus is safely stored for the final celebration! ✨
          </p>
        </div>
        <button
          onClick={handleNext}
          className="birthday-button bg-green-500 hover:bg-green-600 text-xl px-8 py-4"
        >
          Continue Adventure! ➡️
        </button>
      </div>
    )
  }

  // Game playing screen
  return (
    <div className="text-center py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="birthday-subtitle">
          Score: {gameState.score} 🎈
        </div>
        <div className="birthday-subtitle">
          Time: {gameState.timeLeft}s ⏰
        </div>
      </div>

      {/* Game container */}
      <div 
        className="relative bg-gradient-to-b from-blue-200 to-blue-400 rounded-3xl mx-auto"
        style={{ 
          width: '600px', 
          height: '400px',
          maxWidth: '90vw'
        }}
      >
        <AnimatePresence>
          {gameState.balloons.map((balloon) => (
            <motion.button
              key={balloon.id}
              className="absolute border-none bg-transparent cursor-pointer p-0"
              style={{
                left: `${balloon.x}%`,
                top: `${balloon.y}%`,
                width: '60px',
                height: '60px',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                y: [0, -5, 0],
                transition: {
                  scale: { duration: 0.3 },
                  opacity: { duration: 0.3 },
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }
              }}
              exit={{ 
                scale: [1, 1.5, 0], 
                opacity: [1, 1, 0],
                transition: { duration: 0.4 }
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleBalloonPop(balloon.id)}
            >
              <div
                className="w-full h-full rounded-full flex items-center justify-center text-2xl shadow-lg border-2 border-white border-opacity-30"
                style={{
                  backgroundColor: balloon.color,
                  background: `radial-gradient(circle at 30% 30%, ${balloon.color}ee, ${balloon.color})`,
                }}
              >
                🎈
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-6 birthday-text">
        Pop as many balloons as you can! Each one adds to your life bonus! 🌟
      </div>
    </div>
  )
}