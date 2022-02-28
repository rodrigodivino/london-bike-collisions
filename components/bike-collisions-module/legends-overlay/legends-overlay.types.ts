export namespace LegendsOverlayTypes {
  export interface Props {
    colorLegends: Array<ColorLegend>;
  }
  
  export interface ColorLegend {
    color: string,
    label: string
  }
}

