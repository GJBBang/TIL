const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const [inputN, inputK, inputQ, inputM] = input[0].split(" ").map(Number);
const inputKList = input[1].split(" ").map(Number);
const inputQList = input[2].split(" ").map(Number);
const inputRange = [];
for (i = 3; i < 3 + inputM; i++) {
  const temp = input[i].split(" ").map(Number);
  inputRange.push(temp);
}

/*
N, K, Q, M = 10, 1, 3, 1
KList = [ 7 ]
QList = [ 3, 5, 7 ]
range = [ [ 3, 12 ] ]
*/

function solution(N, K, Q, M, KList, QList, range) {
  const students = new Array(N + 3).fill(0);
  const result = new Array(N + 3).fill(1);
  result[2] = 0;

  for (i = 0; i < K; i++) {
    students[KList[i]] = 9;
  }

  for (i = 0; i < Q; i++) {
    if (students[QList[i]] === 9) continue;
    let n = 1;
    while (QList[i] * n < N + 3) {
      if (students[QList[i] * n] === 9) {
        n++;
        continue;
      }

      students[QList[i] * n] = 1;
      result[QList[i] * n] = 0;
      n++;
    }
  }

  for (i = 4; i < N + 3; i++) {
    result[i] += result[i - 1];
  }
  

  for (i = 0; i < M; i++) {
    const [s, e] = inputRange[i];
    console.log(result[e] - result[s - 1]);
  }
}

solution(inputN, inputK, inputQ, inputM, inputKList, inputQList, inputRange);
