const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const inputN = +input[0];
const inputInnings = [];
for (let i = 0; i < inputN; i++) {
	temp = input[i + 1].split(" ").map(Number);
	inputInnings.push(temp);
}

/**
 * N = 2
 * innings = [
    [
      4, 0, 0, 0, 0,
      0, 0, 0, 0
    ],
    [
      4, 0, 0, 0, 0,
      0, 0, 0, 0
    ]
  ]
 */

function solution(N, innings) {
	const visited = new Array(10).fill(false);
	const hitter = new Array(9).fill(0);
	hitter[3] = 4;
	visited[4] = true;
	var cnt = 0;

	// 타자 순서 정하기
	const getHitterOrder = (hitter, visited, k) => {
		if (k === 8) {
			cnt++;
			return;
		}

		for (let i = 0; i < 9; i++) {
			for (let j = 1; j < 10; j++) {
				if (!hitter[i] && !visited[j]) {
					visited[j] = true;
					hitter[i] = j;
					getHitterOrder(hitter, visited, k + 1);
					hitter[i] = 0;
					visited[j] = false;
				}
			}
		}
	};

	getHitterOrder(hitter, visited, 0);
	console.log(cnt);

	// 이닝

	// 진루
}

solution(inputN, inputInnings);
