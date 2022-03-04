import {LatLng, LatLngBounds, LatLngExpression, Map as LMap, ZoomAnimEvent} from 'leaflet';
import {MutableRefObject, RefObject} from "react";

export namespace SharedLeafletMapTypes {
  export interface Props {
    initialCenter: LatLngExpression;
    initialZoom: number;
  }
  
  export interface MapContextData {
    mapCenter: LatLng,
    mapBounds: LatLngBounds,
    mapRef: MutableRefObject<LMap | undefined>,
    zoomAnim: ZoomAnimEvent | undefined
  }
}
