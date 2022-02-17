import {FunctionComponent, useCallback, useLayoutEffect, useMemo, useState} from "react";
import {SVGOverlayTypes} from "./svg-overlay.types";
import styles from './svg-overlay.module.css';
import {CollisionSeverity} from "../../types/collision-severity";
import {BikeCollision} from "../../types/bike-collision";
import {getProjectedLayout, ProjectedLayout} from "../../hooks/get-projected-layout";
import {hexbin} from "d3-hexbin";
import {extent, max, scaleLinear} from "d3";
import {LatLngBounds} from "leaflet";

const TMP_IS_VISIBLE = (d: ProjectedLayout<BikeCollision>, mapBounds: LatLngBounds) => mapBounds.contains({
  lat: d.d.Latitude,
  lng: d.d.Longitude
});

const SVGOverlay: FunctionComponent<SVGOverlayTypes.Props> = ({map, data, isZooming}) => {
  
  const [projectedData, setProjectedData] = useState<ProjectedLayout<BikeCollision>[]>([]);
  
  useLayoutEffect(() => {
    setProjectedData(getProjectedLayout<BikeCollision>(
        d => map.project([d.Latitude, d.Longitude]),
        data
    ));
  }, [map, data, isZooming]);
  
  const markerFilter = (d: BikeCollision) => d.Severity === CollisionSeverity.fatal;
  const markerData = useMemo(() => projectedData.filter(d => markerFilter(d.d)), [projectedData]);
  const contextData = useMemo(() => projectedData.filter(d => !markerFilter(d.d)), [projectedData]);
  
  const projectionXExtent = useMemo(() => extent(projectedData, d => d.x) as [number, number], [projectedData]);
  
  const relativeBinPoint = projectedData[0] ?? {x: 0, y: 0};
  const binRadius = (projectionXExtent[1] - projectionXExtent[0]) / 200;
  
  const hexbinData = useMemo(() => {
    return hexbin<ProjectedLayout<BikeCollision>>()
        .x(d => d.x - relativeBinPoint.x)
        .y(d => d.y - relativeBinPoint.y)
        .radius(binRadius)
        (contextData);
  }, [contextData, binRadius, relativeBinPoint.x, relativeBinPoint.y]);
  
  
  const maxHexBinValue = max(hexbinData, b => b.length) as number;
  
  const hexbinColorScale = scaleLinear<string, string>()
      .domain([0, maxHexBinValue])
      .range(['#FFFFFF00', '#B2222277']);
  const s = performance.now();
  
  
  const visibleHexBinData = hexbinData//;.filter(b => b.some(d => TMP_IS_VISIBLE(d, map.getBounds())));
  const visibleMarkerData = markerData//;.filter(d => TMP_IS_VISIBLE(d, map.getBounds()));
  
  
  const e = performance.now();
  
  console.log('main: ', (e - s) + 'ms');
  
  const projectionOrigin = map.project(map.getBounds().getNorthWest());
  
  return <svg className={styles.svg}>
    <g className="projection-translation" transform={`translate(${-projectionOrigin.x},${-projectionOrigin.y})`}>
      <g className={`${isZooming ? styles.zooming : ''}`}>
        
        <g className="context">
          {
            visibleHexBinData.map((bin) => {
              const key = bin.map(d => d.d["Accident Index"]).join();
              
              return <g className={styles.hexbin} key={key} transform={`translate(${bin.x},${bin.y})`}>
                <g transform={`translate(${relativeBinPoint.x},${relativeBinPoint.y})`}>
                  <path fill={hexbinColorScale(bin.length)} d={hexbin().hexagon(binRadius)}/>
                </g>
              </g>;
            })
          }
        </g>
        
        <g className="marker">
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
    </g>
  </svg>;
};

export default SVGOverlay;
