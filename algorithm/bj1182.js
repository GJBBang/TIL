const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const [inputN, inputS] = input[0].split(" ").map(Number);
const inputArr = input[1].split(" ").map(Number);

function solution(N, S, arr) {
	let result = 0;

	const combi = (r, k, idx, a) => {
		if (r === k) {
			const temp = a.reduce((prev, curr) => prev + curr);
			if (S === temp) result++;
			return;
		}

		for (let i = idx; i < N; i++) {
			a.push(arr[i]);
			combi(r, k + 1, i + 1, a);
			a.pop();
		}
	};

	for (let i = 1; i <= N; i++) {
    combi(i, 0, 0, []);
  }

  console.log(result);
}

solution(inputN, inputS, inputArr);
