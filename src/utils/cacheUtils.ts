// Helper function to clear video cache when config changes
export const clearVideoCache = async (): Promise<void> => {
  if ('serviceWorker' in navigator && 'controller' in navigator.serviceWorker) {
    const sw = navigator.serviceWorker.controller;
    if (sw) {
      sw.postMessage({ type: 'CLEAR_VIDEO_CACHE' });
    }
  }
};

// Helper function to precache specific video assets
export const precacheVideos = async (videoUrls: string[]): Promise<void> => {
  // This function can be used to manually trigger caching of specific videos
  // In a real implementation, this would send a message to the SW to precache specific URLs
  if ('serviceWorker' in navigator && 'controller' in navigator.serviceWorker) {
    const sw = navigator.serviceWorker.controller;
    if (sw) {
      // We could implement more sophisticated precaching strategies here
      console.log('Precaching videos:', videoUrls);
    }
  }
};