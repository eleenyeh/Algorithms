/*
Given an m x n matrix of non-negative integers representing the height of each unit cell in a continent, the "Pacific ocean" touches the left and top edges of the matrix and the "Atlantic ocean" touches the right and bottom edges.

Water can only flow in four directions (up, down, left, or right) from a cell to another one with height equal or lower.

Find the list of grid coordinates where water can flow to both the Pacific and Atlantic ocean.

Note:
The order of returned grid coordinates does not matter.
Both m and n are less than 150.

Example:

Given the following 5x5 matrix:

  Pacific ~   ~   ~   ~   ~
       ~  1   2   2   3  (5) *
       ~  3   2   3  (4) (4) *
       ~  2   4  (5)  3   1  *
       ~ (6) (7)  1   4   5  *
       ~ (5)  1   1   2   4  *
          *   *   *   *   * Atlantic

Return:

[[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]] (positions with parentheses in above matrix).
*/

var pacificAtlantic = function(matrix) {
  if (!matrix.length) return [];
  let result = [];

  let atlantic = new Array(matrix.length).fill().map(row => new Array(matrix[0].length).fill(0));
  let pacific = new Array(matrix.length).fill().map(row => new Array(matrix[0].length).fill(0));

  // top & bottom
  for (let i = 0; i < matrix[0].length; i++) {
    dfs(matrix, 0, i, -Infinity, pacific);
    dfs(matrix, matrix.length - 1, i, -Infinity, atlantic);
  }

  // left & right
  for (let j = 0; j < matrix.length; j++) {
    dfs(matrix, j, 0, -Infinity, pacific);
    dfs(matrix, j, matrix[0].length - 1, -Infinity, atlantic);
  }

  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[0].length; c++) {
      if (atlantic[r][c] === 1 && pacific[r][c] === 1) {
        result.push([r, c]);
      }
    }
  }

  return result;
};

let dfs = (matrix, row, col, prev, ocean) {
  if (row < 0 || row >= matrix.length || col < 0 || col >= matrix[0].length) return;
  if (matrix[row][col] < prev) return;
  if (matrix[row][col] === 1) return;

  ocean[row][col] = 1;

  dfs(matrix, row + 1, col, matrix[row][col], ocean);
  dfs(matrix, row - 1, col, matrix[row][col], ocean);
  dfs(matrix, row, col + 1, matrix[row][col], ocean);
  dfs(matrix, row, col - 1, matrix[row][col], ocean);
}