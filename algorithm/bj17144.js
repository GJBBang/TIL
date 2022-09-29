const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const [inputR, inputC, inputT] = input[0].split(" ").map(Number);
const inputBoard = [];
for (let i = 0; i < inputR; i++) {
	const temp = input[i + 1].split(" ").map(Number);
	inputBoard.push(temp);
}

function solution(R, C, T, board) {
	const airCleaner = [];
	for (let i = 0; i < R; i++) {
		if (board[i][0] === -1) {
			airCleaner.push(i);
			airCleaner.push(i + 1);
			break;
		}
	}

	const spreadDust = () => {
		const dx = [-1, 0, 1, 0];
		const dy = [0, 1, 0, -1];
		const afterSpread = new Array(R).fill(0).map(() => new Array(C).fill(0));
		afterSpread[airCleaner[0]][0] = -1;
		afterSpread[airCleaner[1]][0] = -1;

		for (let i = 0; i < R; i++) {
			for (let j = 0; j < C; j++) {
				if (board[i][j] >= 5) {
					const amountSpread = parseInt(board[i][j] / 5);
					let cntSpread = 0;
					for (k = 0; k < 4; k++) {
						const [n, m] = [i + dx[k], j + dy[k]];
						if (n >= 0 && n < R && m >= 0 && m < C && board[n][m] !== -1) {
							afterSpread[n][m] += amountSpread;
							cntSpread++;
						}
					}
					afterSpread[i][j] += board[i][j] - amountSpread * cntSpread;
				} else if (board[i][j] > 0) afterSpread[i][j] += board[i][j];
			}
		}

		return afterSpread;
	};

	const clock = () => {
		const dx = [0, -1, 0, 1];
		const dy = [1, 0, -1, 0];

		let [x, y] = [airCleaner[0], 0];
		const nextValue = [0];
		for (let k = 0; k < 4; k++) {
			while (
				x + dx[k] >= 0 &&
				x + dx[k] < R &&
				y + dy[k] >= 0 &&
				y + dy[k] < C &&
				board[x + dx[k]][y + dy[k]] !== -1
			) {
				x += dx[k];
				y += dy[k];
				nextValue.push(board[x][y]);
				board[x][y] = nextValue.shift();
			}
		}
	};

	const counterClock = () => {
		const dx = [0, 1, 0, -1];
		const dy = [1, 0, -1, 0];

		let [x, y] = [airCleaner[1], 0];
		const nextValue = [0];
		for (let k = 0; k < 4; k++) {
			while (
				x + dx[k] >= 0 &&
				x + dx[k] < R &&
				y + dy[k] >= 0 &&
				y + dy[k] < C &&
				board[x + dx[k]][y + dy[k]] !== -1
			) {
				x += dx[k];
				y += dy[k];
				nextValue.push(board[x][y]);
				board[x][y] = nextValue.shift();
			}
		}
	};

	for (let i = 0; i < T; i++) {
		board = spreadDust();
		clock();
    counterClock();
	}

  let result = 0;
  for (let i = 0; i < R; i++) {
    for (let j = 0 ; j < C; j++) {
      if (board[i][j] > 0) result += board[i][j];
    }
  }

  console.log(result);
}

solution(inputR, inputC, inputT, inputBoard);
