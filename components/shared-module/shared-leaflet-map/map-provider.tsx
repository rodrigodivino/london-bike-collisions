import {FunctionComponent, PropsWithChildren, useEffect, useState} from "react";
import { MapContext } from "./map-context";
import {SharedLeafletMapTypes} from "./shared-leaflet-map.types";
import MapContextData = SharedLeafletMapTypes.MapContextData;

export const MapProvider: FunctionComponent<PropsWithChildren<{}>> = ({children}) => {
  const p = useState<MapContextData>();
  
  return <MapContext.Provider value={p}>
    {children}
  </MapContext.Provider>
}
