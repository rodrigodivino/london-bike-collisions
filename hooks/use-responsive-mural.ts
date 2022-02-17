import {RefObject, useEffect, useState} from "react";

/**
 * Get the size state of an SVG or Canvas element.
 *  The SVG or Canvas must be a child of HTMLDivElement
 * @param muralRef - The SVG or Canvas to listen to changes in the parent and to obtain the size
 * @returns [width, height] - The state of the SVG or Canvas size
 */
export const useResponsiveMural = (muralRef: RefObject<SVGSVGElement | HTMLCanvasElement>) => {
  const [width, setWidth] = useState<number>(100);
  const [height, setHeight] = useState<number>(100);
  
 
  useEffect(() => {
    if(!muralRef.current) return;
  
    setWidth(muralRef.current.clientWidth);
    setHeight(muralRef.current.clientHeight);
    
    const resizeObserver = new ResizeObserver(() => {
      if(!muralRef.current) return;
      
      setWidth(muralRef.current.clientWidth);
      setHeight(muralRef.current.clientHeight);
    });

    if(muralRef.current.parentElement && muralRef.current.parentElement.tagName === 'DIV') {
      resizeObserver.observe(muralRef.current.parentElement);
    } else {
      throw new Error('useResponsiveSVG requires the SVG or Canvas to be a child of HTMLDivElement')
    }

    return () => {
      resizeObserver.disconnect();
    }
  }, [muralRef])
  
  
  return [width, height]
}
