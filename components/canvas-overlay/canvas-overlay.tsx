import {FunctionComponent, useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import {CanvasOverlayTypes} from "./canvas-overlay.types";
import styles from './canvas-overlay.module.css';
import {useQuickDOMRef} from "../../hooks/use-quick-dom-ref";
import {useResponsiveMural} from "../../hooks/use-responsive-mural";
import {getProjectedLayout, ProjectedLayout} from "../../hooks/get-projected-layout";
import {BikeCollision} from "../../types/bike-collision";
import {hexbin} from "d3-hexbin";
import {extent, max, scaleLinear} from "d3";

const CanvasOverlay: FunctionComponent<CanvasOverlayTypes.Props> = ({map, data, isZooming}) => {
  const [canvas, canvasRef] = useQuickDOMRef<HTMLCanvasElement>();
  const [width, height] = useResponsiveMural(canvasRef);
  const [projectedContextData, setProjectedContextData] = useState<ProjectedLayout<BikeCollision>[]>([]);
  
  useLayoutEffect(() => {
    setProjectedContextData(getProjectedLayout<BikeCollision>(
        d => map.project([d.Latitude, d.Longitude]),
        data
    ));
  }, [map, data, isZooming]);
  
  const projectionXExtent = useMemo(
      () => extent(projectedContextData, d => d.x) as [number, number], [projectedContextData]
  );
  
  const binRadius = (projectionXExtent[1] - projectionXExtent[0]) / 200;
  
  const hexbinData = useMemo(() => {
    const relativeBinPoint = projectedContextData[0] ?? {x: 0, y: 0};
    
    const binGenerator = hexbin<ProjectedLayout<BikeCollision>>()
        .x(d => d.x - relativeBinPoint.x)
        .y(d => d.y - relativeBinPoint.y)
        .radius(binRadius)
    
    const binData = binGenerator(projectedContextData);
    
    binData.forEach(bin => {
      bin.x += relativeBinPoint.x;
      bin.y += relativeBinPoint.y;
    })
    
    return binData;
  }, [projectedContextData, binRadius]);
  
  const hexbinColorScale = useMemo(() => {
    return  scaleLinear<string, string>()
        .domain([0, max(hexbinData, b => b.length) as number])
        .range(['#FFFFFF00', '#B2222277']);
  }, [hexbinData])
  
  
  const projectionOrigin = map.project(map.getBounds().getNorthWest());
  
  const ctx = canvas?.getContext('2d');
  
  ctx?.resetTransform();
  ctx?.clearRect(0, 0, width, height);
  ctx?.translate(-projectionOrigin.x, -projectionOrigin.y);
  ctx?.fillRect(projectedContextData[0].x, projectedContextData[0].y, 5,  5);
  
 
  
  return <canvas width={width} height={height} ref={canvasRef} className={styles.canvas}>
  
  </canvas>;
};

export default CanvasOverlay;
