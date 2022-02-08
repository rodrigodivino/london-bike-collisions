import {Map as LMap} from 'leaflet';

export namespace SharedLeafletMapTypes {
  export interface Props {
    onMap: (map: LMap) => void;
  }
}
