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
			if (board[i][j] === 2) virus.push([i, j]);
		}
	}

	const check = (visited) => {
		for (let i = 0; i < N; i++) {
			for (let j = 0; j < N; j++) {
				if (!visited[i][j] && !board[i][j]) return false;
			}
		}
		return true;
	};

	const bfs = (activeList) => {
		const visited = new Array(N).fill(0).map(() => new Array(N).fill(0));
		const queue = [];
		activeList.forEach((idx) => {
			queue.push(virus[idx]);
			visited[virus[idx][0]][virus[idx][1]] = 1;
		});

		const dx = [-1, 0, 1, 0];
		const dy = [0, 1, 0, -1];
		let sec = 0;
		while (queue.length) {
			const [x, y] = queue.shift();
			for (let k = 0; k < 4; k++) {
				const [i, j] = [x + dx[k], y + dy[k]];
				if (i >= 0 && i < N && j >= 0 && j < N) {
					if (!visited[i][j] && board[i][j] !== 1) {
						queue.push([i, j]);
						visited[i][j] = visited[x][y] + 1;
						if (board[i][j] !== 2) sec = visited[i][j];
					}
				}
			}
		}

		if (check(visited)) return sec - 1;
		else return -1;
	};

	let result = -1;
	const combiActive = (k, n, activeList) => {
		if (k === M) {
			const temp = bfs(activeList);
      
		}

		for (let i = n; i < virus.length; i++) {
			activeList.push(i);
			combiActive(k + 1, i + 1, activeList);
			activeList.pop();
		}
	};

	combiActive(0, 0, []);
	console.log(result);
}

solution(inputN, inputM, inputBoard);
