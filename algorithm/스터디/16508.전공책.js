/*
ANT
4
35000 COMPUTERARCHITECTURE
47000 ALGORITHM
43000 NETWORK
40000 OPERATINGSYSTEM
*/

const fs = require("fs");
const filePath = process.platfrom === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const inputT = input[0].trim();
const inputN = +input[1];
const inputBookList = [];
for (i = 2; i < inputN + 2; i++) {
  const [cost, bookName] = input[i].trim().split(" ");
  inputBookList.push([+cost, bookName]);
}

/*
T = ANT
N = 4
bookList = [[35000, COMPUTERARCHITECTURE], [47000, ALGORITHM], [43000, NETWORK], [40000, OPERATINGSYSTEM]]
*/

function solution(T, N, bookList) {
  const visitedBook = new Array(N).fill(0);
  const visitedAlpha = [];
  for (i = 0; i < N; i++) {
    const temp = new Array(bookList[i][1].length).fill(0);
    visitedAlpha.push(temp);
  }

  let result = 987654321;
  const findMinCost = (k, sumCost) => {
    if (result <= sumCost) return;

    if (k === T.length) {
      if (result > sumCost) {
        result = sumCost;
      }
      return;
    }

    for (i = 0; i < N; i++) {
      for (j = 0; j < bookList[i][1].length; j++) {
        if (T[k] === bookList[i][1][j] && !visitedAlpha[i][j]) {
          visitedAlpha[i][j] = 1;
          if (visitedBook[i]) {
            findMinCost(k + 1, sumCost);
          } else {
            visitedBook[i] = 1;
            findMinCost(k + 1, sumCost + bookList[i][0]);
            visitedBook[i] = 0;
          }
          visitedAlpha[i][j] = 0;
        }
      }
    }
  };

  findMinCost(0, 0);
}

solution(inputT, inputN, inputBookList);
