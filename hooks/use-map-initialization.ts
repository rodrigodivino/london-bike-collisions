import {MutableRefObject, RefObject, useEffect, useRef} from "react";
import * as L from "leaflet";
import {LatLng, Map as LMap} from "leaflet";

export const useMapInitialization = (mapContainerRef: RefObject<HTMLDivElement>): MutableRefObject<LMap | undefined> => {
  const mapRef = useRef<LMap>();
  
  useEffect(() => {
    if (!mapContainerRef.current) {
      return;
    }
    
    const center = new LatLng(51.507359, -0.136439);
    const initialZoom = 11;
    mapRef.current = L.map(mapContainerRef.current).setView(center, initialZoom);
    
  }, [mapContainerRef]);
  
  return mapRef;
};
