import {FunctionComponent, useLayoutEffect, useMemo, useState} from "react";
import {SVGOverlayTypes} from "./svg-overlay.types";
import styles from './svg-overlay.module.css';
import {BikeCollision} from "../../../types/bike-collision";
import {getProjectedLayout, ProjectedLayout} from "../../../hooks/get-projected-layout";

const SVGOverlay: FunctionComponent<SVGOverlayTypes.Props> = ({map, data, isZooming}) => {
  const [projectedData, setProjectedData] = useState<ProjectedLayout<BikeCollision>[]>([]);
  
  useLayoutEffect(() => {
    setProjectedData(getProjectedLayout<BikeCollision>(
        d => map.project([d.Latitude, d.Longitude]),
        data
    ));
  }, [map, data, isZooming]);
  
  
  const projectionOrigin = map.project(map.getBounds().getNorthWest());
  
  const SVGProjectedData = useMemo(() => {
    return projectedData.map(d => ({...d, x: d.x - projectionOrigin.x, y: d.y - projectionOrigin.y}))
  }, [projectedData, projectionOrigin.x, projectionOrigin.y])
  
  return <svg className={styles.svg}>
      <g className={`${isZooming ? styles.zooming : ''}`}>
        <g className="marker">
          {
            SVGProjectedData.map((l) => {
              return <g key={`${l.d["Accident Index"]}`}>
                {/*<circle className={styles.marker} cx={l.x} cy={l.y} r={2}/>*/}
              </g>;
            })
          }
        </g>
    </g>
  </svg>;
};

export default SVGOverlay;


