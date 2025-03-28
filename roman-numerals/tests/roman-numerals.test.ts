/* 
The Kata says you should write a function to convert from Roman Numerals to decimal numerals. In order to keep the kata light, we will not check for valid Roman Numeral.

Roman numerals, the numeral system of ancient Rome, uses combinations of letters from the Latin alphabet to signify values. They are based on seven symbols:

Symbol	Value
I	      1
V	      5
X	      10
L	      50
C	      100
D	      500
M	      1000
*/

import { expect, test } from "vitest";

type numerals = "I" | "V" | "X" | "L" | "C" | "D" | "M";

type NumeralValue = {
  value: number;
  numeral: numerals;
};

const numeralValues: NumeralValue[] = [
  { value: 1, numeral: "I" },
  { value: 5, numeral: "V" },
  { value: 10, numeral: "X" },
  { value: 50, numeral: "L" },
  { value: 100, numeral: "C" },
  { value: 500, numeral: "D" },
  { value: 1000, numeral: "M" },
];

const getMaxNumeralValue = (value: number): NumeralValue | undefined => {
  // TODO: map to keys

  for (var i = numeralValues.length - 1; i >= 0; i--) {
    if (value >= numeralValues[i].value) {
      return numeralValues[i];
    }
  }

  return undefined;
};

const numberToNumerals = (
  remainderValue: number,
  accumulatedNumeral: string
): string => {
  // TODO: handle 0
  if (remainderValue === 1) {
    return accumulatedNumeral + "I";
  }

  // get max from current remainder (fit to numerals)
  const maxFromRemainder = getMaxNumeralValue(remainderValue);

  console.log("remainder: %d, accum: %s", remainderValue, accumulatedNumeral);

  if (maxFromRemainder) {
    accumulatedNumeral += maxFromRemainder.numeral;

    return numberToNumerals(
      remainderValue - maxFromRemainder.value,
      accumulatedNumeral
    );
  }

  return accumulatedNumeral;
};

const convertNumberIntoRomanNumerals = (value: number): string => {
  return numberToNumerals(value, "");
};

test("Converts 1 into roman numerals", () => {
  expect(convertNumberIntoRomanNumerals(1)).toBe("I");
});

test("Converts 2 into roman numerals", () => {
  expect(convertNumberIntoRomanNumerals(5)).toBe("V");
});

test("Convert 23 into roman numerals", () => {
  expect(convertNumberIntoRomanNumerals(23)).toBe("XXIII");
});

test("Convert 32 into roman numerals", () => {
  expect(convertNumberIntoRomanNumerals(32)).toBe("XXXII");
});

test("Convert 0 into roman numerals", () => {
  expect(convertNumberIntoRomanNumerals(0)).toBe("");
});

test("Convert 3345 into roman numerals", () => {
  expect(convertNumberIntoRomanNumerals(3345)).toBe("MMMCCCXLV");
});
