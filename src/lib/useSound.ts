import { useCallback, useRef } from 'react';

export const useSound = (soundSrc: string, volume: number = 0.5) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Preload the audio
  if (typeof window !== 'undefined' && !audioRef.current) {
    audioRef.current = new Audio(soundSrc);
    audioRef.current.volume = volume;
  }

  const playSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Rewind to start
      audioRef.current.play().catch(error => console.error("Error playing sound:", error));
    }
  }, []);

  return playSound;
};