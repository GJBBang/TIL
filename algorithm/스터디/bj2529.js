const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trimEnd().split("\n");

const inputK = +input[0];
const inputSign = input[1].split(" ");

/**
 K = 2
 sign = ["<", ">"]
 */

function solution(K, sign) {
  let maxNum = "0";
  let minNum = "9999999999";
  const visited = new Array(10).fill(false);

  const findNum = (k, strNumber, endNum) => {
    if (k === K) {
      if (+maxNum < +strNumber) maxNum = strNumber;
      if (+minNum > +strNumber) minNum = strNumber;
      return;
    }
    visited.forEach((isVisited, index) => {
      if (!isVisited) {
        if (sign[k] === "<" && endNum < index) {
          visited[index] = true;
          findNum(k + 1, strNumber + String(index), index);
          visited[index] = false;
        } else if (sign[k] === ">" && endNum > index) {
          visited[index] = true;
          findNum(k + 1, strNumber + String(index), index);
          visited[index] = false;
        }
      }
    })
    return;
  };

  for (i = 0; i < 10; i++) {
    visited[i] = true;
    findNum(0, String(i), i);
    visited[i] = false;
  }
  console.log(maxNum);
  console.log(minNum);
}

solution(inputK, inputSign);
