/*
Design a class which receives a list of words in the constructor, and implements a method that takes two words word1 and word2 and return the shortest distance between these two words in the list. Your method will be called repeatedly many times with different parameters.

Example:
Assume that words = ["practice", "makes", "perfect", "coding", "makes"].

Input: word1 = “coding”, word2 = “practice”
Output: 3
Input: word1 = "makes", word2 = "coding"
Output: 1
Note:
You may assume that word1 does not equal to word2, and word1 and word2 are both in the list.
*/

/**
 * @param {string[]} words
 */
var WordDistance = function(words) {
  this.words = words;
  this.indexes = this.words.reduce((map, word, i) => {
      map[word] = (map[word] || []).concat([i]);
      return map;
  }, {});
};

/**
* @param {string} word1
* @param {string} word2
* @return {number}
*/
WordDistance.prototype.shortest = function(word1, word2) {
  let word1idxs = this.indexes[word1];
  let word2idxs = this.indexes[word2];
  let shortest = +Infinity;
  let i = 0, j = 0;

  while (i < word1idxs.length && j < word2idxs.length) {
      shortest = Math.min(shortest, Math.abs(word1idxs[i] - word2idxs[j]));

      if (word1idxs[i] < word2idxs[j]) {
          i++;
      } else {
          j++;
      }
  }

  return shortest;
};

/**
* Your WordDistance object will be instantiated and called as such:
* var obj = new WordDistance(words)
* var param_1 = obj.shortest(word1,word2)
*/