import {FunctionComponent, ReactNode} from "react";
import {LegendsOverlayTypes} from "./legends-overlay.types";
import styles from './legends-overlay.module.css';
import {Legends} from "../../../hooks/legends-module/legends";
import {ascending} from "d3";
import LegendMode = Legends.LegendMode;
import LegendRegistry = Legends.LegendRegistry;
import LegendDataTypes = Legends.LegendDataTypes;

const LegendsOverlay: FunctionComponent<LegendsOverlayTypes.Props> = ({legendStore, $onLegendClick$}) => {
  const legends = Object
      .values(legendStore)
      .sort((a, b) => {
        return ascending(a.mode, b.mode);
      });
  
  const handleLegendClick = (legend: LegendRegistry<LegendMode>, item: LegendDataTypes[LegendMode] | null) => {
    if (legend?.options?.disabledIsClickable) {
      $onLegendClick$?.(legend, item);
    }
  };
  
  const getClickableClass = (clickable: boolean | undefined) => {
    return clickable ? styles.clickable : '';
  };
  
  return <div className={styles.container}>
    <div className={styles.legendPane}>
      {
        legends.map(legend => {
          return <div key={legend.id} className={styles.legendBox}>
            <span className={styles.legendTitle}>{legend.title}</span>
            {
              ((): ReactNode => {
                if (legend?.options?.disabled) {
                  return <div
                      className={`${styles.disabledMessage} ${getClickableClass(legend?.options?.disabledIsClickable)}`}
                      onClick={() => handleLegendClick(legend, null)}>
                    <span>{legend?.options.disabledMessage ?? ''}</span>
                  </div>;
                } else if (Legends.isMode(LegendMode.DISCRETE_COLOR, legend)) {
                  return legend.data.map(colorLegendLine => {
                    return <div onClick={() => handleLegendClick(legend, null)}
                                key={colorLegendLine.label}
                                className={`${styles.colorLegendLine} ${getClickableClass(legend?.options?.isClickable)}`}>
                      <div className={styles.colorLegendLineColor} style={{backgroundColor: colorLegendLine.color}}/>
                      <div className={styles.colorLegendLineLabel}> {colorLegendLine.label} </div>
                    </div>;
                  });
                } else if (Legends.isMode(LegendMode.SHAPE, legend)) {
                  return legend.data.map(shapeLegendLine => {
                    return <div onClick={() => handleLegendClick(legend, null)} key={shapeLegendLine.label}
                                className={`${styles.markerLegendLine} ${getClickableClass(legend?.options?.isClickable)}`}>
                      {shapeLegendLine.shape}
                      <div className={styles.markerLegendLabel}> {shapeLegendLine.label}</div>
                    </div>;
                  });
                } else {
                  throw new Error(`Legend type ${legend.mode} not supported`);
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
