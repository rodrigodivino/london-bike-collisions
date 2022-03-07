import {FunctionComponent, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import {SVGOverlayTypes} from "./svg-overlay.types";
import styles from './svg-overlay.module.css';
import {BikeCollision} from "../../../types/bike-collision";
import {getProjectedLayout, ProjectedLayout} from "../../../hooks/get-projected-layout";
import {useResponsiveMural} from "../../../hooks/use-responsive-mural";
import {MapContext} from "../../shared-module/shared-leaflet-map/map-context";
import {getMapZoomAnimMimic} from "../../../hooks/get-map-zoom-anim-mimic";

const MARKER_ZOOM_THRESHOLD = 15;
const SVGOverlay: FunctionComponent<SVGOverlayTypes.Props> = ({data, $onShapeLegendData$}) => {
  const [projectedData, setProjectedData] = useState<ProjectedLayout<BikeCollision>[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, height] = useResponsiveMural(svgRef);

  const [mapContextData,] = useContext(MapContext);
  
  useLayoutEffect(() => {
    if(mapContextData?.zoomAnim) return;
    if ((mapContextData?.mapRef?.current?.getZoom() ?? 0) >= MARKER_ZOOM_THRESHOLD) {
      setProjectedData(getProjectedLayout<BikeCollision>(
          d => mapContextData?.mapRef?.current?.project([d.Latitude, d.Longitude]) ?? {x: 0, y: 0},
          data
      ));
    } else {
      setProjectedData([]);
    }
  }, [data, mapContextData?.mapRef, mapContextData?.zoomAnim]);
  
  
  const projectionOrigin = mapContextData?.mapRef?.current?.project(mapContextData?.mapRef?.current?.getBounds().getNorthWest()) ?? {x: 0, y: 0};
  
  const SVGProjectedData = useMemo(() => {
    return projectedData
        .map(d => {
          return {
            x: d.x - projectionOrigin.x,
            y: d.y - projectionOrigin.y,
            d: d
          }
        })
        .filter(d => d.x > 0 && d.x <= width && d.y > 0 && d.y <= height);
  }, [projectedData, projectionOrigin.x, projectionOrigin.y, width, height]);
  
  
  function circlePath(cx: number, cy: number) {
    const r = 2.5;
    
    return 'M ' +
        cx +
        ' ' +
        cy +
        ' m -' +
        r +
        ', 0 a ' +
        r +
        ',' +
        r +
        ' 0 1,0 ' +
        (r * 2) +
        ',0 a ' +
        r +
        ',' +
        r +
        ' 0 1,0 -' +
        (r * 2) +
        ',0';
  }
  
  const circleMesh = SVGProjectedData.map(l => circlePath(l.x, l.y)).join('');
  
  useEffect(() => {
    if ((mapContextData?.mapRef?.current?.getZoom() ?? 0) >= MARKER_ZOOM_THRESHOLD) {
      $onShapeLegendData$?.(
          [
            {
              shape: <svg width={8} height={8}>
                <g transform={'translate(4,4)'}>
                  <path d={circlePath(0, 0)} className={styles.circleMesh}/>
                </g>
              </svg>,
              label: 'Severe collision'
            }
          ]);
    } else {
      $onShapeLegendData$?.([]);
    }
  }, [$onShapeLegendData$, mapContextData?.mapRef, mapContextData?.zoomAnim]);
  
  
  const {zoomAnimMimic} = getMapZoomAnimMimic(mapContextData?.zoomAnim, mapContextData?.mapRef?.current);
  
  return <svg style={zoomAnimMimic}  ref={svgRef} className={styles.svg}>
    <g className={`${mapContextData?.zoomAnim ? styles.zooming : ''}`}>
      <g className="marker">
        <g>
          <path className={styles.circleMesh} d={circleMesh}/>
        </g>
      </g>
    
    </g>
  </svg>;
};

export default SVGOverlay;


