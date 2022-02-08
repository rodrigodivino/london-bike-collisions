import {GeoJSON, Map as LMap} from 'leaflet';
import {geoMercator, GeoProjection} from "d3";

export const getGeoProjection = (map: LMap | undefined): GeoProjection => {
  if(!map) return geoMercator();
  
  const {x: width, y: height} = map.getSize();
  const mapBounds = map.getBounds();
  const ne = mapBounds.getNorthEast();
  const sw = mapBounds.getSouthWest();
  
  
  const bbox: GeoJSON.Polygon = {
    "type": "Polygon",
    "coordinates": [
      [
        [ne.lng, ne.lat],
        [ne.lng, sw.lat],
        [sw.lng, sw.lat],
        [sw.lng, ne.lat],
        [ne.lng, ne.lat]
      ]
    ]
  };
  
  return geoMercator()
      .fitSize([width, height], bbox);
}
