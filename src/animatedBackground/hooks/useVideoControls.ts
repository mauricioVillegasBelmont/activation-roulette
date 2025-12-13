import { useVideo } from "./index";
import type { VideoKeys, VideoMap } from "animatedBackground/types";

export const useVideoControls = () => {
	const { state, dispatch } = useVideo();

	const setVideoMap = (videoMap: VideoMap) => {
		dispatch({ type: "SET_VIDEO_MAP", payload: videoMap });
	};

	const setVariant = (variant: VideoKeys) => {
		dispatch({ type: "SET_VARIANT", payload: variant });
	};

	const setCurrentVideo = (videoUrl: string) => {
		dispatch({ type: "SET_CURRENT_VIDEO", payload: videoUrl });
	};

	const addLoadedVideo = (videoUrl: string) => {
		dispatch({ type: "ADD_LOADED_VIDEO", payload: videoUrl });
	};

	return {
		...state,
		setVideoMap,
		setVariant,
		setCurrentVideo,
		addLoadedVideo,
	};
};
