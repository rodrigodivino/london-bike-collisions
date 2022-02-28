import {rgb} from "d3";

export const getOpaqueEquivalent = (color: string): string => {
  const c = rgb(color);
  c.r = 255 - c.opacity * (255 - c.r);
  c.g = 255 - c.opacity * (255 - c.g);
  c.b = 255 - c.opacity * (255 - c.b);
  c.opacity = 1;
  return c.toString()
}
