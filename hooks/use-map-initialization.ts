import {MutableRefObject, RefObject, useEffect, useRef} from "react";
import * as L from "leaflet";
import {LatLngExpression, Map as LMap} from "leaflet";

export const useMapInitialization = (
    mapContainerRef: RefObject<HTMLDivElement>,
    initialCenter: LatLngExpression,
    initialZoom: number
): MutableRefObject<LMap | undefined> => {
  const mapRef = useRef<LMap>();
  
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) {
      return;
    }
    
    mapRef.current = L.map(mapContainerRef.current).setView(initialCenter, initialZoom);
    
    L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
      attribution: 'Map tiles by <a href="https://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }).addTo(mapRef.current);
    
  }, [mapContainerRef, initialZoom, initialCenter]);
  
  return mapRef;
};
