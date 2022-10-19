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
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  const melting = () => {
    const visited = new Array(N).fill(0).map(() => new Array(M).fill(false));
    for (let i = 1; i < N - 1; i++) {
      for (let j = 1; j < M - 1; j++) {
        if (board[i][j]) {
          for (let k = 0; k < 4; k++) {
            const [n, m] = [i + dx[k], j + dy[k]];
            if (!board[n][m] && !visited[n][m]) {
              board[i][j] -= 1;
              if (!board[i][j]) {
                visited[i][j] = true;
                break;
              }
            }
          }
        }
      }
    }
  };

  const bfs = (i, j, visitedIceberg) => {
    const queue = [];
    queue.push([i, j]);
    visitedIceberg[i][j] = true;

    while (queue.length) {
      const [x, y] = queue.shift();
      for (let k = 0; k < 4; k++) {
        const [n, m] = [x + dx[k], y + dy[k]];
        if (board[n][m] && !visitedIceberg[n][m]) {
          queue.push([n, m]);
          visitedIceberg[n][m] = true;
        }
      }
    }

    return visitedIceberg;
  };

  const checkIceberg = () => {
    let visitedIceberg = new Array(N)
      .fill(0)
      .map(() => new Array(M).fill(false));
    let flag = true;
    for (let i = 1; i < N - 1; i++) {
      for (let j = 1; j < M - 1; j++) {
        if (board[i][j] && !visitedIceberg[i][j]) {
          if (flag) {
            visitedIceberg = bfs(i, j, visitedIceberg);
            flag = false
          } else {
            return false;
          }
        }
      }
    }

    return true;
  };

  const isIceberg = () => {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (board[i][j]) return true;
      }
    }

    return false;
  }

  let year = 0;
  while (true) {
    year++;
    melting();
    if (!checkIceberg()) {
      console.log(year);
      break;
    } else {
      if (!isIceberg()) {
        console.log(0);
        break;
      }
    }
  }
}

solution(inputN, inputM, inputBoard);
