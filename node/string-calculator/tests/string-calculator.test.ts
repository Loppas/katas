/* 
String calculator Kata. 

This kata focuses on creating a calculator that parses a string for numbers and operators, performs the calculation and returns the result. 

Constraints:
- The input string:
    * Supports postive integer numbers
    * Supports addition, substraction, multiplication and division operators
    * Supports bracket grouping
- Calculator function:
    * Must take in a string and return a number
*/

import { expect, test } from "vitest";

const op = (num1: number, num2: number, op: string) => {
  console.log(`OPERATOR ${op}`);
  switch (op) {
    case "-":
      return num1 - num2;
    case "+":
      return num1 + num2;
    case "/":
      return num1 / num2;
  }

  return 0;
};

type operators = "+" | "-" | "/" | "*";

type Cheese = {
  operator: operators;
  operand: number;
  priority: number;
};

const extractNumbers = (stringToTest: string) => {
  const numbers = stringToTest.match(/\d+(?=[^\d])*|[+\-*/\/()]/g);
  return numbers ?? [];
};

const calculate = (input: string) => {
  //CHEATER!!!!!!
  // const result = Function(`"use strict"; return (${input})`)();
  // return result;

  const pairs: Cheese[] = [];
  const inputElements = extractNumbers(input) || [];
  let result = +(inputElements[0] ?? 0);

  for (let i = 1; i < inputElements.length; i++) {
    let priority = 0;

    switch (inputElements[i]) {
      case "*":
      case "/":
        priority = 1;
      case "+":
      case "-": {
        const operator = inputElements[i] as operators;
        const operand = +inputElements[i + 1];

        pairs.push({
          operator,
          operand,
          priority,
        });
      }
      default: {
      }
    }

    let lastPair = pairs.pop();

    if (lastPair?.operator) {
      result = op(result, lastPair.operand, lastPair.operator);
    }
  }

  console.log(result);
  return result;
};

test("calculate('1 + 1') = 2", () => {
  expect(calculate("1 + 1")).toBe(2);
});

test("calculate('1 + 11') = 2", () => {
  expect(calculate("1 + 11")).toBe(12);
});

test("calculate('1 + 2') = 2", () => {
  expect(calculate("1 + 2")).toBe(3);
});

test("calculate('1 + 23 + 456') = 2", () => {
  expect(calculate("1 + 23 + 456")).toBe(480);
});

test("calculate('23 - 1 + 456') = 2", () => {
  expect(calculate("23 - 1 + 456")).toBe(478);
});

test("calculate('1 - 2') = -1", () => {
  expect(calculate("1 - 2")).toBe(-1);
});

test("calculate('6/2') = 3", () => {
  expect(calculate("6 / 2")).toBe(3);
});

test("calculate('6/2 + 3') = 3", () => {
  expect(calculate("6 / 2 +3")).toBe(6);
});

test.only("calculate('3 + 6 / 2') = 6", () => {
  expect(calculate("3 + 6 / 2")).toBe(6);
});

test("calculate('5/(2 + 3)') = 1", () => {
  expect(calculate("5 / (2 +3)")).toBe(1);
});
