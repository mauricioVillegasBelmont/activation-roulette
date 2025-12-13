import React, { lazy, Suspense, useEffect, useState } from "react";
import "./AnimatedBackground.css";
import { useVideoControls } from "animatedBackground/hooks";

const Video = lazy(() => import("./Video"));

interface AnimatedBackgroundProps {
	children: React.ReactNode;
	variant: "hold" | "spin" | "end" | "stage";
	speed?: "slow" | "medium" | "fast";
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
	children,
	variant = "hold",
}) => {
	const {
		variant: stateVariant,
		currentVideo,
		setVariant,
	} = useVideoControls();
	const [videos, setVideos] = useState<string[]>([]);

	useEffect(() => {
		if (currentVideo) {
			setVideos((prevVideos) => {
				const newSet = new Set(prevVideos);
				newSet.add(currentVideo);
				return Array.from(newSet);
			});
		}
	}, [currentVideo]);

	useEffect(() => {
		if (videos.length > 1) {
			const timer = setTimeout(() => {
				setVideos((prevVideos) => prevVideos.slice(1));
			}, 1100);
			return () => clearTimeout(timer);
		}
	}, [videos]);

	// Update the variant when prop changes
	useEffect(() => {
		if (variant === stateVariant) return;
		setVariant(variant);
	}, [setVariant, stateVariant, variant]);

	const baseClasses = "animated-background";
	const classes = `${baseClasses}`;

	return (
		<div className={classes}>
			<Suspense
				fallback={
					<div className="absolute w-full h-full bg-gray-800 flex items-center justify-center">
						<div className="text-white">Cargando video...</div>
					</div>
				}>
				{videos.map((videoUrl, index) => (
					<Video
						key={videoUrl}
						src={videoUrl}
						autoPlay={true}
						loop={true}
						muted={true}
						controls={false}
						className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
							videos.length > 1 && index == 0
								? "animate__animated animate__fadeOut opacity-0"
								: "opacity-100"
						}`}
					/>
				))}
				{children}
			</Suspense>
		</div>
	);
};

export default AnimatedBackground;
