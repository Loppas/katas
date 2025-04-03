import { GridSpot } from "../entities/grid-spot";
import { drawGrid } from "./draw-grid";
import { nearestNeighbour } from "./nearest-neighbour";

// 1. Any live cell with fewer than two live neighbours dies,
//    as if caused by underpopulation.
// 2. Any live cell with more than three live neighbours dies,
//    as if by overcrowding.
// 3. Any live cell with two or three live neighbours lives
//    on to the next generation.
// 4. Any dead cell with exactly three live neighbours becomes
//    a live cell.

export const gameOfLife = (
  width: number,
  height: number,
  gridSpots: GridSpot[]
) => {
  let output: GridSpot[] = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const neighbours = nearestNeighbour(x, y, gridSpots);

      const alive = gridSpots.find((spot) => spot.x === x && spot.y === y);

      if (neighbours === 3 || (alive && neighbours === 2)) {
        output.push({ x, y });
      }
    }
  }

  return output;
};
