/*
Given an array of integers, return a new array such that 
each element at index i of the new array is the product of 
all the numbers in the original array except the one at i.

For example, if our input was [1, 2, 3, 4, 5], the expected output would be 
[120, 60, 40, 30, 24]. If our input was [3, 2, 1], the expected output would be [2, 3, 6].
*/

/**
 * Transform each i-th element into a product of other numbers in the array
 * @param {number[]} array
 * @returns
 */
const calculateProductsOfIndexedValues = (array = []) => {
  if (array.length < 3) {
    return array;
  }

  const length = array.length;
  const forward = [array[0]];
  const backward = [];
  backward[length - 1] = array[length - 1];
  const product = [];

  for (let start = 1, end = length - 2; start < length; start++, end--) {
    forward[start] = array[start] * forward[start - 1];
    backward[end] = array[end] * backward[end + 1];
  }

  product[0] = backward[1];
  product[length - 1] = forward[length - 2];

  for (let index = 1; index <= length - 2; index++) {
    product[index] = forward[index - 1] * backward[index + 1];
  }

  return product;
};

const assert = require("assert");
assert.deepStrictEqual(
  calculateProductsOfIndexedValues([1, 2, 3, 4, 5]),
  [120, 60, 40, 30, 24],
  "it should return expected result with valid input"
);
assert.deepStrictEqual(
  calculateProductsOfIndexedValues([7, 13]),
  [7, 13],
  "it should return unmodified array when length is less than 3"
);
assert.deepStrictEqual(
  calculateProductsOfIndexedValues([3, 2, 1]),
  [2, 3, 6],
  "it should handle the case when array's length equals 3"
);
