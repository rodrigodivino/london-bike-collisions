import {FunctionComponent, memo, useLayoutEffect, useState} from "react";
import {SVGOverlayTypes} from "./svg-overlay.types";
import styles from './svg-overlay.module.css';
import {BikeCollision} from "../../types/bike-collision";
import {getProjectedLayout, ProjectedLayout} from "../../hooks/get-projected-layout";

const SVGOverlay: FunctionComponent<SVGOverlayTypes.Props> = ({map, data, isZooming}) => {
  const [projectedData, setProjectedData] = useState<ProjectedLayout<BikeCollision>[]>([]);
  
  useLayoutEffect(() => {
    setProjectedData(getProjectedLayout<BikeCollision>(
        d => map.project([d.Latitude, d.Longitude]),
        data
    ));
  }, [map, data, isZooming]);
  
  const projectionOrigin = map.project(map.getBounds().getNorthWest());
  
  return <svg className={styles.svg}>
    <g className="projection-translation" transform={`translate(${-projectionOrigin.x},${-projectionOrigin.y})`}>
      <g className={`${isZooming ? styles.zooming : ''}`}>
        <g className="marker">
          <MemoizedMarker data={projectedData}/>
        </g>
      </g>
    </g>
  </svg>;
};

export default SVGOverlay;


const Marker = ({data}: any): JSX.Element => {
  return <>
    {
      data.map((l: any) => {
        return <g key={`${l.d["Accident Index"]}`}>
          <circle cx={l.x} cy={l.y} r={2} fill={'#555551'}/>
        </g>;
      })
    }</>;
};

const MemoizedMarker = memo(Marker);


