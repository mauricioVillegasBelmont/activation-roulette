import { useContext } from "react";
import { VideoContext } from "animatedBackground/context";

export const useVideo = () => {
	const context = useContext(VideoContext);
	if (!context) {
		throw new Error("useVideo must be used within a VideoProvider");
	}
	return context;
};
