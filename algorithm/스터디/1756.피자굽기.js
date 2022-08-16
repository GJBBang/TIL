const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const [inputD, inputN] = input[0].split(" ").map(Number);
const inputOven = input[1].split(" ").map(Number);
const inputPizza = input[2].split(" ").map(Number);

/*
D = 7
N = 3
oven = [5, 6, 4, 3, 6, 2, 3]
pizza = [3, 2, 5]
*/

function solution(D, N, oven, pizza) {
  if (D < N) return console.log(0);

  let result = 0;
  for (i = 0; i < N; i++) {
    let flag = true;
    for (j = 0; j < D; j++) {
      if (j === 0 && oven[j] < pizza[i]) break;

      if (oven[j] < pizza[i] && j - 1 >= 0) {
        oven[j - 1] = 0;
        result = j;
        flag = false;
        break;
      }
      
      if (j === D - 1 && oven[j] >= pizza[i]) {
        oven[j] = 0;
        result = j + 1;
        flag = false;
        break;
      }
    }
    if (flag) {
      result = 0;
      break;
    }
  }

  console.log(result);
}

solution(inputD, inputN, inputOven, inputPizza);
