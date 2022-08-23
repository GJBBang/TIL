const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trimEnd().split("\n");

const inputGear = [];
for (i = 0; i < 4; i++) {
  temp = input[i].trim().split("").map(Number);
  inputGear.push(temp);
}
const zero = [0, 0, 0, 0, 0, 0, 0, 0];
inputGear.push(zero);
inputGear.unshift(zero);
const inputK = +input[4];
const inputOrder = [];
for (i = 0; i < inputK; i++) {
  temp = input[i + 5].trim().split(" ").map(Number);
  inputOrder.push(temp);
}

/**
gear = [
  [
    0, 0, 0, 0,
    0, 0, 0, 0
  ],
  [
    1, 0, 1, 0,
    1, 1, 1, 1
  ],
  [
    0, 1, 1, 1,
    1, 1, 0, 1
  ],
  [
    1, 1, 0, 0,
    1, 1, 1, 0
  ],
  [
    0, 0, 0, 0,
    0, 0, 1, 0
  ],
  [
    0, 0, 0, 0,
    0, 0, 0, 0
  ]
]
K = 2
order = [ [ 3, -1 ], [ 1, 1 ] ]
 */

function solution(gear, K, order) {
  // 시계방향 돌리기
  const rotation = (arr) => {
    const temp = arr.pop();
    arr.unshift(temp);
  };

  // 반시계방향 돌리기
  const reverseRotation = (arr) => {
    const temp = arr.shift();
    arr.push(temp);
  };

  // 오른쪽 톱니 확인
  const checkRight = (gear, n, d) => {
    if (n > 4) return;

    if (gear[n][2] !== gear[n + 1][6]) {
      checkRight(gear, n + 1, d * (-1))
    }
    d === 1 ? rotation(gear[n]) : reverseRotation(gear[n]);
    return;
  };

  // 왼쪽 톱니 확인
  const checkLeft = (gear, n, d) => {
    if (n < 1) return;

    if (gear[n][6] !== gear[n - 1][2]) {
      checkLeft(gear, n - 1, d * (-1))
    }
    
    d === 1 ? rotation(gear[n]) : reverseRotation(gear[n]);
    return;
  };

  for (i = 0; i < K; i++) {
    const [n, d] = order[i];
    checkRight(gear, n, d);
    d === 1 ? reverseRotation(gear[n]) : rotation(gear[n]);
    checkLeft(gear, n, d);
  }

  let result = 0;
  for (i = 0; i < 4; i++) {
    result += gear[i + 1][0] * (Math.pow(2, i));
  }
  console.log(result);
}

solution(inputGear, inputK, inputOrder);
