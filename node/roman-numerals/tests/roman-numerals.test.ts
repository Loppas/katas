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

✅ Repetition Rules
Only I, X, C, and M can be repeated.

They can be repeated at most 3 times in a row.

✅ III = 3

❌ IIII is invalid (4 is IV)

V, L, and D can never be repeated.

➖ Subtractive Notation Rules
Sometimes a smaller numeral appears before a larger one to indicate subtraction:

I can be placed before V (5) and X (10) → IV = 4, IX = 9

X can come before L (50) and C (100) → XL = 40, XC = 90

C can come before D (500) and M (1000) → CD = 400, CM = 900

🛑 Other combinations like IL, IC, or XD are invalid.

🔁 Order Rules
Numerals are written in descending order of value from left to right.

✅ MCMXC = 1990 (1000 + (1000−100) + (100−10))

❌ IC is invalid (should be XCIX = 99)

🔢 Standard Roman numerals only go up to 3,999 (MMMCMXCIX).

*/

import { expect, test } from "vitest";
import fc from "fast-check";

type glyphs =
  | "I"
  | "IV"
  | "V"
  | "IX"
  | "X"
  | "XL"
  | "L"
  | "XC"
  | "C"
  | "CD"
  | "D"
  | "CM"
  | "M";

const mappedGlyphs: { [key in glyphs]: number } = {
  I: 1,
  IV: 4,
  V: 5,
  IX: 9,
  X: 10,
  XL: 40,
  L: 50,
  XC: 90,
  C: 100,
  CD: 400,
  D: 500,
  CM: 900,
  M: 1000,
};

const convertNumberIntoRomanNumerals = (input: number) => {
  const entries = Object.entries(mappedGlyphs).sort((a, b) => {
    return b[1] - a[1];
  });

  let str = entries.reduce<string>(
    (acc, [roman, value]: (typeof entries)[number]) => {
      while (input >= value) {
        acc += roman;
        input -= value;
      }

      return acc;
    },
    ""
  );

  return str;
};

const convertRomanNumeralsIntoNumber = (input: string) => {
  const entries = Object.entries(mappedGlyphs).sort((a, b) => {
    return b[0].length - a[0].length;
  });

  let str = entries.reduce((acc, [roman, value]: (typeof entries)[number]) => {
    while (input.includes(roman)) {
      acc += value;
      input = input.replace(roman, "");
    }

    return acc;
  }, 0);

  return str;
};

test("Converts into roman numerals", () => {
  expect(convertNumberIntoRomanNumerals(1)).toBe("I");
  expect(convertNumberIntoRomanNumerals(5)).toBe("V");
  expect(convertNumberIntoRomanNumerals(4)).toBe("IV");
  expect(convertNumberIntoRomanNumerals(9)).toBe("IX");
  expect(convertNumberIntoRomanNumerals(6)).toBe("VI");
  expect(convertNumberIntoRomanNumerals(8)).toBe("VIII");
  expect(convertNumberIntoRomanNumerals(90)).toBe("XC");
  expect(convertNumberIntoRomanNumerals(1988)).toBe("MCMLXXXVIII");
  expect(convertNumberIntoRomanNumerals(0)).toBe("");
});

test("Convert to Roman Numerals and back to number", () => {
  fc.assert(
    fc.property(fc.integer({ min: 0, max: 300000 }), (input) => {
      const romanNumerals = convertNumberIntoRomanNumerals(input);
      const number = convertRomanNumeralsIntoNumber(romanNumerals);
      expect(number).toBe(input);
    })
  );
});
