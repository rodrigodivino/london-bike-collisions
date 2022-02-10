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
    
    L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    }).addTo(mapRef.current);
    
  }, [mapContainerRef]);
  
  return mapRef;
};
