# 🎉 Interactive Birthday Experience

A customizable, modular Next.js 14 birthday experience with games, memories, and celebrations. Built with TypeScript, Framer Motion, and Tailwind CSS.

## ✨ Features

- **Modular Stage Architecture**: Easily add, remove, or reorder experience stages
- **Customizable Games**: Balloon pop, memory match, trivia with difficulty settings
- **Personalized Content**: Dynamic text replacement with names, traits, and memories
- **Beautiful Animations**: Framer Motion powered transitions and effects
- **Responsive Design**: Works perfectly on desktop and mobile
- **Vercel Ready**: Optimized for seamless deployment

## 🚀 Quick Start

1. **Clone and Install**
   ```bash
   npm install
   npm run dev
   ```

2. **Customize the Experience**
   - Edit `src/config/birthdayConfig.ts` for personal details
   - Modify `src/config/stageConfig.ts` for stage flow
   - Add photos to `public/photos/` directory

3. **Deploy to Vercel**
   ```bash
   npm run build
   vercel deploy
   ```

## 📚 Complete Documentation

- **[📖 Customization Guide](CUSTOMIZATION_GUIDE.md)** - Step-by-step guide to customize everything
- **[📁 Project Structure](PROJECT_STRUCTURE.md)** - Detailed explanation of all files and folders

For full customization instructions and troubleshooting, see the guides above!

## 🎯 Customization Guide

### 1. Personal Configuration (`src/config/birthdayConfig.ts`)

```typescript
const birthdayConfig = {
  // [CUSTOMIZE] Change these values
  name: "Aisha",
  age: 25,
  theme: {
    primaryColor: "#FF6B8B",
    secondaryColor: "#5A3E7D", 
    // ... more theme options
  },
  personalTraits: ["adventurous", "creative"],
  hobbies: ["photography", "traveling"],
  memories: ["Beach trip 2023", "Movie nights"],
  // ... more personal details
}
```

### 2. Stage Flow Configuration (`src/config/stageConfig.ts`)

```typescript
export const stageConfig: Stage[] = [
  {
    id: 1,
    type: "content",
    title: "Welcome {{name}}! 🎉",
    component: "IntroStage",
    config: {
      textBlocks: [
        "Get ready for your special day, {{name}}!",
        "We made something magical just for you!"
      ]
    }
  },
  // Add more stages here...
]
```

### 3. Adding New Stages

1. **Create the stage configuration:**
   ```typescript
   {
     id: 9,
     type: "game",
     title: "New Game! 🎮",
     component: "NewGameComponent",
     config: {
       gameType: "custom",
       difficulty: 3
     }
   }
   ```

2. **Create the component:**
   ```typescript
   // src/components/stages/NewGameComponent.tsx
   export default function NewGameComponent({ stage, onComplete, onNext }) {
     // Your game logic here
     return <div>Your custom game!</div>
   }
   ```

3. **Register in StageRouter:**
   ```typescript
   // Add to stageComponents object
   const stageComponents = {
     // ... existing components
     NewGameComponent,
   }
   ```

## 🎮 Available Game Types

### Balloon Pop Game
- **Type**: `balloon-pop`
- **Config**: `goalCount`, `timeLimit`
- **Features**: Animated balloons, confetti effects, scoring

### Memory Match Game
- **Type**: `memory-match`
- **Config**: `difficulty` (controls pairs), `timeLimit`
- **Features**: Card flipping animations, match detection

### Trivia Game
- **Type**: `trivia`
- **Config**: `timeLimit`
- **Features**: Multiple choice questions, scoring system

## 🎨 Theming

### Color Customization
Edit the theme object in `birthdayConfig.ts`:
```typescript
theme: {
  primaryColor: "#FF6B8B",    // Main buttons, accents
  secondaryColor: "#5A3E7D",  // Text, secondary elements
  accentColor: "#FFE66D",     // Highlights, progress bars
  backgroundColor: "#FFF5F8", // Page background
  textColor: "#2D1B69",       // Main text color
  fontFamily: "'Comic Neue', sans-serif"
}
```

### CSS Variables
The theme automatically sets CSS variables:
```css
:root {
  --primary-color: #FF6B8B;
  --secondary-color: #5A3E7D;
  /* ... */
}
```

### Custom Animations
Add to `src/lib/animations.ts`:
```typescript
export const customAnimations = {
  myAnimation: {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  }
}
```

## 📸 Adding Photos and Media

1. **Add photos to `public/photos/`:**
   ```
   public/
   ├── photos/
   │   ├── beach-trip.jpg
   │   ├── movie-night.jpg
   │   └── birthday-cake.png
   ```

2. **Reference in stage config:**
   ```typescript
   config: {
     contentType: "photo-gallery",
     media: [
       "/photos/beach-trip.jpg",
       "/photos/movie-night.jpg"
     ]
   }
   ```

## 🔧 Text Placeholders

Use these placeholders in any text content:
- `{{name}}` - Birthday person's name
- `{{hobby}}` - First hobby from hobbies array
- `{{trait}}` - First trait from personalTraits array

Example:
```typescript
textBlocks: [
  "Happy birthday {{name}}!",
  "We know you love {{hobby}}!",
  "Your {{trait}} spirit inspires us!"
]
```

## 📱 Mobile Optimization

The experience is fully responsive with:
- Touch-friendly interactions
- Responsive text sizing
- Mobile-optimized animations
- Adaptive layouts

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Manual Build
```bash
npm run build
npm start
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React + Emojis
- **Deployment**: Vercel optimized

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── layout.tsx         # Root layout with theme
│   ├── page.tsx           # Main stage controller
│   └── globals.css        # Global styles import
├── components/
│   ├── stages/            # Stage components
│   │   ├── StageRouter.tsx
│   │   ├── IntroStage.tsx
│   │   ├── BalloonGame.tsx
│   │   └── ...
│   └── ui/                # Reusable UI components
│       └── ProgressBar.tsx
├── config/
│   ├── birthdayConfig.ts  # Personal customization
│   └── stageConfig.ts     # Stage flow configuration
├── lib/
│   ├── animations.ts      # Framer Motion presets
│   └── gameEngine/        # Game logic hooks
│       ├── useBalloonPop.ts
│       ├── useMemoryMatch.ts
│       └── useTrivia.ts
└── styles/
    └── globals.css        # Main stylesheet
```

## 🎨 Animation System

### Stage Transitions
```typescript
// 3D flip effect between stages
stageTransitions: {
  initial: { rotateY: 90, opacity: 0 },
  animate: { rotateY: 0, opacity: 1 },
  exit: { rotateY: -90, opacity: 0 }
}
```

### Game Elements
```typescript
// Balloon animations
balloon: {
  initial: { scale: 0 },
  animate: { scale: 1, rotate: [0, 5, -5, 0] },
  pop: { scale: [1, 1.5, 0], opacity: [1, 1, 0] }
}
```

## 🔄 Game Engine Hooks

### useBalloonPop
```typescript
const {
  gameState,
  startGame,
  popBalloon,
  getGameStats
} = useBalloonPop(goalCount, timeLimit)
```

### useMemoryMatch
```typescript
const {
  gameState,
  startGame,
  flipCard,
  getGameStats
} = useMemoryMatch(difficulty, timeLimit)
```

## 🎯 Best Practices

1. **Keep stages focused**: Each stage should have one clear purpose
2. **Use consistent animations**: Stick to the provided animation presets
3. **Test on mobile**: Always verify mobile experience
4. **Optimize images**: Compress photos for faster loading
5. **Customize gradually**: Start with config files, then add custom stages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use for personal and commercial projects.

## 💝 Credits

Built with love for creating memorable birthday experiences! Perfect for surprising friends, family, or loved ones with a personalized digital celebration.

---

**Happy Birthday Experiences Made Easy! 🎉** # A-birthday
# A-birthday
