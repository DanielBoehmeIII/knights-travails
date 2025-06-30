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

  const queue = [[start, [start]]];
  const visited = new Set([start.toString()]);

  while (queue.length > 0) {
    const [current, path] = queue.shift();

    if (current[0] === end[0] && current[1] === end[1]) {
      console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
      for (const pos of path) {
        console.log(pos);
      }
      return path; // or return path.length - 1 if only move count is needed
    }

    for (const [dx, dy] of moves) {
      const next = [current[0] + dx, current[1] + dy];

      if (isValid(next) && !visited.has(next.toString())) {
        visited.add(next.toString());
        queue.push([next, [...path, next]]);
      }
    }
  }

  console.log("No path found.");
  return [];
}

knightMoves([3, 3], [4, 3]);
