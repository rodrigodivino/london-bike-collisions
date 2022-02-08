import {FunctionComponent, useEffect, useRef} from "react";
import {SharedLeafletMapTypes} from "./shared-leaflet-map.types";
import styles from './shared-leaflet-map.module.css';
import * as L from 'leaflet';
import {LatLng} from "leaflet";

const SharedLeafletMap: FunctionComponent<SharedLeafletMapTypes.Props> = ({onMap}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if(!mapContainer.current) return;
  
    const center = new LatLng(51.507359, -0.136439);
    const initialZoom = 11;
    
    const map = L.map(mapContainer.current).setView(center, initialZoom);
    onMap?.(map);
  }, [mapContainer, onMap])
  
  return <div className={styles.container}>
    <div ref={mapContainer} id={styles.map} className={styles.map}/>
  </div>
}

export default SharedLeafletMap;
