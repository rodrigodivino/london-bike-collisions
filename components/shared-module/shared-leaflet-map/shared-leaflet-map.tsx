import {FunctionComponent, PropsWithChildren, useContext, useEffect, useRef} from "react";
import {SharedLeafletMapTypes} from "./shared-leaflet-map.types";
import styles from './shared-leaflet-map.module.css';
import {MapContext} from "./map-context";
import L, {Map as LMap} from 'leaflet';

const SharedLeafletMap: FunctionComponent<PropsWithChildren<SharedLeafletMapTypes.Props>> = (
    {
      initialCenter,
      initialZoom,
      children
    }
) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  const mapRef = useRef<LMap>();
  
  const [, setMapData] = useContext(MapContext);
  
  // Map initialization
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
    
    L.control.scale().addTo(mapRef.current);
  }, [initialCenter, initialZoom]);
  
  // Event binding
  useEffect(() => {
    const map = mapRef.current;
  
    if (!(map && setMapData)) {
      return;
    }
    
    map.on('move', () => {
      setMapData((previousMapData) => {
        return {
          mapRef,
          mapBounds: map.getBounds(),
          mapCenter: map.getCenter(),
          zoomAnim: previousMapData?.zoomAnim
        };
      });
    });
    
    map.on('zoomanim', (e) => {
      setMapData({
        mapRef,
        mapBounds: map.getBounds(),
        mapCenter: map.getCenter(),
        zoomAnim: e
      });
    });
    
    map.on('zoomend', () => {
      setMapData({
        mapRef,
        mapBounds: map.getBounds(),
        mapCenter: map.getCenter(),
        zoomAnim: undefined
      });
    });
  
    setMapData({
      mapRef,
      mapBounds: map.getBounds(),
      mapCenter: map.getCenter(),
      zoomAnim: undefined
    });
    
    return () => {
      if (!map) {
        return;
      }
      map.off('move');
      map.off('zoomanim');
      map.off('zoomend');
    };
  }, [initialCenter, initialZoom, mapRef, setMapData]);
  
  
  return <div className={styles.container}>
    <div className={styles.map} ref={mapContainerRef} id={styles.map}>
      <div className={styles.overlayContainer}>
        {children}
      </div>
    
    </div>
  </div>;
};

export default SharedLeafletMap;
