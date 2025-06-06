# 🎉 Birthday Experience - Assets Guide

This guide explains what assets you need to add to complete your birthday experience!

## 📸 Profile Photo
**Location:** `public/photos/profile-photo.jpg`

Add her profile photo to this location. The image will automatically be displayed as a circular photo at the top of the special letter. If the image fails to load, it will show a placeholder emoji instead.

**Recommended:** Square image, any size (will be resized to 96x96px or 128x128px on mobile/desktop)

## 🎵 Custom Soundtracks  

### Letter Soundtrack
**Location:** `public/audio/letter-soundtrack.mp3`

Add a custom soundtrack that will play when the special letter is unlocked. The audio will:
- Play automatically when the letter opens (may be blocked by browser autoplay policies)
- Loop continuously while the letter is open
- Play at 50% volume
- Show a console message if autoplay is prevented

**Recommended:** MP3 format, moderate length (1-3 minutes since it loops)

### Fireworks Soundtrack
**Location:** `public/audio/fireworks-soundtrack.mp3`

Add firework/celebration sounds that will play when blowing out the birthday candles. The audio will:
- Play automatically when candles are blown out
- Play at 60% volume for 5 seconds with firework animation
- Create an amazing celebration moment
- Also plays when unlocking the special letter (before letter soundtrack)

**Recommended:** MP3 format, firework sounds or celebratory music (10-15 seconds)

### Background Soundtrack
**Location:** `public/audio/background-soundtrack.mp3`

Add background music that plays throughout the entire experience. The audio will:
- Start automatically after the loading screen
- Loop continuously at 30% volume
- Stop automatically before the final letter stage
- Can be muted/unmuted with the cute audio controller button

**Recommended:** MP3 format, upbeat birthday/celebration music (2-4 minutes since it loops)

## 🎵 Spotify Gift Code
**Current Location:** `src/components/stages/WishesStage.tsx` (line ~41)

The Spotify gift code is currently set to: `SPOTIFY-GIFT-123456-ABCDEF`

To change it:
1. Open `src/components/stages/WishesStage.tsx`
2. Find the `handleCopyCode` function (around line 41)
3. Replace `'SPOTIFY-GIFT-123456-ABCDEF'` with your actual gift code

```javascript
const handleCopyCode = () => {
  const giftCode = 'YOUR-ACTUAL-SPOTIFY-GIFT-CODE-HERE'
  // ... rest of function
}
```

## 🎯 Custom Trivia Questions
**Location:** `src/config/birthdayConfig.ts`

The trivia questions have been updated with your personal questions about Nero! They include:
- How long you've been friends (April 5, 2022)
- Where Vienna is located (Austria)
- Which idol lived in California (L.Joe from Teen Top)
- What drink Nero asked you to try in UAE (Thai Ice tea)
- What you DIDN'T like about the balcony talks (AC Compressor)

**Important:** You must score MORE than 3 correct answers to unlock the next stage!

## ✨ Trait Descriptions System
**Location:** `src/config/birthdayConfig.ts`

Each personality trait now has its own individual description! Current traits and descriptions:
- **Funny:** "You're one of the funniest and creatively deranged person I know and your allegations of me stealing your jokes aren't all just allegations."
- **creative:** "Your creative mind always finds the most unique and brilliant solutions to everything!"
- **kind-hearted:** "Your genuine kindness and compassion touch everyone around you in the most beautiful way."
- **Hard-Working:** "Your dedication and work ethic inspire everyone - you never give up on your goals!"
- **inspiring:** "You have this amazing ability to motivate and uplift others just by being yourself."

To customize: Edit the `traitDescriptions` object in birthdayConfig to change any description!

## ⌨️ Secret Dev Tools Shortcut
**Keyboard Shortcut:** `Ctrl + Shift + D`

This keyboard combination will toggle the dev tools (skip buttons, back buttons, stage jumping) on or off. Perfect for testing or showing off the experience without visible dev controls!

## ✨ Features Added
- ✅ Circular profile photo on the letter
- ✅ Custom soundtrack when letter opens  
- ✅ Love hearts animation (12 floating hearts for 10 seconds)
- ✅ Secret keyboard shortcut for dev tools (`Ctrl + Shift + D`)
- ✅ Spotify gift code modal with copy functionality
- ✅ Custom trivia questions about your friendship with Nero
- ✅ Fixed trivia progression (must score >3 to continue)
- ✅ Skip game dev buttons controlled by secret shortcut
- ✅ Removed "Complete Experience" button from final page
- ✅ Memory Lane now displays actual photos from public/photos/
- ✅ Fixed trivia "Try Again" button functionality
- ✅ Added "Try Again" buttons to all games (Memory & Balloon)
- ✅ Firework animation and soundtrack on cake blow-out
- ✅ Fixed trait descriptions - each trait now has unique description
- ✅ Fixed text color issues in BalloonGame
- ✅ Confetti animation when unlocking special letter
- ✅ Firework sound effects for letter unlock
- ✅ Live birthday timer showing time since July 7th, 2002
- ✅ Background soundtrack system throughout experience
- ✅ Cute mute/unmute audio controller button

## 📸 Memory Lane Photos
**Location:** `public/photos/`

Add photos to display in the Memory Lane section. The stageConfig is set up to look for:
- `earrings.jpg`
- `fatty.jpg` 
- `purple-pink.jpg`
- `soft.jpg`

You can change these filenames in `src/config/stageConfig.ts` in the Memory Lane stage media array.

## 🕒 Birthday Timer
**Location:** Top-left corner of screen

A beautiful live timer that shows exactly how long Aisha has been blessing this world:
- **Birth Date:** July 7th, 2002
- **Display:** Days, Hours, Minutes, Seconds (live updating)
- **Style:** Pink-purple gradient with cute rounded design
- **Message:** "✨ Blessing this world for ✨"

## 🎵 Audio Controller
**Location:** Top-right corner of screen

A cute mute/unmute button that controls all audio:
- **Muted:** Shows 🔇 icon
- **Unmuted:** Shows 🎵 icon
- **Function:** Controls background music (not letter-specific audio)
- **Style:** Glassy white button with hover animations

## 📁 File Structure
```
public/
├── photos/
│   ├── profile-photo.jpg        # Profile photo for letter
│   ├── earrings.jpg            # Memory lane photos
│   ├── fatty.jpg               # (change names as needed)
│   ├── purple-pink.jpg         # 
│   └── soft.jpg                #
└── audio/
    ├── background-soundtrack.mp3 # Main experience music
    ├── letter-soundtrack.mp3     # Letter-specific music
    └── fireworks-soundtrack.mp3  # Celebration sounds
```

Enjoy the enhanced birthday experience! 🎂✨ 