const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const inputN = +input[0].trim();
const inputArr = input[1].split(" ").map(Number);

/*
N = 10
arr = [1, 2, 0, 1, 3, 2, 1, 5, 4, 2]
*/

function solution(N, arr) {
  if (N === 1) {
    console.log(0);
    return;
  }

  const dp = new Array(N).fill(0);

  for (i = 1; i <= arr[0]; i++) {
    dp[i] = 1;
  }

  for (i = 1; i < N; i++) {
    if (dp[i] && arr[i]) {
      for (j = 1; j <= arr[i]; j++) {
        if (i + j >= N) break;
        if (!dp[i + j]) {
          dp[i + j] = dp[i] + 1;
        }
      }
    }
  }

  if (dp[dp.length - 1]) {
    console.log(dp[dp.length - 1]);
  } else {
    console.log(-1);
  }
}

solution(inputN, inputArr);
