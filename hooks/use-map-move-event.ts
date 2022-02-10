import {MutableRefObject, useEffect} from "react";
import {Map as LMap} from 'leaflet'

/**
 * Listen to map movements and outputs the map object when it moves
 * @param mapRef - A reference to the map object
 * @param $onUpdate$ - A callback when the map moves
 */
export const useMapMoveEvent = (
    mapRef: MutableRefObject<LMap | undefined>,
    $onUpdate$?: (map: LMap) => void
): void => {
  useEffect(() => {
    if(!mapRef.current) return;
    const map = mapRef.current;
    
    $onUpdate$?.(map);
    map.on('move', () => {
      $onUpdate$?.(map);
    });
    
    return () => {
      if(!map) return;
      map.off('move')
    }
  }, [$onUpdate$, mapRef])
}
