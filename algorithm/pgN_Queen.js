function solution(n) {
	var answer = 0;
	const visited = new Array(n).fill(false);
	const queen = new Array(n).fill(0);

	const dfs = (x) => {
		if (x === n) {
			answer++;
			return;
		}

		for (let i = 0; i < n; i++) {
			if (!visited[i]) {
				visited[i] = true;
				queen[x] = i;
				let flag = true;
				for (let j = 0; j < x; j++) {
					if (Math.abs(queen[x] - queen[j]) === x - j) {
						flag = false;
						break;
					}
				}
				if (flag) {
					dfs(x + 1);
				}
				visited[i] = false;
			}
		}
	};

	dfs(0);
	return answer;
}
