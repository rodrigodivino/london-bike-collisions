import {FunctionComponent} from "react";
import {SVGOverlayTypes} from "./svg-overlay.types";
import styles from './svg-overlay.module.css';
import {CollisionSeverity} from "../../types/collision-severity";
import {BikeCollision} from "../../types/bike-collision";
import {getProjectedLayout} from "../../hooks/get-projected-layout";

export const SVGOverlay: FunctionComponent<SVGOverlayTypes.Props> = ({map, data, isZooming}) => {
  const projectedData = getProjectedLayout<BikeCollision>(
      d => map.latLngToContainerPoint([d.Latitude, d.Longitude]),
      data
  );
  
  const filter = (d: BikeCollision) => d.Severity === CollisionSeverity.fatal;
  
  const markerData = projectedData.filter(d => filter(d.d));
  const contextData = projectedData.filter(d => !filter(d.d));
  
  
  return <svg className={styles.svg}>
    <g className={`${isZooming ? styles.zooming : ''}`}>
      {markerData.map(l => {
        const color = {
          [CollisionSeverity.fatal]: 'firebrick',
          [CollisionSeverity.serious]: 'gold',
          [CollisionSeverity.slight]: 'mediumseagreen'
        };
        return <g key={`${l.d["Accident Index"]}`}>
          <circle cx={l.x} cy={l.y} r={2} fill={color[l.d.Severity]}/>
        </g>;
      })}
    </g>
  </svg>;
};
