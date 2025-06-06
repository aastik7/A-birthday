'use client'

import { useState, useEffect } from 'react'
import StageRouter from '@/components/stages/StageRouter'
import ProgressBar from '@/components/ui/ProgressBar'
import BirthdayTimer from '@/components/ui/BirthdayTimer'
import AudioController, { AudioProvider, useAudioContext } from '@/components/ui/AudioController'
import { stageConfig } from '@/config/stageConfig'
import birthdayConfig from '@/config/birthdayConfig'

function BirthdayExperienceContent() {
  const [currentStageId, setCurrentStageId] = useState(1);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [devToolsVisible, setDevToolsVisible] = useState(false);
  const { playBackgroundMusic, stopBackgroundMusic } = useAudioContext();

  // Check if in development mode (simple check, can be more robust)
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Start background music immediately
  useEffect(() => {
    playBackgroundMusic()
  }, [playBackgroundMusic])

  // Initialize app loading screen
  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Secret keyboard shortcut: Ctrl+Shift+D to toggle dev tools
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'D') {
        event.preventDefault()
        setDevToolsVisible(prev => !prev)
        console.log('Dev tools toggled:', !devToolsVisible ? 'ON' : 'OFF')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [devToolsVisible])

  // Handle stage completion
  const handleStageComplete = (stageId: number) => {
    if (!completedStages.includes(stageId)) {
      setCompletedStages(prev => [...prev, stageId]);
    }
    
    // Move to next stage
    const currentStageIndex = stageConfig.findIndex(stage => stage.id === stageId);
    if (currentStageIndex !== -1 && currentStageIndex < stageConfig.length - 1) {
      const nextStageId = stageConfig[currentStageIndex + 1].id;
      setCurrentStageId(nextStageId);
    } else {
      // Handle end of all stages if necessary, e.g., show a final message or loop
      console.log("All stages completed!");
    }
  };

  // Handle stage navigation
  const handleStageChange = (stageId: number) => {
    setCurrentStageId(stageId)
  }

  // Calculate progress
  const progress = (completedStages.length / stageConfig.length) * 100

  if (isLoading) {
    return (
      <div className="birthday-container">
        <div className="birthday-card">
          <div className="text-center">
            <div className="birthday-title animate-pulse">
              🎉 Loading Birthday Magic... 🎉
            </div>
            <div className="birthday-subtitle">
              Preparing something special for {birthdayConfig.name}
            </div>
            <div className="mt-8">
              <div className="birthday-progress">
                <div className="birthday-progress-bar animate-pulse" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="birthday-container">
      {/* Birthday Timer */}
      <BirthdayTimer />
      
      {/* Audio Controller */}
      <AudioController />
      
      <div className="birthday-card">
        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar 
            progress={progress}
            currentStage={currentStageId}
            totalStages={stageConfig.length}
          />
        </div>

        {/* Stage Content */}
        <StageRouter
          currentStageId={currentStageId}
          onStageComplete={handleStageComplete}
          onStageChange={handleStageChange}
          completedStages={completedStages}
          isDev={devToolsVisible}
        />

        {/* Development Controls */}
        {devToolsVisible && (
          <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
            <button
              onClick={() => {
                if (currentStageId > 1) {
                  setCurrentStageId(currentStageId - 1);
                }
              }}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full shadow-lg"
              title={`DEV: Go Back to Stage ${currentStageId - 1}`}
              disabled={currentStageId <= 1}
            >
              ← Back
            </button>
            <button
              onClick={() => handleStageComplete(currentStageId)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow-lg"
              title={`DEV: Skip Stage ${currentStageId}`}
            >
              Skip →
            </button>
          </div>
        )}

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {stageConfig.map((stage, index) => (
            <button
              key={stage.id}
              onClick={() => handleStageChange(stage.id)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                stage.id === currentStageId
                  ? 'bg-primary shadow-lg scale-125'
                  : completedStages.includes(stage.id)
                  ? 'bg-accent'
                  : 'bg-gray-300'
              } ${stage.id <= Math.max(...completedStages, currentStageId) ? 'cursor-pointer hover:scale-110' : 'cursor-not-allowed opacity-50'}`}
              disabled={stage.id > Math.max(...completedStages, currentStageId)}
              title={`Stage ${index + 1}: ${stage.title.replace(/\{\{name\}\}/g, birthdayConfig.name)}`}
            />
          ))}
        </div>

        {/* Fun Footer */}
        <div className="text-center mt-6 text-sm text-slate-600">
          Made with 💝 for {birthdayConfig.name}'s special day
        </div>
      </div>
    </div>
  )
}

export default function BirthdayExperience() {
  return (
    <AudioProvider>
      <BirthdayExperienceContent />
    </AudioProvider>
  )
}