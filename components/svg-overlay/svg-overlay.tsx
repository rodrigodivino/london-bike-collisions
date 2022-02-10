import {FunctionComponent} from "react";
import {SVGOverlayTypes} from "./svg-overlay.types";
import styles from './svg-overlay.module.css';

export const SVGOverlay: FunctionComponent<SVGOverlayTypes.Props> = ({projection}) => {
  const centerPx = projection([-0.136439, 51.507359]) ?? [0, 0];
  
  return <svg className={styles.svg}>
    <circle cx={centerPx[0]} cy={centerPx[1]} r={5}/>
  </svg>;
};
