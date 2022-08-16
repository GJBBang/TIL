const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const inputN = +input[0];
const inputBooks = [];
for (i = 1; i < 1 + inputN; i++) {
  inputBooks.push(+input[i]);
}

/*
N = 3
books = [ 3, 2, 1 ]
*/

function solution(N, books) {
  let findNum = N;

  const findCnt = () => {
    while (findNum > 0) {
      for (i = 0; i < N; i++) {
        if (books[i] === findNum) {
          for (j = i + 1; j < N; j++) {
            if (books[j] === findNum - 1) return findNum - 1;
          }
          findNum--;
          break;
        }
      }
    }
    return 0;
  }

  console.log(findCnt());
}

solution(inputN, inputBooks);