/*
4
1 3 5 7
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const inputN = +input[0];
const inputNumbers = input[1].split(" ").map((num) => +num);

/*
N = 4
numbers = [1, 3, 5, 7]
 */

function solution(N, numbers) {
  const isPrime = (num) => {
    if (num < 2) return false;
    if (num === 2 || num === 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    if (num < 9) return true;
    let k = 5;
    const l = Math.sqrt(num);
    while (k <= l) {
      if (num % k === 0 || num % (k + 2) === 0) return false;
      k += 6;
    }
    return true;
  };

  const result = [];
  for (i = 0; i < N; i++) {
    if (isPrime(numbers[i])) {
      result.push(numbers[i]);
    }
  }

  console.log(result.length);
}

solution(inputN, inputNumbers);
