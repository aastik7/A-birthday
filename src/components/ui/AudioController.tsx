'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { motion } from 'framer-motion'

interface AudioContextType {
  isMuted: boolean
  isAudioBlocked: boolean
  hasUserInteracted: boolean
  toggleMute: () => void
  playBackgroundMusic: () => void
  stopBackgroundMusic: () => void
}

const AudioContext = createContext<AudioContextType | null>(null)

export const useAudioContext = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudioContext must be used within AudioProvider')
  }
  return context
}

interface AudioProviderProps {
  children: React.ReactNode
}

export function AudioProvider({ children }: AudioProviderProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [backgroundAudio, setBackgroundAudio] = useState<HTMLAudioElement | null>(null)
  const [isAudioBlocked, setIsAudioBlocked] = useState(true)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)

  useEffect(() => {
    // Create background audio
    const audio = new Audio('/audio/background-soundtrack.mp3')
    audio.loop = true
    audio.volume = 0.3
    setBackgroundAudio(audio)

    // Handle first user interaction to enable audio
    const handleFirstInteraction = () => {
      setHasUserInteracted(true)
      if (!isMuted) {
        audio.play()
          .then(() => {
            setIsAudioBlocked(false)
            console.log('Background music started after user interaction')
          })
          .catch(e => {
            console.log('Audio still blocked:', e)
            setIsAudioBlocked(true)
          })
      }
    }

    // Listen for any user interaction
    const events = ['click', 'touch', 'keydown', 'mousedown']
    events.forEach(event => {
      document.addEventListener(event, handleFirstInteraction, { once: true })
    })

    return () => {
      if (audio) {
        audio.pause()
        audio.src = ''
      }
      events.forEach(event => {
        document.removeEventListener(event, handleFirstInteraction)
      })
    }
  }, [isMuted])

  const toggleMute = () => {
    setIsMuted(prev => {
      const newMuted = !prev
      if (backgroundAudio) {
        if (newMuted) {
          backgroundAudio.pause()
        } else if (hasUserInteracted) {
          backgroundAudio.play()
            .then(() => setIsAudioBlocked(false))
            .catch(e => {
              console.log('Audio autoplay prevented:', e)
              setIsAudioBlocked(true)
            })
        }
      }
      return newMuted
    })
  }

  const playBackgroundMusic = () => {
    if (backgroundAudio && !isMuted) {
      if (hasUserInteracted) {
        backgroundAudio.play()
          .then(() => setIsAudioBlocked(false))
          .catch(e => {
            console.log('Audio autoplay prevented:', e)
            setIsAudioBlocked(true)
          })
      } else {
        setIsAudioBlocked(true)
      }
    }
  }

  const stopBackgroundMusic = () => {
    if (backgroundAudio) {
      backgroundAudio.pause()
      backgroundAudio.currentTime = 0
    }
  }

  return (
    <AudioContext.Provider value={{ 
      isMuted, 
      isAudioBlocked, 
      hasUserInteracted, 
      toggleMute, 
      playBackgroundMusic, 
      stopBackgroundMusic 
    }}>
      {children}
    </AudioContext.Provider>
  )
}

export default function AudioController() {
  const { isMuted, isAudioBlocked, hasUserInteracted, toggleMute } = useAudioContext()

  // Show different states based on audio status
  const getAudioStatus = () => {
    if (!hasUserInteracted && isAudioBlocked) {
      return { icon: '🔈', title: 'Click anywhere to enable audio', color: 'bg-orange-500' }
    }
    if (isMuted) {
      return { icon: '🔇', title: 'Unmute Audio', color: 'bg-red-500' }
    }
    return { icon: '🎵', title: 'Mute Audio', color: 'bg-green-500' }
  }

  const status = getAudioStatus()

  return (
    <motion.button
      onClick={toggleMute}
      className={`fixed top-4 right-4 z-50 backdrop-blur-sm text-white rounded-full p-3 shadow-lg border border-white border-opacity-30 hover:bg-opacity-30 transition-all duration-200 ${
        !hasUserInteracted && isAudioBlocked 
          ? 'bg-orange-500 bg-opacity-70 animate-pulse' 
          : 'bg-white bg-opacity-20'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={status.title}
    >
      <div className="text-xl">
        {status.icon}
      </div>
    </motion.button>
  )
} 