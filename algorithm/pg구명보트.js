function solution(people, limit) {
	var answer = 0;
	people = people.sort((a, b) => b - a);

	let left = 0;
	let right = people.length - 1;

	while (left < right) {
		if (people[left] + people[right] <= limit) {
			answer++;
			left++;
			right--;
		} else {
			answer++;
			left++;
		}
	}
	if (left === right) answer++;
	return answer;
}
