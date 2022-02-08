import {Map as LMap} from 'leaflet';
import {MutableRefObject} from "react";

export namespace SharedLeafletMapTypes {
  export interface Props {
    onUpdate?: (mapRef: MutableRefObject<LMap | undefined>) => void;
  }
}
