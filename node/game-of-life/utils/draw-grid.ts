import { GridSpot } from ".././entities/grid-spot";

export const drawGrid = (
  width: number,
  height: number,
  gridSpots: GridSpot[]
) => {
  let complete = "";

  for (let y = 0; y < height; y++) {
    let row = "";

    for (let x = 0; x < width; x++) {
      row +=
        gridSpots.find((spot) => spot.x === x && spot.y === y) !== undefined
          ? "*"
          : ".";
    }

    complete += row + (y < height - 1 ? "\n" : "");
  }

  console.log(complete);

  return complete;
};
