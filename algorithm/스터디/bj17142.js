const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const [inputN, inputM] = input[0].split(" ").map(Number);
const inputBoard = [];
for (let i = 0; i < inputN; i++) {
	const temp = input[i + 1].split(" ").map(Number);
	inputBoard.push(temp);
}

function solution(N, M, board) {
	const virus = [];
	for (let i = 0; i < N; i++) {
		for (let j = 0; j < N; j++) {
			if (board[i][j] === 2) {
				virus.push([i, j]);
			}
		}
	}

	const check = (arr) => {
		for (let i = 0; i < N; i++) {
			for (let j = 0; j < N; j++) {
				if (board[i][j] != 1 && !arr[i][j]) return false;
			}
		}
		return true;
	};

	const bfs = (arr) => {
		const dx = [-1, 0, 1, 0];
		const dy = [0, 1, 0, -1];
		const visited = new Array(N).fill(0).map(() => new Array(N).fill(0));
		const queue = [];
		arr.forEach((item) => {
			visited[item[0]][item[1]] = 1;
			queue.push([...item, 1]);
		});

		let result = 0;
		while (queue.length) {
			const [x, y, isOrigin] = queue.shift();
			if (!isOrigin && result < visited[x][y]) result = visited[x][y];
			for (let k = 0; k < 4; k++) {
				const [n, m] = [x + dx[k], y + dy[k]];
				if (n >= 0 && n < N && m >= 0 && m < N) {
					if (board[n][m] == 0 && !visited[n][m]) {
						visited[n][m] = visited[x][y] + 1;
						queue.push([n, m, 0]);
					} else if (board[n][m] == 2 && !visited[n][m]) {
						visited[n][m] = visited[x][y] + 1;
						queue.push([n, m, 1]);
					}
				}
			}
		}

		if (check(visited)) {
			if (!result) result++;
		} else {
			result = Infinity;
		}
		return result - 1;
	};

	let result = Infinity;
	const combi = (k, idx, arr) => {
		if (k === M) {
			const temp = bfs(arr);
			if (result > temp) result = temp;
			return;
		}

		for (let i = idx; i < virus.length; i++) {
			arr.push(virus[i]);
			combi(k + 1, i + 1, arr);
			arr.pop();
		}
	};

	combi(0, 0, []);
	console.log(result == Infinity ? -1 : result);
}

solution(inputN, inputM, inputBoard);
