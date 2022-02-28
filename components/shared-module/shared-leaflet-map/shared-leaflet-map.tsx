import {FunctionComponent, PropsWithChildren, useEffect, useRef} from "react";
import {SharedLeafletMapTypes} from "./shared-leaflet-map.types";
import styles from './shared-leaflet-map.module.css';
import {useMapInitialization} from "../../../hooks/use-map-initialization";
import {useMapMoveEvent} from "../../../hooks/use-map-move-event";
import {useMapZoomStateEvent} from "../../../hooks/use-map-zoom-state-event";

const SharedLeafletMap: FunctionComponent<PropsWithChildren<SharedLeafletMapTypes.Props>> = (
    {
      $onUpdate$,
      $onZoomStateUpdate$,
      initialCenter,
      initialZoom,
      children
    }
) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  
  const mapRef = useMapInitialization(mapContainer, initialCenter, initialZoom);

  useMapMoveEvent(mapRef, $onUpdate$);
  useMapZoomStateEvent(mapRef, $onZoomStateUpdate$)
  
  
  return <div className={styles.container}>
    <div className={styles.map} ref={mapContainer} id={styles.map} >
      <div className={styles.overlayContainer}>
        {children}
      </div>
  
    </div>
  </div>;
};

export default SharedLeafletMap;
