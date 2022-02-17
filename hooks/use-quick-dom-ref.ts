import {RefObject, useEffect, useRef, useState} from "react";

export const useQuickDOMRef = <T>(): [T | undefined, RefObject<T>] => {
  const [state, setState] = useState<T>();
  const quickRef = useRef<T>(null);
  useEffect(() => {
    if(!quickRef.current) return;
    
    setState(quickRef.current);
  }, [quickRef])
  
  return [state, quickRef]
}
