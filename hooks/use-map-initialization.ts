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
  
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(mapRef.current);
    
  }, [mapContainerRef, initialZoom, initialCenter]);
  
  return mapRef;
};
