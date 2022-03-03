import {LatLngExpression, Map as LMap, ZoomAnimEvent} from 'leaflet';

export namespace SharedLeafletMapTypes {
  export interface Props {
    $onUpdate$?: (map: LMap) => void;
    $onZoomStateUpdate$?: (isZooming: ZoomAnimEvent | null) => void;
    initialCenter: LatLngExpression;
    initialZoom: number;
  }
}
