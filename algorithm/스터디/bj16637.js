const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const inputN = +input[0];
const inputStr = input[1];

function solution(N, str) {
	let maxValue = -Infinity;
	const deepth = Math.floor(N / 2);

	const visited = new Array(deepth).fill(0);
	const findMaxValue = (idx) => {
		if (idx + 2 < deepth) {
			for (let i = idx + 2; i < deepth; i++) {
				if (!visited[i] && !visited[i - 1]) {
					visited[i] = visited[idx] + 1;
					findMaxValue(i);
				}
			}
		} else {
			let cnt = visited[idx] + 1;
			for (let j = 0; j < deepth; j++) {
				if (!visited[j]) {
					visited[j] = cnt;
					cnt++;
				}
			}

			console.log(visited);
			cnt--;
			for (let j = deepth - 1; j >= 0; j--) {
				if (visited[j] === cnt) {
					visited[j] = 0;
					cnt--;
				}
			}
			console.log(visited);
		}

    visited[0] = 1;
		findMaxValue(0);
	};
}

solution(inputN, inputStr);
