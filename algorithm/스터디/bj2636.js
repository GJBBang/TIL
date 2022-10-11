const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const [inputR, inputC] = input[0].split(" ").map(Number);
const inputBoard = [];
for (let i = 0; i < inputR; i++) {
	const temp = input[i + 1].split(" ").map(Number);
	inputBoard.push(temp);
}

function solution(R, C, board) {
	const dx = [-1, 0, 1, 0];
	const dy = [0, 1, 0, -1];

	// 공기 9로 변환
	const changeAir = (i, j) => {
		const queue = [];
		queue.push([i, j]);
		board[i][j] = 9;

		while (queue.length) {
			const [x, y] = queue.shift();
			for (let k = 0; k < 4; k++) {
				const [n, m] = [x + dx[k], y + dy[k]];
				if (n >= 0 && n < R && m >= 0 && m < C) {
					if (board[n][m] === 0) {
						queue.push([n, m]);
						board[n][m] = 9;
					}
				}
			}
		}
	};

	// 남아있는 치즈 count
	const countingCheese = () => {
		let result = 0;
		for (let i = 0; i < R; i++) {
			for (let j = 0; j < C; j++) {
				if (board[i][j] === 1) result++;
			}
		}
		return result;
	};

	// 1시간 후
	const afterHour = () => {
		const visited = new Array(R)
			.fill(false)
			.map(() => new Array(C).fill(false));

		for (let i = 0; i < R; i++) {
			for (let j = 0; j < C; j++) {
				if (board[i][j] === 9 && !visited[i][j]) {
					for (let k = 0; k < 4; k++) {
						const [n, m] = [i + dx[k], j + dy[k]];
						if (n >= 0 && n < R && m >= 0 && m < C) {
							if (board[n][m] === 1) {
								board[n][m] = 9;
								visited[n][m] = true;
							}
						}
					}
				}
			}
		}
	};

	changeAir(0, 0);
	const result = [0, 0];

	while (true) {
		let cheeses = countingCheese();
		if (cheeses) {
			result[0] += 1;
			result[1] = cheeses;
			afterHour();
			for (let i = 0; i < R; i++) {
				for (let j = 0; j < C; j++) {
					if (board[i][j] === 9) changeAir(i, j);
				}
			}
		} else break;
	}

	result.forEach((num) => console.log(num));
}

solution(inputR, inputC, inputBoard);
