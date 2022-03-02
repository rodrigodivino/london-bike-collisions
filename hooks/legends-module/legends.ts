export namespace Legends {
  export interface ColorLegendData {
    color: string,
    label: string
  }
  
  export interface ShapeLegendData {
    shape: JSX.Element,
    label: string
  }
  
  export enum LegendMode {
    DISCRETE_COLOR = 'DISCRETE_COLOR',
    SHAPE = 'SHAPE',
  }
  
  export function isMode<T extends LegendMode>(type: T, legend: LegendRegisterAction<LegendMode>): legend is LegendRegisterAction<T> {
    return legend.type === type;
  }
  
  
  export interface LegendDataTypes {
    [LegendMode.DISCRETE_COLOR]: Legends.ColorLegendData[],
    [LegendMode.SHAPE]: Legends.ShapeLegendData[],
  }
  
  export interface LegendRegisterAction<T extends Legends.LegendMode> {
    type: T,
    id: string,
    title: string,
    data: Legends.LegendDataTypes[T],
  }
  
  export type LegendDispatcher =
      <T extends Legends.LegendMode>(action: LegendRegisterAction<T>) => void;
  
  
  export type LegendStore = Record<string, LegendRegisterAction<Legends.LegendMode>>;
}

