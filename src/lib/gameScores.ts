// Utility functions for managing game scores

export const saveBalloonScore = (score: number): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('balloonGameScore', score.toString());
  }
};

export const getBalloonScore = (): number => {
  if (typeof window !== 'undefined') {
    const score = localStorage.getItem('balloonGameScore');
    return score ? parseInt(score, 10) : 0;
  }
  return 0;
};

export const clearBalloonScore = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('balloonGameScore');
  }
};

// For the future final stage
export const getLifeLongevityBonus = (): string => {
  const balloonScore = getBalloonScore();
  return `+${balloonScore} years of magical life longevity! 🌟✨`;
};