import React, { useReducer, useEffect, useRef } from "react";
import { VideoContext } from "./index";
import { videoReducer } from "./Reducer";
import { useStore } from "store/hooks";
import { initialVideoState } from "animatedBackground/context";
import { preconnectVideo } from "animatedBackground/utils";
import type { VideoMap } from "animatedBackground/types";

interface VideoProviderProps {
	children: React.ReactNode;
}

export const VideoProvider: React.FC<VideoProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer(videoReducer, initialVideoState);
	const { config } = useStore();
	const stateRef = useRef(state);
	stateRef.current = state;

	// Precargar videos cuando el componente se monta
	useEffect(() => {
		if (!config) return;
		const ABGConfig = config.animatedBackground;
		dispatch({ type: "SET_VIDEO_MAP", payload: ABGConfig });
	}, [config]);

	useEffect(() => {
		Object.entries(state.videoMap).forEach(([key, src]) => {
			preconnectVideo(key, src);
			setTimeout(() => {
				dispatch({ type: "ADD_LOADED_VIDEO", payload: src });
			}, 10);
		});
	}, [state.videoMap]);

	useEffect(() => {
		if (
			state.currentVideo &&
			!stateRef.current.loadedVideos.has(state.currentVideo)
		) {
			dispatch({ type: "ADD_LOADED_VIDEO", payload: state.currentVideo });
		}
	}, [state.currentVideo, state.variant]);

	// Update currentVideo when variant changes using the config's videoMap
	useEffect(() => {
		if (
			state.videoMap &&
			typeof state.videoMap === "object" &&
			state.variant in state.videoMap
		) {
			// Safely access the video map property with type assertion
			const videoValue = (state.videoMap as VideoMap)[state.variant];
			if (typeof videoValue === "string") {
				dispatch({
					type: "SET_CURRENT_VIDEO",
					payload: videoValue,
				});
			}
		}
	}, [state.variant, state.videoMap]);

	return (
		<VideoContext.Provider value={{ state, dispatch }}>
			{children}
		</VideoContext.Provider>
	);
};
