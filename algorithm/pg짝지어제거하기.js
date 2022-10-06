const s = baabaa;

function solution(s) {
	var answer = -1;
	const arr = s.split("");
	const stack = [];
	arr.forEach((word) => {
		if (!stack.length) stack.push(word);
		else {
			if (stack[stack.length - 1] === word) {
				stack.pop();
			} else {
				stack.push(word);
			}
		}
	});

	stack.length ? (answer = 0) : (answer = 1);
	return answer;
}
