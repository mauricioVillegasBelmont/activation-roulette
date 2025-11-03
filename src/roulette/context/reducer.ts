import type{ RouletteState, RouletteAction } from 'roulette/types';

export const initialRouletteState: RouletteState = {
  options: [],
  delayTime: null,
  isSpinning: false,
  result: null,
  gameOver: false,
};

export const rouletteReducer = (state: RouletteState, action: RouletteAction): RouletteState => {
  switch (action.type) {
    case 'START_SPIN':
      return {
        ...state,
        ...action.payload,
        isSpinning: true,
      };
    case 'STOP_SPIN':
      return {
        ...state,
        isSpinning: false,
      };
    case 'REMOVE_OPTION':
      return {
        ...state,
        options: state.options.filter((arr) => arr.id !== action.payload),
      };
    case 'SET_OPTIONS':
      return {
        ...state,
        options: action.payload,
      };
    case 'CLEAR_RESULT':
      return {
        ...state,
        result: null,
      };
    case 'GAME_OVER':
      return {
        ...state,
        gameOver: true,
      };
    case 'RESET':
      return initialRouletteState;
    default:
      return state;
  }
};