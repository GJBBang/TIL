/*

5 21
9 8 7 6 5

*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

const [inputN, inputM] = input[0].split(" ").map((num) => +num);
const inputTestCards = [];
input[1].split(" ").map((num) => inputTestCards.push(+num));
inputTestCards.sort((a, b) => a - b);

/*

N = 5
M = 21
testCards = [5, 6, 7, 8, 9]

*/

function solution(N, M, testCards) {
  let result = 0;
  function findMaxSum(k, index, num) {
    // 이미 M을 넘었을 때 가지치기
    if (num > M) return;
    // 카드 3장을 뽑았을 때 max값 갱신
    if (k === 3) {
      if (result < num) {
        result = num;
      }
      return;
    }
    // 카드 한장씩 뽑기
    for (i = index; i < N; i++) {
      console.log(index, i);
      findMaxSum(k + 1, i + 1, num + testCards[i]);
    }
  }

  findMaxSum(0, 0, 0);
  // console.log(result);
}

solution(inputN, inputM, inputTestCards);
