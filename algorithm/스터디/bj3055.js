const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const [inputR, inputC] = input[0].split(" ").map(Number);
const inputForest = [];
for (let i = 0; i < inputR; i++) {
	const temp = input[i + 1].split("");
	inputForest.push(temp);
}

function solution(R, C, forest) {
	// 고슴도치 초기 위치 찾기
	const getStartPoint = () => {
		for (let i = 0; i < R; i++) {
			for (let j = 0; j < C; j++) {
				if (forest[i][j] === "S") return [i, j];
			}
		}
	};
	// queue 초기 위치 저장
	let queue = [];
	const [startX, startY] = getStartPoint();
	queue.push([startX, startY, 0]); // [x좌표, y좌표, m분후]

	// 물 확장하기
	const dx = [-1, 0, 1, 0];
	const dy = [0, 1, 0, -1];
	const spreadWater = () => {
		const visitedWater = new Array(R)
			.fill(0)
			.map(() => new Array(C).fill(false));
		for (let i = 0; i < R; i++) {
			for (let j = 0; j < C; j++) {
				if (forest[i][j] === "*" && !visitedWater[i][j]) {
					visitedWater[i][j] = true;
					for (let k = 0; k < 4; k++) {
						const [n, m] = [i + dx[k], j + dy[k]];
						if (n >= 0 && n < R && m >= 0 && m < C) {
							if (
								(forest[n][m] === "S" || forest[n][m] === ".") &&
								!visitedWater[n][m]
							) {
								forest[n][m] = "*";
								visitedWater[n][m] = true;
							}
						}
					}
				}
			}
		}
	};

	// bfs 그래프 탐색
	const visited = new Array(R).fill(0).map(() => new Array(C).fill(false));
	while (queue.length) {
		const nextQueue = [];
		spreadWater();
		while (queue.length) {
			const [i, j, minute] = queue.shift();
			visited[i][j] = true;
			for (k = 0; k < 4; k++) {
				const [n, m] = [i + dx[k], j + dy[k]];
				if (n >= 0 && n < R && m >= 0 && m < C) {
					if (forest[n][m] === "D") return console.log(minute + 1);
					if (forest[n][m] === "." && !visited[n][m]) {
						nextQueue.push([n, m, minute + 1]);
						visited[n][m] = true;
					}
				}
			}
		}
		queue = nextQueue;
	}
	console.log("KAKTUS");
}

solution(inputR, inputC, inputForest);
