import {Map as LMap, ZoomAnimEvent} from "leaflet";
import {CSSProperties} from "react";

export const getMapZoomAnimMimic = (zoomAnim: ZoomAnimEvent | undefined, map: LMap | undefined): {
  zoomAnimMimic: CSSProperties,
  zoomAnimMimicScaleInverse: CSSProperties
} => {
  if (zoomAnim && map) {
    const currentMapCenter = map.getCenter();
    const soonToBeMapCenter = zoomAnim.center;
    const zoomDiff = zoomAnim.zoom - (map.getZoom() ?? 0);
    const currentProjectedCenter = map.project(currentMapCenter) ?? {x: 0, y: 0};
    const soonToBeCenterProjected = map.project(soonToBeMapCenter) ?? {x: 0, y: 0};
    const diffX = currentProjectedCenter.x - soonToBeCenterProjected.x;
    const diffY = currentProjectedCenter.y - soonToBeCenterProjected.y;
    return {
      zoomAnimMimic: {
        transform: `scale(${2 ** zoomDiff})translate(${diffX}px, ${diffY}px)`,
        transition: 'transform 0.25s'
      },
      zoomAnimMimicScaleInverse: {
        transform: `scale(${1 / (2 ** zoomDiff)})`,
        transition: 'transform 0.25s'
      }
    };
  } else {
    return {
      zoomAnimMimic: {
        transform: 'translate(0,0)',
        transition: 'transform 0s'
      },
      zoomAnimMimicScaleInverse: {
        transform: 'translate(0,0)',
        transition: 'transform 0s'
      }
    };
  }
};
