/*
Given an array of integers, find the first missing positive integer 
in linear time and constant space. In other words, find the lowest 
positive integer that does not exist in the array. The array can 
contain duplicates and negative numbers as well.

For example, the input [3, 4, -1, 1] should give 2. 
The input [1, 2, 0] should give 3.

You can modify the input array in-place.
*/

/**
 * Given an array of integers, returns first missing positive integer
 * @param {number[]} array
 * @returns
 */
const findFirstMissingPositiveInteger = (array = []) => {
  if (array.length === 0 || !array.includes(1)) {
    return 1;
  }

  let low = 0;
  let high = array.length - 1;
  let pivot = 1;

  for (let index = 0; index <= high; ) {
    if (array[index] < pivot) {
      swap(array, index, high);
      high--;
    } else if (array[index] > pivot) {
      swap(array, index, low);
      index++;
      low++;
    } else {
      index++;
    }
  }

  let index = 0;
  while (index <= high) {
    const value = Math.abs(array[index]);
    if (value > 0 && value <= high + 1 && array[value - 1] > 0) {
      array[value - 1] *= -1;
    }

    index++;
  }

  const positiveValueIndex = array.findIndex((value) => value >= 0) + 1;

  if (positiveValueIndex) {
    return positiveValueIndex;
  }

  return index + 1;
};

const swap = (array, index1, index2) => {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
};

const assert = require("assert");
assert.strictEqual(
  findFirstMissingPositiveInteger([3, 4, -1, 1]),
  2,
  "it should return expected result with valid input"
);
assert.strictEqual(
  findFirstMissingPositiveInteger([1, 2, 0]),
  3,
  "it should handle a case when there is no gaps between the values"
);
assert.strictEqual(
  findFirstMissingPositiveInteger([-1, -2, -3]),
  1,
  "it should handle a case when every array value is negative"
);
assert.strictEqual(
  findFirstMissingPositiveInteger([]),
  1,
  "it should handle a case when array has no elements"
);
assert.strictEqual(
  findFirstMissingPositiveInteger([1]),
  2,
  "it should handle a case when array has one element"
);
assert.strictEqual(
  findFirstMissingPositiveInteger([1, 1]),
  2,
  "it should handle a case when array consists of duplicate numbers"
);
assert.strictEqual(
  findFirstMissingPositiveInteger([1, 2, 3, 5, 6]),
  4,
  "it should handle a case when array has a single step gap"
);
