import {FunctionComponent, useEffect, useRef} from "react";
import {SharedLeafletMapTypes} from "./shared-leaflet-map.types";
import styles from './shared-leaflet-map.module.css';
import {useMapInitialization} from "../../hooks/use-map-initialization";
import {useMapMoveEvent} from "../../hooks/use-map-move-event";

const SharedLeafletMap: FunctionComponent<SharedLeafletMapTypes.Props> = ({onUpdate}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  
  const mapRef = useMapInitialization(mapContainer);
  // TODO: Test better approaches to register to events
  useMapMoveEvent(mapRef, onUpdate);
  
  return <div className={styles.container}>
    <div ref={mapContainer} id={styles.map} className={styles.map}/>
  </div>;
};

export default SharedLeafletMap;
