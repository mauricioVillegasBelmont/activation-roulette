import React, { useReducer, useEffect, useRef } from 'react';
import { VideoContext } from './index';
import { videoReducer } from './Reducer';
import { type VideoState } from '../types';
import { useStore } from 'src/store';


const preloadVideo = (id: string, src: string) => {
  if (document.getElementById(id) || src==='') return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'preload';
  link.as = 'fetch';
  link.href = src;
  document.head.appendChild(link);
};

interface VideoProviderProps {
  children: React.ReactNode;
}

const initialVideoState: VideoState = {
  currentVideo: null,
  variant:  'hold',
  loadedVideos: new Set(),
};

export const VideoProvider: React.FC<VideoProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, initialVideoState);
  const stateRef = useRef(state);
  stateRef.current = state;
  
  const { config } = useStore();
  const videoMap = config?.animatedBackground || {
    hold: '/video/hold.webm',
    spin: '/video/spin.mp4',
    end: '/video/end.webm',
    stage: '/video/stage.webm',
  };

  // Precargar videos cuando el componente se monta
  useEffect(() => {
    Object.entries(videoMap).forEach(([key, src]) => {
      setTimeout(() => {
        preloadVideo(key, src);
        dispatch({ type: 'ADD_LOADED_VIDEO', payload: src });
      }, 50);
    });
  },[videoMap]);

  useEffect(() => {
    // Precargar el video actual inmediatamente
    if (state.currentVideo && !stateRef.current.loadedVideos.has(state.currentVideo)) {
      preloadVideo(state.variant, state.currentVideo);
      dispatch({ type: 'ADD_LOADED_VIDEO', payload: state.currentVideo });
    }
  }, [state.currentVideo, state.variant]); // Removed state.loadedVideos to prevent infinite loop

  // Update currentVideo when variant changes using the config's videoMap
  useEffect(() => {
    if (videoMap && videoMap[state.variant]) {
      dispatch({ 
        type: 'SET_CURRENT_VIDEO', 
        payload: videoMap[state.variant] 
      });
    }
  }, [state.variant, videoMap]);

  return (
    <VideoContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoContext.Provider>
  );
};