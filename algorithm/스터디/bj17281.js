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
	const hitter = new Array(8).fill(0);
	visited[1] = true;

	let result = 0;
	// 타자 순서 정하기
	const getHitterOrder = (hitter, visited, k) => {
		if (k === 8) {
			hitter.splice(3, 0, 1);
			const temp = getScore(hitter);
			if (result < temp) result = temp;
			hitter.splice(3, 1);
			return;
		}

		for (let i = 1; i < 10; i++) {
			if (!visited[i]) {
				visited[i] = true;
				hitter[k] = i;
				getHitterOrder(hitter, visited, k + 1);
				visited[i] = false;
			}
		}
	};
	// 점수 계산
	const getScore = (hitter) => {
		// 각 이닝 체크
		let nowHitterIndex = 0;
		let nowScore = 0;
		innings.forEach((inning) => {
			const base = [0, 0, 0];
			let outCnt = 0;

			while (outCnt < 3) {
				switch(inning[hitter[nowHitterIndex] - 1]) {
					case 0:
						outCnt++;
						break;
					case 1:
						nowScore += base[2];
						base[2] = base[1];
						base[1] = base[0];
						base[0] = 1;
						break;
					case 2:
						nowScore += base[2] + base[1];
						base[2] = base[0];
						base[1] = 1;
						base[0] = 0;
						break;
					case 3:
						nowScore += base[2] + base[1] + base[0];
						base[2] = 1;
						base[1] = base[0] = 0;
						break;
					default:
						nowScore += base[2] + base[1] + base[0] + 1;
						base[2] = base[1] = base[0] = 0;
				}
				nowHitterIndex = (nowHitterIndex + 1) % 9;
			}
		});
		return nowScore;
	};

	getHitterOrder(hitter, visited, 0);
	console.log(result);
}

solution(inputN, inputInnings);
