/*
Given a list of numbers and a number k, return whether any two numbers from the list add up to k.

For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.
*/

/**
 * Check if there are two numbers that
 * add up to a given number in an array.
 * @param {number[]} array
 * @param {number} k
 * @returns
 */
const findIfSumExists = (array = [], k) => {
  const map = {};
  for (let index = 0; index < array.length; index++) {
    const currentValue = array[index];

    if (map[currentValue]) {
      return true;
    }

    map[k - currentValue] = currentValue;
  }

  return false;
};

const assert = require("assert");
assert.strictEqual(
  findIfSumExists([10, 15, 3, 7], 17),
  true,
  "it should pass with valid input"
);
assert.strictEqual(
  findIfSumExists([10, 15, 3, 7], 11),
  false,
  "it should not pass given non-existent sum"
);
assert.strictEqual(
  findIfSumExists([], undefined),
  false,
  "it should not find any sum given empty array"
);
assert.strictEqual(
  findIfSumExists([2, 1], 4),
  false,
  "it should only pass if each term of a sum is present in array"
);
