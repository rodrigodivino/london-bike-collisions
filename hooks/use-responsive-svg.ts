import {RefObject, useEffect, useState} from "react";

/**
 * Get the size state of an SVG element.
 *  The SVG must be a child of HTMLDivElement
 * @param svg - The SVG to listen to changes in the parent and to obtain the size
 * @returns [width, height] - The state of the SVG size
 */
export const useResponsiveSVG = (svg: RefObject<SVGSVGElement>) => {
  const [width, setWidth] = useState<number>(100);
  const [height, setHeight] = useState<number>(100);
  
 
  useEffect(() => {
    if(!svg.current) return;
  
    setWidth(svg.current.clientWidth);
    setHeight(svg.current.clientHeight);
    
    const resizeObserver = new ResizeObserver(() => {
      if(!svg.current) return;
      
      setWidth(svg.current.clientWidth);
      setHeight(svg.current.clientHeight);
    });

    if(svg.current.parentElement && svg.current.parentElement.tagName === 'DIV') {
      resizeObserver.observe(svg.current.parentElement);
    } else {
      throw new Error('useResponsiveSVG requires the SVG to be a child of HTMLDivElement')
    }

    return () => {
      resizeObserver.disconnect();
    }
  }, [svg])
  
  
  return [width, height]
}
