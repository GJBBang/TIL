const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const inputN = +input[0].trim();
const inputHouseLocation = input[1].split(" ").map(Number);

/*
N = 4
houseLocation = [5, 1, 7, 9]
*/

function solution(N, houseLocation) {
  
}

solution(inputN, inputHouseLocation);
