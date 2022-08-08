/*
5 6
......
..xx..
..x...
..xx..
.xxxx.
1
3
*/

const fs = require("fs");
const filePath = process.platfrom === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const [inputR, inputC] = input[0].split(" ").map(Number);
const inputMineral = [];
for (i = 1; i <= inputR; i++) {
  inputMineral.push(input[i].trim().split(""));
}
const inputN = +input[input.length - 2];
const inputHeight = input[input.length - 1].split(" ").map(Number);

/*
R = 5
C = 6
mineral = ['.', '.', '.', '.', '.', '.'], ['.', '.', 'x', 'x', '.', '.'], ['.', '.', 'x', '.', '.', '.'], ['.', '.', 'x', 'x', '.', '.'], ['.', 'x', 'x', 'x', 'x', '.']]
N = 1
height = [3]
*/

function solution(R, C, mineral, N, height) {
  // 막대 던지기
  const throwBar = (x) => {
    if (x % 2) {

    } else {
      for (j = 0; j < C; j++) {

      }
    }
  };

  for (i = 0; i < height.length; i++) {
    
  }
  // 바닥 체크

  // 공중 체크

  // 떨어뜨리기

  // 미네랄 재배치
}

solution(inputR, inputC, inputMineral, inputN, inputHeight);