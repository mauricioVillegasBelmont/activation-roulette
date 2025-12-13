import React, { useState, useEffect, useRef } from "react";

interface VideoProps {
	src: string;
	autoPlay?: boolean;
	loop?: boolean;
	muted?: boolean;
	controls?: boolean;
	className?: string;
	style?: React.CSSProperties | string | undefined;
}

const Video: React.FC<VideoProps> = ({
	src,
	autoPlay = false,
	loop = false,
	muted = false,
	controls = true,
	className = "",
	style,
}) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);

	// Reset loading/error state when src changes
	useEffect(() => {
		setLoading(true);
		setError(false);
	}, [src]);

	const handleLoadStart = () => {
		setLoading(true);
		setError(false);
	};

	const handleLoadedData = () => {
		setLoading(false);
		setError(false);
	};

	const handleCanPlay = () => {
		setLoading(false);
		setError(false);
	};

	const handleLoadedMetadata = () => {
		setLoading(false);
		setError(false);
	};

	const handleError = () => {
		setLoading(false);
		setError(true);
		console.error(`Error loading video: ${src}`);
	};

	// Check if video is already loaded when component mounts
	useEffect(() => {
		const video = videoRef.current;
		if (video) {
			// Check if video is already loaded or loading
			if (video.readyState >= 2) { // HAVE_CURRENT_DATA
				setLoading(false);
			} else {
				// Set up event listeners in case video wasn't fully loaded
				const checkReadyState = () => {
					if (video.readyState >= 2) {
						setLoading(false);
						setError(false);
					}
				};

				video.addEventListener('canplay', checkReadyState);
				video.addEventListener('loadeddata', checkReadyState);

				// Clean up event listeners
				return () => {
					video.removeEventListener('canplay', checkReadyState);
					video.removeEventListener('loadeddata', checkReadyState);
				};
			}
		}
	}, []);

	return (
		<>
			{loading && (
				<div className={`loading-container ${className}`}>
					<div className="loading-spinner">Cargando video...</div>
				</div>
			)}
			{error && (
				<div className={`error-container ${className}`}>
					<div className="error-message">Error al cargar el video {src}</div>
				</div>
			)}
			<div
				className={`video-container ${className}${
					loading || error ? " hidden" : ""
				}`}>
				<video
					ref={videoRef}
					autoPlay={autoPlay}
					playsInline={autoPlay}
					loop={loop}
					muted={muted}
					controls={controls}
					preload="metadata"
					onLoadStart={handleLoadStart}
					onLoadedData={handleLoadedData}
					onCanPlay={handleCanPlay}
					onLoadedMetadata={handleLoadedMetadata}
					onError={handleError}
					className={`video-element  ${className}`}
					{...(style ? { style: style as React.CSSProperties } : {})}>
					<source
						src={src}
						type={
							src.endsWith(".mp4")
								? "video/mp4"
								: src.endsWith(".webm")
								? "video/webm"
								: undefined
						}
					/>
				</video>
			</div>
		</>
	);
};

export default Video;
