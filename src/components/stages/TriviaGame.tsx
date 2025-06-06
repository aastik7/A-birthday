'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Stage } from '@/config/stageConfig'
import birthdayConfig from '@/config/birthdayConfig'
import { useSoundEffects } from '@/lib/soundEffects'

interface TriviaQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

interface TriviaGameProps {
  stage: Stage
  onComplete: () => void
  onNext: () => void
  onPrevious: () => void
  isCompleted: boolean
  canGoNext: boolean
  canGoPrevious: boolean
  isDev?: boolean
}

// Use trivia questions from birthdayConfig
const TRIVIA_QUESTIONS: TriviaQuestion[] = birthdayConfig.triviaQuestions.map((q, index) => ({
  id: index + 1,
  question: q.question,
  options: q.options,
  correctAnswer: q.correctAnswer
}))

export default function TriviaGame({
  onComplete,
  onNext,
  isCompleted,
  isDev = false
}: TriviaGameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'complete'>('intro')
  const [showFeedback, setShowFeedback] = useState(false)
  const [answersRecord, setAnswersRecord] = useState<{questionId: number, correct: boolean, selectedOption: string, correctOption: string}[]>([])
  
  const { buttonClick, matchSuccess, gameComplete } = useSoundEffects()

  const currentQuestion = TRIVIA_QUESTIONS[currentQuestionIndex]
  const totalQuestions = TRIVIA_QUESTIONS.length
  const requiredScore = 3 // Need to get more than 3 correct

  // Remove auto-completion - let user decide when to continue
  // useEffect(() => {
  //   if (gameState === 'complete' && !isCompleted && score > requiredScore) {
  //     onComplete()
  //   }
  // }, [gameState, isCompleted, onComplete, score, requiredScore])

  const handleStartGame = () => {
    buttonClick()
    setCurrentQuestionIndex(0)
    setScore(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setShowFeedback(false)
    setAnswersRecord([])
    setGameState('playing')
  }

  const handleRetry = () => {
    buttonClick()
    // Reset all game state completely
    setCurrentQuestionIndex(0)
    setScore(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setShowFeedback(false)
    setAnswersRecord([])
    setGameState('intro') // Go back to intro to restart properly
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return

    buttonClick()
    setSelectedAnswer(answerIndex)
    setIsAnswered(true)
    setShowFeedback(true)

    const isCorrect = answerIndex === currentQuestion.correctAnswer
    if (isCorrect) {
      setScore(prev => prev + 1)
      matchSuccess()
    }

    // Record the answer for detailed summary
    setAnswersRecord(prev => [...prev, {
      questionId: currentQuestion.id,
      correct: isCorrect,
      selectedOption: currentQuestion.options[answerIndex],
      correctOption: currentQuestion.options[currentQuestion.correctAnswer]
    }])

    // Show feedback for 2 seconds then move to next question
    setTimeout(() => {
      setShowFeedback(false)
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
        setSelectedAnswer(null)
        setIsAnswered(false)
      } else {
        // Game complete
        gameComplete()
        setGameState('complete')
      }
    }, 2000)
  }

  const handleNext = () => {
    buttonClick()
    onComplete() // Mark stage as complete
    onNext() // Move to next stage
  }

  // Intro screen
  if (gameState === 'intro') {
    return (
      <div className="text-center py-8 max-w-2xl mx-auto">
        <div className="birthday-title mb-6">🎯 Birthday Trivia Challenge! 🎯</div>
        <div className="birthday-text mb-8">
          <p className="mb-4">Ready to test your knowledge about {birthdayConfig.name}?</p>
          <p className="mb-6">Answer 5 questions about our birthday star!</p>
          
          <div className="bg-purple-300 border-2 border-purple-400 rounded-xl p-6 mb-6">
            <div className="text-lg font-bold text-white mb-3">
              ⚠️ Important Challenge Rules! ⚠️
            </div>
            <div className="text-white">
              <p className="mb-2">
                You must score <span className="font-bold text-xl text-white">MORE than {requiredScore} correct answers</span> to unlock the next adventure!
              </p>
              <p className="text-sm">
                Choose wisely, {birthdayConfig.name}! Each question reveals something special about you! ✨
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={handleStartGame}
          className="birthday-button text-xl px-8 py-4"
        >
          Accept Challenge! 🧠✨
        </button>
      </div>
    )
  }

  // Game complete screen with detailed summary
  if (gameState === 'complete' || isCompleted) {
    const passed = score > requiredScore
    return (
      <div className="text-center py-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`rounded-3xl p-8 border-2 ${
            passed 
              ? 'bg-gradient-to-br from-green-100 to-emerald-100 border-green-200' 
              : 'bg-gradient-to-br from-orange-100 to-yellow-100 border-orange-200'
          }`}
        >
          <div className={`birthday-title mb-6 ${passed ? 'text-green-600' : 'text-orange-600'}`}>
            {passed ? '🎉 Challenge Conquered! 🎉' : '🤔 Valiant Effort! 🤔'}
          </div>
          
          <div className="birthday-text mb-8">
            <p className="text-2xl font-bold mb-4">
              🎯 Final Score: {score}/{totalQuestions} 🎯
            </p>
            {passed ? (
              <>
                <p className="mb-4 text-lg font-bold text-green-600">
                  Outstanding, {birthdayConfig.name}! You really know yourself well! ⭐
                </p>
                <p className="text-green-700 mb-6">
                  Your excellent knowledge has unlocked the next adventure!
                </p>
              </>
            ) : (
              <>
                <p className="mb-4 text-lg font-bold text-orange-600">
                  Good effort, {birthdayConfig.name}! Every answer revealed something wonderful! 🎊
                </p>
                <p className="text-orange-700 mb-6">
                  Let's continue the celebration - there's so much more to discover!
                </p>
              </>
            )}
          </div>

          {/* Answer Review */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-gray-800">📝 Your Answer Review</h3>
            <div className="grid gap-3 text-left">
              {TRIVIA_QUESTIONS.map((question, index) => {
                const answer = answersRecord.find(a => a.questionId === question.id)
                if (!answer) return null
                
                return (
                  <div key={question.id} className={`p-4 rounded-lg border-2 ${
                    answer.correct 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">
                        {answer.correct ? '✅' : '❌'}
                      </span>
                      <span className="font-bold text-sm text-gray-600">
                        Question {index + 1}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{question.question}</p>
                    <div className="text-xs">
                      <p className={answer.correct ? 'text-green-700' : 'text-red-700'}>
                        <span className="font-bold">Your answer:</span> {answer.selectedOption}
                      </p>
                      {!answer.correct && (
                        <p className="text-green-700">
                          <span className="font-bold">Correct answer:</span> {answer.correctOption}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Performance Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8 text-sm">
            <div className="bg-white bg-opacity-50 rounded-lg p-3">
              <div className="font-bold text-gray-700">Correct Answers</div>
              <div className="text-2xl font-bold text-green-600">{score}</div>
            </div>
            <div className="bg-white bg-opacity-50 rounded-lg p-3">
              <div className="font-bold text-gray-700">Accuracy</div>
              <div className="text-2xl font-bold text-blue-600">{Math.round((score/totalQuestions)*100)}%</div>
            </div>
            <div className="bg-white bg-opacity-50 rounded-lg p-3">
              <div className="font-bold text-gray-700">Challenge Status</div>
              <div className={`text-lg font-bold ${passed ? 'text-green-600' : 'text-orange-600'}`}>
                {passed ? 'PASSED! ✅' : 'KEEP GOING! 💪'}
              </div>
            </div>
          </div>

          {passed ? (
            <button
              onClick={handleNext}
              className="birthday-button text-xl px-8 py-4 bg-green-500 hover:bg-green-600"
            >
              Continue Adventure! ➡️
            </button>
          ) : (
            <button
              onClick={handleRetry}
              className="birthday-button text-xl px-8 py-4 bg-orange-500 hover:bg-orange-600"
            >
              Try Again! 🔄
            </button>
          )}
        </motion.div>
      </div>
    )
  }

  // Playing the game
  return (
    <div className="text-center py-8 max-w-2xl mx-auto">
      <div className="birthday-title mb-4">🎯 Question {currentQuestionIndex + 1} of {totalQuestions}</div>
      
      <div className="mb-6 bg-slate-800 bg-opacity-80 p-3 rounded-lg">
        <div className="flex justify-between items-center text-sm">
          <span>Score: {score}/{totalQuestions}</span>
          <span>Progress: {Math.round((currentQuestionIndex / totalQuestions) * 100)}%</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="birthday-text mb-8 text-lg font-semibold">
            {currentQuestion.question}
          </div>

          <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
            {currentQuestion.options.map((option, index) => {
              let buttonClass = "birthday-button text-left p-4 transition-all duration-200"
              
              if (showFeedback && isAnswered) {
                if (index === currentQuestion.correctAnswer) {
                  buttonClass += " bg-green-500 hover:bg-green-600 text-white"
                } else if (index === selectedAnswer) {
                  buttonClass += " bg-red-500 hover:bg-red-600 text-white"
                                 } else {
                   buttonClass += " bg-gray-400 text-white cursor-not-allowed"
                 }
              } else if (selectedAnswer === index) {
                buttonClass += " bg-blue-500 hover:bg-blue-600"
              }

              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={isAnswered}
                  className={buttonClass}
                  whileHover={!isAnswered ? { scale: 1.02 } : {}}
                  whileTap={!isAnswered ? { scale: 0.98 } : {}}
                >
                  {option}
                </motion.button>
              )
            })}
          </div>

          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-lg"
            >
              {selectedAnswer === currentQuestion.correctAnswer ? (
                <div className="text-green-600 font-bold text-lg">
                  🎉 Correct! Great job! 🎉
                </div>
              ) : (
                <div className="text-orange-600 font-bold text-lg">
                  🤔 Not quite! The answer was: {currentQuestion.options[currentQuestion.correctAnswer]}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
} 