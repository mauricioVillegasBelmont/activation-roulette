export type VideoKeys = 'hold' | 'spin' | 'end' | 'stage';


export interface VideoState {
  currentVideo: string|null;
  loadedVideos: Set<string>;
  variant: VideoKeys;
}

export interface VideoAction {
  type:
    | 'SET_VARIANT'
    | 'SET_CURRENT_VIDEO'
    | 'ADD_LOADED_VIDEO';
  payload: string;
}

export interface VideoBGContextType {
  state: VideoState;
  dispatch: React.Dispatch<VideoAction>;
}