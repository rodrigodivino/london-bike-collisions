export namespace Legends {
  /**
   * The possible color legend modes
   */
  export enum LegendMode {
    DISCRETE_COLOR = 'DISCRETE_COLOR',
    SHAPE = 'SHAPE',
  }
  
  /**
   * The data types for each mode
   */
  export interface LegendDataTypes {
    [LegendMode.SHAPE]: {shape: JSX.Element,label: string }[],
    [LegendMode.DISCRETE_COLOR]: {color: string, label: string }[],
  }
  
  /**
   * A registry of legend data
   * The generic corresponds to the mode of the legend, and can be inferred from the mode property.
   * @property mode: The mode of the legend
   * @property id: A unique identifier for the legend
   * @property title: A title for the legend
   * @property data: The data for the legend
   */
  export interface LegendRegistry<T extends Legends.LegendMode> {
    mode: T,
    id: string,
    title: string,
    data: Legends.LegendDataTypes[T],
  }
  
  /**
   * Dispatches a LegendRegistry to the LegendStore
   * The generic corresponds to the mode of the registry being dispatched, and can be inferred from the registry
   */
  export type LegendDispatcher = <T extends Legends.LegendMode>(legendRegistry: LegendRegistry<T>) => void;
  
  /**
   * Stores the registered legends
   */
  export type LegendStore = Record<string, LegendRegistry<Legends.LegendMode>>;
  
  /**
   * Type guard to check the mode of an unknown LegendRegistry
   * The generic corresponds to the mode, and can be inferred from the mode parameter
   * @param mode - The mode to assert the type of the legend
   * @param legend - The legend to check the mode
   * @returns If the legend is for the specified mode.
   */
  export function isMode<T extends LegendMode>(mode: T, legend: LegendRegistry<LegendMode>): legend is LegendRegistry<T> {
    return legend.mode === mode;
  }
}

