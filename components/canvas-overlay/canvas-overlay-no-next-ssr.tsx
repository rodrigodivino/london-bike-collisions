import dynamic from "next/dynamic";
import {CanvasOverlayTypes} from "./canvas-overlay.types";


const CanvasOverlayNoNextSSR = dynamic<CanvasOverlayTypes.Props>(
    () => import("./canvas-overlay"),
    {ssr: false}
);

export default CanvasOverlayNoNextSSR;
