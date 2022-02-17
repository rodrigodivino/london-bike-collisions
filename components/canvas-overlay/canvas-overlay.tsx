import {FunctionComponent, useLayoutEffect, useMemo, useState} from "react";
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
  
  const binRadius = (projectionXExtent[1] - projectionXExtent[0]) / 300;
  
  const [hexbinData, hexagonPathString] = useMemo(() => {
    const relativeBinPoint = projectedContextData[0] ?? {x: 0, y: 0};
    
    const binGenerator = hexbin<ProjectedLayout<BikeCollision>>()
        .x(d => d.x - relativeBinPoint.x)
        .y(d => d.y - relativeBinPoint.y)
        .radius(binRadius);
    
    const binData = binGenerator(projectedContextData);
    
    binData.forEach(bin => {
      bin.x += relativeBinPoint.x;
      bin.y += relativeBinPoint.y;
    });
    
    return [binData, binGenerator.hexagon()];
  }, [projectedContextData, binRadius]);
  
  const hexbinColorScale = useMemo(() => {
    return scaleLinear<string, string>()
        .domain([0, max(hexbinData, b => b.length) as number])
        .range(['#FFFFFF00', '#B2222277']);
  }, [hexbinData]);
  
  
  const projectionOrigin = map.project(map.getBounds().getNorthWest());
  
  
  const hexagonPath2D = new Path2D(hexagonPathString);
  
  const ctx = canvas?.getContext('2d');
  
  
  // TODO: Render in an offscreen canvas once per zoom level, and copy translated to the visible canvas on pan events
  if(ctx) {
    ctx.resetTransform();
    ctx.clearRect(0, 0, width, height);
    ctx.translate(-projectionOrigin.x, -projectionOrigin.y);
  
    for (let bin of hexbinData) {
      if((bin.x - projectionOrigin.x) < - 2 * binRadius) continue;
      if((bin.x - projectionOrigin.x) > width + 2 * binRadius) continue;
      if((bin.y - projectionOrigin.y) < - 2 * binRadius) continue;
      if((bin.y - projectionOrigin.y) > height + 2 * binRadius) continue;
    
      ctx.translate(bin.x, bin.y);
      
      ctx.fillStyle = hexbinColorScale(bin.length);
      
    
      ctx.fill(hexagonPath2D);
      ctx.translate(-bin.x, -bin.y);
    }
  }
  
  
  
  
  return <canvas key="canvas" width={width} height={height} ref={canvasRef}
                 className={`${styles.canvas} ${isZooming ? styles.zooming : ''}`}>
  
  </canvas>;
};

export default CanvasOverlay;
