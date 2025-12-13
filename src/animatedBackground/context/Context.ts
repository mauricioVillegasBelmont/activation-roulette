import { createContext } from "react";
import type { VideoBGContextType, VideoState } from "animatedBackground/types";

export const initialVideoState: VideoState = {
	videoMap: {},
	currentVideo: null,
	variant: "hold",
	loadedVideos: new Set(),
};

const initialVideoContextState: VideoBGContextType = {
	state: initialVideoState,
	dispatch: () => {},
};

const VideoContext = createContext<VideoBGContextType>(
	initialVideoContextState
);
export default VideoContext;
