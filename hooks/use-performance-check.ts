import {useEffect} from "react";

export const usePerformanceCheck = (id: string) => {
  const a = performance.now();
  useEffect(() => {
    const b = performance.now();
    console.log(`render time of ${id}: ${b - a} ms`)
  })
}
