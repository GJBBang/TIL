const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const inputN = +input[0];
const inputBoard = [];
for (let i = 0; i < inputN; i++) {
	const temp = input[i + 1].split(" ").map(Number);
	inputBoard.push(temp);
}

function solution(N, board) {
	const getStartPoint = () => {
		for (let i = 0; i < N; i++) {
			for (let j = 0; j < N; j++) {
				if (board[i][j] === 9) return [i, j];
			}
		}
	};
	let [startX, startY] = getStartPoint();

	let ageShark = 2;
	let cntEatFish = 0;
	const bfs = (x, y) => {
		const dx = [-1, 0, 0, 1];
		const dy = [0, -1, 1, 0];
		const visited = new Array(N).fill(0).map(() => new Array(N).fill(0));
		const fish = [];
		const queue = [];
		queue.push([x, y]);
		visited[x][y] = 1;

		let checkSec = 0;
		while (queue.length) {
			const [i, j] = queue.shift();
			for (let k = 0; k < 4; k++) {
				const [n, m] = [i + dx[k], j + dy[k]];
				if (n >= 0 && n < N && m >= 0 && m < N) {
					if (!visited[n][m] && ageShark >= board[n][m]) {
						if (!board[n][m] || ageShark === board[n][m]) {
							queue.push([n, m]);
							visited[n][m] = visited[i][j] + 1;
						} else {
							if (!checkSec) checkSec = visited[i][j];
							if (checkSec === visited[i][j]) {
								fish.push([n, m]);
								visited[n][m] = visited[i][j] + 1;
							}
						}
					}
				}
			}
		}

		return [fish, checkSec];
	};

	let result = 0;
	while (true) {
		const [fish, s] = bfs(startX, startY);
    board[startX][startY] = 0;
		if (fish.length) {
			fish.sort((a, b) => {
        if (a[0] > b[0]) return 1;
        if (a[0] < b[0]) return -1;
        if (a[1] > b[1]) return 1;
        if (a[1] < b[1]) return -1;
      });
			startX = fish[0][0];
			startY = fish[0][1];
      board[startX][startY] = 9;
			cntEatFish++;
			result += s;
			if (ageShark === cntEatFish) {
				ageShark++;
				cntEatFish = 0;
			}
		} else break;
	}

	console.log(result);
}

solution(inputN, inputBoard);
