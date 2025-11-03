// import { useEffect } from 'react';
// import { VideoProvider } from '../context/VideoProvider';
import { useVideo } from './index';

export const useVideoControls = () => {
  const { state, dispatch } = useVideo();

  const setVariant = (variant: 'hold' | 'spin' | 'end' | 'stage') => {
    dispatch({ type: 'SET_VARIANT', payload: variant });
  };

  const setCurrentVideo = (videoUrl: string) => {
    dispatch({ type: 'SET_CURRENT_VIDEO', payload: videoUrl });
  };

  const addLoadedVideo = (videoUrl: string) => {
    dispatch({ type: 'ADD_LOADED_VIDEO', payload: videoUrl });
  };

  return {
    ...state,
    setVariant,
    setCurrentVideo,
    addLoadedVideo,
  };
};