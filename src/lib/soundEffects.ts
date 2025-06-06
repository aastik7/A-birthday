import { useSound } from './useSound';

// Sound effect hook factory with consistent volume
export const useSoundEffects = () => {
  const buttonClick = useSound('/sounds/button-click.mp3', 0.5);
  const confettiPop = useSound('/sounds/confetti.mp3', 0.6);
  const cardFlip = useSound('/sounds/card-flip.mp3', 0.4);
  const matchSuccess = useSound('/sounds/match-success.mp3', 0.5);
  const gameComplete = useSound('/sounds/game-complete.mp3', 0.6);
  const stageTransition = useSound('/sounds/stage-transition.mp3', 0.4);
  
  return {
    buttonClick,
    confettiPop,
    cardFlip,
    matchSuccess,
    gameComplete,
    stageTransition
  };
};