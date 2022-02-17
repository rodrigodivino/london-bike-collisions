import {FunctionComponent, memo, useCallback, useEffect, useLayoutEffect, useMemo, useState} from "react";
import {SVGOverlayTypes} from "./svg-overlay.types";
import styles from './svg-overlay.module.css';
import {CollisionSeverity} from "../../types/collision-severity";
import {BikeCollision} from "../../types/bike-collision";
import {getProjectedLayout, ProjectedLayout} from "../../hooks/get-projected-layout";
import {hexbin} from "d3-hexbin";
import {extent, max, scaleLinear} from "d3";
import {LatLngBounds} from "leaflet";

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
  
  const binRadius = (projectionXExtent[1] - projectionXExtent[0]) / 200;
  
  const hexbinData = useMemo(() => {
    const relativeBinPoint = contextData[0] ?? {x: 0, y: 0};
  
    const binGenerator = hexbin<ProjectedLayout<BikeCollision>>()
        .x(d => d.x - relativeBinPoint.x)
        .y(d => d.y - relativeBinPoint.y)
        .radius(binRadius)
    
    const binData = binGenerator
        (contextData);
    
    binData.forEach(bin => {
      bin.x += relativeBinPoint.x;
      bin.y += relativeBinPoint.y;
    })
    
    
    return binData;
  }, [contextData, binRadius]);
  
  
  const hexbinColorScale = useMemo(() => {
    return  scaleLinear<string, string>()
        .domain([0, max(hexbinData, b => b.length) as number])
        .range(['#FFFFFF00', '#B2222277']);
  }, [hexbinData])
  
  
  
  
  const projectionOrigin = map.project(map.getBounds().getNorthWest());
  
  return <svg className={styles.svg}>
    <g className="projection-translation" transform={`translate(${-projectionOrigin.x},${-projectionOrigin.y})`}>
      <g className={`${isZooming ? styles.zooming : ''}`}>
        
        <g className="context">
          {/*<MemoizedHexBin hexBinData={hexbinData} hexbinColorScale={hexbinColorScale} binRadius={binRadius}/>*/}
        </g>
        
        <g className="marker">
          <MemoizedMarker markerData={markerData}/>
        </g>
      </g>
    </g>
  </svg>;
};

export default SVGOverlay;


const HexBin = ({hexBinData, hexbinColorScale, binRadius}: any): JSX.Element => {
  return <>
    {
      hexBinData.map((bin: any) => {
        const key = bin.map((d: any) => d.d["Accident Index"]).join();
        
        return <g className={styles.hexbin} key={key} transform={`translate(${bin.x},${bin.y})`}>
          <path fill={hexbinColorScale(bin.length)} d={hexbin().hexagon(binRadius)}/>
        </g>;
      })
    }</>
};

const Marker = ({markerData}: any): JSX.Element => {
  return <>
    {
      markerData.map((l: any) => {
        const color: Record<string, string> = {
          [CollisionSeverity.fatal]: 'firebrick',
          [CollisionSeverity.serious]: 'gold',
          [CollisionSeverity.slight]: 'mediumseagreen'
        };
        
        return <g key={`${l.d["Accident Index"]}`}>
          <circle cx={l.x} cy={l.y} r={2} fill={color[l.d.Severity]}/>
        </g>;
      })
    }</>
}

const MemoizedHexBin = memo(HexBin);
const MemoizedMarker = memo(Marker);


