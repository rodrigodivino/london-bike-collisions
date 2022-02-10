import {Map as LMap} from "leaflet";
import {BikeCollision} from "../../types/bike-collision";

export namespace SVGOverlayTypes {
  export interface Props {
    map: LMap;
    data: BikeCollision[];
  }
}
