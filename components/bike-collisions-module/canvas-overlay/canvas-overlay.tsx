import {FunctionComponent, useLayoutEffect, useMemo, useState} from "react";
import {CanvasOverlayTypes} from "./canvas-overlay.types";
import styles from './canvas-overlay.module.css';
import {useQuickDOMRef} from "../../../hooks/use-quick-dom-ref";
import {useResponsiveMural} from "../../../hooks/use-responsive-mural";
import {getProjectedLayout, ProjectedLayout} from "../../../hooks/get-projected-layout";
import {BikeCollision} from "../../../types/bike-collision";
import {hexbin} from "d3-hexbin";
import {bisect, extent, interpolateReds, max, range, rgb, scaleLinear} from "d3";
import {CanvasOverlayConst} from "./canvas-overlay.const";
import {CollisionSeverity} from "../../../types/collision-severity";

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
  
  const binRadius = (projectionXExtent[1] - projectionXExtent[0]) / CanvasOverlayConst.BIN_RADIUS_FACTOR;
  
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
  
  const maxBinValue = max(hexbinData, b => b.length) as number;
  const amountOfBuckets = Math.ceil(maxBinValue / CanvasOverlayConst.COLOR_BUCKET_SIZE);
  const colorLevels = range(amountOfBuckets + 1).map(i => i * CanvasOverlayConst.COLOR_BUCKET_SIZE);
  
  const colors = colorLevels
      .map((l, i) => i / (colorLevels.length - 1))
      .map(v => {
        const c = rgb(interpolateReds(0.2 + v * 0.8));
        c.opacity = 0.8;
        return c.toString();
      });
  
  
  const projectionOrigin = map.project(map.getBounds().getNorthWest());
  
  const hexagonPath2D = new Path2D(hexagonPathString);
  
  const ctx = canvas?.getContext('2d');
  
  if (ctx) {
    ctx.resetTransform();
    ctx.clearRect(0, 0, width, height);
    ctx.translate(-projectionOrigin.x, -projectionOrigin.y);
    
    ctx.strokeStyle = 'black';
    
    for (let i = 0; i < hexbinData.length; i++) {
      const bin = hexbinData[i];
      if ((bin.x - projectionOrigin.x) < -2 * binRadius) {
        continue;
      }
      if ((bin.x - projectionOrigin.x) > width + 2 * binRadius) {
        continue;
      }
      if ((bin.y - projectionOrigin.y) < -2 * binRadius) {
        continue;
      }
      if ((bin.y - projectionOrigin.y) > height + 2 * binRadius) {
        continue;
      }
      
      const bucketLevel = bisect(colorLevels, bin.length) - 1;
      
      if (bucketLevel < 1) {
        continue;
      }
      
      ctx.translate(bin.x, bin.y);
      
      ctx.fillStyle = colors[bucketLevel];
      ctx.fill(hexagonPath2D);
  
      if(bin.some(b => b.d.Severity === CollisionSeverity.fatal)) {
        const scale = 2;
        ctx.scale(1 / scale, 1 / scale)
        ctx.fillStyle = '#222221';
        ctx.fill(hexagonPath2D);
        ctx.scale(scale, scale)
      }
   
      ctx.translate(-bin.x, -bin.y);
    }
  }
  
  
  return <canvas key="canvas" width={width} height={height} ref={canvasRef}
                 className={`${styles.canvas} ${isZooming ? styles.zooming : ''}`}>
  
  </canvas>;
};

export default CanvasOverlay;
