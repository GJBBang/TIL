const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const inputN = +input[0];
const [inputA, inputB] = input[1].split(" ").map(Number);
const inputM = +input[2];
const inputBoard = new Array(inputN + 1)
	.fill(0)
	.map(() => new Array(inputN + 1).fill(0));

for (let i = 0; i < inputM; i++) {
	const [x, y] = input[i + 3].split(" ").map(Number);
	inputBoard[x][y] = 1;
	inputBoard[y][x] = 1;
}

function solution(N, A, B, M, board) {
	const visited = new Array(N + 1).fill(0);
	const bfs = () => {
		const queue = [];
		queue.push(A);
		visited[A] = 1;

		while (queue.length) {
			const v = queue.shift();
			for (let i = 1; i < N + 1; i++) {
				if (board[v][i] && !visited[i]) {
					queue.push(i);
					visited[i] = visited[v] + 1;
				}
			}
		}
	};
	bfs();
	console.log(visited[B] - 1);
}

solution(inputN, inputA, inputB, inputM, inputBoard);
