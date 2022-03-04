import {createContext, Dispatch, SetStateAction} from "react";
import {SharedLeafletMapTypes} from "./shared-leaflet-map.types";

export const MapContext = createContext<[SharedLeafletMapTypes.MapContextData | undefined,  Dispatch<SetStateAction<SharedLeafletMapTypes.MapContextData | undefined>> | undefined]>(
 [undefined, undefined]
);


