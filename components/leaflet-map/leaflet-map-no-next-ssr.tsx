import dynamic from "next/dynamic";
import {LeafletMapTypes} from "./leaflet-map.types";

const LeafletMapNoNextSSR = dynamic<LeafletMapTypes.Props>(
    () => import("./leaflet-map"),
    {ssr: false}
);

export default LeafletMapNoNextSSR;
