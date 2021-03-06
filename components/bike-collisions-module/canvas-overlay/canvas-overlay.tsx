import {FunctionComponent, useContext, useEffect, useLayoutEffect, useMemo, useState} from "react";
import {CanvasOverlayTypes} from "./canvas-overlay.types";
import styles from './canvas-overlay.module.css';
import {useQuickDOMRef} from "../../../hooks/use-quick-dom-ref";
import {useResponsiveMural} from "../../../hooks/use-responsive-mural";
import {getProjectedLayout, ProjectedLayout} from "../../../hooks/get-projected-layout";
import {BikeCollision} from "../../../types/bike-collision";
import {hexbin} from "d3-hexbin";
import {interpolateReds, max, rgb, scaleThreshold} from "d3";
import {CanvasOverlayConst} from "./canvas-overlay.const";
import {LatLng} from "leaflet";
import getNiceThresholds from "../../../hooks/get-nice-thresholds";
import {getOpaqueEquivalent} from "../../../hooks/get-opaque-equivalent";
import {MapContext} from "../../shared-module/shared-leaflet-map/map-context";
import {getMapZoomAnimMimic} from "../../../hooks/get-map-zoom-anim-mimic";

const CanvasOverlay: FunctionComponent<CanvasOverlayTypes.Props> = (
    {
      data,
      $onColorLegendData$
    }) => {
  const [canvas, canvasRef] = useQuickDOMRef<HTMLCanvasElement>();
  const [width, height] = useResponsiveMural(canvasRef);
  const [projectedData, setProjectedData] = useState<ProjectedLayout<BikeCollision>[]>([]);
  const [mapContextData] = useContext(MapContext);
  
  useLayoutEffect(() => {
    if (mapContextData?.zoomAnim) {
      return;
    }
    setProjectedData(getProjectedLayout<BikeCollision>(
        d => mapContextData?.mapRef?.current?.project([d.Latitude, d.Longitude]) ?? {x: 0, y: 0},
        data
    ));
  }, [data, mapContextData?.mapRef, mapContextData?.zoomAnim]);
  
  
  const [hexbinData, hexagonPathString, binRadius] = useMemo(() => {
    const measurementBounds = new LatLng(
        data[0].Latitude,
        data[0].Longitude
    ).toBounds(CanvasOverlayConst.BIN_RADIUS_METERS);
    
    const binRadius = Math.abs((mapContextData?.mapRef?.current?.project(measurementBounds.getNorthEast()).x ?? 0) -
        (mapContextData?.mapRef?.current?.project(measurementBounds.getNorthWest()).x ?? 0));
    
    const relativeBinPoint = projectedData[0] ?? {x: 0, y: 0};
    
    const binGenerator = hexbin<ProjectedLayout<BikeCollision>>()
        .x(d => d.x - relativeBinPoint.x)
        .y(d => d.y - relativeBinPoint.y)
        .radius(binRadius);
    
    const binData = binGenerator(projectedData);
    
    binData.forEach(bin => {
      bin.x += relativeBinPoint.x;
      bin.y += relativeBinPoint.y;
    });
    
    return [binData, binGenerator.hexagon(), binRadius];
  }, [data, mapContextData?.mapRef, projectedData]);
  
  const maxBinLength = useMemo(() => {
    return max(hexbinData, b => b.length) as number;
  }, [hexbinData]);
  
  const colorThresholds = useMemo(() => {
    return getNiceThresholds(
        CanvasOverlayConst.APPROXIMATE_NUMBER_OF_COLORS + 1,
        maxBinLength,
        CanvasOverlayConst.MINIMUM_VISIBLE_HEX_VALUE
    );
  }, [maxBinLength]);
  
  const bucketColors = colorThresholds.slice(0, -1).map((t, i, a) => {
    const v = i / (a.length - 1);
    const offsetLeft = 0.1;
    const offsetRight = 0.4;
    const c = rgb(interpolateReds(offsetLeft + (v * (1 - offsetLeft - offsetRight))));
    c.opacity = 0.5;
    return c.toString();
  });
  
  const colorScale = scaleThreshold<number, string>()
      .domain(colorThresholds as any)
      .range(['blue', ...bucketColors, 'red']);
  
  const colorData: Array<CanvasOverlayTypes.ColorData> = [];
  const colorScaleDomain = colorScale.domain();
  const colorScaleRange = colorScale.range();
  for (let i = -1; i < colorScaleDomain.length; i++) {
    const startingThreshold = colorScaleDomain[i] ?? -Infinity;
    const endingThreshold = colorScaleDomain[i + 1] ?? Infinity;
    colorData.push({
      threshold: [startingThreshold, endingThreshold],
      color: getOpaqueEquivalent(colorScaleRange[i + 1]).toString()
    });
  }
  
  useEffect(() => {
    $onColorLegendData$?.(colorData);
  });
  
  
  const projectionOrigin = mapContextData?.mapRef?.current?.project(mapContextData?.mapRef?.current?.getBounds()
      .getNorthWest()) ?? {x: 0, y: 0};
  
  const hexagonPath2D = new Path2D(hexagonPathString);
  
  const ctx = canvas?.getContext('2d');
  
  if (ctx) {
    ctx.resetTransform();
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(0, 0, width, height);
    ctx.translate(-projectionOrigin.x, -projectionOrigin.y);
    
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
      
      if (bin.length < CanvasOverlayConst.MINIMUM_VISIBLE_HEX_VALUE) {
        continue;
      }
      
      ctx.translate(bin.x, bin.y);
      
      ctx.fillStyle = colorScale(bin.length);
      ctx.fill(hexagonPath2D);
      
      ctx.translate(-bin.x, -bin.y);
      
    }
  }
  
  const {zoomAnimMimic} = getMapZoomAnimMimic(mapContextData?.zoomAnim, mapContextData?.mapRef?.current);
  
  return <div className={styles.wrapper}>
    <canvas style={zoomAnimMimic} key="canvas" width={width} height={height} ref={canvasRef}
            className={styles.canvas}>
    
    </canvas>
  </div>;
};

export default CanvasOverlay;
