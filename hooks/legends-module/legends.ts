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
    SHAPE = 'SHAPE'
  }
  
  export interface LegendDataTypes {
    [LegendMode.DISCRETE_COLOR]: Legends.ColorLegendData,
    [LegendMode.SHAPE]: Legends.ShapeLegendData
  }
  
  export interface LegendRegisterAction<T extends Legends.LegendMode = Legends.LegendMode> {
    type: T,
    id: string,
    title: string,
    data: Legends.LegendDataTypes[T]
  }
  
  export type LegendDispatcher =
      <T extends Legends.LegendMode>(action: LegendRegisterAction<T>) => void;
  
  export interface LegendStoreDatum<T extends Legends.LegendMode = Legends.LegendMode> {
    type: T,
    title: string,
    id: string,
    data: Legends.LegendDataTypes[T]
  }
  
  export type LegendStore = Record<string, LegendStoreDatum>;
}

