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

  let root = buildTree(cleanedArray, 0, cleanedArray.length - 1);

  // helper function to print to console visual representation of tree
  const prettyPrint = (node = root, prefix = '', isLeft = true) => {
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

    // while the queue has stuff in it:
    // 1. get the first item from the queue and call the callback (if provided)
    // 1a. Add the node to an output array which will be returned if there is no callback
    // 2. check for nodes on the left and add them to the queue
    // 3. check for nodes on the right and add them to the queue
    while (queue.length > 0) {
      let node = queue.shift();

      if (callbackFunction) callbackFunction(node);
      output.push(node.data);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    if (!callbackFunction) {
      return output;
    }
  };

  const inOrder = (callbackFunction, node = root, returnArray = []) => {
    //base case
    if (node === null) {
      return;
    }

    if (node.left) inOrder(callbackFunction, node.left, returnArray);
    if (callbackFunction) callbackFunction(node);
    returnArray = utils.createArray(node, returnArray);
    if (node.right) inOrder(callbackFunction, node.right, returnArray);

    if (returnArray.length > 0) {
      return returnArray;
    }
  };

  const preOrder = (callbackFunction, node = root, returnArray = []) => {
    //base case
    if (node === null) {
      return;
    }

    if (callbackFunction) callbackFunction(node);
    returnArray = utils.createArray(node, returnArray);
    if (node.left) preOrder(callbackFunction, node.left, returnArray);
    if (node.right) preOrder(callbackFunction, node.right, returnArray);

    if (returnArray.length > 0) {
      return returnArray;
    }
  };

  const postOrder = (callbackFunction, node = root, returnArray = []) => {
    //base case
    if (node === null) {
      return;
    }

    if (node.left) postOrder(callbackFunction, node.left, returnArray);
    if (node.right) postOrder(callbackFunction, node.right, returnArray);
    if (callbackFunction) callbackFunction(node);
    returnArray = utils.createArray(node, returnArray);

    if (returnArray.length > 0) {
      return returnArray;
    }
  };

  const isBalanced = (node = root) => {
    // base case
    if (node === null) return true;

    const leftHeight = height(root.left);
    const rightHeight = height(root.right);

    if (Math.abs(rightHeight - leftHeight) > 1) {
      return false;
    } else {
      return true;
    }
  };

  const rebalance = () => {
    const array = inOrder(null);
    root = buildTree(array, 0, array.length - 1);
    return root;
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
    inOrder,
    preOrder,
    postOrder,
    isBalanced,
    rebalance,
  };
};

export { BinarySearchTree };
