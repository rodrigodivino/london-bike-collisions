import {FunctionComponent} from "react";
import {SVGOverlayTypes} from "./svg-overlay.types";
import styles from './svg-overlay.module.css'

export const SVGOverlay: FunctionComponent<SVGOverlayTypes.Props> = () => {
  return <svg className={styles.svg}>
    <rect width={100} height={100}/>
  </svg>
}
