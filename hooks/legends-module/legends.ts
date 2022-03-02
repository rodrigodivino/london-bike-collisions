export namespace Legends {
  export enum LegendMode {
    DISCRETE_COLOR = 'DISCRETE_COLOR',
    SHAPE = 'SHAPE',
  }
  
  export interface LegendDataTypes {
    [LegendMode.SHAPE]: {shape: JSX.Element,label: string }[],
    [LegendMode.DISCRETE_COLOR]: {color: string, label: string }[],
  }
  
  export interface LegendRegistry<T extends Legends.LegendMode> {
    type: T,
    id: string,
    title: string,
    data: Legends.LegendDataTypes[T],
  }
  
  export type LegendDispatcher = <T extends Legends.LegendMode>(action: LegendRegistry<T>) => void;
  export type LegendStore = Record<string, LegendRegistry<Legends.LegendMode>>;
  
  export function isMode<T extends LegendMode>(type: T, legend: LegendRegistry<LegendMode>): legend is LegendRegistry<T> {
    return legend.type === type;
  }
}

