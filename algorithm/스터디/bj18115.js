const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const inputN = +input[0];
const inputSkill = input[1].split(" ").map(Number);

function solution(N, skill) {
	const result = [];

  let num = 1;
	for (let i = N - 1; i > -1; i--) {
		const n = skill[i];
		switch (n) {
			case 1:
        result.unshift(num);
        num++;
				break;
			case 2:
        result.splice(1, 0, num);
        num++;
				break;
			default:
        result.push(num);
        num++;
				break;
		}
	}
  console.log(result.join(" "));
}

solution(inputN, inputSkill);
