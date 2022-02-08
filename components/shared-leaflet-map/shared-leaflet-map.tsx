import {FunctionComponent, useEffect, useRef} from "react";
import {SharedLeafletMapTypes} from "./shared-leaflet-map.types";
import styles from './shared-leaflet-map.module.css';
import {useMapInitialization} from "../../hooks/useMapInitialization";

const SharedLeafletMap: FunctionComponent<SharedLeafletMapTypes.Props> = ({onUpdate}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  
  const mapRef = useMapInitialization(mapContainer);
  
  return <div className={styles.container}>
    <div ref={mapContainer} id={styles.map} className={styles.map}/>
  </div>;
};

export default SharedLeafletMap;
