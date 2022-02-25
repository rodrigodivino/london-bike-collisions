import {FunctionComponent, useEffect, useLayoutEffect, useMemo, useState} from "react";
import {SVGOverlayTypes} from "./svg-overlay.types";
import styles from './svg-overlay.module.css';
import {BikeCollision} from "../../../types/bike-collision";
import {getProjectedLayout, ProjectedLayout} from "../../../hooks/get-projected-layout";
import {useQuickDOMRef} from "../../../hooks/use-quick-dom-ref";
import {useResponsiveMural} from "../../../hooks/use-responsive-mural";
import {CollisionSeverity} from "../../../types/collision-severity";
import {marker} from "leaflet";

const SVGOverlay: FunctionComponent<SVGOverlayTypes.Props> = ({map, data, isZooming}) => {
  const [projectedData, setProjectedData] = useState<ProjectedLayout<BikeCollision>[]>([]);
  const [svg, svgRef] = useQuickDOMRef<SVGSVGElement>();
  const [width, height] = useResponsiveMural(svgRef);
  
  useLayoutEffect(() => {
    if (map.getZoom() >= 16) {
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
  
  return <svg ref={svgRef} className={styles.svg}>
      <g className={`${isZooming ? styles.zooming : ''}`}>
        <g className="marker">
          {
            SVGProjectedData.map((l) => {
              return <g key={`${l.d["Accident Index"]}`}>
                <circle className={styles.marker} cx={l.x} cy={l.y} r={2}/>
              </g>;
            })
          }
        </g>
    </g>
  </svg>;
};

export default SVGOverlay;


