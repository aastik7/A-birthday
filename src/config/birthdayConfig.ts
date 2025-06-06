// [CUSTOMIZE] Modify this file to personalize the birthday experience
export interface BirthdayConfig {
  name: string;
  age?: number;
  birthDate?: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
  };
  personalTraits: string[];
  traitDescriptions: { [key: string]: string };
  hobbies: string[];
  memories: string[];
  favoriteThings: string[];
  messages: {
    welcome: string[];
    encouragement: string[];
    celebration: string[];
  };
  triviaQuestions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

const birthdayConfig: BirthdayConfig = {
  // [CUSTOMIZE] Change the birthday person's name
  name: "Aisha",
  age: 25,
  birthDate: "2024-12-15",
  
  // [CUSTOMIZE] Modify theme colors and fonts
  theme: {
    primaryColor: "#FF6B8B",
    secondaryColor: "#2d3748", 
    accentColor: "#FFE66D",
    backgroundColor: "#FFF5F8",
    textColor: "#1a202c",
    fontFamily: "'Comic Neue', 'Nunito', sans-serif"
  },

  // [CUSTOMIZE] Add personality traits
  personalTraits: [
    "Funny",
    "creative", 
    "kind-hearted",
    "Hard-Working",
    "inspiring"
  ],

  // [CUSTOMIZE] Add individual descriptions for each trait
  traitDescriptions: {
    "Funny": "You're one of the funniest and creatively deranged person I know and your allegations of me stealing your jokes aren't all just allegations.",
    "creative": "Your approach to problem solving is creative and fun instead of boring and calculated",
    "kind-hearted": "Kindess doens't come in one color or shape you showed me a lot of it and showed me there are ways you can show it that I didn't think was traditionally possible.",
    "Hard-Working": "Your dedication and work ethic inspire everyone - you never give up on your goals! NOMMIES",
    "inspiring": "You have this amazing ability to motivate and uplift others just by being yourself."
  },

  // [CUSTOMIZE] Add hobbies and interests
  hobbies: [
    "photography",
    "traveling",
    "cooking",
    "reading",
    "dancing"
  ],

  // [CUSTOMIZE] Add special memories
  memories: [
    "Earrings - October 15 2023",
    "Fatty ate your burger - March 30th, 2023",
    "US as Plushies - December 16, 2022 ",
    "Shopping with noor and friends ",
    "Late night conversations under the stars"
  ],

  // [CUSTOMIZE] Add favorite things
  favoriteThings: [
    "Sunset walks",
    "Cozy coffee shops", 
    "Surprise parties",
    "Handwritten letters",
    "Chocolate cake"
  ],

  // [CUSTOMIZE] Personalize messages throughout the experience
  messages: {
    welcome: [
      "Get ready for your special day, {{name}}!",
      // "We know you love {{hobby}} so we made something special!",
      "Today is all about celebrating you!"
    ],
    encouragement: [
      "You've got this, {{name}}!",
      "Your {{trait}} spirit shines through!",
      "Keep going, birthday star!"
    ],
    celebration: [
      "Amazing work, {{name}}!",
      "You're absolutely incredible!",
      "Time to celebrate this victory!"
    ]
  },

  // [CUSTOMIZE] Trivia questions about your friendship with Nero
  triviaQuestions: [
    {
      question: "How long have you been friends with Nero?",
      options: ["March 12, 2022", "April 5, 2022", "May 18, 2022", "June 3, 2022"],
      correctAnswer: 1 // April 5, 2022
    },
    {
      question: "Where is Vienna located?",
      options: ["Germany", "Italy", "Hungary", "Austria"],
      correctAnswer: 3 // Austria
    },
    {
      question: "Which one of these idols lived in California for about 5 years?",
      options: ["Jungkook from BTS", "L.Joe from Teen Top", "Taemin from SHINee", "Kai from EXO"],
      correctAnswer: 1 // L.Joe from Teen Top
    },
    {
      question: "When you were in UAE, what drink did Nero ask you to try out?",
      options: ["Ice coffee", "Matcha", "Thai Ice tea", "Boba"],
      correctAnswer: 2 // Thai Ice tea
    },
    {
      question: "Which one of these WASN'T your favorite about talking with Nero on the balcony in UAE?",
      options: [
        "Cats coming up to you",
        "You hearing the big city ambience traffic", 
        "The AC Compressor going off behind you",
        "Eating shawarma and telling Nero how bussin it is and still not finishing it!"
      ],
      correctAnswer: 2 // The AC Compressor going off behind you
    }
  ]
};

export default birthdayConfig; 