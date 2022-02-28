import {FunctionComponent} from "react";
import {LegendsOverlayTypes} from "./legends-overlay.types";
import styles from './legends-overlay.module.css';

const LegendsOverlay: FunctionComponent<LegendsOverlayTypes.Props> = ({colorLegends}) => {
  return <div className={styles.container}>
    <div className={styles.legendPane}>
      <div className={styles.colorLegend}>
      
      </div>
      <div className={styles.colorLegend}>
        {
          colorLegends.map(colorLegendLine => {
            return <div key={colorLegendLine.label} className={styles.colorLegendLine}>
              <div className={styles.colorLegendLineLabel}> {colorLegendLine.label} </div>
              <div className={styles.colorLegendLineColor} style={{backgroundColor: colorLegendLine.color}}/>
            </div>
          })
        }
        
      </div>
    </div>
  </div>
}


export default LegendsOverlay
