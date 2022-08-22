const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString();

const inputX = +input;

// X = 5

function solution(X) {
  let num = 1;
  let sumNum = 1;

  while (sumNum < X) {
    num++;
    sumNum += num;
  }
  let frontNum = 0;
  let backNum = 0;
  if (num % 2) {
    frontNum = 1;
    backNum = num;
    frontNum += sumNum - X;
    backNum -= sumNum - X;
  } else {
    frontNum = num;
    backNum = 1;
    frontNum -= sumNum - X;
    backNum += sumNum - X;
  }
  console.log(`${frontNum}/${backNum}`);
}

solution(inputX);