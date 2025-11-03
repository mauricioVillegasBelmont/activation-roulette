import type{ StoreState, StoreAction } from 'store/types';
import { clearVideoCache } from 'utils/cacheUtils';

export const initialState: StoreState = {
  config: null,
  loading: false,
  error: null,
};

export const storeReducer = (state: StoreState, action: StoreAction): StoreState => {
  switch (action.type) {
    case 'SET_CONFIG':
      return {
        ...state,
        config: action.payload,
        loading: false,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'UPDATE_CONFIG':{
      const updatedConfig = state.config ? { ...state.config, ...action.payload } : null;

      // Check if animated background configuration has changed and clear video cache if needed
      if (state.config && updatedConfig && state.config.animatedBackground && updatedConfig.animatedBackground) {
        const hasVideoChanges = JSON.stringify(state.config.animatedBackground) !== JSON.stringify(updatedConfig.animatedBackground);
        if (hasVideoChanges) {
          clearVideoCache();
        }
      }

      return {
        ...state,
        config: updatedConfig,
      };
    }
    case 'DELETE_CONFIG':
      clearVideoCache(); // Clear cache when config is deleted
      return {
        ...state,
        config: null,
      };
    default:
      return state;
  }
};