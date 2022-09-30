const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const [inputR, inputC, inputM] = input[0].split(" ").map(Number);
const inputBoard = new Array(inputR)
	.fill(0)
	.map(() => new Array(inputC).fill(0).map(() => new Array()));

for (let i = 0; i < inputM; i++) {
	let [r, c, s, d, z] = input[i + 1].split(" ").map(Number);
	d < 3 ? (s %= (inputR - 1) * 2) : (s %= (inputC - 1) * 2);
	inputBoard[r - 1][c - 1] = [s, d, z];
}

function solution(R, C, M, board) {
	const fishing = (y) => {
		for (let i = 0; i < R; i++) {
			if (board[i][y].length) {
				const size = board[i][y][2];
				board[i][y] = [];
				return size;
			}
		}
		return 0;
	};

	const moveShark = () => {
		const movedBoard = new Array(R)
			.fill(0)
			.map(() => new Array(C).fill(0).map(() => new Array()));

		const dx = [0, -1, 1, 0, 0];
		const dy = [0, 0, 0, 1, -1];
		const d = [0, 2, 1, 4, 3];
		for (let i = 0; i < R; i++) {
			for (let j = 0; j < C; j++) {
				if (board[i][j].length) {
					let [x, y, cnt] = [i, j, 0];
					while (cnt < board[i][j][0]) {
						if (
							x + dx[board[i][j][1]] >= 0 &&
							x + dx[board[i][j][1]] < R &&
							y + dy[board[i][j][1]] >= 0 &&
							y + dy[board[i][j][1]] < C
						) {
							x += dx[board[i][j][1]];
							y += dy[board[i][j][1]];
						} else {
							board[i][j][1] = d[board[i][j][1]];
							continue;
						}
						cnt++;
					}
					if (
						(movedBoard[x][y].length && movedBoard[x][y][2] < board[i][j][2]) ||
						!movedBoard[x][y].length
					)
						movedBoard[x][y] = board[i][j];
				}
			}
		}
		return movedBoard;
	};

	let result = 0;
	for (let i = 0; i < C; i++) {
		result += fishing(i);
		board = moveShark();
	}
	console.log(result);
}

solution(inputR, inputC, inputM, inputBoard);
