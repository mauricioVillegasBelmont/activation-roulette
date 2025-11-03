import { useContext } from 'react';

import {RouletteContext} from 'roulette/context';


export const useRoulette = () => {
  const context = useContext(RouletteContext);
  if (!context) {
    throw new Error('useRoulette must be used within a RouletteProvider');
  }
  return context;
};