import type {
	VideoMap,
	VideoState,
	VideoAction,
	VideoKeys,
} from "animatedBackground/types";

export const videoReducer = (
	state: VideoState,
	action: VideoAction
): VideoState => {
	switch (action.type) {
		case "SET_VIDEO_MAP": {
			return {
				...state,
				videoMap: action.payload as VideoMap,
			};
		}
		case "SET_VARIANT": {
			return {
				...state,
				variant: action.payload as VideoKeys,
			};
		}
		case "SET_CURRENT_VIDEO": {
			return {
				...state,
				currentVideo: action.payload as string,
			};
		}
		case "ADD_LOADED_VIDEO": {
			const newLoadedVideos = new Set(state.loadedVideos);
			newLoadedVideos.add(action.payload as string);
			return {
				...state,
				loadedVideos: newLoadedVideos,
			};
		}
		default: {
			return state;
		}
	}
};
