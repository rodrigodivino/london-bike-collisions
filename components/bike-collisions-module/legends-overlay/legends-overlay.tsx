import {FunctionComponent} from "react";
import {LegendsOverlayTypes} from "./legends-overlay.types";
import styles from './legends-overlay.module.css';

const LegendsOverlay: FunctionComponent<LegendsOverlayTypes.Props> = ({colorLegends, shapeLegends}) => {
  return <div className={styles.container}>
    <div className={styles.legendPane}>
      <div className={styles.colorLegend}>
        <span className={styles.legendTitle}>Nº of Collisions</span>
        {
          colorLegends.map(colorLegendLine => {
            return <div key={colorLegendLine.label} className={styles.colorLegendLine}>
              <div className={styles.colorLegendLineColor} style={{backgroundColor: colorLegendLine.color}}/>
              <div className={styles.colorLegendLineLabel}> {colorLegendLine.label} </div>
            </div>
          })
        }
      </div>
      <hr/>
      <span className={styles.legendTitle}>Location</span>
      <div className={styles.markerLegend}>
        {
          shapeLegends.map(shapeLegendLine => {
            return <div key={shapeLegendLine.label} className={styles.markerLegendLine}>
              {shapeLegendLine.shape}
              <div className={styles.markerLegendLabel}> {shapeLegends[0].label} </div>
            </div>
          })
        }
       
      </div>
      
    </div>
  </div>
}


export default LegendsOverlay
