/*
3 3 6
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

const [inputA, inputB, inputC] = input[0].split(" ").map((num) => +num);

function solution(a, b, c) {
  let result = 0;
  if (a === b && a === c) {
    result = 10000 + a * 1000;
  } else if (a == b || a == c) {
    result = 1000 + a * 100;
  } else if (b == c) {
    result = 1000 + b * 100;
  } else {
    const maxNum = Math.max(a, b, c);
    result = maxNum * 100;
  }

  console.log(result);
}

solution(inputA, inputB, inputC);
