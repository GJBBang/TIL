const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const [inputN, inputM, inputK] = input[0].split(" ").map(Number);
const inputMineralAdd = [];
const inputLand = new Array(inputN)
	.fill(0)
	.map(() => new Array(inputN).fill(0).map(() => new Array()));
const inputMineral = new Array(inputN)
	.fill(0)
	.map(() => new Array(inputN).fill(5));

for (let i = 0; i < inputN; i++) {
	const temp = input[i + 1].split(" ").map(Number);
	inputMineralAdd.push(temp);
}

for (let i = 0; i < inputM; i++) {
	const [x, y, z] = input[i + 1 + inputN].split(" ").map(Number);
	inputLand[x - 1][y - 1].push(z);
	inputLand[x - 1][y - 1].sort((a, b) => a - b);
}

function solution(N, M, K, mineralAdd, land, mineral) {
	// 봄
	const spring = () => {
		const dieTree = new Array(N)
			.fill(0)
			.map(() => new Array(N).fill(0).map(() => new Array()));
		for (let i = 0; i < N; i++) {
			for (let j = 0; j < N; j++) {
				if (land[i][j].length) {
					const liveTree = new Array();
					while (land[i][j].length) {
						if (mineral[i][j] >= land[i][j][0]) {
							mineral[i][j] -= land[i][j][0];
							liveTree.push(land[i][j].shift() + 1);
						} else {
							dieTree[i][j] = [...land[i][j]];
							break;
						}
					}
					land[i][j] = [...liveTree];
				}
			}
		}
		return dieTree;
	};

	// 여름
	const summer = (dieTree) => {
		for (let i = 0; i < N; i++) {
			for (let j = 0; j < N; j++) {
				if (dieTree[i][j].length) {
					dieTree[i][j].forEach((age) => {
						mineral[i][j] += parseInt(age / 2);
					});
				}
			}
		}
	};

	// 가을
	const fall = () => {
		const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
		const dy = [-1, 0, 1, -1, 1, -1, 0, 1];

		for (let i = 0; i < N; i++) {
			for (let j = 0; j < N; j++) {
				if (land[i][j].length) {
					land[i][j].forEach((age) => {
						if (!(age % 5)) {
							for (let k = 0; k < 8; k++) {
								const n = i + dx[k];
								const m = j + dy[k];
								if (n >= 0 && n < N && m >= 0 && m < N) {
									land[n][m].unshift(1);
								}
							}
						}
					});
				}
			}
		}
	};

	// 겨울
	const winter = () => {
		for (let i = 0; i < N; i++) {
			for (let j = 0; j < N; j++) {
				mineral[i][j] += mineralAdd[i][j];
			}
		}
	};

	let countYear = 0;
	while (countYear < K) {
		const dieTree = spring();
		summer(dieTree);
		fall();
		winter();
		countYear++;
	}

	let result = 0;
	for (let i = 0; i < N; i++) {
		for (let j = 0; j < N; j++) {
			result += land[i][j].length;
		}
	}

	console.log(result);
}

solution(inputN, inputM, inputK, inputMineralAdd, inputLand, inputMineral);
