import {FunctionComponent, useLayoutEffect, useMemo, useRef, useState} from "react";
import {SVGOverlayTypes} from "./svg-overlay.types";
import styles from './svg-overlay.module.css';
import {BikeCollision} from "../../../types/bike-collision";
import {getProjectedLayout, ProjectedLayout} from "../../../hooks/get-projected-layout";
import {useResponsiveMural} from "../../../hooks/use-responsive-mural";
import {CollisionSeverity} from "../../../types/collision-severity";

const SVGOverlay: FunctionComponent<SVGOverlayTypes.Props> = ({map, data, isZooming}) => {
  const [projectedData, setProjectedData] = useState<ProjectedLayout<BikeCollision>[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, height] = useResponsiveMural(svgRef);
  
  useLayoutEffect(() => {
    if (map.getZoom() >= 13) {
      setProjectedData(getProjectedLayout<BikeCollision>(
          d => map.project([d.Latitude, d.Longitude]),
          data
      ));
    } else {
      setProjectedData([]);
    }
  }, [map, data, isZooming]);
  
  
  const projectionOrigin = map.project(map.getBounds().getNorthWest());
  
  const SVGProjectedData = useMemo(() => {
    return projectedData
        .map(d => ({...d, x: d.x - projectionOrigin.x, y: d.y - projectionOrigin.y}))
        .filter(d => d.x > 0 && d.x <= width && d.y > 0 && d.y <= height)
    
  }, [projectedData, projectionOrigin.x, projectionOrigin.y, width, height])
  
  function circlePath(cx: number, cy: number, r: number){
    return 'M '+cx+' '+cy+' m -'+r+', 0 a '+r+','+r+' 0 1,0 '+(r*2)+',0 a '+r+','+r+' 0 1,0 -'+(r*2)+',0';
  }
  
  const seriousCircleMesh = SVGProjectedData.filter(d => d.d.Severity === CollisionSeverity.serious).map(l => circlePath(l.x, l.y, 2)).join('')
  const fatalCircleMesh = SVGProjectedData.filter(d => d.d.Severity === CollisionSeverity.fatal).map(l => circlePath(l.x, l.y, 4)).join('')
  
  // TODO: Add fatal markers at a lower zoom level
  // TODO: Add serious markers at a even lower zoom level
  // TODO: Adjust optimization of projection to the fatal marker zoom level
  // TODO: Add zoom level visibilities to const
  // TODO: Generalize mesh variable names
  // TODO: Limit zoom levels to first tile change road
  
  return <svg ref={svgRef} className={styles.svg}>
      <g className={`${isZooming ? styles.zooming : ''}`}>
        <g className="marker">
          <g>
            <path className={styles.seriousCircleMesh} d={seriousCircleMesh}/>
          </g>;
          <g>
            <path className={styles.fatalCircleMesh} d={fatalCircleMesh}/>
          </g>;
        </g>
    </g>
  </svg>;
};

export default SVGOverlay;


