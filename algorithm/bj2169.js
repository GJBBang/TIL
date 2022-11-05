const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const [inputN, inputM] = input[0].split(" ").map(Number);
const inputBoard = [];
for (let i = 0; i < inputN; i++) {
  const temp = input[i + 1].split(" ").map(Number);
  inputBoard.push(temp);
}

function solution(N, M, board) {
  const dp = new Array(N).fill(0).map(() => new Array(M).fill(0).map(() => new Array(3).fill(0)));
  dp[0][0][0] = board[0][0];
  for (let j = 1; j < M; j++) {
    dp[0][j][0] = dp[0][j - 1][0] + board[0][j];
  }

  for (let i = 1; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (j === 0) {
        dp[i][j][1] = dp[i - 1][j][0] + board[i][j];
      } else {
        dp[i][j][1] = Math.max(dp[i - 1][j][0] + board[i][j], dp[i][j - 1][1] + board[i][j]);
      }
    }
    for (let j = M - 1; j >= 0; j--) {
      if (j === M - 1) {
        dp[i][j][2] = dp[i - 1][j][0] + board[i][j];
      } else {
        dp[i][j][2] = Math.max(dp[i - 1][j][0] + board[i][j], dp[i][j + 1][2] + board[i][j]);
      }
      dp[i][j][0] = Math.max(dp[i][j][1], dp[i][j][2]);
    }
  }
  console.log(dp[N - 1][M - 1][0]);
}

solution(inputN, inputM, inputBoard);
