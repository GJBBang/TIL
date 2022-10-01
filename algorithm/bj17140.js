const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const [inputR, inputC, inputK] = input[0].split(" ").map(Number);
const inputArr = [];

for (let i = 0; i < 3; i++) {
	inputArr.push(input[i + 1].split(" ").map(Number));
}

function solution(R, C, K, arr) {
	if (R - 1 < 3 && C - 1 < 3 && arr[R - 1][C - 1] === K) return console.log(0);

	const calcRow = (nowRow, nowColoumn) => {
		let maxLength = 0;

		const tempArr = [];
		for (let i = 0; i < nowRow; i++) {
			const cntArr = new Array(101).fill(0);
			for (let j = 0; j < nowColoumn; j++) {
				cntArr[arr[i][j]] += 1;
			}
			const temp = [];
			for (let k = 1; k < 101; k++) {
				if (cntArr[k]) temp.push([k, cntArr[k]]);
			}
			temp.sort((a, b) => {
				if (a[1] > b[1]) return 1;
				if (a[1] < b[1]) return -1;
				if (a[0] > b[0]) return 1;
				if (a[0] < b[0]) return -1;
			});
			const res = temp.reduce((prev, curr) => {
				return [...prev, ...curr];
			});
			if (maxLength < res.length) maxLength = res.length;
			tempArr.push(res);
		}

		return [tempArr, maxLength];
	};

	const calcCol = (nowRow, nowColoumn) => {
		let maxLength = 0;

		const tempArr = [];
		for (let j = 0; j < nowColoumn; j++) {
			const cntArr = new Array(101).fill(0);
			for (let i = 0; i < nowRow; i++) {
				cntArr[arr[i][j]] += 1;
			}
			const temp = [];
			for (let k = 1; k < 101; k++) {
				if (cntArr[k]) temp.push([k, cntArr[k]]);
			}
			temp.sort((a, b) => {
				if (a[1] > b[1]) return 1;
				if (a[1] < b[1]) return -1;
				if (a[0] > b[0]) return 1;
				if (a[0] < b[0]) return -1;
			});
			const res = temp.reduce((prev, curr) => {
				return [...prev, ...curr];
			});
			if (maxLength < res.length) maxLength = res.length;
			tempArr.push(res);
		}

		return [tempArr, maxLength];
	};

	let [nowRow, nowColoumn, sec] = [3, 3, 0];
	while (sec < 100) {
		sec++;

		if (nowRow >= nowColoumn) {
			const [tempArr, maxLength] = calcRow(nowRow, nowColoumn);
			nowColoumn = maxLength;
			const newArr = new Array(nowRow)
				.fill(0)
				.map(() => new Array(nowColoumn).fill(0));

			tempArr.forEach((a, i) => {
				a.forEach((n, j) => {
					newArr[i][j] = n;
				});
			});

			arr = newArr;
		} else {
			const [tempArr, maxLength] = calcCol(nowRow, nowColoumn);
			nowRow = maxLength;
			const newArr = new Array(nowRow)
				.fill(0)
				.map(() => new Array(nowColoumn).fill(0));

			tempArr.forEach((a, j) => {
				a.forEach((n, i) => {
					newArr[i][j] = n;
				});
			});

			arr = newArr;
		}
		if (R - 1 < nowRow && C - 1 < nowColoumn && arr[R - 1][C - 1] === K) {
			return console.log(sec);
		}
	}

	return console.log(-1);
}

solution(inputR, inputC, inputK, inputArr);
