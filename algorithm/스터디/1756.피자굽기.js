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
  for (i = 1; i < D; i++) {
    oven[i] = Math.min(oven[i], oven[i - 1]);
  }

  let pizzaNum = 0;
  for (i = D - 1; i >= 0; i--) {
    if (oven[i] >= pizza[pizzaNum]) {
      pizzaNum++;
      if (pizzaNum === N) return console.log(i + 1);
    }
  }

  return console.log(0);
}

solution(inputD, inputN, inputOven, inputPizza);
