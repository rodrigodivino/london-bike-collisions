import {RefObject, useEffect, useRef, useState} from "react";

/**
 * Turns a reference to DOM node into a state
 * @returns [state, quickRef] - The state for the node, and the ref to attach to the JSX element;
 */
export const useQuickDOMRef = <T>(): [T | undefined, RefObject<T>] => {
  const [state, setState] = useState<T>();
  const quickRef = useRef<T>(null);
  useEffect(() => {
    if(!quickRef.current) return;
    
    setState(quickRef.current);
  }, [quickRef])
  
  return [state, quickRef]
}
