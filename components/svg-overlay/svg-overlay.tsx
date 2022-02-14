import {FunctionComponent} from "react";
import {SVGOverlayTypes} from "./svg-overlay.types";
import styles from './svg-overlay.module.css';
import {CollisionSeverity} from "../../types/collision-severity";
import {BikeCollision} from "../../types/bike-collision";
import {getProjectedLayout, ProjectedLayout} from "../../hooks/get-projected-layout";
import {hexbin} from "d3-hexbin";
import {extent, min, scaleLinear} from "d3";
import {getMetersInPixels} from "../../hooks/get-meters-in-pixels";

const SVGOverlay: FunctionComponent<SVGOverlayTypes.Props> = ({map, data, isZooming}) => {
  const projectedData = getProjectedLayout<BikeCollision>(
      d => map.latLngToContainerPoint([d.Latitude, d.Longitude]),
      data
  );
  
  const filter = (d: BikeCollision) => d.Severity === CollisionSeverity.fatal;
  
  const markerData = projectedData.filter(d => filter(d.d));
  const contextData = projectedData.filter(d => !filter(d.d));
  
  const binRadius = getMetersInPixels(map, 300);
  
  const relativeBinPoint = projectedData[0];
  
  
  const hexbinGenerator = hexbin<ProjectedLayout<BikeCollision>>()
      .x(d => d.x - relativeBinPoint.x)
      .y(d => d.y - relativeBinPoint.y)
      .radius(binRadius);
  
  const hexbinData = hexbinGenerator
      (contextData);
  
  console.log("hexbinData", hexbinData);
  
  const hexbinColorScale = scaleLinear<string, string>()
      .domain(extent(hexbinData, bin => bin.length) as [number, number])
      .range(['#FFFFFF00', '#B2222277'])
  
  return <svg className={styles.svg}>
    <g className={`${isZooming ? styles.zooming : ''}`}>
      {
        hexbinData.map((bin, i) => {
          return <g className={styles.hexbin} key={i} transform={`translate(${bin.x},${bin.y})`}>
            <g transform={`translate(${relativeBinPoint.x},${relativeBinPoint.y})`}>
              <path fill={hexbinColorScale(bin.length)} d={hexbinGenerator.hexagon(binRadius)}/>
            </g>
          </g>
        })
      }
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

export default SVGOverlay
