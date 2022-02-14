import {LatLng, Map as LMap} from 'leaflet';

export const getMetersInPixels = (map: LMap, meters: number): number => {
  const bound = new LatLng(51.507359, -0.136439).toBounds(meters);
  
  const nw = bound.getNorthWest();
  const ne = bound.getNorthEast();
  
  return map.latLngToContainerPoint(nw).distanceTo(map.latLngToContainerPoint(ne));
}
