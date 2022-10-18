const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const [inputN, inputK] = input[0].split(" ").map(Number);
const inputBoard = [];
for (let i = 0; i < inputN; i++) {
	const temp = input[i + 1].split(" ").map(Number);
	inputBoard.push(temp);
}

const [inputS, inputX, inputY] = input[inputN + 1].split(" ").map(Number);

function solution(N, K, S, X, Y, board) {
	const dx = [-1, 0, 1, 0];
	const dy = [0, 1, 0, -1];

	const visited = new Array(N).fill(0).map(() => new Array(N).fill(0));
	const bfs = (i, j) => {
		const queue = [];
		queue.push([i, j]);
		visited[i][j] = [board[i][j], 0];

		while (queue.length) {
			const [x, y] = queue.shift();
			for (let z = 0; z < 4; z++) {
				const [n, m] = [i + dx[z], j + dy[z]];
				if (n >= 0 && n < N && m >= 0 && m < N) {
					if (!board[n][m]) {
            board[n][m] = board[x][y];
            visited[n][m] = [board[x][y], visited[x][y] + 1];
            queue.push([n, m]);
          } else {
            if (board[x][y] < board[n][m] && visited[x][y][1] + 1 <= visited[n][m][1]) {
              board[n][m] = board[x][y];
              visited[n][m] = [board[x][y], visited[x][y + 1]];
              queue.push([n, m]);
            } else if (board[x][y] > board[n][m] && visited[x][y][1] + 1 <= visited[n][m][1]) {
              board[n][m] = board[x][y];
              visited[n][m] = [board[x][y], visited[x][y + 1]];
              queue.push([n, m]);
            }
          }
				}
			}
		}

		return;
	};

	for (let i = 0; i < N; i++) {
		for (let j = 0; j < N; j++) {
			if (board[i][j] && !visited[i][j]) {
				bfs(i, j);
			}
		}
	}

  console.log(board);
	console.log(board[X - 1][Y - 1]);
}

solution(inputN, inputK, inputS, inputX, inputY, inputBoard);
