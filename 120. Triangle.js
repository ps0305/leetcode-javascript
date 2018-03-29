/**
 * Given a triangle, find the minimum path sum from top to bottom. Each step you may move to adjacent numbers on the row below.
 * 
 * For example, given the following triangle
 * [
 *      [2],
 *     [3,4],
 *    [6,5,7],
 *   [4,1,8,3]
 * ]
 * The minimum path sum from top to bottom is 11 (i.e., 2 + 3 + 5 + 1 = 11).
 * 
 * Note:
 * Bonus point if you are able to do this using only O(n) extra space, where n is the total number of rows in the triangle.
 */

/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
	var len = triangle.length;
	var len2 = 0;
	var res = Number.MAX_SAFE_INTEGER;
	var dp = Array(len);

	for (var i = 0; i < len; i++) {
			len2 = triangle[i].length;
			dp[i] = Array(len2).fill(0);
			for (var j = 0; j < len2; j++) {
					dp[i][j] = getMinParent(dp, i, j) + triangle[i][j];
					if (i === (len - 1)) res = Math.min(res, dp[i][j]);
			}
	}

	return res === Number.MAX_SAFE_INTEGER ? 0 : res;
};

var getMinParent = function (dp, i, j) {
	var left = 0;
	var right = 0;

	if (i === 0) return 0;

	if (j === 0) left = Number.MAX_SAFE_INTEGER;
	else left = dp[i - 1][j - 1];

	if (j === dp[i - 1].length) right = Number.MAX_SAFE_INTEGER;
	else right = dp[i - 1][j];
	
	return Math.min(left, right);
};

// 动态规划
// dp[i][j] 记录到达 i 行 j 列的点的最小和
// 每个点可以由上一行的两个点（或只有一个点）到达，它的值只与这两个点有关
// 到达某个点的最小和 = min(上一行左边点最小和， 上一行右边点最小和) + 当前点的数值
// 最后找出最后一行的最小值就好

// 优化：其实dp只要保留上一行的值就好，我这里保留了所有行的值，可以用滚动数组
