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

// brute force
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