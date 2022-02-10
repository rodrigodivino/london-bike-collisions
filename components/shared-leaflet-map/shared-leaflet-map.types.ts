import {LatLngExpression, Map as LMap} from 'leaflet';

export namespace SharedLeafletMapTypes {
  export interface Props {
    $onUpdate$?: (map: LMap) => void;
    $onZoomStateUpdate$?: (isZooming: boolean) => void;
    initialCenter: LatLngExpression;
    initialZoom: number;
  }
}
