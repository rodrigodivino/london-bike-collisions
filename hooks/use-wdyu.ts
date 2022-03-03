import {useEffect, useRef} from "react";

export const useWDYU = (name: string, propsAndState: Record<string, unknown>) => {
  const previousPropsAndState = useRef<Record<string, unknown>>();
  useEffect(() => {
    if (previousPropsAndState.current) {
      const allKeys = Object.keys({ ...previousPropsAndState.current, ...propsAndState });
      const changesObj: Record<string, unknown> = {};
      allKeys.forEach((key) => {
        if (previousPropsAndState.current![key] !== propsAndState[key]) {
          changesObj[key] = {
            from: previousPropsAndState.current![key],
            to: propsAndState[key],
          };
        }
      });
      if (Object.keys(changesObj).length) {
        console.log("[why-did-you-update]", name, changesObj);
      }
    }
    previousPropsAndState.current = propsAndState;
  });
}
