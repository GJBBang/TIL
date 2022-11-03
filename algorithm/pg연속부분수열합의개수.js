function solution(elements) {
	var answer = 0;
	const len = elements.length;
	elements = [...elements, ...elements];

	const sumValue = new Set();
	for (let i = 1; i <= len; i++) {
		for (let j = 0; j < len; j++) {
			let temp = 0;
			for (let k = j; k < i + j; k++) {
				temp += elements[k];
			}
			sumValue.add(temp);
		}
	}

	answer = sumValue.size;
	return answer;
}
