import * as node from './node.js';
import * as utils from './utils.js';

const BinarySearchTree = (array) => {
  // first remove duplicates and sort the array
  const cleanedArray = utils.removeArrayDuplicates(array);

  const buildTree = (array, start, end) => {
    // base case:
    if (start > end) return null;

    // get the middle of the array and use this as the value
    const middle = Math.floor((start + end) / 2);
    const newNode = node.Node(array[middle]);

    // to determine the left and right children, recursively call function to again get the middle value for each
    newNode.left = buildTree(array, start, middle - 1);
    newNode.right = buildTree(array, middle + 1, end);

    return newNode;
  };

  const root = buildTree(cleanedArray, 0, cleanedArray.length - 1);

  // helper function to print to console visual representation of tree
  const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  const find = (value, rootNode = root) => {
    // base case(s)
    if (rootNode.data === undefined) {
      return null;
    }
    if (rootNode.data === value) {
      return rootNode;
    }

    // value not found so either go down left or right
    if (value > rootNode.data) {
      return find(value, rootNode.right);
    } else {
      return find(value, rootNode.left);
    }
  };

  const insert = (value, rootNode = root) => {
    // base case
    if (rootNode === null) {
      return (rootNode = node.Node(value));
    }

    if (value > rootNode.data) {
      rootNode.right = insert(value, rootNode.right);
    } else {
      rootNode.left = insert(value, rootNode.left);
    }

    return rootNode;
  };

  const deleteNode = (value, rootNode = root) => {
    // base case:
    if (rootNode === null) {
      return rootNode;
    }

    // value found so now check for children and take relevant action
    if (value === rootNode.data) {
    }

    if (value > rootNode.data) {
      rootNode.right = deleteNode(value, rootNode.right);
    } else if (value < rootNode.data) {
      rootNode.left = deleteNode(value, rootNode.left);
    } else {
      // no children so can just delete
      if (rootNode.left === null && rootNode.right === null) {
        return null;
      }

      // only has right child
      if (rootNode.left === null && rootNode.right !== null) {
        return rootNode.right;
      }

      // only has left child
      if (rootNode.left !== null && rootNode.right === null) {
        return rootNode.left;
      }

      // has both children
      if (rootNode.left !== null && rootNode.right !== null) {
        // set rootNode.data to the smallest number on the right
        rootNode.data = utils.minValue(rootNode.right);
        rootNode.right = deleteNode(rootNode.data, rootNode.right);
      }
    }

    return rootNode;
  };

  return {
    get root() {
      return root;
    },
    prettyPrint,
    find,
    insert,
    deleteNode,
  };
};

let arr = [6, 6, 5, 4, 3, 2, 1, 6, 15, 22, 13];

const newTree = BinarySearchTree(arr);
const root = newTree.root;

newTree.insert(100);

console.log(newTree.prettyPrint(root));

newTree.deleteNode(13);

console.log(newTree.prettyPrint(root));
