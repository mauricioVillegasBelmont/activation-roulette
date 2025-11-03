import React, { lazy, Suspense, useEffect, useState } from 'react';
import './AnimatedBackground.css';
import { useVideoControls } from '../hooks/useVideoControls';

const Video = lazy(() => import('./Video'));

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  variant?: 'hold' | 'spin' | 'end' | 'stage';
  speed?: 'slow' | 'medium' | 'fast';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  variant = 'hold',
}) => {
  const { currentVideo, setVariant } = useVideoControls();
  const [videos, setVideos] = useState<string[]>([]);

  useEffect(() => {
    if (currentVideo) {
      setVideos(prevVideos => {
        const newSet = new Set(prevVideos);
        newSet.add(currentVideo);
        return Array.from(newSet);
      });
    }
  }, [currentVideo]);

  useEffect(() => {
    if (videos.length > 1) {
      const timer = setTimeout(() => {
        setVideos(prevVideos => prevVideos.slice(1));
      }, 1100);
      return () => clearTimeout(timer);
    }
  }, [videos.length]);

    // Update the variant when prop changes
  useEffect(() => {
    setVariant(variant);
  }, [variant]);


  const baseClasses = 'animated-background';
  const classes = `${baseClasses}`;

  return (
    <div className={classes}>
      <Suspense fallback={
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
            className={`absolute w-full h-full object-cover ${videos.length>1 && index ==0?"animate__animated animate__fadeOut":"" }`}
            controls={false}
          />
        ))}
        {children}
      </Suspense>
    </div>
  );
};

export default AnimatedBackground;