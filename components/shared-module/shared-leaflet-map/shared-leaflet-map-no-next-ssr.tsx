import dynamic from "next/dynamic";
import {SharedLeafletMapTypes} from "./shared-leaflet-map.types";

const SharedLeafletMapNoNextSSR = dynamic<SharedLeafletMapTypes.Props>(
    () => import("./shared-leaflet-map"),
    {ssr: false}
);

export default SharedLeafletMapNoNextSSR;
