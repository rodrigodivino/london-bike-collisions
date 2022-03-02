import {FunctionComponent, ReactNode} from "react";
import {LegendsOverlayTypes} from "./legends-overlay.types";
import styles from './legends-overlay.module.css';
import {Legends} from "../../../hooks/legends-module/legends";
import LegendMode = Legends.LegendMode;

const LegendsOverlay: FunctionComponent<LegendsOverlayTypes.Props> = ({legendStore}) => {
  const legends = Object.values(legendStore).filter(legend => legend.data.length);
  
  return <div className={styles.container}>
    <div className={styles.legendPane}>
      {
        legends.map(legend => {
          return <div key={legend.id} className={styles.legendBox}>
            <span className={styles.legendTitle}>{legend.title}</span>
            {
              ((): ReactNode => {
                if(Legends.isMode(LegendMode.DISCRETE_COLOR, legend)) {
                  return legend.data.map(colorLegendLine => {
                    return <div key={colorLegendLine.label} className={styles.colorLegendLine}>
                      <div className={styles.colorLegendLineColor} style={{backgroundColor: colorLegendLine.color}}/>
                      <div className={styles.colorLegendLineLabel}> {colorLegendLine.label} </div>
                    </div>;
                  });
                } else if (Legends.isMode(LegendMode.SHAPE, legend)) {
                  return legend.data.map(shapeLegendLine => {
                    return <div key={shapeLegendLine.label} className={styles.markerLegendLine}>
                        {shapeLegendLine.shape}
                        <div className={styles.markerLegendLabel}> {shapeLegendLine.label}</div>
                      </div>
                  })
                } else {
                  throw new Error(`Legend type ${legend.type} not supported`)
                }
              })()
            }
            <hr/>
          </div>;
        })
      }
    </div>
  </div>;
};


export default LegendsOverlay;
