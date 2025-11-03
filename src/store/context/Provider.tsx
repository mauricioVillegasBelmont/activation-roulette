import React, { useReducer, useEffect } from 'react';
import { storeReducer, initialState } from 'src/store/context/Reducer';
import useStorage from 'store/hooks/useStorage';
import type{ Config } from 'store/types';
import StoreContext from 'store/context/StoreContext';

interface StoreProviderProps {
  children: React.ReactNode;
}


export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const { loadConfig, updateConfig, deleteConfig } = useStorage();
  // Obtener parámetro "g" de la URL
  const getUrlParam = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('g') || 'test';
  };

  // Cargar configuración al montar el componente
  useEffect(() => {
    const loadConfiguration = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });

      try {
        const configId = getUrlParam();
        const config = await loadConfig(configId);

        if (config) {
          dispatch({ type: 'SET_CONFIG', payload: config });
        } else {
          dispatch({ type: 'SET_ERROR', payload: 'Failed to load configuration' });
        }
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
      }
    };
    loadConfiguration();
  }, []);

  const handleUpdateConfig = (config: Partial<Config | null>) => {
    const configId = state.config?.id || getUrlParam();
    const updatedConfig = updateConfig(configId, config as Partial<Config>);

    if (updatedConfig) {
      dispatch({ type: 'SET_CONFIG', payload: updatedConfig });
    }
  };

  const handleDeleteConfig = () => {
    const configId = state.config?.id || getUrlParam();
    deleteConfig(configId);
    dispatch({ type: 'DELETE_CONFIG' });
  };

  return (
    <StoreContext.Provider
      value={{
        ...state,
        updateConfig: handleUpdateConfig,
        deleteConfig: handleDeleteConfig,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};