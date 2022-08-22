// 10

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString();

const inputN = +input;

function solution(N) {
  // 재귀
  const factorial = (n) => {
    if (n <= 1) return 1;

    return n * factorial(n - 1);
  };

  console.log(factorial(N));
}

solution(inputN);
