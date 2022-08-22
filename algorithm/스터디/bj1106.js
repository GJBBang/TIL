/*
12 2
3 5
1 1
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const [inputC, inputN] = input[0].split(" ").map(Number);
const inputCity = [];
for (i = 1; i <= inputN; i++) {
  const [cost, num] = input[i].split(" ").map(Number);
  inputCity.push([cost, num]);
}

/*
C = 12
N = 2
city = [[3, 5], [1, 1]]
*/

function solution(C, N, city) {
  const dp = new Array(C + 101).fill(0);

  for (i = 1; i < C + 101; i++) {
    let temp = 987654321;
    for (j = 0; j < N; j++) {
      if (i - city[j][1] >= 0 && temp > dp[i - city[j][1]] + city[j][0]) {
        temp = dp[i - city[j][1]] + city[j][0];
      }
    }
    dp[i] = temp;
  }

  let result = 987654231;
  for (i = C; i < C + 101; i++) {
    if (result > dp[i]) {
      result = dp[i];
    }
  }
  console.log(result);
}

solution(inputC, inputN, inputCity);
