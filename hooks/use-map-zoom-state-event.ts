import {MutableRefObject, useEffect} from "react";
import {Map as LMap, ZoomAnimEvent} from 'leaflet';

/**
 * Listen to map changes in the zoom state and outputs whenever it starts or stops zooming
 * @param mapRef - A reference to the map
 * @param $onStateZoomChange$ - A callback when the map starts or stops zooming
 */
export const useMapZoomStateEvent = (
    mapRef: MutableRefObject<LMap | undefined>,
    $onStateZoomChange$?: (isZooming: ZoomAnimEvent | null) => void
): void => {
  useEffect(() => {
    if(!mapRef.current) return;
    const map = mapRef.current;
    
    map.on('zoomanim', (e) => {
      console.log("e", e);
      $onStateZoomChange$?.(e);
    });
    
    map.on('zoomend', () => {
      $onStateZoomChange$?.(null);
    });
    
    return () => {
      if(!map) return;
      map.off('zoomstart')
      map.off('zoomend')
    }
  }, [mapRef, $onStateZoomChange$])
}
