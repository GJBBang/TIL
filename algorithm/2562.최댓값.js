/*
3
29
38
12
57
74
40
85
61
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

const inputNumbers = [];
input.map((num) => inputNumbers.push(+num));

/*
numbers = [3, 29, 38, 12, 57, 74, 40, 85, 61]
*/

function solution(numbers) {
  let index = 0;
  let result = 0;
  for (i = 0; i < 9; i++) {
    if (result < numbers[i]) {
      result = numbers[i];
      index = i;
    }
  }
  console.log(result);
  console.log(index + 1);
}

solution(inputNumbers);