import {Map as LMap} from 'leaflet';

export namespace SharedLeafletMapTypes {
  export interface Props {
    onUpdate?: (map: LMap) => void;
  }
}
