export interface RouletteOption {
  id: string;
  type: 'prize' | 'challenge' | 'miss' | 'retry';
  label: string;
  description: string;
}

export interface RouletteConfig {
  prizes: string[];
  challenges: string[];
  missAttempt: number;
  retryAttempt: number;
  delayTime: number;
  colors: {
    prize: string;
    challenge: string;
    miss: string;
    retry: string;
    border: string;
  };
}

export interface RouletteState {
  options: RouletteOption[];
  isSpinning: boolean;
  result: RouletteOption | null;
  delayTime: number | null;
  gameOver: boolean;
}

export type RouletteAction =
  | { type: 'START_SPIN'; payload: {result:RouletteOption, delayTime:number} }
  | { type: 'STOP_SPIN'; }
  | { type: 'REMOVE_OPTION'; payload: string }
  | { type: 'CLEAR_RESULT'; }
  | { type: 'SET_OPTIONS'; payload: RouletteOption[] }
  | { type: 'GAME_OVER' }
  | { type: 'RESET' };