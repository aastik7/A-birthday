// [CUSTOMIZE] MODIFY THIS FILE TO CHANGE THE ENTIRE BIRTHDAY EXPERIENCE FLOW

export type GameType = "balloon-pop" | "memory-match" | "trivia" | "puzzle" | "custom";
export type ContentType = "message" | "photo-gallery" | "video-tribute" | "timeline" | "memory-showcase";

export interface Stage {
  id: number;
  type: "game" | "content" | "special";
  title: string;
  component: string;
  config?: {
    // For game stages
    gameType?: GameType;
    difficulty?: number; // 1-5 scale
    goal?: string;
    timeLimit?: number; // seconds
    // For content stages
    contentType?: ContentType;
    textBlocks?: string[]; // Text with {{name}}, {{hobby}}, {{trait}} placeholders
    media?: string[]; // Image/video paths
    // For special stages
    specialEffect?: string;
    music?: string;
  };
}

// [CUSTOMIZE] Add, remove, or reorder stages to create your perfect birthday flow
export const stageConfig: Stage[] = [
  {
    id: 1,
    type: "content",
    title: "Welcome {{name}}! 🎉",
    component: "IntroStage",
    config: {
      contentType: "message",
      textBlocks: [
        "Get ready for your special day, {{name}}!",
        // "We know you love {{hobby}} so we made something magical!",
        "This  is hand crafted just for you!",
        "By your's truly ✨"
      ]
    }
  },
  {
    id: 2,
    type: "game",
    title: "Balloon Pop Challenge 🎈",
    component: "BalloonGame",
    config: {
      gameType: "balloon-pop",
      difficulty: 4,
      goal: "Pop 15 colorful moving balloons!",
      timeLimit: 20
    }
  },
  {
    id: 3,
    type: "content",
    title: "Memory Lane 📸",
    component: "MemoryStage", 
    config: {
      contentType: "photo-gallery",
      textBlocks: [
        "Let's take a trip down memory lane, {{name}}!",
        "These moments capture your {{trait}} spirit perfectly!"
      ],
      // [CUSTOMIZE] Add your own photos here (place in public/photos/)
      media: [
        "/photos/earrings.jpg",
        "/photos/fatty.jpg", 
        "/photos/purple-pink.jpg",
        "/photos/soft.jpg"
      ]
    }
  },
  {
    id: 4,
    type: "game", 
    title: "Memory Match Game 🧠",
    component: "MemoryGame",
    config: {
      gameType: "memory-match",
      difficulty: 2,
      goal: "Match all the pairs!",
      timeLimit: 90
    }
  },
  {
    id: 5,
    type: "content",
    title: "What Makes You Special 💫",
    component: "TraitsStage",
    config: {
      contentType: "message",
      textBlocks: [
        "{{name}}, you are absolutely amazing!",
        "Your {{trait}} nature inspires everyone around you.",
        "Here's what makes you extraordinary...",
        "You bring so much joy to our lives! 🌟"
      ]
    }
  },
  {
    id: 6,
    type: "game",
    title: "Birthday Trivia 🎯", 
    component: "TriviaGame",
    config: {
      gameType: "trivia",
      difficulty: 3,
      goal: "Answer the fun questions!",
      timeLimit: 120
    }
  },
  {
    id: 7,
    type: "special",
    title: "Cake Time! 🎂",
    component: "CakeStage",
    config: {
      specialEffect: "confetti-burst",
      music: "happy-birthday.mp3"
    }
  },
  {
    id: 8,
    type: "content",
    title: "Birthday Wishes 💝",
    component: "WishesStage",
    config: {
      contentType: "message", 
      textBlocks: [
        "As we celebrate you today, {{name}}...",
        "May this new year bring you endless {{hobby}} adventures!",
        "Your {{trait}} spirit deserves all the happiness in the world!",
        "Happy Birthday! Here's to another amazing year! 🎊"
      ]
    }
  }
];

// [CUSTOMIZE] Helper function to add new stages
export const addStage = (stage: Omit<Stage, 'id'>): Stage => ({
  ...stage,
  id: Math.max(...stageConfig.map(s => s.id)) + 1
});

// [CUSTOMIZE] Helper function to get stage by ID
export const getStageById = (id: number): Stage | undefined => 
  stageConfig.find(stage => stage.id === id);

// [CUSTOMIZE] Helper function to get next stage
export const getNextStage = (currentId: number): Stage | undefined =>
  stageConfig.find(stage => stage.id === currentId + 1);

// [CUSTOMIZE] Helper function to get previous stage  
export const getPreviousStage = (currentId: number): Stage | undefined =>
  stageConfig.find(stage => stage.id === currentId - 1);

export default stageConfig; 