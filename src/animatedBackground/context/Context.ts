import { createContext } from 'react';
import { type VideoBGContextType } from '../types';

const initialVideoState: VideoBGContextType = {
  state: {
    currentVideo: '/video/hold.mp4',
    loadedVideos: new Set(),
    variant: 'hold',
  },
  dispatch: () => {},
};

const VideoContext = createContext<VideoBGContextType>(initialVideoState);
export default VideoContext;