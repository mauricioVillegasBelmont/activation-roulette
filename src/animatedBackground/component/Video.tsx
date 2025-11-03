import React, { useState } from 'react';

interface VideoProps {
  src: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
  style?: React.CSSProperties | string | undefined;
}

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
  className = '',
  style
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoadStart = () => {
    setLoading(true);
    setError(false);
  };

  const handleLoadedData = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
    console.error(`Error loading video: ${src}`);
  };

  return (
    <>
      {loading && (
        <div className={`loading-container ${className}`}>
          <div className="loading-spinner">Cargando video...</div>
        </div>
      )}
      {error && (
        <div className={`error-container ${className}`}>
          <div className="error-message">Error al cargar el video</div>
        </div>
      )}
      <div className={`video-container ${className}${loading || error ? ' hidden' : ''}`}>
        <video
          autoPlay={autoPlay}
          playsInline={autoPlay}
          loop={loop}
          muted={muted}
          controls={controls}
          preload="metadata"
          onLoadedData={handleLoadedData}
          onLoadStart={handleLoadStart}
          onError={handleError}
          className={`video-element  ${className}`}
          {...(style ? { style: style as React.CSSProperties } : {})}

        >
          <source src={src} type={src.endsWith('.mp4') ? 'video/mp4' : src.endsWith('.webm') ? 'video/webm' : undefined} />
        </video>
      </div>
    </>
  );
};

export default Video;
