export type VideoKeys = "hold" | "spin" | "end" | "stage";
export type VideoMap = Record<VideoKeys, string>;
export interface VideoState {
	videoMap: VideoMap | object;
	currentVideo: string | null;
	loadedVideos: Set<string>;
	variant: VideoKeys;
}

export interface VideoAction {
	type:
		| "SET_VIDEO_MAP"
		| "SET_VARIANT"
		| "SET_CURRENT_VIDEO"
		| "ADD_LOADED_VIDEO";
	payload: string | VideoMap;
}

export interface VideoBGContextType {
	state: VideoState;
	dispatch: React.Dispatch<VideoAction>;
}
