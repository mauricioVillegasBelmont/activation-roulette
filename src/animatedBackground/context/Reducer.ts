import { type VideoState, type VideoAction } from '../types';

const videoMap = {
  hold: '/video/hold.webm',
  spin: '/video/spin.mp4',
  end: '/video/end.webm',
  stage: '/video/stage.webm',
};

export const videoReducer = (state: VideoState, action: VideoAction): VideoState => {
  switch (action.type) {
    case 'SET_VARIANT':{
      const variant = action.payload as keyof typeof videoMap;
      return {
        ...state,
        variant: variant,
        currentVideo: videoMap[variant],
      };
    }
    case 'SET_CURRENT_VIDEO':{
      return {
        ...state,
        currentVideo: action.payload,
      };
    }
    case 'ADD_LOADED_VIDEO':{
      const newLoadedVideos = new Set(state.loadedVideos);
      newLoadedVideos.add((action.payload as string));
      return {
        ...state,
        loadedVideos: newLoadedVideos,
      };
    }
    default:{
      return state;
    }
  }
};