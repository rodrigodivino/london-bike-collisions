import {FunctionComponent, useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import {SVGOverlayTypes} from "./svg-overlay.types";
import styles from './svg-overlay.module.css';
import {BikeCollision} from "../../../types/bike-collision";
import {getProjectedLayout, ProjectedLayout} from "../../../hooks/get-projected-layout";
import {useResponsiveMural} from "../../../hooks/use-responsive-mural";

const MARKER_ZOOM_THRESHOLD = 15;
const SVGOverlay: FunctionComponent<SVGOverlayTypes.Props> = ({map, data, isZooming, $onShapeLegendData$}) => {
  const [projectedData, setProjectedData] = useState<ProjectedLayout<BikeCollision>[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, height] = useResponsiveMural(svgRef);

  
  useLayoutEffect(() => {
    if (map.getZoom() >= MARKER_ZOOM_THRESHOLD) {
      setProjectedData(getProjectedLayout<BikeCollision>(
          d => map.project([d.Latitude, d.Longitude]),
          data
      ));
    } else {
      console.log('resetting')
      setProjectedData([]);
    }
  }, [map, data, isZooming]);
  
  
  const projectionOrigin = map.project(map.getBounds().getNorthWest());
  
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
    if (map.getZoom() >= MARKER_ZOOM_THRESHOLD) {
      $onShapeLegendData$?.(
          [
            {
              shape: <svg width={8} height={8}>
                <g transform={'translate(4,4)'}>
                  <path d={circlePath(0, 0)} className={styles.circleMesh}/>
                </g>
              </svg>,
              label: 'Severe collisions'
            }
          ]);
    } else {
      $onShapeLegendData$?.([]);
    }
  }, [$onShapeLegendData$, map, isZooming]);
  
  
  
  return <svg ref={svgRef} className={styles.svg}>
    <g className={`${isZooming ? styles.zooming : ''}`}>
      <g className="marker">
        <g>
          <path className={styles.circleMesh} d={circleMesh}/>
        </g>
        ;
        {/*<g>*/}
        {/*  <path className={styles.circleMeshRing} d={circleMesh2}/>*/}
        {/*</g>;*/}
      </g>
    
    </g>
  </svg>;
};

export default SVGOverlay;


