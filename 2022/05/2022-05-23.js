/*
cons(a, b) constructs a pair, and car(pair) and cdr(pair) 
returns the first and last element of that pair. For example, 
car(cons(3, 4)) returns 3, and cdr(cons(3, 4)) returns 4.

Given this implementation of cons:

def cons(a, b):
    def pair(f):
        return f(a, b)
    return pair

Implement car and cdr.
*/

function cons(a, b) {
  function pair(f) {
    return f(a, b);
  }

  return pair;
}

const car = (pair) => pair((a, b) => a);
const cdr = (pair) => pair((a, b) => b);

const assert = require("assert");
assert.strictEqual(
  car(cons(3, 4)),
  3,
  "it should return first argument of the cons function when calling car function"
);
assert.strictEqual(
  cdr(cons(3, 4)),
  4,
  "it should return second argument of the cons function when calling cdr function"
);
