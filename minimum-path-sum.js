/*
Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time.

Example 1:

Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
Output: 7
Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.
Example 2:

Input: grid = [[1,2,3],[4,5,6]]
Output: 12

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 200
0 <= grid[i][j] <= 100
*/

// BRUTE FORCE
// input: m x n matrix
// output: minimum sum of path from starting point to ending point
// constraints:
// edge: if matrix is null or length is 0, return 0

// start [0,0]
// end [m-1, n-1]

// smallest sum variable = 0

// dfs function(row, col, total)
//     - base case: if we reach end coords, then we check the total with the smallest sum and reassign smallest sum to the smaller number
//     - base case: if we reach outside of the matrix, return (stop recursion)
//     - total += matrix[row][col]
//     - recurse to the right
//     - recurse down
var minPathSum = function(grid) {
  if (!grid || grid.length === 0) return 0;

  let memo = new Map();
  let minSum = +Infinity;

  function dfs(row, col, total) {
      if (row === grid.length-1 && col === grid[0].length-1) {
          total += grid[row][col];
          minSum = Math.min(minSum, total);
          return;
      }
      if (row > grid.length - 1 || row < 0 || col > grid[0].length - 1 || col < 0) return;

      total += grid[row][col];

      dfs(row + 1, col, total);
      dfs(row, col + 1, total);
  }

  dfs(0, 0, 0);

  return minSum;
};

// DP

var minPathSum = function(grid) {
  // find sum of top row
  for (let i = 1; i < grid[0].length; i++) {
    grid[0][i] += grid[0][i-1];
  }

  // find sum of left col
  for (let j = 1; j < grid.length; j++) {
    grid[j][0] += grid[j-1][0];
  }

  // find min sum of all other spaces in matrix
  for (let r = 1; r < grid.length; r++) {
    for (let c = 1; c < grid[0].length; c++) {
      grid[r][c] = grid[r][c] + Math.min(grid[r-1][c], grid[r][c-1]);
    }
  }

  return grid[grid.length-1][grid[0].length-1]
};
