#!/usr/bin/env node
import { Tree } from "./bst.js";

function knightMoves(start, end) {
  const moves = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  function isValid([x, y]) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }

  function posToString([x, y]) {
    return `${x}, ${y}`;
  }

  const queue = [[start, [start]]];
  const visited = new Set([start.toString()]);

  while (queue.length > 0) {
    const [current, path] = queue.shift();

    if (current[0] === end[0] && current[1] === end[1]) {
      return path;
    }

    for (const [dx, dy] of moves) {
      const next = [current[0] + dx, current[1] + dy];

      if (isValid(next) && !visited.has(next.toString())) {
        visited.add(next.toString());
        queue.push([next, [...path, next]]);
      }
    }
  }

  return { moveCount: -1, path: [] };
}

console.log(knightMoves([0, 0], [1, 2]));
