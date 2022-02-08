import {useCallback, useState} from "react";

/**
 * Creates a state that saves a wrapped reference of a state value,
 *  in order for the state to trigger re-renders even if the wrapped state still the same.
 *  This creates a state that can wrap a mutable object (e.g., leaflet map),
 *  and subsequent state updates to the same object still trigger re-render
 *  The first generic corresponds to the type of the value to be wrapped
 *
 * @example const [value, setValue] = useWrapperState<T>();
 * @returns [value, setValue] - The value/setter pair for the wrapped state;
 */
export const useWrapperState = <T>(): [T | undefined, (value: T) => void] => {
  const [wrapper, setWrapper] = useState<Wrapper<T>>({value: undefined});
  
  const setValue = useCallback((value: T) => {
    setWrapper({value});
  }, []);
  
  return [wrapper.value, setValue];
};

interface Wrapper<T> {
  value: T | undefined;
}
