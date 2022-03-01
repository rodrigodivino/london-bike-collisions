export namespace LegendsOverlayTypes {
  export interface Props {
    colorLegends: LegendsOverlayTypes.ColorLegend[];
    shapeLegends: LegendsOverlayTypes.ShapeLegend[];
  }
  
  export interface ColorLegend {
    color: string,
    label: string
  }
  
  export interface ShapeLegend {
    shape: JSX.Element,
    label: string
  }
}

