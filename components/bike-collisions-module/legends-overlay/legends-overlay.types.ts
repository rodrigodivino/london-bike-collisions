import {Legends} from "../../../hooks/legends-module/legends";

export namespace LegendsOverlayTypes {
  export interface Props {
    colorLegends: Legends.ColorLegendData[];
    shapeLegends: Legends.ShapeLegendData[];
    legendStore?: Legends.LegendStore;
  }
}

