import {MutableRefObject, useRef} from "react";

/**
 * Create a reference for a value that is updated at every call
 * @param tracked - The value to track
 */
const usePointerTo = <T>(tracked: T): MutableRefObject<T> => {
  const tracker = useRef<T>(tracked);
  tracker.current = tracked;
  return tracker
}

export default usePointerTo;
