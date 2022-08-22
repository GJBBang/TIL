const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const [inputN, inputM] = input[0].split(" ").map(Number);
const inputCandy = [];
for (i = 1; i < inputN + 1; i++) {
  inputCandy.push(input[i].split(" ").map(Number));
}

/*
N, M = 3, 15
candy = [[1, 1], [3, 1], [1, 6]]
*/

function solution(N, M, candy) {
  const board = [];
  for (i = 0; i < 302; i++) {
    const temp = new Array(302).fill(0);
    board.push(temp);
  }

  for (i = 0; i < N; i++) {
    const [x, y] = candy[i];
    board[x + 1][y + 1] = 1;
  }

  const dp = [];
  for (i = 0; i < 302; i++) {
    const temp = new Array(302).fill(0);
    dp.push(temp);
  }

  for (i = 1; i < 302; i++) {
    for (j = 1; j < 302; j++) {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      if (board[i][j]) {
        dp[i][j] += Math.max(0, M - (i + j - 2));
      }
    }
  }

  console.log(dp[301][301]);
}

solution(inputN, inputM, inputCandy);