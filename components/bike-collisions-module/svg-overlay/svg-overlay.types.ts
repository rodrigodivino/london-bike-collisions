import {Map as LMap} from "leaflet";
import {BikeCollision} from "../../../types/bike-collision";

export namespace SVGOverlayTypes {
  export interface Props {
    map: LMap;
    data: BikeCollision[];
    isZooming: boolean;
    $onShapeLegendData$?: (shapeLegendData: LegendData[]) => void;
  }
  
  export interface LegendData {
    shape: JSX.Element,
    label: string,
  }
}
