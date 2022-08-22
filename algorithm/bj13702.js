const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

const [inputN, inputK] = input[0].split(" ").map((num) => +num);
const inputTestCase = [];
for (let i = 1; i <= inputN; i++) {
  const volume = +input[i];
  inputTestCase.push(volume);
}

/*

N = 2
K = 3
testCase = [702, 429]

*/

function solution(N, K, testCase) {
  let start = 0;
  let end = 2 ** 31 - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    let count = 0;

    for (i = 0; i < N; i++) {
      count += Math.floor(testCase[i] / mid);
    }

    if (count < K) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  console.log(end);
}

solution(inputN, inputK, inputTestCase);
