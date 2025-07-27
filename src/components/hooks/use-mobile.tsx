import { useState, useEffect } from 'react';

export const useIsMobile = (query: string = '(max-width: 768px)') => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Ensure window is defined (for server-side rendering compatibility)
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(query);
    
    // Set the initial state
    const handleResize = () => setIsMobile(mediaQuery.matches);
    handleResize();

    // Add listener for changes
    mediaQuery.addEventListener('change', handleResize);

    // Cleanup listener on component unmount
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, [query]);

  return isMobile;
};
