const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const [inputN, inputM, inputX, inputY, inputK] = input[0]
	.split(" ")
	.map(Number);
const inputBoard = [];
for (let i = 0; i < inputN; i++) {
	const temp = input[i + 1].split(" ").map(Number);
	inputBoard.push(temp);
}

const inputOrder = input[inputN + 1].split(" ").map(Number);

function solution(N, M, X, Y, K, board, order) {
	let nowX = X;
	let nowY = Y;
	const dice = new Array(4).fill(0).map(() => new Array(3).fill(0));

	const rollTheDice = (orderNum) => {
		const dx = [0, 0, 0, -1, 1];
		const dy = [0, 1, -1, 0, 0];

		const [n, m] = [nowX + dx[orderNum], nowY + dy[orderNum]];
		if (n < 0 || n >= N || m < 0 || m >= M) {
			return false;
		} else {
			nowX = n;
			nowY = m;
		}

		const bottomNum = dice[3][1];
		switch (orderNum) {
			case 1:
				dice[3][1] = dice[1][2];
				dice[1][2] = dice[1][1];
				dice[1][1] = dice[1][0];
				dice[1][0] = bottomNum;
				break;
			case 2:
				dice[3][1] = dice[1][0];
				dice[1][0] = dice[1][1];
				dice[1][1] = dice[1][2];
				dice[1][2] = bottomNum;
				break;
			case 3:
				dice[3][1] = dice[0][1];
				dice[0][1] = dice[1][1];
				dice[1][1] = dice[2][1];
				dice[2][1] = bottomNum;
				break;
			default:
				dice[3][1] = dice[2][1];
				dice[2][1] = dice[1][1];
				dice[1][1] = dice[0][1];
				dice[0][1] = bottomNum;
		}

		if (board[nowX][nowY]) {
      dice[3][1] = board[nowX][nowY];
      board[nowX][nowY] = 0;
    } else {
      board[nowX][nowY] = dice[3][1];
    }
		return true;
	};

	order.forEach((orderNum) => {
		if (rollTheDice(orderNum)) console.log(dice[1][1]);
	});
}

solution(inputN, inputM, inputX, inputY, inputK, inputBoard, inputOrder);
