import {BikeCollision} from "../../../types/bike-collision";

export namespace CanvasOverlayTypes {
  export interface Props {
    data: BikeCollision[];
    $onColorLegendData$?: (colorData: Array<ColorData>) => void;
  }
  
  export interface ColorData {
    threshold: [number, number],
    color: string,
  }
}
