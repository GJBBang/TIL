const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const inputN = +input[0];
const inputDice = [];
for (let i = 0; i < inputN; i++) {
	const temp = input[i + 1].split(" ").map(Number);
	inputDice.push(temp);
}

function solution(N, dice) {
	const pair = new Array(6).fill(0);
	pair[0] = 5;
	pair[1] = 3;
	pair[2] = 4;
	pair[3] = 1;
	pair[4] = 2;
	pair[5] = 0;

	let result = 0;
	for (let i = 0; i < 6; i++) {
		let sumValue = 0;
		let tempValue = 0;
		for (let j = 0; j < 6; j++) {
			if (j === i || j === pair[i]) continue;
			else if (tempValue < dice[0][j]) tempValue = dice[0][j];
		}
		sumValue += tempValue;

		let top = dice[0][i];
		let bottom = dice[0][pair[i]];
		for (let k = 1; k < N; k++) {
			for (let z = 0; z < 6; z++) {
				if (dice[k][z] === top) {
					bottom = dice[k][z];
					top = dice[k][pair[z]];
					break;
				}
			}

			let tempV = 0;
			for (let l = 0; l < 6; l++) {
				if (dice[k][l] === top || dice[k][l] === bottom) continue;
				else if (tempV < dice[k][l]) tempV = dice[k][l];
			}

			sumValue += tempV;
		}
		result = Math.max(result, sumValue);
	}
  console.log(result);
}

solution(inputN, inputDice);
