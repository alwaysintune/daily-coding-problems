/*
Given the root to a binary tree, implement serialize(root), 
which serializes the tree into a string, and deserialize(s), 
which deserializes the string back into the tree.
*/

class Node {
  /**
   * @param {any} value
   * @param {Node} left
   * @param {Node} right
   */
  constructor(value, left = null, right = null) {
    this.left = left;
    this.right = right;
    this.value = value;
  }
}

/**
 * @param {Node} node
 * @param {string} separator
 * @param {string} marker
 * @returns serialized binary tree
 */
const serialize = (node, separator = "|", marker = "~") => {
  const escapedSeparator = `\\${separator}`;
  const escapedMarker = `\\${marker}`;

  let serializedValue = "";
  (function _serialize(node) {
    if (node === null) {
      serializedValue += escapedMarker + escapedSeparator;
      return;
    }

    serializedValue += node.value + escapedSeparator;

    _serialize(node.left);
    _serialize(node.right);
  })(node);

  return serializedValue;
};

/**
 * @param {string} serializedValue
 * @param {string} separator
 * @param {string} marker
 * @returns deserialized binary tree
 */
const deserialize = (serializedValue = "", separator = "|", marker = "~") => {
  const escapedSeparator = `\\${separator}`;
  const escapedMarker = `\\${marker}`;

  const valuesArray = serializedValue.split(escapedSeparator);
  return (function _deserialize() {
    const value = valuesArray.shift();

    if (!value || value === escapedMarker) {
      return null;
    }

    const node = new Node(value);
    node.left = _deserialize();
    node.right = _deserialize();

    return node;
  })();
};

const node = new Node(
  "root",
  new Node("left", new Node("left.left")),
  new Node("right")
);

const assert = require("assert");
assert.strictEqual(
  deserialize(serialize(node)).left.left.value,
  "left.left",
  "it should return expected binary tree structure with valid input"
);
assert.deepStrictEqual(
  JSON.stringify(deserialize(serialize(node))),
  JSON.stringify(node),
  "it should not modify binary tree structure when deserializing"
);
