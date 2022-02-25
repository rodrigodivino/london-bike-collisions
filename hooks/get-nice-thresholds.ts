/**
 * Returns thresholds rounded to multiples of 10. Useful when meaningful thresholds are more important than their exact amount of
 * @param approximateNumberOfThresholds - The approximate number of thresholds to generate. It is not exact if the meaningful thresholds require to do so
 * @param maxValue - The maximum value to threshold
 * @param firstBucket - The first value of the threshold
 */
const getNiceThresholds  = (approximateNumberOfThresholds: number, maxValue: number, firstBucket: number) => {
  const exactBucketSize = (maxValue) / approximateNumberOfThresholds;
  
  const meaningfulBucketSize = exactBucketSize - exactBucketSize % 10 + 10;
  const buckets: number[] = [firstBucket];
  let i = firstBucket;
  while(i < maxValue) {
    i += meaningfulBucketSize;
    buckets.push(i);
  }
  return buckets
};

export default getNiceThresholds;
