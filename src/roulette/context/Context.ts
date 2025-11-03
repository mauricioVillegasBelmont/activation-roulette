import { createContext } from 'react';
import type{ RouletteState } from 'roulette/types';

interface RouletteContextType extends RouletteState {
  spin: () => void;
  stopSpin: () => void;
  forcePrize: () => void;
  forceChallenge: () => void;
  forceEnd: () => void;
  clearPrevResult: () => void;
  removeOption: (index: string) => void;
  reset: () => void;
}

const RouletteContext = createContext<RouletteContextType | undefined>(undefined);

export default RouletteContext;