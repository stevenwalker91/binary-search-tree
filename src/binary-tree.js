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
    if (rootNode.data === undefined) return null;

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
    if (rootNode === null) return (rootNode = node.Node(value));

    if (value > rootNode.data) {
      rootNode.right = insert(value, rootNode.right);
    } else {
      rootNode.left = insert(value, rootNode.left);
    }

    return rootNode;
  };

  const deleteNode = (value, rootNode = root) => {
    // base case:
    if (rootNode === null) return rootNode;

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

  const depth = (node, rootNode = root, depthCount = 0) => {
    // base path(s):
    if (rootNode === null) return depthCount;
    if (rootNode.data === node.data) return depthCount;

    // value not found so either go down left or right
    if (node.data > rootNode.data) {
      return depth(node, rootNode.right, depthCount + 1);
    } else {
      return depth(node, rootNode.left, depthCount + 1);
    }
  };

  const height = (node) => {
    if (node === null) return 0;

    let left = height(node.left);
    let right = height(node.right);

    return Math.max(left + 1, right + 1);
  };

  const levelOrder = (callbackFunction) => {
    const queue = [root];
    const output = [];

    while (queue.length > 0) {
      let node = queue.shift();

      if (callbackFunction) callbackFunction(node);
      output.push(node);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    if (!callbackFunction) {
      return output;
    }
  };

  return {
    get root() {
      return root;
    },
    prettyPrint,
    find,
    insert,
    deleteNode,
    depth,
    height,
    levelOrder,
  };
};

let arr = [6, 6, 5, 4, 3, 2, 1, 6, 15, 22, 13];

const newTree = BinarySearchTree(arr);
const root = newTree.root;

newTree.insert(100);
const fifteen = newTree.find(5);
