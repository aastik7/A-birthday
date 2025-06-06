'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function BirthdayTimer() {
  const [timeAlive, setTimeAlive] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const birthDate = new Date('2002-07-07T00:00:00') // July 7th, 2002
    
    const updateTimer = () => {
      const now = new Date()
      const difference = now.getTime() - birthDate.getTime()
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)
      
      setTimeAlive({ days, hours, minutes, seconds })
    }

    updateTimer()
    const timer = setInterval(updateTimer, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 left-4 z-50 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl p-4 shadow-2xl border-2 border-white border-opacity-30"
    >
      <div className="text-center">
        <div className="text-xs font-bold mb-2 text-pink-100">
          ✨ Blessing this world for ✨
        </div>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-white bg-opacity-20 rounded-lg p-2">
            <div className="text-lg font-bold">{timeAlive.days.toLocaleString()}</div>
            <div className="text-xs">Days</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-2">
            <div className="text-lg font-bold">{timeAlive.hours.toString().padStart(2, '0')}</div>
            <div className="text-xs">Hours</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-2">
            <div className="text-lg font-bold">{timeAlive.minutes.toString().padStart(2, '0')}</div>
            <div className="text-xs">Mins</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-2">
            <div className="text-lg font-bold">{timeAlive.seconds.toString().padStart(2, '0')}</div>
            <div className="text-xs">Secs</div>
          </div>
        </div>
        <div className="text-xs mt-2 text-pink-100">
          Since July 7th, 2002 💝
        </div>
      </div>
    </motion.div>
  )
} 