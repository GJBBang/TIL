const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().split("\n");

const inputN = +input[0];

/*

N = 5

*/

let cnt1 = 0;
let cnt2 = 0;
const dp = [];

function recursion(n) {
  if (n === 1 || n === 2) {
    cnt1++;
    return 1;
  } else {
    return recursion(n - 1) + recursion(n - 2);
  }
}

function dynamic(n) {
  dp.push(1);
  dp.push(1);
  for (i = 2; i < n; i++) {
    dp.push(dp[i - 1] + dp[i - 2]);
    cnt2++;
  }
  return;
}

function solution(N) {
  recursion(N);
  dynamic(N);
  console.log(cnt1, cnt2);
}

solution(inputN);
