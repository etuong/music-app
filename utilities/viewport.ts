import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

export enum BreakpointPixel {
  Widescreen = 1300,
  Tablet = 768,
  Mobile = 414,
}

type ViewportDim = 'widescreen' | 'desktop' | 'tablet' | 'mobile';

export const getViewportWidth = (): ViewportDim => {
  const windowWidth = window.innerWidth;
  switch (true) {
    case windowWidth >= BreakpointPixel.Widescreen:
      return 'widescreen';
    case windowWidth > BreakpointPixel.Tablet:
      return 'desktop';
    case windowWidth > BreakpointPixel.Mobile:
      return 'tablet';
    default:
      return 'mobile';
  }
};

export function useViewportWidth() {
  const [viewportWidth, setViewportWidth] = useState<ViewportDim>(
    getViewportWidth()
  );

  const handleResize = () => {
    const newViewportWidth = getViewportWidth();
    setViewportWidth(newViewportWidth);
  };

  useEffect(() => {
    const debouncedOnResize = debounce(handleResize, 500);
    window.addEventListener('resize', debouncedOnResize);
    return () => window.removeEventListener('resize', debouncedOnResize);
  });

  return { viewportWidth, handleResize };