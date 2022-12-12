# binary-search-tree

## Overview
This is a Javascript implementation of a binary search tree that can be imported into other applications. There are a number of methods that can be used to manipulate the tree.

## What is a binary search tree?
A binary search tree (BST) is a data structure that is useful for managing sorted data. Greater values are added to the tree on the right and smaller values are added on the right of the tree. This enables you tot ake a "divide & conquer" approach to finding values by traversing the tree checking if the value is greater than or less than the current node to reduce computation.

## How does it work?

The tree takes an array of values and will turn that array into a BST. Before processing the array, it will first remove any duplicates and then sort the array by smallest to largest. Sorting the array first prevents creating a linked-list type structure and ensure the tree produced is balanced. You can then call different methods to traverse the tree as needed and provide a callback function to be called on each node in the tree.

## Usage 

1. Import into file `import * as bst from './binary-tree.js';`
2. Create the array `const binaryTree = bst.BinarySearchTree(array);`
3. Manipulate/search using methods below


## Methods

| Method | Description |
| ---- | ----|
| `prettyPrint()` | Print a graphical representation of the tree to console |
| `find(value)` | Takes a value as an argument and returns the node containing that value if it exists, otherwise returns null |
| `insert(value)` | Takes a value as an argument and inserts a new leaf node with that value. This may unbalance the tree so you should checked by calling `isBalanced` and `rebalance` if necessary |
| `deleteNode(value)` | Takes a value as an argument and will delete that node and updates links to children nodes |
| `depth(node)` | Takes a node as an argument and returns the depth of that node. Depth is the number of edges in path from the given node to the root node |
| `height(node)` | Takes a node as an argument and returns the height of that node. Height is the number of edges in the longest path from the given node to a leaf node.
| `levelOrder(callbackFn)` | Traverses the tree breadth first. The function accepts an optional callback function which will be called against each node. If a callback function is not provided, it will return an array of values sorted by level order |
| `inOrder(callbackFn)` | Traverses the tree inorder (`Left -> Root -> Right`). The function accepts an optional callback function which will be called against each node. If a callback function is not provided, it will return an array of values sorted by inorder |
| `preOrder(callbackFn)` | Traverses the tree preorder (`Root -> Left -> Right`). The function accepts an optional callback function which will be called against each node. If a callback function is not provided, it will return an array of values sorted by preorder |
| `postOrder(callbackFn)` | Traverses the tree postorder (`Left -> Right -> Root`). The function accepts an optional callback function which will be called against each node. If a callback function is not provided, it will return an array of values sorted by postprder |
| `isBalanced()` | Checks if the tree is balanced and returns `true` or `false`. A balanced tree is defined as where the heights of the left tree and the right tree do not differ by more than one for every node. |
| `rebalance()` |  Will re-balance the tree. Useful after inserting nodes or anytime `isBalanced()` = `false`. Ensures maximum efficiency when traversing the tree to find a value |