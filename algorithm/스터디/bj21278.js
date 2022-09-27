const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const [inputN, inputM] = input[0].split(" ").map(Number);
const inputArea = new Array(inputN + 1)
	.fill(0)
	.map(() => new Array(inputN + 1).fill(Infinity));

for (let i = 1; i < inputN + 1; i++) {
	inputArea[i][i] = 0;
}

for (let i = 0; i < inputM; i++) {
	const [a, b] = input[i + 1].split(" ").map(Number);
	inputArea[a][b] = 2;
	inputArea[b][a] = 2;
}

// 플로이드-워셜
for (let k = 1; k < inputN + 1; k++) {
	for (let i = 1; i < inputN + 1; i++) {
		for (let j = 1; j < inputN + 1; j++) {
			inputArea[i][j] = Math.min(
				inputArea[i][j],
				inputArea[i][k] + inputArea[k][j]
			);
		}
	}
}

function solution(N, M, area) {
	const getChickenDistance = (chickenHouse) => {
		let sumDistance = 0;
		for (let i = 1; i < N + 1; i++) {
			sumDistance += Math.min(
				area[i][chickenHouse[0]],
				area[i][chickenHouse[1]]
			);
		}
		return sumDistance;
	};

	const result = [0, 0, Infinity];
	const combiChickenHouse = (k, nextNum, chickenHouse) => {
		if (k === 2) {
			const tempDistance = getChickenDistance(chickenHouse);
			if (result[2] > tempDistance) {
        result[0] = chickenHouse[0];
        result[1] = chickenHouse[1];
        result[2] = tempDistance;
      }
			return;
		}

		for (let i = nextNum; i < N + 1; i++) {
			chickenHouse.push(i);
			combiChickenHouse(k + 1, i + 1, chickenHouse);
			chickenHouse.pop();
		}
	};

	combiChickenHouse(0, 1, []);
	console.log(result.join(" "));
}

solution(inputN, inputM, inputArea);
