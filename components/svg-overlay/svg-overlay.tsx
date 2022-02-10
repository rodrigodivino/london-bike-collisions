import {FunctionComponent} from "react";
import {SVGOverlayTypes} from "./svg-overlay.types";
import styles from './svg-overlay.module.css';
import {CollisionSeverity} from "../../types/collision-severity";

export const SVGOverlay: FunctionComponent<SVGOverlayTypes.Props> = ({map, data, isZooming}) => {
  const markerData = data.filter(d => d.Severity === CollisionSeverity.fatal);
  
  console.log("map", map);
  
  return <svg className={styles.svg}>
    <g className={`${isZooming ? styles.zooming : ''}`}>
      {markerData.map(d => {
        const point = map.latLngToContainerPoint([d.Latitude, d.Longitude]);
        const color = {[CollisionSeverity.fatal]: 'firebrick', [CollisionSeverity.serious]: 'gold', [CollisionSeverity.slight]: 'mediumseagreen'}
        return <g key={`${d["Accident Index"]}`}>
          <circle cx={point.x} cy={point.y} r={2} fill={color[d.Severity]}/>
        </g>
      })}
    </g>
  </svg>;
};
