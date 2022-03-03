import {Map as LMap, ZoomAnimEvent} from "leaflet";
import {BikeCollision} from "../../../types/bike-collision";

export namespace CanvasOverlayTypes {
  export interface Props {
    map: LMap;
    data: BikeCollision[];
    isZooming: ZoomAnimEvent | null;
    $onColorLegendData$?: (colorData: Array<ColorData>) => void;
  }
  
  export interface ColorData {
    threshold: [number, number],
    color: string,
  }
}
