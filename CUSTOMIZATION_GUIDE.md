# 🎉 Birthday Experience - Complete Customization Guide

## Table of Contents
1. [Quick Start](#quick-start)
2. [Personal Information Setup](#personal-information-setup)
3. [Theme Customization](#theme-customization)
4. [Stage Configuration](#stage-configuration)
5. [Game Settings](#game-settings)
6. [Content Customization](#content-customization)
7. [Visual Styling](#visual-styling)
8. [Adding New Stages](#adding-new-stages)
9. [Deployment](#deployment)

## Quick Start

To customize this birthday experience for someone new:

1. **Update Personal Information** in `src/config/birthdayConfig.ts`
2. **Modify Stage Flow** in `src/config/stageConfig.ts`
3. **Replace Photos** in `public/photos/`
4. **Customize Colors** by updating theme variables
5. **Deploy** to Vercel

## Personal Information Setup

### File: `src/config/birthdayConfig.ts`

This is your main customization file. Update these fields:

```typescript
const birthdayConfig: BirthdayConfig = {
  // Basic Information
  name: "Your Friend's Name",           // Will replace {{name}} placeholders
  age: 25,                             // Current age
  birthday: "March 15",                // Birthday date string
  
  // Colors & Theme
  theme: {
    primary: "#FF6B8B",                // Main pink/red color
    secondary: "#5A3E7D",              // Purple accent color
    accent: "#FFE66D",                 // Yellow highlight color
    background: "#FFF5F8",             // Light background
    text: "#1a1a2e",                   // Dark text color
  },
  
  // Personality
  personalTraits: [                    // Used in {{trait}} placeholders
    "incredibly creative",
    "always optimistic", 
    "adventurous spirit",
    "loyal friend"
  ],
  
  hobbies: [                          // Used in {{hobby}} placeholders
    "painting",
    "hiking", 
    "cooking",
    "reading"
  ],
  
  // Content for memory stage
  memories: [
    {
      title: "First Day We Met",
      description: "That amazing day when our friendship began",
      image: "/photos/memory1.jpg",    // Put actual photos in public/photos/
      year: "2020"
    },
    // Add more memories...
  ]
}
```

### Text Placeholders

Throughout the app, you can use these placeholders:
- `{{name}}` - Replaced with the person's name
- `{{hobby}}` - Replaced with their first hobby
- `{{trait}}` - Replaced with their first personality trait

## Theme Customization

### Colors

Update the theme colors in `birthdayConfig.ts`:

```typescript
theme: {
  primary: "#your-color",      // Main brand color (buttons, highlights)
  secondary: "#your-color",    // Secondary accent color  
  accent: "#your-color",       // Bright accent (often yellow/gold)
  background: "#your-color",   // Page background
  text: "#your-color",         // Main text color
}
```

### Advanced Styling

For deeper customization, edit `src/styles/globals.css`:

```css
:root {
  --primary-color: #FF6B8B;         /* Updates automatically from config */
  --secondary-color: #5A3E7D;
  --accent-color: #FFE66D;
  --background-color: #FFF5F8;
  --text-color: #1a1a2e;
}
```

## Stage Configuration

### File: `src/config/stageConfig.ts`

Control which stages appear and in what order:

```typescript
export const stages: Stage[] = [
  {
    id: 'intro',
    component: 'IntroStage',
    title: 'Welcome',
    config: {
      autoAdvance: true,           // Automatically go to next stage
      autoAdvanceDelay: 5000,      // Delay in milliseconds
      textBlocks: [                // Custom text for this stage
        "Welcome to {{name}}'s special day!",
        "Get ready for an amazing journey!"
      ]
    }
  },
  
  // Enable/disable stages by commenting out:
  // {
  //   id: 'balloon-game',
  //   component: 'BalloonGame', 
  //   title: 'Pop the Balloons!',
  //   config: {
  //     goalCount: 20,           // Balloons to pop to win
  //     timeLimit: 90            // Game time in seconds
  //   }
  // },
  
  // Add your stages here...
]
```

### Stage Properties

Each stage can have:
- `id`: Unique identifier
- `component`: React component name
- `title`: Display title
- `config`: Stage-specific settings
  - `autoAdvance`: Auto-progress to next stage
  - `autoAdvanceDelay`: Delay before auto-advance
  - `textBlocks`: Custom text arrays
  - `goalCount`: For games
  - `timeLimit`: For timed games

## Game Settings

### Balloon Pop Game

In the stage config:
```typescript
{
  id: 'balloon-game',
  component: 'BalloonGame',
  title: 'Pop the Balloons!',
  config: {
    goalCount: 15,              // Number of balloons to pop to win
    timeLimit: 60,              // Time limit in seconds
    balloonColors: [            // Custom balloon colors (optional)
      '#FF6B8B', '#5A3E7D', '#FFE66D', '#4ECDC4'
    ]
  }
}
```

### Memory Match Game

```typescript
{
  id: 'memory-game',
  component: 'MemoryGame',
  title: 'Memory Match',
  config: {
    gridSize: 4,                // 4x4 grid of cards
    timeLimit: 120,             // 2 minutes
    cardImages: [               // Custom card images
      '/photos/card1.jpg',
      '/photos/card2.jpg'
    ]
  }
}
```

### Trivia Game

```typescript
{
  id: 'trivia',
  component: 'TriviaGame',
  title: 'Birthday Trivia',
  config: {
    questions: [
      {
        question: "What's {{name}}'s favorite color?",
        options: ["Blue", "Pink", "Green", "Purple"],
        correct: 1,             // Index of correct answer (0-based)
        explanation: "{{name}} has always loved pink!"
      }
    ]
  }
}
```

## Content Customization

### Photos

Replace photos in the `public/photos/` directory:

```
public/
  photos/
    memory1.jpg              # Memory photos
    memory2.jpg
    memory3.jpg
    profile.jpg              # Main profile photo
    cake.jpg                 # Cake stage photo
    celebration.jpg          # Final celebration photo
```

### Memory Stage Content

In `birthdayConfig.ts`, customize memories:

```typescript
memories: [
  {
    title: "Our First Adventure",
    description: "When we climbed that huge mountain together",
    image: "/photos/hiking.jpg",
    year: "2022"
  },
  {
    title: "Birthday Surprise",
    description: "The surprise party that went perfectly!",
    image: "/photos/party.jpg", 
    year: "2023"
  }
]
```

### Custom Text Content

Most stages accept custom text through `textBlocks`:

```typescript
config: {
  textBlocks: [
    "Custom message for {{name}}",
    "Another personalized message about {{hobby}}",
    "Celebrating your {{trait}} personality!"
  ]
}
```

## Visual Styling

### Fonts

Change fonts in `src/styles/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;700&display=swap');

:root {
  --font-family: 'YourFont', sans-serif;
}
```

### Animations

Customize animations in stage components. Example in `BalloonGame.tsx`:

```tsx
// Balloon entrance animation
initial={{ scale: 0, y: 100, opacity: 0 }}
animate={{ scale: 1, y: 0, opacity: 1 }}
transition={{ duration: 0.5 }}

// Hover effects
whileHover={{ scale: 1.15, y: -5 }}
```

### Background Patterns

Add background patterns in `globals.css`:

```css
.birthday-container {
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(255, 107, 139, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(90, 62, 125, 0.1) 0%, transparent 50%);
}
```

## Adding New Stages

### 1. Create Component

Create a new file `src/components/stages/YourNewStage.tsx`:

```tsx
'use client'

import { Stage } from '@/config/stageConfig'
import birthdayConfig from '@/config/birthdayConfig'

interface YourNewStageProps {
  stage: Stage
  onComplete: () => void
  onNext: () => void
  onPrevious: () => void
  isCompleted: boolean
  canGoNext: boolean
  canGoPrevious: boolean
}

export default function YourNewStage({ 
  stage, 
  onComplete, 
  onNext 
}: YourNewStageProps) {
  return (
    <div className="text-center py-8">
      <div className="birthday-title">
        Your New Stage Title
      </div>
      
      <div className="birthday-text mb-8">
        Custom content for {birthdayConfig.name}
      </div>
      
      <button 
        onClick={onNext}
        className="birthday-button"
      >
        Continue
      </button>
    </div>
  )
}
```

### 2. Register Component

In `src/components/stages/StageRouter.tsx`, add your component:

```tsx
import YourNewStage from './YourNewStage'

const stageComponents = {
  IntroStage,
  BalloonGame,
  MemoryStage,
  YourNewStage,          // Add your component here
  // ... other components
}
```

### 3. Add to Stage Config

In `src/config/stageConfig.ts`:

```typescript
{
  id: 'your-new-stage',
  component: 'YourNewStage',
  title: 'Your New Stage',
  config: {
    // Your custom config options
  }
}
```

## Common Customizations

### Change Stage Order

Reorder stages in `stageConfig.ts`:

```typescript
export const stages: Stage[] = [
  { id: 'intro', component: 'IntroStage', title: 'Welcome' },
  { id: 'balloon-game', component: 'BalloonGame', title: 'Games' },
  { id: 'memories', component: 'MemoryStage', title: 'Memories' },
  // Move stages around as needed
]
```

### Skip Stages

Comment out stages you don't want:

```typescript
// { id: 'trivia', component: 'TriviaGame', title: 'Trivia' },
```

### Modify Game Difficulty

```typescript
// Easy balloon game
{ 
  id: 'balloon-game',
  config: { goalCount: 10, timeLimit: 90 }
},

// Hard balloon game  
{
  id: 'balloon-game', 
  config: { goalCount: 25, timeLimit: 45 }
}
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Manual Build

```bash
npm run build
npm start
```

### Environment Variables

For production, set:

```bash
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

## Troubleshooting

### Common Issues

**Fonts not loading properly:**
- Check Google Fonts import in `globals.css`
- Verify font weights are available

**Images not showing:**
- Ensure images are in `public/photos/`
- Check file paths in config
- Verify image formats (jpg, png, webp)

**Stages not appearing:**
- Check component name matches in `StageRouter.tsx`
- Verify stage config syntax
- Check browser console for errors

**Games not working:**
- Check game config parameters
- Verify game hooks are imported correctly
- Test in development mode first

### Getting Help

1. Check browser console for errors
2. Verify all config files have correct syntax
3. Test changes incrementally
4. Use React Developer Tools for debugging

## Quick Checklist

- [ ] Updated `birthdayConfig.ts` with personal info
- [ ] Replaced photos in `public/photos/`
- [ ] Customized stage order in `stageConfig.ts`
- [ ] Updated theme colors
- [ ] Tested all stages work
- [ ] Deployed to production

Happy customizing! 🎉 