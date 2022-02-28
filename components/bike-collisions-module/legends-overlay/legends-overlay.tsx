import {FunctionComponent} from "react";
import {LegendsOverlayTypes} from "./legends-overlay.types";
import styles from './legends-overlay.module.css';

const LegendsOverlay: FunctionComponent<LegendsOverlayTypes.Props> = ({}) => {
  return <div className={styles.container}>
    <div className={styles.legendPane}>
      <div className={styles.placeholderLegendContent}/>
    </div>
  </div>
}


export default LegendsOverlay
