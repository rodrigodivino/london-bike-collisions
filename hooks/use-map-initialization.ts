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
  
    L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: 'abcd',
      minZoom: 12,
      maxZoom: 16,
      //@ts-ignore
      ext: 'png'
    }).addTo(mapRef.current);
    
  }, [mapContainerRef, initialZoom, initialCenter]);
  
  return mapRef;
};
