import {BikeCollision} from "../../../types/bike-collision";

export namespace SVGOverlayTypes {
  export interface Props {
    data: BikeCollision[];
    $onShapeLegendData$?: (shapeLegendData: LegendData[]) => void;
  }
  
  export interface LegendData {
    shape: JSX.Element,
    label: string,
  }
}
