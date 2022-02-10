import {FunctionComponent} from "react";
import {SVGOverlayTypes} from "./svg-overlay.types";
import styles from './svg-overlay.module.css';

export const SVGOverlay: FunctionComponent<SVGOverlayTypes.Props> = ({map, data}) => {
  const center = map.latLngToContainerPoint({lat:  51.507359, lng: -0.136439})
  return <svg className={styles.svg}>
    <circle cx={center.x} cy={center.y} r={5}/>
  </svg>;
};
