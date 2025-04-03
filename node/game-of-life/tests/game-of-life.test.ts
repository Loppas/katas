// Your task is to write a program to calculate the next
// generation of Conway's game of life, given any starting
// position. You start with a two dimensional grid of cells,
// where each cell is either alive or dead. The grid is finite,
// and no life can exist off the edges. When calculating the
// next generation of the grid, follow these four rules:

// 1. Any live cell with fewer than two live neighbours dies,
//    as if caused by underpopulation.
// 2. Any live cell with more than three live neighbours dies,
//    as if by overcrowding.
// 3. Any live cell with two or three live neighbours lives
//    on to the next generation.
// 4. Any dead cell with exactly three live neighbours becomes
//    a live cell.

// Examples: * indicates live cell, . indicates dead cell

// Example input: (4 x 8 grid)
// 4 8
// ........
// ....*...
// ...**...
// ........

// Example output:
// 4 8
// ........
// ...**...
// ...**...
// ........

import { expect, test } from "vitest";
import { drawGrid } from ".././utils/draw-grid";
import { nearestNeighbour } from "../utils/nearest-neighbour";
import { gameOfLife } from "../utils/game-of-life";

const testGridWalker = [
  {
    x: 3,
    y: 1,
  },
  {
    x: 4,
    y: 2,
  },
  {
    x: 2,
    y: 3,
  },
  {
    x: 3,
    y: 3,
  },
  {
    x: 4,
    y: 3,
  },
];

const testGrid = [
  {
    x: 4,
    y: 1,
  },
  {
    x: 3,
    y: 2,
  },
  {
    x: 4,
    y: 2,
  },
];

test("outputs DataGrid with 8 cols and 4 rows", () => {
  expect(drawGrid(8, 4, testGrid)).toBe(
    `........\n....*...\n...**...\n........`
  );
});

test("outputs the number of adjacent nearest neighbours for spot 4,2 (x,y)", () => {
  expect(nearestNeighbour(4, 2, testGrid)).toBe(2);
});

test("outputs the number of adjacent nearest neighbours for spot 3,1 (x,y)", () => {
  expect(nearestNeighbour(3, 1, testGrid)).toBe(3);
});

test("outputs Game of Life with 8 cols and 4 rows", () => {
  expect(drawGrid(8, 4, gameOfLife(8, 4, testGrid))).toBe(
    `........\n...**...\n...**...\n........`
  );
});

test("outputs Game of Life with 8 cols and 4 rows", () => {
  // drawGrid(8, 4, testGridWalker);
  expect(
    drawGrid(
      10,
      10,
      gameOfLife(10, 10, gameOfLife(10, 10, gameOfLife(10, 10, testGridWalker)))
    )
  ).toBe(`........\n...**...\n...**...\n........`);
});
