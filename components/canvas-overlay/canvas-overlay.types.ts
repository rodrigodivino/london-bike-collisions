import {Map as LMap} from "leaflet";
import {BikeCollision} from "../../types/bike-collision";

export namespace CanvasOverlayTypes {
  export interface Props {
    map: LMap;
    data: BikeCollision[];
    isZooming: boolean;
  }
}
