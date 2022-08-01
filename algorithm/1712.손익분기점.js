/*
1000 70 170
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split(" ");

const [inputA, inputB, inputC] = input.map((num) => +num);

/*
A = 1000
B = 70
C = 170
 */

function solution(A, B, C) {
   let result = -1;
   if (B < C) {
    result = Math.floor(A / (C - B)) + 1;
   }
   console.log(result);
}

solution(inputA, inputB, inputC);