/*
1 2
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

const [inputA, inputB] = input[0].split(" ").map((num) => +num);

function solution(a, b) {
  console.log(a + b);
}

solution(inputA, inputB);