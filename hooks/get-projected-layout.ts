/**
 * Creates a projected layout that specifies pixel space position of data points
 *
 * The first generic corresponds to the type of datum to me projected
 *
 * @param projection - The projection to apply the layout
 * @param data - The data to be projected
 * @returns The input data with each value wrapped into a object that has mapped x and y coordinates
 */
export const getProjectedLayout = <Datum>(
    projection: (d: Datum) => {x: number, y: number},
    data: Datum[],
): Array<ProjectedLayout<Datum>> => {
  
  return data.map(d => {
    const {x, y} = projection(d) ?? [0, 0];
    return {
      x,
      y,
      d
    };
  });
};


export interface ProjectedLayout<D> {
  x: number;
  y: number;
  d: D;
}
