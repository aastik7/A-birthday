'use client'

import birthdayConfig from '@/config/birthdayConfig'
import { Stage } from '@/config/stageConfig'

interface TraitsStageProps {
  stage: Stage
  onComplete: () => void
  onNext: () => void
  onPrevious: () => void
  isCompleted: boolean
  canGoNext: boolean
  canGoPrevious: boolean
}

export default function TraitsStage({
  onComplete,
  onNext,
}: TraitsStageProps) {
  const handleContinue = () => {
    onComplete()
    onNext()
  }

  return (
    <div className="text-center py-8">
      <div className="birthday-title mb-6">
        💫 What Makes You Special 💫
      </div>
      <div className="birthday-text mb-8">
        <div className="text-lg mb-4">
          {birthdayConfig.name}, you are absolutely amazing!
        </div>
        <div className="text-md text-white mb-6">
          Here's what makes you extraordinary...
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
        {birthdayConfig.personalTraits.map((trait, index) => (
          <div
            key={trait}
            className="bg-gradient-to-br from-pink-100 to-purple-100 p-6 rounded-xl shadow-lg"
          >
            <div className="text-3xl mb-3">✨</div>
            <div className="font-semibold text-lg capitalize mb-2">{trait}</div>
            <div className="text-sm text-purple-800">
              {birthdayConfig.traitDescriptions[trait] || `Your ${trait} nature makes you absolutely wonderful!`}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <div className="text-lg text-white">
          You bring so much joy to my life! 🌟
        </div>
      </div>

      <button
        onClick={handleContinue}
        className="birthday-button text-xl px-8 py-4"
      >
        Continue Adventure! ➡️
      </button>
    </div>
  )
} 