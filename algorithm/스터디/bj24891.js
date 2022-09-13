const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const [inputL, inputN] = input[0].split(" ").map(Number);
const inputWordList = [];
for (i = 0; i < inputN; i++) {
	inputWordList.push(input[i + 1]);
}

/**
 * L, N = 5, 5
 * wordList = [ 'HEART', 'EMBER', 'ABUSE', 'RESIN', 'TREND' ]
 */

function solution(L, N, wordList) {
	const getPermutations = (arr, selectNumber) => {
		const results = [];
		if (selectNumber === 1) return arr.map((value) => [value]); // 1개씩 택할 때, 바로 모든 배열의 원소 return

		arr.forEach((fixed, index, origin) => {
			const rest = [...origin.slice(0, index), ...origin.slice(index + 1)]; // 해당하는 fixed를 제외한 나머지 배열
			const permutations = getPermutations(rest, selectNumber - 1); // 나머지에 대해 순열을 구한다.
			const attached = permutations.map((permutation) => [
				fixed,
				...permutation,
			]); // 돌아온 순열에 대해 떼 놓은(fixed) 값 붙이기
			results.push(...attached); // 배열 spread syntax 로 모두다 push
		});

		return results; // 결과 담긴 results return
	};

	const checkMagicSquare = (arr) => {
		for (i = 0; i < L; i++) {
			for (j = 0; j < L; j++) {
				if (arr[i][j] !== arr[j][i]) return false;
			}
		}

		return arr;
	};

	const checkList = getPermutations(wordList, L);

	const result = [];
	checkList.forEach((arr) => {
		if (checkMagicSquare(arr)) result.push(arr);
	});
	if (result.length) {
		result.sort();
		result[0].map((word) => console.log(word));
	} else {
		console.log("NONE");
	}
}

solution(inputL, inputN, inputWordList);
