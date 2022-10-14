const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const [inputF, inputS, inputG, inputU, inputD] = input[0]
	.split(" ")
	.map(Number);

function solution(F, S, G, U, D) {
	const visited = new Array(F + 1).fill(0);

	const check = (n) => {
		if (n > 0 && n <= F && !visited[n]) return true;

		return false;
	};

	const bfs = () => {
		const queue = [];
		queue.push(S);
		visited[S] = 1;

		while (queue.length) {
			const v = queue.shift();
			const checkFloor = [v + U, v - D];
			for (let i = 0; i < 2; i++) {
				if (check(checkFloor[i])) {
					queue.push(checkFloor[i]);
					visited[checkFloor[i]] = visited[v] + 1;

					if (checkFloor[i] === G) return;
				}
			}
		}
	};

	bfs();
	visited[G] ? console.log(visited[G] - 1) : console.log("use the stairs");
}

solution(inputF, inputS, inputG, inputU, inputD);
