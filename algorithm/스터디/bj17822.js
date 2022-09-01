const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const [inputN, inputM, inputT] = input[0].split(" ").map(Number);
const inputBoard = [];
const zeroBoard = new Array(inputM).fill("x");
inputBoard.push(zeroBoard);
for (i = 0; i < inputN; i++) {
  const temp = input[i + 1].split(" ").map(Number);
  inputBoard.push(temp);
}

const inputRotation = [];
for (i = 0; i < inputT; i++) {
  const temp = input[i + 1 + inputN].split(" ").map(Number);
  inputRotation.push(temp);
}

/**
 * N, M, T = 4, 4, 1
 * board = [ [ "x", "x", "x", "x" ], [ 1, 1, 2, 3 ], [ 5, 2, 4, 2 ], [ 3, 1, 3, 5 ], [ 2, 1, 3, 2 ], [ "x", "x", "x", "x" ] ]
 * rotation = [ [ 2, 0, 1 ] ]
 */

function solution(N, M, T, board, rotation) {
  // 원판 회전
  const boardRotation = (x, d, k) => {
    let cnt = 1;

    while (x * cnt <= N) {
      if (d) {
        for (i = 0; i < k; i++) {
          board[x * cnt].push(board[x * cnt].shift());
        }
      } else {
        for (i = 0; i < k; i++) {
          board[x * cnt].unshift(board[x * cnt].pop());
        }
      }
      cnt++;
    }

    return;
  };

  // 인접 숫자 확인
  const checkAround = () => {
    const dx = [-1, 0, 1, 0];
    const dy = [0, 1, 0, -1];

    let flag = true;

    const visited = [];
    for (i = 0; i < N + 1; i++) {
      const temp = new Array(M).fill(0);
      visited.push(temp);
    }

    for (i = 1; i < N + 1; i++) {
      for (j = 0; j < M; j++) {
        if (board[i][j] !== "x" && !visited[i][j]) {
          const checkNum = board[i][j];

          if (j === 0) {
            if (board[i][M - 1] === checkNum) {
              board[i][j] = "x";
              board[i][M - 1] = "x";
              flag = false;
            }
          }

          const queue = [];
          queue.push([i, j]);
          visited[i][j] = 1;

          while (queue.length) {
            for (k = 0; k < 4; k++) {
              if (
                i + dx[k] >= 1 &&
                i + dx[k] < N + 1 &&
                j + dy[k] >= 0 &&
                j + dy[k] < M
              ) {
                if (board[i + dx[k]][j + dy[k]] === checkNum) {
                  queue.push([i + dx[k], j + dy[k]]);
                  visited[i + dx[k]][j + dy[k]];

                  board[i][j] = "x";
                  board[i + dx[k]][j + dy[k]] = "x";
                  flag = false;
                }
              }
            }
          }
        }
      }
    }
    if (flag) changeNum();

    return;
  };

  // 같은 숫자가 존재하지 않을 때
  const changeNum = () => {
    const [sumNumber, cntNumber] = sumNum();
    const averageNum = sumNumber / cntNumber;

    for (i = 1; i < N + 1; i++) {
      for (j = 0; j < M; j++) {
        if (board[i][j] !== "x") {
          if (board[i][j] > averageNum) board[i][j]--;
          else if (board[i][j] < averageNum) board[i][j]++;
        }
      }
    }
  };

  // 숫자 최종 합
  const sumNum = () => {
    let cnt = 0;
    let sumNumbers = 0;
    for (i = 1; i < N + 1; i++) {
      for (j = 0; j < M; j++) {
        if (board[i][j] !== "x") {
          sumNumbers += board[i][j];
          cnt++;
        }
      }
    }
    return [sumNumbers, cnt];
  };

  rotation.forEach((arr) => {
    const [x, d, k] = arr;
    boardRotation(x, d, k);
    checkAround();
    console.log(board);
  });

  const [result, cnt] = sumNum();
  console.log(result);
}

solution(inputN, inputM, inputT, inputBoard, inputRotation);
