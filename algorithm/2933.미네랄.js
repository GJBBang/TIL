/*
5 6
......
..xx..
..x...
..xx..
.xxxx.
1
3
*/

const fs = require("fs");
// const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync("/dev/stdin").toString().trimEnd().split("\n");

const [inputR, inputC] = input[0].split(" ").map(Number);
const inputMineral = [];
for (i = 1; i <= inputR; i++) {
  inputMineral.push(input[i].trim().split(""));
}
const inputN = +input[input.length - 2];
const inputHeight = input[input.length - 1].split(" ").map(Number);

/*
R = 5
C = 6
mineral = ['.', '.', '.', '.', '.', '.'], ['.', '.', 'x', 'x', '.', '.'], ['.', '.', 'x', '.', '.', '.'], ['.', '.', 'x', 'x', '.', '.'], ['.', 'x', 'x', 'x', 'x', '.']]
N = 1
height = [3]
*/

function solution(R, C, mineral, N, height) {
  // 막대 던지기
  const throwBar = (n, x) => {
    if (n % 2) {
      for (j = C - 1; j >= 0; j--) {
        if (mineral[R - x][j] === "x") {
          mineral[R - x][j] = ".";
          return;
        }
      }
    } else {
      for (j = 0; j < C; j++) {
        if (mineral[R - x][j] === "x") {
          mineral[R - x][j] = ".";
          return;
        }
      }
    }
  };

  // 클러스터 체크
  const checkCluster = (visited) => {
    for (ii = 0; ii < R; ii++) {
      for (jj = 0; jj < C; jj++) {
        if (mineral[ii][jj] === "x" && !visited[ii][jj]) {
          const isClusterInTheAir = checkInTheAir(ii, jj, visited);
          if (isClusterInTheAir) {
            dropMineral(isClusterInTheAir);
            return;
          }
        }
      }
    }
  };

  // 공중 체크
  const checkInTheAir = (x, y, visited) => {
    const cluster = [];
    for (iii = 0; iii < R; iii++) {
      const temp = new Array(C).fill(0);
      cluster.push(temp);
    }
    const queue = [];

    queue.push([x, y]);
    visited[x][y] = 1;
    cluster[x][y] = 1;

    const dx = [-1, 0, 1, 0];
    const dy = [0, 1, 0, -1];
    let checkR = false;
    while (queue.length > 0) {
      const [r, c] = queue.shift();
      if (r === R - 1) {
        checkR = true;
      }
      for (k = 0; k < 4; k++) {
        if (
          r + dx[k] >= 0 &&
          r + dx[k] < R &&
          c + dy[k] >= 0 &&
          c + dy[k] < C
        ) {
          if (
            mineral[r + dx[k]][c + dy[k]] === "x" &&
            !visited[r + dx[k]][c + dy[k]]
          ) {
            queue.push([r + dx[k], c + dy[k]]);
            visited[r + dx[k]][c + dy[k]] = 1;
            cluster[r + dx[k]][c + dy[k]] = 1;
          }
        }
      }
    }
    if (checkR) {
      return false;
    } else {
      return cluster;
    }
  };

  // 떨어뜨리기
  const dropMineral = (arr) => {
    for (ii = 0; ii < R; ii++) {
      for (jj = 0; jj < C; jj++) {
        if (arr[ii][jj]) {
          mineral[ii][jj] = ".";
        }
      }
    }

    while (true) {
      const temp = new Array(C).fill(0);
      arr.pop();
      arr.unshift(temp);

      for (jj = C - 1; jj >= 0; jj--) {
        for (ii = R - 1; ii >= 0; ii--) {
          if (arr[ii][jj]) {
            if (ii === R - 1 || mineral[ii + 1][jj] === "x") {
              for (kk = 0; kk < R; kk++) {
                for (zz = 0; zz < C; zz++) {
                  if (arr[kk][zz]) {
                    mineral[kk][zz] = "x";
                  }
                }
              }
              return;
            }
          }
        }
      }
    }
  };

  for (i = 0; i < N; i++) {
    throwBar(i, height[i]);
    const visited = [];
    for (ii = 0; ii < R; ii++) {
      const temp = new Array(C).fill(0);
      visited.push(temp);
    }
    checkCluster(visited);
  }

  for (i = 0; i < R; i++) {
    console.log(mineral[i].join(""));
  }
}

solution(inputR, inputC, inputMineral, inputN, inputHeight);
