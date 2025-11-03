# Activation Roulette

An interactive roulette wheel application for prizes and challenges built with React, TypeScript, and Vite. The application features a customizable configuration system, animated backgrounds, and a responsive canvas-based roulette wheel.

## Table of Contents

- [Features](#features)
- [Configuration](#configuration)
- [Schema Reference](#schema-reference)
- [Building and Running](#building-and-running)
- [Project Structure](#project-structure)

## Features

- Interactive roulette wheel with canvas-based rendering
- Configurable prizes and challenges
- Animated backgrounds that change based on game state (hold, spin, end, stage)
- Force options for prizes, challenges, and ending the game
- Miss attempts and retry attempts management
- Customizable colors for different game elements
- Responsive design that works on various screen sizes
- Local storage management for configuration persistence
- Service worker for caching and offline functionality
- Custom events for spin results and game end
- Hold state functionality to pause and resume gameplay

## Configuration

The application is configured through JSON files that are loaded from the `public` folder. The main configuration file is specified via the `g` query parameter in the URL (e.g., `?g=test` will load `public/test.json`).

### Schema Reference

```json
{
  "id": "string",
  "passwords": {
    "forcePrice": "string",
    "forceChallenge": "string",
    "forceEnd": "string"
  },
  "prizes": [
    {
      "label": "string",
      "description": "string"
    }
  ],
  "challenges": [
    {
      "label": "string",
      "description": "string"
    }
  ],
  "shuffle": [
    "challenges",
    "prizes"
  ],
  "animatedBackground": {
    "hold": "string (path to video)",
    "spin": "string (path to video)",
    "end": "string (path to video)",
    "stage": "string (path to video)"
  },
  "miss_attempt": "number",
  "retry_attempt": "number",
  "delayTime": "number (milliseconds)",
  "colors": {
    "prize": "string (hex color)",
    "challenge": "string (hex color)",
    "miss": "string (hex color)",
    "retry": "string (hex color)",
    "border": "string (hex color)"
  }
}
```

#### Field Descriptions

- **id**: Unique identifier for the configuration
- **passwords**: Passwords required to force specific game outcomes (in development process)
  - `forcePrice`: Password to force a prize result
  - `forceChallenge`: Password to force a challenge result
  - `forceEnd`: Password to force the game to end
- **prizes**: Array of prize options with labels and descriptions
- **challenges**: Array of challenge options with labels and descriptions
- **shuffle**: Array specifying which sections should be shuffled
- **animatedBackground**: Paths to videos for different game states
  - `hold`: Video shown when the game is paused
  - `spin`: Video shown during spinning
  - `end`: Video shown when the game ends
  - `stage`: Video shown during the stage state
- **miss_attempt**: Number of miss attempts allowed before triggering specific behavior
- **retry_attempt**: Number of retry attempts allowed
- **delayTime**: Delay in milliseconds before showing the result after spinning
- **colors**: Hex color codes for different game elements
  - `prize`: Color for prize segments
  - `challenge`: Color for challenge segments
  - `miss`: Color for miss segments
  - `retry`: Color for retry segments
  - `border`: Color for segment borders

## Building and Running

- To run in development mode: `pnpm dev`
- To build for production: `pnpm build`
- To preview the build: `pnpm preview`
- To deploy (to GitHub Pages): `pnpm deploy`

## Project Structure

```
.
├── public
│   └── test.json
└── src/
    ├── assets/
    ├── module/
    │   ├── assets/
    │   ├── components/
    │   ├── context/
    │   ├── hooks/
    │   ├── types/
    │   └── utils/
    ├── types/
    ├── utils/
    ├── app.tsx
    └── main.tsx
```

### Modules:
1. **Store Module** (`src/store`): Manages application state and configuration using React Context and useReducer.

2. **Roulette Module** (`src/roulette`): Implements the roulette wheel functionality with canvas rendering and spin logic.

3. **GUI Module** (`src/gui`): UI components including buttons, modals, and text inputs.

4. **Animated Background Module** (`src/animatedBackground`): Provides animated backgrounds based on game state.

## Technologies Used

- React (v19.2.0)
- TypeScript
- Vite
- Tailwind CSS
- React DOM
- uuid
- animate.css
- react-confetti-explosion
- Workbox (for service worker functionality)