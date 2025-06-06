'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import birthdayConfig from '@/config/birthdayConfig'
import { Stage } from '@/config/stageConfig'
import { useAudioContext } from '@/components/ui/AudioController'

interface WishesStageProps {
  stage: Stage
  onComplete: () => void
  onNext: () => void
  onPrevious: () => void
  isCompleted: boolean
  canGoNext: boolean
  canGoPrevious: boolean
}

export default function WishesStage({
  stage,
  onComplete,
}: WishesStageProps) {
  const [showLetter, setShowLetter] = useState(false)
  const [showHearts, setShowHearts] = useState(false)
  const [showSpotifyCode, setShowSpotifyCode] = useState(false)
  const [codeCopied, setCodeCopied] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const { stopBackgroundMusic } = useAudioContext()

  const handleFinish = () => {
    onComplete()
  }

  const handleUnlockLetter = () => {
    setShowLetter(true)
    setShowHearts(true)
    setShowConfetti(true)
    
    // Stop background music since letter has its own soundtrack
    stopBackgroundMusic()
    
    // Play firework sound effect (same as cake stage)
    const fireworkAudio = new Audio('/audio/fireworks-soundtrack.mp3')
    fireworkAudio.volume = 0.4
    fireworkAudio.play().catch(e => console.log('Audio autoplay prevented:', e))
    
    // Play letter soundtrack after fireworks
    setTimeout(() => {
      const audio = new Audio('/audio/letter-soundtrack.mp3')
      audio.volume = 0.5
      audio.loop = true
      audio.play().catch(e => console.log('Audio autoplay prevented:', e))
    }, 1500)
    
    // Hide animations after 10 seconds
    setTimeout(() => {
      setShowHearts(false)
      setShowConfetti(false)
    }, 10000)
  }

  const handleSpotifyGift = () => {
    setShowSpotifyCode(true)
  }

  const handleCopyCode = () => {
    const giftCode = 'SPOTIFY-GIFT-123456-ABCDEF'
    navigator.clipboard.writeText(giftCode).then(() => {
      setCodeCopied(true)
      setTimeout(() => setCodeCopied(false), 3000)
    }).catch(err => {
      console.error('Failed to copy: ', err)
      // Fallback for browsers that don't support clipboard API
      alert(`Your Spotify Gift Code: ${giftCode}`)
    })
  }

  const processText = (text: string) => {
    return text
      .replace(/\{\{name\}\}/g, birthdayConfig.name)
      .replace(/\{\{hobby\}\}/g, birthdayConfig.hobbies[0] || 'adventure')
      .replace(/\{\{trait\}\}/g, birthdayConfig.personalTraits[0] || 'amazing')
  }

  const textBlocks = stage.config?.textBlocks || [
    "As we celebrate you today, {{name}}...",
    "May this new year bring you endless happiness",
    "Your amazing spirit deserves all the happiness in the world!",
    "Happy Birthday! Here's to another incredible year! 🎊"
  ]

  if (showLetter) {
    return (
      <div className="relative">
        {/* Love Hearts Animation */}
        <AnimatePresence>
          {showHearts && Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={`heart-${i}`}
              className="fixed pointer-events-none z-40"
              style={{
                left: Math.random() > 0.5 ? '5%' : '95%',
                top: Math.random() * 100 + '%',
                fontSize: Math.random() * 20 + 20 + 'px',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1.2, 0],
                y: -200,
                x: Math.random() * 100 - 50,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: i * 0.3,
                ease: "easeOut"
              }}
            >
              {['💖', '💝', '💕', '❤️', '💗'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Confetti Animation */}
        <AnimatePresence>
          {showConfetti && Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={`confetti-${i}`}
              className="fixed pointer-events-none z-30"
              style={{
                left: Math.random() * 100 + '%',
                top: '-50px',
                fontSize: '12px',
                color: ['#FF6B8B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#FFB6C1', '#87CEEB'][i % 8],
              }}
              initial={{ opacity: 0, y: -50 }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: window.innerHeight + 100,
                x: Math.random() * 200 - 100,
                rotate: Math.random() * 720,
                scale: [0, 1, 0.8, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: i * 0.1,
                ease: "easeOut"
              }}
            >
              {['🎉', '🎊', '✨', '🌟', '💫', '🎈', '🦋', '🌸'][Math.floor(Math.random() * 8)]}
            </motion.div>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto py-4 px-4"
          >
          {/* Beautiful Letter */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-3xl p-4 sm:p-8 shadow-2xl border-2 border-amber-200">
            {/* Profile Photo */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img 
                  src="/photos/profile-photo.jpg" 
                  alt={`${birthdayConfig.name}'s photo`}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-amber-300 shadow-lg"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.currentTarget.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-amber-200 border-4 border-amber-300 shadow-lg flex items-center justify-center text-2xl sm:text-3xl';
                    fallback.innerHTML = '👤';
                    e.currentTarget.parentElement?.appendChild(fallback);
                  }}
                />
                <div className="absolute -top-2 -right-2 text-2xl animate-pulse">💖</div>
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="birthday-title text-amber-800 mb-4">
                💌 A Special Letter for {birthdayConfig.name} 💌
              </div>
              <div className="text-amber-600 text-lg">
                ✨ Something magical just for you ✨
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-inner border border-amber-300">
              <div className="text-amber-900 leading-relaxed space-y-4">
                <p className="text-lg font-serif font-bold">Hi AISHA AISHA - AISHA DAY! 🎉✨</p>
                
                <p className="text-base font-serif">
                  Hiiii Once again I am here to remind you how beautifully you have shaped my life with your kind contributions 🦋, its your special day so I want you feel it in you as I do from here 💖.
                </p>

                <p className="text-base font-serif">
                  If you did the trivia/quiz you may have realized already we've known each other for about 1,158 days (that's roughly 3.17 years!) ⏳ so instead of me going in circles 🔄, lemme start from the checkpoint.
                </p>

                <p className="text-base font-serif">
                  The day I met you, Aisha, my life took a turn for the better 🌟. I've had people/friends around me my whole life, but never did someone so consistently put in the effort to be around me and make me feel more special than ever 🥹—part of my confidence comes from your contributions in me, and I will never deny that.
                </p>

                <p className="text-base font-serif">
                  We've spent more than 1,500+ hours on various platforms combined just talking to each other (Yes, I've done the math 🧮✨). Talking to you has always been effortless for me—not because it's easy for me to express myself (as you've described me as a 'private-person' 🫣), but because the effortless part always came from you 🦋. You once told me you provide that nonjudgmental space for your friends, and I've never questioned that because I've always felt it with you. Whatever little I shared, you took it as a gift 🎁, without judging me for struggling to show my colors 🌈—and that led me to share more, and only with you.
                </p>

                <p className="text-base font-serif">
                  Your contributions and efforts in my life are endless 💫. You included me in every little/small decision in your life, kept me in the loop 🔁, and the only time you weren't there for a week was when you were severely ill and hospitalized 😷—but thankfully, you survived and came back to all of us who love and celebrate you 🎊.
                </p>

                <p className="text-base font-serif">
                  You didn't just make me part of your life—you'd worry about every little thing that could come between us sharing time ⏰. Like when you had tests 📚, you'd still do your best to be with me (even though you'd be breathing hard in frustration 😤). Or when you were in college and Thanatos and I would be talking, you'd still chime in every now and then—EVEN THO YOU'RE IN SCHOOL 🏫, before and mid-class?! 😭 Never have I had someone do that for me. Your effort always put the hardest smile on my face 😊💖.
                </p>

                <p className="text-base font-serif">
                  Or that time in the UAE when you were getting your hair done 💇‍♀️, and you felt bad about not spending time with me, so you kept listening in on my and Thanatos' convo—EVEN WHEN THE HAIRSTYLIST WAS LITERALLY IN YOUR HAIR 😂‼️ YOU are beyond adorable, Aisha—the brightest star in my life ⭐🦋.
                </p>

                <p className="text-base font-serif">
                  Not one moment did you miss when you were in the UAE 🏙️. Food or no food, you'd grab that balcony spot and talk with me for hours 🌙, begrudging the moments you couldn't. I still remember how happy you'd get—I could hear the breeze, traffic, cars 🚗, and you eating while telling me, "NERO, you wanna see what I GOT?" or "Do you know what happened with Noor?" 😆 Or that time you forgot expensive gifts and had to do plane-hijack-level negotiations ✈️😂 to get them back! And your first solo flight? I was lowkey concerned that day 🥺 (but you were so cute 🥰). Stop being this adorable or I WILL EAT YOUR CHEEKO! 👹🍎
                </p>

                <p className="text-base font-serif">
                  You opened up to me about your weakest moments 🦋, even the ones that took you forever to share. You felt safe enough to be vulnerable with me, giving me the same trust as someone like Fahad (who's been there since Day 1) 🤝. That made me feel so cherished 💞.
                </p>

                <p className="text-base font-serif">
                  I'm not the smartest 🧠, and definitely not the best in return. At times, you needed me more than I realized, and my naivety hurt you 😔. Even though it's your birthday, I won't sugarcoat it—you went through pain because of me, and I see that now in hindsight 🔍. Feeling even a quarter of what you felt hurts me 🥀. I've said this before, but it runs through my head every day 💭.
                </p>

                <p className="text-base font-serif">
                  I won't disappoint—I'll do my best to understand emotions better 🧠❤️, especially for you, who holds the highest spot in my life 👑. You deserved the benefit of the doubt, but sometimes you got frustration instead of the help you needed 😣. I did try, but I wish I'd done more to guide you out of those dark moments 🕯️.
                </p>

                <p className="text-base font-serif">
                  I didn't wanna write all this—sorry again 😅💔 NOM NOM anyway, AISHA, I really really reallly like you 😖💘!!! I appreciate you walking into my life, filling everything with color 🎨. Every second I invested in you, I got back tenfold 💎.
                </p>

                <p className="text-base font-serif">
                  You are THAT GIRL. I admire, respect, and look up to you in so many ways 👏🔥. I've talked about you 100s of times to others, using you as an example to teach and learn from 📚✨.
                </p>

                <p className="text-base font-serif">
                  Where you are today—and where you're going—is so bright ☀️. I, your friends, and your family are SO PROUD of you, AISHA!! 🎂🎈 A VERY HAPPY BIRTHDAY to the most beautiful soul I've shared my life with 🦋💕. I wish you nothing but happiness (from those you want it from) and every achievement you pray for 🙏✨.
                </p>

                <p className="text-lg font-serif text-center mt-6 text-amber-800 font-bold">
                  Happy Birthday, BEAUTIFUL AMAZING GORGEOUS ADORABLE CUTE THE SWEETEST AISHA AISHA 🌟
                </p>
              </div>
            </div>

            {/* Gift Section */}
            <div className="mt-8 text-center">
              <div className="text-2xl font-bold text-amber-800 mb-6">
                🎁 Some Nifty Gifties 🎁
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.a
                  href="https://discord.gift/YMFtNVdXckWR6ubz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="birthday-button bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🎮 Discord Nitro Gift
                </motion.a>
                
                {/* COMMENTED OUT - Spotify Gift Card Button */}
                {/* Uncomment this section to enable Spotify gift card */}
                {/*
                <motion.div
                  className="birthday-button bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-lg cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSpotifyGift}
                >
                  🎵 Spotify Gift Card
                </motion.div>
                */}
              </div>

              {/* COMMENTED OUT - Spotify Gift Code Modal */}
              {/* Uncomment this section along with the button above to enable Spotify gift card */}
              {/*
              <AnimatePresence>
                {showSpotifyCode && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setShowSpotifyCode(false)}
                  >
                    <motion.div
                      className="bg-white rounded-2xl p-8 mx-4 max-w-md"
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-4">🎵 Spotify Gift Code 🎵</div>
                        <div className="text-gray-600 mb-6">
                          Here's your special Spotify gift code!
                        </div>
                        
                        <div className="bg-gray-100 rounded-lg p-4 mb-6 font-mono text-lg border-2 border-dashed border-gray-300">
                          SPOTIFY-GIFT-123456-ABCDEF
                        </div>
                        
                        <div className="flex flex-col gap-3">
                          <button
                            onClick={handleCopyCode}
                            className={`birthday-button text-white px-6 py-3 ${
                              codeCopied ? 'bg-green-500' : 'bg-green-600 hover:bg-green-700'
                            }`}
                          >
                            {codeCopied ? '✅ Copied!' : '📋 Copy Code'}
                          </button>
                          
                          <button
                            onClick={() => setShowSpotifyCode(false)}
                            className="birthday-button bg-gray-500 hover:bg-gray-600 text-white px-6 py-3"
                          >
                            Close
                          </button>
                        </div>
                        
                        <div className="text-xs text-gray-500 mt-4">
                          * This is a placeholder code. Replace with actual gift code.
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              */}
              

            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="text-center py-8">
      <div className="birthday-title mb-8">
        💝 Birthday Wishes 💝
      </div>

      <div className="space-y-6 mb-8 max-w-3xl mx-auto">
        {textBlocks.map((text, index) => (
          <div
            key={index}
            className="birthday-text text-lg p-4 bg-slate-800 bg-opacity-80 rounded-xl shadow-md"
          >
            {processText(text)}
          </div>
        ))}
      </div>

      <div className="mb-8">
        <div className="birthday-subtitle mb-4">
          🌟 My Wishes for {birthdayConfig.name} 🌟
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <div className="p-4 bg-yellow-50 rounded-xl">
            <div className="text-2xl mb-2">🎯</div>
            <div className="font-semibold">Dreams Come True</div>
            <div className="text-sm text-yellow-800">May all your goals be achieved</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl">
            <div className="text-2xl mb-2">💫</div>
            <div className="font-semibold">Endless Adventures</div>
            <div className="text-sm text-blue-800">New experiences await you</div>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <div className="text-2xl mb-2">❤️</div>
            <div className="font-semibold">Love & Joy</div>
            <div className="text-sm text-green-800">Surrounded by happiness always</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl">
            <div className="text-2xl mb-2">🌈</div>
            <div className="font-semibold">Bright Future</div>
            <div className="text-sm text-purple-800">Amazing things lie ahead</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-xl font-black" style={{ color: '#ffffff', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
          🎉 Happy Birthday, {birthdayConfig.name}! 🎉
        </div>
        
        <motion.button
          onClick={handleUnlockLetter}
          className="birthday-button bg-purple-600 hover:bg-purple-700 text-white text-xl px-12 py-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔓 Unlock Special Letter 💌
        </motion.button>

        <div className="text-sm font-semibold mt-6 text-slate-600">
          Hope you enjoyed this special birthday experience! ✨
        </div>
      </div>
    </div>
  )
}