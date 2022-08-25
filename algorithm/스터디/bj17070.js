const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const inputN = +input[0];
const inputHouse = [];
for (i = 0; i < inputN; i++) {
  const temp = input[i + 1].split(" ").map(Number);
  inputHouse.push(temp);
}

/**
 N = 4
 house = [ [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ]
 */

function solution(N, house) {
  const dp = [];
  for (i = 0; i < inputN; i++) {
    tempArray = [];
    for (j = 0; j < inputN; j++) {
      const temp = new Array(3).fill(0);
      tempArray.push(temp);
    }
    dp.push(tempArray);
  }
  // 0: 가로, 1: 대각선, 2: 세로
  const directions = [
    [0, 1],
    [0, 1, 2],
    [1, 2],
  ];
  const course = [
    [0, 1],
    [1, 1],
    [1, 0],
  ];
  const movePipe = (x, y, d) => {
    directions[d].forEach((direction) => {
      const [dx, dy] = course[direction];
      const nx = x + dx;
      const ny = y + dy;

      if (nx < N && ny < N && !house[nx][ny]) {
        if (direction === 1) {
          if (!house[x + 1][y] && !house[x][y + 1]) {
            dp[nx][ny][direction] += dp[x][y][d];
          }
        } else {
          dp[nx][ny][direction] += dp[x][y][d];
        }
      }
    });
  };

  dp[0][1][0] = 1;
  for (i = 0; i < N; i++) {
    for (j = 0; j < N; j++) {
      for (d = 0; d < 3; d++) {
        if (dp[i][j][d] && !house[i][j]) {
          movePipe(i, j, d);
        }
      }
    }
  }
  console.log(dp[N - 1][N - 1].reduce((sum, currValue) => {
    return sum + currValue
  }, 0));
}

solution(inputN, inputHouse);
