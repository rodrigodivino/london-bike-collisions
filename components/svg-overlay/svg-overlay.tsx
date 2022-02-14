import {FunctionComponent} from "react";
import {SVGOverlayTypes} from "./svg-overlay.types";
import styles from './svg-overlay.module.css';
import {CollisionSeverity} from "../../types/collision-severity";
import {BikeCollision} from "../../types/bike-collision";
import {getProjectedLayout, ProjectedLayout} from "../../hooks/get-projected-layout";
import {hexbin} from "d3-hexbin";
import {extent, scaleLinear} from "d3";
import {LatLng} from "leaflet";

const SVGOverlay: FunctionComponent<SVGOverlayTypes.Props> = ({map, data, isZooming}) => {
  const projectedData = getProjectedLayout<BikeCollision>(
      d => map.latLngToContainerPoint([d.Latitude, d.Longitude]),
      data
  );
  
  const filter = (d: BikeCollision) => d.Severity === CollisionSeverity.fatal;
  
  const markerData = projectedData.filter(d => filter(d.d));
  const contextData = projectedData.filter(d => !filter(d.d));
  
  const bound = new LatLng(51.507359, -0.136439).toBounds(300);
  
  const nw = bound.getNorthWest();
  const ne = bound.getNorthEast();
  
  const binRadius = map.latLngToContainerPoint(nw).distanceTo(map.latLngToContainerPoint(ne));
  
  const hexbinGenerator = hexbin<ProjectedLayout<BikeCollision>>()
      .x(d => d.x)
      .y(d => d.y)
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
            <path fill={hexbinColorScale(bin.length)} d={hexbinGenerator.hexagon(binRadius)}/>
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
