import dynamic from "next/dynamic";
import {SVGOverlayTypes} from "./svg-overlay.types";


const SVGOverlayNoNextSSR = dynamic<SVGOverlayTypes.Props>(
    () => import("./svg-overlay"),
    {ssr: false}
);

export default SVGOverlayNoNextSSR;
