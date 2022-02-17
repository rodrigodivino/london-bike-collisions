import {FunctionComponent} from "react";
import {SVGOverlayTypes} from "./svg-overlay.types";
import styles from './svg-overlay.module.css';
import {CollisionSeverity} from "../../types/collision-severity";
import {BikeCollision} from "../../types/bike-collision";
import {getProjectedLayout, ProjectedLayout} from "../../hooks/get-projected-layout";
import {hexbin} from "d3-hexbin";
import {extent, max, scaleLinear} from "d3";

const SVGOverlay: FunctionComponent<SVGOverlayTypes.Props> = ({map, data, isZooming}) => {
  const projectionOrigin = map.project(map.getBounds().getNorthWest());
  const projectedData = getProjectedLayout<BikeCollision>(
      d => map.project([d.Latitude, d.Longitude]),
      data
  );
  
  const mapBounds = map.getBounds().pad(0.2);
  const isProjectedPointVisible = (d: ProjectedLayout<BikeCollision>) => mapBounds.contains({
    lat: d.d.Latitude,
    lng: d.d.Longitude
  });
  
  const filter = (d: BikeCollision) => d.Severity === CollisionSeverity.fatal;
  
  const markerData = projectedData.filter(d => filter(d.d));
  const contextData = projectedData.filter(d => !filter(d.d));
  
  const projectionXExtent = extent(projectedData, d => d.x) as [number, number];
  const binRadius = (projectionXExtent[1] - projectionXExtent[0]) / 200;
  
  const relativeBinPoint = projectedData[0];
  
  const hexbinGenerator = hexbin<ProjectedLayout<BikeCollision>>()
      .x(d => d.x - relativeBinPoint.x)
      .y(d => d.y - relativeBinPoint.y)
      .radius(binRadius);
  
  const hexbinData = hexbinGenerator(contextData.filter(isProjectedPointVisible));
  
  const maxHexBinValue = max(hexbinData, b => b.length) as number;
  
  const hexbinColorScale = scaleLinear<string, string>()
      .domain([0, maxHexBinValue])
      .range(['#FFFFFF00', '#B2222277']);
  
  
  const visibleHexBinData = hexbinData.filter(b => b.some(d => isProjectedPointVisible(d)));
  const visibleMarkerData = markerData.filter(d => isProjectedPointVisible(d));
  return <svg className={styles.svg}>
    <g className='projection-translation' transform={`translate(${-projectionOrigin.x},${-projectionOrigin.y})`}>
      <g className={`${isZooming ? styles.zooming : ''}`}>
        {
          visibleHexBinData.map((bin) => {
            const key = bin.map(d=>d.d["Accident Index"]).join();
        
            return <g className={styles.hexbin} key={key} transform={`translate(${bin.x},${bin.y})`}>
              <g transform={`translate(${relativeBinPoint.x},${relativeBinPoint.y})`}>
                <path fill={hexbinColorScale(bin.length)} d={hexbinGenerator.hexagon(binRadius)}/>
              </g>
            </g>;
          })
        }
        {
          visibleMarkerData.map(l => {
            const color = {
              [CollisionSeverity.fatal]: 'firebrick',
              [CollisionSeverity.serious]: 'gold',
              [CollisionSeverity.slight]: 'mediumseagreen'
            };
            return <g key={`${l.d["Accident Index"]}`}>
              <circle cx={l.x} cy={l.y} r={2} fill={color[l.d.Severity]}/>
            </g>;
          })
        }
      </g>
    </g>
  </svg>;
};

export default SVGOverlay;
