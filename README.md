# PKMN_BTTL - Pokemon Battle Game

A nostalgic Pokemon-style battle game that reimagines classic gaming mechanics through an immersive text interface with Bitcoin rewards through BitVMX integration.

## Overview

PKMN_BTTL is an engaging Pokemon battle simulator where players select one of three Pokemon (Pikachu, Snorlax, or Machoke) to battle against Charizard. Choose wisely - only Pikachu can defeat Charizard and unlock the Bitcoin rewards through BitVMX!

## Game Features

- **Classic Pokemon Battle Interface**: Face-to-face battle layout with HP status boxes
- **Pokemon Selection**: Choose between Pikachu, Snorlax, and Machoke
- **Animated Sprites**: Animated GIFs for Machoke and Charizard with proper positioning
- **Battle Animations**: Text-based battle sequence with animated dots
- **Sound Effects**: Hit sounds during battle and victory sound when winning
- **Bitcoin Rewards via BitVMX**: Win the battle to unlock Bitcoin rewards
- **Responsive Design**: Works on all screen sizes with adaptive layouts
- **BitVMX Information**: Modal with details about BitVMX technology
- **Explorer Integration**: Direct link to BitVMX explorer after battle

## Game Flow

1. **Introduction**: Learn about the battle challenge and Bitcoin rewards
2. **Pokemon Selection**: Choose your Pokemon from the three options
3. **Battle**: Watch as your Pokemon battles against Charizard
4. **Results**: See if you've won or lost, and whether you've unlocked Bitcoin rewards
5. **Explorer**: Option to view the battle transaction on the BitVMX explorer

## Game Secret

**Spoiler Alert**: Only Pikachu can win against Charizard. Selecting Snorlax or Machoke will result in a loss. This is intentionally designed to simulate the type advantage that Electric-type Pokemon have against Flying/Fire-type Pokemon like Charizard.

## Technologies Used

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS for responsive layouts
- **State Management**: Zustand for game state management
- **Sound**: Browser Audio API for sound effects
- **Animations**: CSS animations and sprite animations
- **Deployment**: Hosted on Replit

## Project Structure

```
├── client/               # Frontend code
│   ├── public/           # Static assets (images, sounds)
│   │   ├── images/       # Game sprites and backgrounds
│   │   └── sounds/       # Game sound effects
│   └── src/              # React source code
│       ├── lib/          # Utilities and store
│       │   └── stores/   # Zustand state stores (battle, audio)
│       ├── App.tsx       # Main game component
│       ├── index.css     # Global styles
│       └── main.tsx      # Entry point
└── server/               # Minimal server for hosting
```

## How to Play

1. Click the "I WANT TO BATTLE FOR BITCOINS!" button to start
2. Optionally click "MORE ABOUT BITVMX" to learn about BitVMX technology
3. Select one of the three Pokemon (Pikachu, Snorlax, or Machoke)
4. Watch the battle unfold
5. See if you've won or unlocked Bitcoin rewards
6. Click "START OVER" to play again or "VIEW ON BITVMX EXPLORER" to see transaction details

## Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Credits

- Powered by BitVMX technology
- Pokemon concept and characters are property of Nintendo
- Developed with React, TypeScript, and Tailwind CSS
- Sprite animations sourced from Pokemon Showdown

## License

This project is for educational and entertainment purposes only.