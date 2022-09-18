const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const [inputN, inputM] = input[0].split(" ").map(Number);
const inputOffice = [];
for (let i = 0; i < inputN; i++) {
	const temp = input[i + 1].split(" ").map(Number);
	inputOffice.push(temp);
}
/**
 * N, M = 4, 6
 * office = [
    [ 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 1, 0, 6, 0 ],
    [ 0, 0, 0, 0, 0, 0 ]
  ]
 */

function solution(N, M, office) {
	// CCTV 찾기
	const cctvInfo = []; // [cctv번호, x좌표, y좌표]
	const findCctv = () => {
		for (let i = 0; i < N; i++) {
			for (let j = 0; j < M; j++) {
				if (office[i][j] && office[i][j] !== 6) {
					cctvInfo.push([office[i][j], i, j]);
				}
			}
		}
	};
	findCctv();

	// CCTV 감시 칸 체크
	const directionX = {
		1: [[0], [1], [0], [-1]],
		2: [
			[0, 0],
			[1, -1],
		],
		3: [
			[-1, 0],
			[0, 1],
			[1, 0],
			[0, -1],
		],
		4: [
			[0, -1, 0],
			[-1, 0, 1],
			[0, 1, 0],
			[1, 0, -1],
		],
		5: [[0, -1, 0, 1]],
	};
	const directionY = {
		1: [[1], [0], [-1], [0]],
		2: [
			[1, -1],
			[0, 0],
		],
		3: [
			[0, 1],
			[1, 0],
			[0, -1],
			[-1, 0],
		],
		4: [
			[-1, 0, 1],
			[0, 1, 0],
			[1, 0, -1],
			[0, -1, 0],
		],
		5: [[-1, 0, 1, 0]],
	};
	const cctvCnt = cctvInfo.length;
	let result = Infinity;
	const checkOffice = (k) => {
		if (k === cctvCnt) {
			const temp = checkZero();
			if (result > temp) result = temp;
			return;
		}

		for (let i = 0; i < directionX[cctvInfo[k][0]].length; i++) {
			for (let j = 0; j < directionX[cctvInfo[k][0]][i].length; j++) {
				let x = cctvInfo[k][1];
				let y = cctvInfo[k][2];

				while (true) {
					x += directionX[cctvInfo[k][0]][i][j];
					y += directionY[cctvInfo[k][0]][i][j];
					if (x >= 0 && x < N && y >= 0 && y < M && office[x][y] !== 6) {
						if (!office[x][y]) {
							office[x][y] = k + 7;
						} else continue;
					} else break;
				}
			}
			checkOffice(k + 1);
			for (let j = 0; j < directionX[cctvInfo[k][0]][i].length; j++) {
				let x = cctvInfo[k][1];
				let y = cctvInfo[k][2];

				while (true) {
					x += directionX[cctvInfo[k][0]][i][j];
					y += directionY[cctvInfo[k][0]][i][j];
					if (x >= 0 && x < N && y >= 0 && y < M && office[x][y] !== 6) {
						if (office[x][y] === k + 7) {
							office[x][y] = 0;
						} else continue;
					} else break;
				}
			}
		}
	};

	// 사각지대 체크
	const checkZero = () => {
		let zeroCnt = 0;
		for (let i = 0; i < N; i++) {
			for (let j = 0; j < M; j++) {
				if (!office[i][j]) zeroCnt++;
			}
		}
		return zeroCnt;
	};

	checkOffice(0);
	console.log(result);
}

solution(inputN, inputM, inputOffice);
