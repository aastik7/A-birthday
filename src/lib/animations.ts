import { Variants } from "framer-motion";

// [CUSTOMIZE] Stage transition animations
export const stageTransitions: Variants = {
  initial: { 
    opacity: 0, 
    y: 20,
    scale: 0.98
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.4,
      ease: "easeIn"
    }
  }
};

// [CUSTOMIZE] Game element animations
export const gameElementAnimations = {
  balloon: {
    initial: { scale: 0, rotate: 0, y: 20 },
    animate: { 
      scale: 1, 
      y: 0,
      rotate: [0, 3, -3, 0],
      transition: {
        scale: { duration: 0.4, ease: "backOut" },
        y: { duration: 0.4, ease: "backOut" },
        rotate: { 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut",
          repeatType: "reverse" as const
        }
      }
    },
    pop: {
      scale: [1, 1.3, 0],
      opacity: [1, 1, 0],
      rotate: [0, 180],
      transition: { duration: 0.4, ease: "easeOut" }
    },
    hover: {
      scale: 1.15,
      y: -5,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  },
  
  memoryCard: {
    initial: { rotateY: 180, scale: 0.8 },
    animate: { 
      rotateY: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: "backOut" }
    },
    flip: {
      rotateY: [0, 90, 0],
      transition: { duration: 0.6 }
    },
    match: {
      scale: [1, 1.2, 1],
      boxShadow: ["0px 0px 0px rgba(255, 107, 139, 0)", "0px 0px 20px rgba(255, 107, 139, 0.8)", "0px 0px 0px rgba(255, 107, 139, 0)"],
      transition: { duration: 0.8 }
    }
  },

  button: {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  }
};

// [CUSTOMIZE] Special effects
export const specialEffects = {
  confetti: {
    initial: { y: -100, opacity: 0, rotate: 0 },
    animate: (i: number) => ({
      y: window.innerHeight + 100,
      opacity: [0, 1, 1, 0],
      rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
      x: Math.random() * window.innerWidth,
      transition: {
        duration: 3 + Math.random() * 2,
        delay: i * 0.1,
        ease: "easeOut"
      }
    })
  },

  sparkle: {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatDelay: Math.random() * 2
      }
    }
  },

  floatingHearts: {
    initial: { y: 0, opacity: 1, scale: 0 },
    animate: {
      y: -200,
      opacity: 0,
      scale: [0, 1, 1, 0],
      x: [0, Math.random() * 50 - 25],
      transition: {
        duration: 3,
        ease: "easeOut"
      }
    }
  }
};

// [CUSTOMIZE] Text animations
export const textAnimations = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  },

  typewriter: {
    initial: { width: "0%" },
    animate: { 
      width: "100%",
      transition: { duration: 2, ease: "steps(end)" }
    }
  },

  bounce: {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  },

  shimmer: {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }
};

// [CUSTOMIZE] Container animations
export const containerAnimations = {
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },

  slideInLeft: {
    initial: { x: -100, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  },

  slideInRight: {
    initial: { x: 100, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  },

  scaleIn: {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5, ease: "backOut" }
    }
  }
};

// [CUSTOMIZE] Progress animations
export const progressAnimations = {
  progressBar: {
    initial: { width: "0%" },
    animate: (progress: number) => ({
      width: `${progress}%`,
      transition: { duration: 0.8, ease: "easeOut" }
    })
  },

  pulseGlow: {
    animate: {
      boxShadow: [
        "0 0 0 0 rgba(255, 107, 139, 0.4)",
        "0 0 0 20px rgba(255, 107, 139, 0)",
        "0 0 0 0 rgba(255, 107, 139, 0)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity
      }
    }
  }
};

export default {
  stageTransitions,
  gameElementAnimations,
  specialEffects,
  textAnimations,
  containerAnimations,
  progressAnimations
};