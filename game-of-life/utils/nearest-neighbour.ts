import { GridSpot } from ".././entities/grid-spot";

// 1. Any live cell with fewer than two live neighbours dies,
//    as if caused by underpopulation.
// 2. Any live cell with more than three live neighbours dies,
//    as if by overcrowding.
// 3. Any live cell with two or three live neighbours lives
//    on to the next generation.
// 4. Any dead cell with exactly three live neighbours becomes
//    a live cell.

// for a 4x8 matrix
// at 0,1 and look left, you end up at 7,1
// at 7,1 and look right, you end up at 0,1
// at 4,0 and look up, you end up at 4,3
// at 4,3 and look down, you end up at 4,0

export const nearestNeighbour = (
  x: number,
  y: number,
  gridspots: GridSpot[]
) => {
  let count = 0;
  const width = 8;
  const height = 4;
  //const gridSpotsSpot = gridspots.find((spot) => spot.x === x && spot.y === y);

  //if (gridSpotsSpot) {
  // check for neighbours
  const leftPosition = x - 1 > 0 ? x - 1 : -1;
  const rightPosition = x + 1 < width - 1 ? x + 1 : -1;
  const topPosition = y - 1 > 0 ? y - 1 : -1;
  const bottomPosition = y + 1 < height - 1 ? y + 1 : -1;

  count +=
    leftPosition > -1
      ? gridspots.find((spot) => spot.x === leftPosition && spot.y === y)
        ? 1
        : 0
      : 0;
  count +=
    rightPosition > -1
      ? gridspots.find((spot) => spot.x === rightPosition && spot.y === y)
        ? 1
        : 0
      : 0;
  count +=
    topPosition > -1
      ? gridspots.find((spot) => spot.x === x && spot.y === topPosition)
        ? 1
        : 0
      : 0;
  count +=
    bottomPosition > -1
      ? gridspots.find((spot) => spot.x === x && spot.y === bottomPosition)
        ? 1
        : 0
      : 0;

  // diagonal left up
  if (leftPosition > -1 && topPosition > -1) {
    count += gridspots.find(
      (spot) => spot.x === leftPosition && spot.y === topPosition
    )
      ? 1
      : 0;
  }

  // diagonal right up
  if (rightPosition > -1 && topPosition > -1) {
    count += gridspots.find(
      (spot) => spot.x === rightPosition && spot.y === topPosition
    )
      ? 1
      : 0;
  }

  // diagonal left bottom
  if (leftPosition > -1 && bottomPosition > -1) {
    count += gridspots.find(
      (spot) => spot.x === leftPosition && spot.y === bottomPosition
    )
      ? 1
      : 0;
  }

  // diagonal right bottom
  if (rightPosition > -1 && bottomPosition > -1) {
    count += gridspots.find(
      (spot) => spot.x === rightPosition && spot.y === bottomPosition
    )
      ? 1
      : 0;
  }
  //}

  return count;
};
