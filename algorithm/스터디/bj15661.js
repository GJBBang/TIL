const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const inputN = +input[0];
const inputArr = [];
for (i = 0; i < inputN; i++) {
  const temp = input[i + 1].split(" ").map(Number);
  inputArr.push(temp);
}

/**
  N = 4
  arr = [ [ 0, 1, 2, 3 ], [ 4, 0, 5, 6 ], [ 7, 1, 0, 2 ], [ 3, 4, 5, 0 ] ]
 */

function solution(N, arr) {
  const teamA = [];
  const teamB = [];
  const visited = new Array(N).fill(0);

  const teamCombi = (k) => {
    if (k === N) {
      return;
    }

    for (i = 0; i < N; i++) {}
  };

  teamA.push(0);
  visited[0] = 1;
  teamCombi(1);
}

solution(inputN, inputArr);
