const fs = require("fs");
const filePath = process.platfrom === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trimEnd().split("\n");

const inputN = +input[0];
const inputBoard = [];
for (i = 0; i < inputN; i++) {
  const temp = input[i + 1].split(" ").map(Number);
  inputBoard.push(temp);
}

/**
 N = 4
 board = [
  [ 2, 3, 3, 1 ]
  [ 1, 2, 1, 3 ]
  [ 1, 2, 3, 1 ]
  [ 3, 1, 1, 0 ]
]
 */

function solution(N, board) {
  const dp = [];
  for (i = 0; i < N; i++) {
    const temp = new Array(N).fill(BigInt(0));
    dp.push(temp);
  }

  dp[0][0] = 1;
  for (i = 0; i < N; i++) {
    for (j = 0; j < N; j++) {
      if (i === N - 1 && j === N - 1) return console.log(dp[N - 1][N - 1].toString());
      if (dp[i][j]) {
        const x = i + board[i][j];
        const y = j + board[i][j];
        if (x < N) dp[x][j] += BigInt(dp[i][j]);
        if (y < N) dp[i][y] += BigInt(dp[i][j]);
      }
    }
  }
}

solution(inputN, inputBoard);
