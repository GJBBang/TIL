const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const inputS = input[0].trim();
const inputT = input[1].trim();

/*
S = B
T = ABBA
*/

function solution(S, T) {
  let temp = T;
  for (i = 0; i < T.length - S.length; i++) {
    if (temp[temp.length - 1] == "A") {
      temp = temp.slice(0, -1);
    } else {
      temp = temp.slice(0, -1);
      temp = temp.split("").reverse().join("");
    }
  }
  if (S === temp) return console.log(1);
  else return console.log(0);
  
}

solution(inputS, inputT);