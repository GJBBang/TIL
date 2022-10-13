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
	let result = 0;
	const dx = [-1, 0, 1, 0];
	const dy = [0, 1, 0, -1];

	const bfs = (n, i, j, visited) => {
		const queue = [];
		queue.push([i, j]);
		visited[i][j] = true;

		while (queue.length) {
			const [x, y] = queue.shift();
			for (let k = 0; k < 4; k++) {
				const [a, b] = [x + dx[k], y + dy[k]];
				if (a >= 0 && a < N && b >= 0 && b < N) {
					if (board[a][b] > n && !visited[a][b]) {
						queue.push([a, b]);
						visited[a][b] = true;
					}
				}
			}
		}

		return visited;
	};

	for (let n = 0; n < 100; n++) {
		let tempCnt = 0;
		let visited = new Array(N).fill(0).map(() => new Array(N).fill(false));
		for (let i = 0; i < N; i++) {
			for (let j = 0; j < N; j++) {
				if (board[i][j] > n && !visited[i][j]) {
					visited = bfs(n, i, j, visited);
					tempCnt++;
				}
			}
		}
		if (result < tempCnt) result = tempCnt;
	}

	console.log(result);
}

solution(inputN, inputBoard);
