import {useEffect, useRef} from "react";

export const useWDYU = (name: string, propsAndState: Record<string, unknown>) => {
  const previousPropsAndState = useRef<Record<string, unknown>>();
  useEffect(() => {
    if (previousPropsAndState.current) {
      const allKeys = new Set([... Object.keys(previousPropsAndState.current), ... Object.keys(propsAndState)]);
      const changes: Record<string, unknown> = {};
      allKeys.forEach((key) => {
        if (previousPropsAndState.current![key] !== propsAndState[key]) {
          changes[key] = {
            previous: previousPropsAndState.current![key],
            current: propsAndState[key],
          };
        }
      });
      if (Object.keys(changes).length) {
        console.warn("Component Changes: ", name, changes);
      }
    }
    previousPropsAndState.current = propsAndState;
  });
}
