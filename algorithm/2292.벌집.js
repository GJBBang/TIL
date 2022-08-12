const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString();

const inputN = +input;

// N = 13

function solution(N) {
  let cnt = 1;
  let num = 1;

  while (num < N) {
    num += 6 * cnt;
    cnt++;
  }
  console.log(cnt);
}

solution(inputN);