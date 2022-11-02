function solution(n, left, right) {
  var answer = [];
  
  while (left <= right) {
      answer.push(Math.max(parseInt(left / n), left++ % n) + 1);
  };
  
  return answer;
}