const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const [inputH, inputW] = input[0].split(" ").map(Number);
const inputBlock = input[1].split(" ").map(Number);

const inputBoard = new Array(inputH)
	.fill(0)
	.map(() => new Array(inputW).fill(0));

for (let j = 0; j < inputW; j++) {
	for (let i = 0; i < inputH; i++) {
		if (inputBlock[j] === i) break;
		inputBoard[i][j] = 1;
	}
}

function solution(H, W, board) {
	const getRainWater = (x, y) => {
		let cntRainWater = 0;
		while (true) {
			y++;
			if (y < W) {
				if (!board[x][y]) {
					cntRainWater++;
				} else {
          return cntRainWater;
        }
			} else return 0;
		}
	};

	let result = 0;
	for (let i = 0; i < H; i++) {
		for (let j = 0; j < W; j++) {
			if (board[i][j]) {
				result += getRainWater(i, j);
			}
		}
	}

  console.log(result);
}

solution(inputH, inputW, inputBoard);
