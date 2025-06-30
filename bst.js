// prettyPrint(node, prefix, isLeft = true) borrowed from "https://www.theodinproject.com/lessons/javascript-binary-search-trees"
export class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor(arr = []) {
    this.root = this.buildTree([...new Set(arr)].sort((a, b) => a - b));
  }

  buildTree(arr) {
    const n = arr.length;
    if (n === 0) return null;
    const mid = Math.floor(n / 2);
    const root = new Node(arr[mid]);

    root.left = this.buildTree(arr.slice(0, mid));
    root.right = this.buildTree(arr.slice(mid + 1));

    return root;
  }

  insert(...values) {
    for (const value of values) {
      this.root = this.insertRecur(value, this.root);
    }
  }

  insertRecur(value, node) {
    if (!node) return new Node(value);
    if (value < node.data) {
      node.left = this.insertRecur(value, node.left);
    } else if (value > node.data) {
      node.right = this.insertRecur(value, node.right);
    }
    return node;
  }

  deleteItem(value, node = this.root) {
    if (!node) return null;
    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else {
      if (!node.left && !node.right) return null;
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      let successor = node.right;
      while (successor.left) successor = successor.left;
      node.data = successor.data;
      node.right = this.deleteItem(successor.data, node.right);
    }
    return node;
  }

  find(value, node = this.root) {
    if (!node) return null;
    if (node.data === value) return node;
    if (value < node.data) return this.find(value, node.left);
    return this.find(value, node.right);
  }

  printLevels() {
    this.prettyPrint(this.root);
  }

  levelOrder(callback) {
    const queue = [this.root];
    const result = [];
    while (queue.length > 0) {
      const levels = queue.length;
      const nodes = [];

      for (let i = 0; i < levels; i++) {
        const node = queue.shift();
        if (node) {
          nodes.push(node);
          if (node.left) queue.push(node.left);
          if (node.right) queue.push(node.right);
        }
      }

      if (nodes.length > 0) {
        try {
          nodes.forEach((node) => callback(node));
          result.push(nodes);
        } catch (error) {
          throw new Error(
            `Callback function in levelOrder failed: ${error.message}`,
          );
        }
      }
    }
    return result;
  }

  inorder(callback, node = this.root) {
    if (node === null) return;
    this.inorder(callback, node.left);
    callback(node);
    this.inorder(callback, node.right);
  }

  //   1,
  // 2,    5
  // 1, 3  4, 6

  preorder(callback, node = this.root) {
    if (node === null) return;
    callback(node);
    this.preorder(callback, node.left);
    this.preorder(callback, node.right);
  }

  postorder(callback, node = this.root) {
    if (node === null) return;
    this.postorder(callback, node.left);
    this.postorder(callback, node.right);
    callback(node);
  }

  printInorder() {
    this.inorder((node) => this.prettyPrint(node));
  }

  printPreorder() {
    this.preorder((node) => this.prettyPrint(node));
  }

  printPostorder() {
    this.postorder((node) => this.prettyPrint(node));
  }

  height(value, node = this.root) {
    if (node === null) return -1;
    if (node.data === value) {
      return this.computeHeight(node);
    }
    const left = this.height(value, node.left);
    if (left !== -1) return left;
    const right = this.height(value, node.right);
    return right;
  }

  computeHeight(node) {
    if (node === null) return -1;
    const left = this.computeHeight(node.left);
    const right = this.computeHeight(node.right);
    return Math.max(left, right) + 1;
  }
  // Math.max() returns largest number

  depth(value, node = this.root, currentDepth = 0) {
    if (node === null) return null;
    if (node.data === value) return currentDepth;
    const left = this.depth(value, node.left, currentDepth + 1);
    if (left !== null) return left;
    const right = this.depth(value, node.right, currentDepth + 1);
    return right;
  }

  isBalanced(node = this.root) {
    if (node === null) return true;
    const leftHeight = this.computeHeight(node.left);
    const rightHeight = this.computeHeight(node.right);
    const heightDiff = Math.abs(leftHeight - rightHeight);

    return (
      heightDiff <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  rebalance() {
    const nodes = [];
    this.inorder((node) => nodes.push(node.data));
    this.root = this.buildTree(nodes);
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) return;

    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

//
// insert(value) {
//   const curr = root;
//   let i = 0;
//   while (curr.data !== value) {
//     if (curr.left.data < value && curr.right.data > value) {
//       const temp = curr.left;
//       const newNode = newNode(value);
//       curr.left = newNode;
//       newNode.left = temp;
//       return;
//     } else if (curr.left.data > value && curr.right.data < value) {
//       const temp = curr.right;
//       const newNode = newNode(value);
//       curr.right = newNode;
//       newNode.right = temp;
//       return;
//     } else {
//       if (curr.left.data < value) {
//         curr = curr.left;
//       } else {
//         curr = curr.right;
//       }
//     }
//   }
// }
//

// deleteItem(value) {
//   const curr = root;
//   let i = 0;
//   while (curr.data !== value) {
//     if (curr.left.data === value) {
//       const tempLeft = curr.left.left;
//       const tempRight = curr.left.right;
//       curr.left = null;
//       if (curr.right === null) {
//         curr.left = tempLeft;
//         curr.right = tempRight;
//       } else {
//         curr.left = tempRight;
//         curr.left.left = tempLeft;
//       }
//     } else if (curr.right.data === value) {
//       const tempLeft = curr.right.left;
//       const tempRight = curr.right.right;
//       curr.right = null;
//       if (curr.left === null) {
//         curr.left = tempLeft;
//         curr.right = tempRight;
//       } else {
//         curr.right = tempRight;
//         curr.right.left = tempLeft;
//       }
//     } else if (curr.left.data < value) {
//       curr = curr.left;
//     } else {
//       curr = curr.right;
//     }
//   }
// }
//

// find(value) {
//   while (curr.data !== value) {
//     curr = Tree.arr[i];
//     if (curr.left.data === value) {
//       return curr.left;
//     } else if (curr.right.data === value) {
//       return curr.right;
//     } else if (curr.left.data < value) {
//       curr = curr.left;
//     } else {
//       curr = curr.right;
//     }
//   }
// }
//

// inorderTraverse = this.inorder(function (arr) {
//   const last = null;
//   const node = arr[0];
//   while (node !== last) {
//     if (node.left.data !== last || node.right.data === null) {
//       node = node.left;
//     } else if (node.right.data !== last || node.left.data === null) {
//       node = node.right;
//     }
//     last = null;
//   }
//   arr.push(node.left, node.data, node.right);
//   last = node;
//   return callback(arr);
// });
// }
//
//   1,
// 2,    5
// 1, 3  4, 6
