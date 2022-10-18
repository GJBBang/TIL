const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const inputN = +input[0];
let inputArr = input[1].split(" ").map(Number);

function solution(N, arr) {
	let sumValue = [];

	const getCombi = (k, r, idx, combi) => {
		if (k === r) {
			const temp = combi.reduce((prev, curr) => prev + curr);
			sumValue.push(temp);
			return;
		}

		for (let j = idx; j < N; j++) {
			combi.push(arr[j]);
			getCombi(k + 1, r, j + 1, combi);
			combi.pop();
		}
	};

	for (let i = 1; i < N + 1; i++) {
		getCombi(0, i, 0, []);
	}

  sumValue = new Set(sumValue);
  sumValue = Array.from(sumValue);
	sumValue = sumValue.sort((a, b) => a - b);
  let flag = true;
	let num = 1;
	for (let i = 0; i < sumValue.length; i++) {
		if (sumValue[i] === num) num++;
		else {
			console.log(num);
      flag = false;
			break;
		}
	}
  if (flag) console.log(sumValue[sumValue.length - 1] + 1);
}

solution(inputN, inputArr);
