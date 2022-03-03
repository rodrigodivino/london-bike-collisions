import {Legends} from "../../../hooks/legends-module/legends";

export namespace LegendsOverlayTypes {
  import LegendRegistry = Legends.LegendRegistry;
  
  export interface Props {
    legendStore: Legends.LegendStore;
    $onLegendClick$?: (
        legend: LegendRegistry<Legends.LegendMode>,
        item: Legends.LegendDataTypes[Legends.LegendMode] | null,
    ) => void
  }
}

