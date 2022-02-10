import {LatLngExpression, Map as LMap} from 'leaflet';

export namespace SharedLeafletMapTypes {
  export interface Props {
    onUpdate?: (map: LMap) => void;
    initialCenter: LatLngExpression;
    initialZoom: number;
  }
}
