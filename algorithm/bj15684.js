const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const [inputN, inputM, inputH] = input[0].split(" ").map(Number);
const inputBoard = [];
for (let i = 0; i < inputH + 1; i++) {
	const temp = new Array(inputN + 1).fill(0);
	inputBoard.push(temp);
}

for (let i = 1; i < inputM + 1; i++) {
	const [a, b] = input[i].split(" ").map(Number);
	inputBoard[a][b] = b;
	inputBoard[a][b + 1] = b;
}

function solution(N, M, H, board) {
	// 사다리 타기
	const checkLadder = () => {
		for (let i = 1; i < N + 1; i++) {
			let tempNum = i;
			for (let j = 1; j < H + 1; j++) {
				if (
					board[j][tempNum] !== 0 &&
					(board[j][tempNum] === tempNum || board[j][tempNum] === tempNum - 1)
				) {
					tempNum - 1 > 0 && board[j][tempNum - 1] === tempNum - 1
						? (tempNum -= 1)
						: (tempNum += 1);
				}
			}
			if (tempNum !== i) return false;
		}
		return true;
	};

	// 가로선 추가하기
	let flag = false;
	const addWidthLine = (k, n) => {
		if (k === n) {
			if (checkLadder()) {
				flag = true;
			}
			return;
		}

		for (let i = 1; i < H + 1; i++) {
			for (let j = 1; j < N; j++) {
				if (!board[i][j] && !board[i][j + 1]) {
					board[i][j] = j;
					board[i][j + 1] = j;
					addWidthLine(k + 1, n);
					board[i][j] = 0;
					board[i][j + 1] = 0;
				}
			}
		}
	};

	// 가로선 0 ~ 3개 추가하기
	let result = -1;
	for (let i = 0; i < 4; i++) {
		addWidthLine(0, i);
		if (flag) {
			result = i;
			break;
		}
	}
	console.log(result);
}

solution(inputN, inputM, inputH, inputBoard);
