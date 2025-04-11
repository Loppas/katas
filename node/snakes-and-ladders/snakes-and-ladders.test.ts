/*****  
Snakes and Ladders

https://www.codewars.com/kata/587136ba2eefcb92a9000027

1.  There are two players and both start off the board on square 0.

2.  Player 1 starts and alternates with player 2.

3.  You follow the numbers up the board in order 1=>100

4.  If the value of both die are the same then that player will have another go.

5.  Climb up ladders. The ladders on the game board allow you to move upwards and get ahead faster. 
    If you land exactly on a square that shows an image of the bottom of a ladder, then you may move the 
    player all the way up to the square at the top of the ladder. (even if you roll a double).

6.  Slide down snakes. Snakes move you back on the board because you have to slide down them. 
    If you land exactly at the top of a snake, slide move the player all the way to the square at the bottom
    of the snake or chute. (even if you roll a double).

7.  Land exactly on the last square to win. The first person to reach the highest square on the board wins. 
    But there's a twist! If you roll too high, your player "bounces" off the last square and moves back. You can
    only win by rolling the exact number needed to land on the last square. For example, if you are on square 98
    and roll a five, move your game piece to 100 (two moves), then "bounce" back to 99, 98, 97 (three, four then five moves.)

8.  If the Player rolled a double and lands on the finish square “100” without any remaining moves then the Player wins
    the game and does not have to roll again.

Your task is to make a simple class called SnakesLadders. The test cases will call the method play(die1, die2) independantly
of the state of the game or the player turn.  The variables die1 and die2 are the die thrown in a turn and are both integers
between 1 and 6. The player will move the sum of die1 and die2.

Returns:

Return "Player n Wins!"". Where n is winning player that has landed on square 100 without any remainding moves left.

Return "Game over!" if a player has won and another player tries to play.

Otherwise return "Player n is on square x". Where n is the current player and x is the sqaure they are currently on.

*****/

import { beforeEach, expect, test } from "vitest";

class SnakesLadders {
  // Each snake or ladder is a pair (start, end)
  snakesladders: { [key: number]: number } = {
    2: 38,
    7: 14,
    8: 31,
    16: 6,
    21: 42,
    28: 84,
    36: 44,
    46: 25,
    49: 11,
    51: 67,
    62: 19,
    64: 60,
    71: 91,
    74: 53,
    78: 98,
    87: 94,
    92: 88,
    95: 75,
    99: 80,
  };

  playerPosition: { [key: number]: number } = {};

  // Player numbers start at 0
  playerTurn: number = 0;

  reset() {
    this.playerPosition = { 0: 0, 1: 0 };
    this.playerTurn = 0;
  }

  play(die1: number, die2: number) {
    let square = this.playerPosition[this.playerTurn] + die1 + die2;
    const target = this.snakesladders[square];
    if (target !== undefined) {
      square = target;
    }

    this.playerPosition[this.playerTurn] = square;

    const currentPlayer = this.playerTurn;

    if (die1 !== die2) {
      this.playerTurn = 1 - this.playerTurn;
    }

    return `Player ${currentPlayer + 1} is on square ${square}`;
  }
}

const game = new SnakesLadders();

beforeEach(() => {
  game.reset();
});

test("play('1 + 2')", () => {
  expect(game.play(1, 2)).toBe("Player 1 is on square 3");
});

test("play('1 + 3')", () => {
  expect(game.play(1, 3)).toBe("Player 1 is on square 4");
});

test("play('3 + 4')", () => {
  expect(game.play(3, 4)).toBe("Player 1 is on square 14");
});

test("player1 then player2", () => {
  expect(game.play(3, 4)).toBe("Player 1 is on square 14");
  expect(game.play(1, 1)).toBe("Player 2 is on square 38");
});

test("player1 then player2 then player1 then player 2", () => {
  expect(game.play(3, 4)).toBe("Player 1 is on square 14");
  expect(game.play(1, 1)).toBe("Player 2 is on square 38");
  expect(game.play(1, 1)).toBe("Player 2 is on square 40");
  expect(game.play(2, 1)).toBe("Player 2 is on square 43");
  expect(game.play(2, 1)).toBe("Player 1 is on square 17");
});

test("player1 lands on 8", () => {
  expect(game.play(6, 2)).toBe("Player 1 is on square 31");
});

test("player1 lands on 38, then on 25", () => {
  expect(game.play(1, 1)).toBe("Player 1 is on square 38");
  expect(game.play(3, 5)).toBe("Player 1 is on square 25");
});

test("player1 bounces off 100", () => {
  game.playerPosition[0] = 99;
  expect(game.play(1, 5)).toBe("Player 1 is on square 75");
});
