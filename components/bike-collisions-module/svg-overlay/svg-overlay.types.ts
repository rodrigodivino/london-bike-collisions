import {Map as LMap, ZoomAnimEvent} from "leaflet";
import {BikeCollision} from "../../../types/bike-collision";

export namespace SVGOverlayTypes {
  export interface Props {
    map: LMap;
    data: BikeCollision[];
    isZooming: ZoomAnimEvent | null;
    $onShapeLegendData$?: (shapeLegendData: LegendData[]) => void;
  }
  
  export interface LegendData {
    shape: JSX.Element,
    label: string,
  }
}
