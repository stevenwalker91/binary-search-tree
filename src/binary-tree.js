import * as node from './node.js';
import * as utils from './utils.js';

const BinarySearchTree = (array) => {
  // first remove duplicates and sort the array
  const cleanedArray = utils.removeArrayDuplicates(array);

  const buildTree = (array, start, end) => {
    // base case:
    if (start > end) {
      return null;
    }

    const middle = (start + end) / 2;
    const newNode = node.Node(array[middle]);

    newNode.left = buildTree(array, start, middle - 1);
    newNode.right = buildTree(array, middle + 1, end);

    return newNode;
  };

  const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  return {
    get root() {
      return buildTree(cleanedArray, 0, cleanedArray.length);
    },
    prettyPrint,
  };
};

let arr = [6, 6, 5, 4, 3, 2, 1];

const newTree = BinarySearchTree(arr);
const root = newTree.root;

console.log(newTree.prettyPrint(root));
