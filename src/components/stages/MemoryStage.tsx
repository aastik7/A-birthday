"use client";

import { motion } from "framer-motion";
import { textAnimations } from "@/lib/animations";
import birthdayConfig from "@/config/birthdayConfig";
import { Stage } from "@/config/stageConfig";

interface MemoryStageProps {
  stage: Stage;
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isCompleted: boolean;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export default function MemoryStage({
  stage,
  onComplete,
  onNext,
}: MemoryStageProps) {
  const handleContinue = () => {
    onComplete();
    onNext();
  };

  return (
    <div className="text-center py-8">
      <motion.div
        className="birthday-title mb-6"
        variants={textAnimations.fadeInUp}
        initial="initial"
        animate="animate"
      >
        📸 Memory Lane 📸
      </motion.div>

      <motion.div
        className="birthday-text mb-8"
        variants={textAnimations.fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.3 }}
      >
        <div className="text-lg mb-4">
          Let's take a trip down memory lane, {birthdayConfig.name}!
        </div>
        <div className="text-md text-white">
          These moments capture your {birthdayConfig.personalTraits[0]} spirit
          perfectly!
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto"
        variants={textAnimations.fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.6 }}
      >
        {stage.config?.media?.map((photoPath, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow-lg border-2 border-pink-100 overflow-hidden"
          >
            <div className="relative aspect-square mb-3">
              <img 
                src={photoPath}
                alt={`Memory ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-md"
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'w-full h-full bg-pink-100 rounded-lg flex items-center justify-center text-6xl';
                  fallback.innerHTML = '📷';
                  target.parentElement?.appendChild(fallback);
                }}
              />
            </div>
            {birthdayConfig.memories[index] && (
              <div className="text-sm text-gray-800 leading-relaxed text-center">
                {birthdayConfig.memories[index]}
              </div>
            )}
          </div>
        )) || 
        // Fallback to text memories if no photos configured
        birthdayConfig.memories.slice(0, 4).map((memory, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg border-2 border-pink-100"
          >
            <div className="text-4xl mb-3">📷</div>
            <div className="text-sm text-gray-800 leading-relaxed">
              {memory}
            </div>
          </div>
        ))}
      </motion.div>

      <motion.button
        onClick={handleContinue}
        className="birthday-button text-xl px-8 py-4"
        variants={textAnimations.fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.9 }}
      >
        Continue Journey! ➡️
      </motion.button>
    </div>
  );
}
