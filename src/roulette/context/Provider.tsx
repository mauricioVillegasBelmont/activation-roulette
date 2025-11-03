import React, { useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { rouletteReducer, initialRouletteState } from 'roulette/context/reducer';
import type{ RouletteOption } from 'roulette/types';
import { shuffleArray, intercalarArrays } from 'utils/shuffleArray';
import RouletteContext from './Context';

import { useStore } from 'store/index';

interface RouletteProviderProps {
  children: React.ReactNode;
}

export const RouletteProvider: React.FC<RouletteProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(rouletteReducer, initialRouletteState);
  const { config } = useStore();

  // Inicializar opciones de la ruleta desde la configuración
  useEffect(() => {
    if (config) {
      // Premios
      const prizes = config.prizes.map((prize, index) => ({
        id: uuidv4(),
        type: 'prize' as const,
        label: prize.label || `Prize ${index + 1}`,
        description: prize.description,
      }));
      // Desafíos
      const challenges = config.challenges.map((challenge, index) => ({
        id: uuidv4(),
        type: 'challenge' as const,
        label: challenge.label || `Challenge ${index + 1}`,
        description: challenge.description,
      }));
      // Intentos fallidos
      const miss = Array(config.miss_attempt).fill(null).map((_, index) => ({
        id: uuidv4(),
        type: 'miss' as const,
        label: `Miss ${index + 1}`,
        description: 'Try again!',
      }));
      // Reintentos
      const retry = Array(config.retry_attempt).fill(null).map((_, index) => ({
        id: uuidv4(),
        type: 'retry' as const,
        label: `Retry ${index + 1}`,
        description: 'One more chance!',
      }));
      const options: RouletteOption[] = [...intercalarArrays(
        config.shuffle.includes('prizes')?shuffleArray(prizes):prizes,
        config.shuffle.includes('challenges')?shuffleArray(challenges):challenges,
        miss,
        retry,
      )];
      dispatch({ type: 'SET_OPTIONS', payload: options });
    };
  }, [config]);

  const getOptionLenght = (type: RouletteOption['type'] = "prize")=>{
    return (state.options.filter((arr)=> arr.type === type)).length
  }
  const getRandomOptionIndex = () => {
    return Math.floor(Math.random() * state.options.length);
  }
  const getDelayTime = ()=>{
    return (config?.delayTime || 1000)* (1+(Math.random()))
  }
  const clearPrevResult = () => {
    dispatch({ type: 'CLEAR_RESULT' });
  };


  const spin = () => {
    if (state.isSpinning || state.options.length === 0) return;
    const delayTime = getDelayTime();
    const randomIndex = getRandomOptionIndex();
    const result = state.options[randomIndex];
    dispatch({ type: 'START_SPIN', payload: {
        result: result,
        delayTime:delayTime
      }
    });
  };
  const stopSpin = () => {
    dispatch({ type: 'STOP_SPIN' });
  };


  const forcePrize = () => {
    if (state.isSpinning || getOptionLenght() === 0) return;

    // Encontrar el primer premio
    const prizeIndex = state.options.findIndex(option => option.type === 'prize');
    if (prizeIndex !== -1) {

      dispatch({ type: 'START_SPIN', payload:
        {
          result: state.options[prizeIndex],
          delayTime:getDelayTime()
        }
      });
    }
  };

  const forceChallenge = () => {
    if (state.isSpinning || getOptionLenght('challenge') === 0) return;

    // Encontrar el primer desafío
    const delayTime = getDelayTime()
    const challengeIndex = state.options.findIndex(option => option.type === 'challenge');
    if (challengeIndex !== -1) {
      const result = state.options[challengeIndex];
      dispatch({ type: 'START_SPIN', payload: {
          result: result,
          delayTime:delayTime
        }
      });
    }
  };

  const forceEnd = () => {
    dispatch({ type: 'GAME_OVER' });
    const gameOverEvent = new CustomEvent('finishGame');
    window.dispatchEvent(gameOverEvent);
  };

  const removeOption = (id: string) => {
    dispatch({ type: 'REMOVE_OPTION', payload: id });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <RouletteContext.Provider
      value={{
        ...state,
        spin,
        stopSpin,
        forcePrize,
        forceChallenge,
        forceEnd,
        clearPrevResult,
        removeOption,
        reset,
      }}
    >
      {children}
    </RouletteContext.Provider>
  );
};