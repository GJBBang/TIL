function solution(s) {
  const len = s.length;
  let answer = len;
  
  for (let i = 1; i <= parseInt(len / 2); i++) {
      let result = "";
      let temp = s.slice(0, i);
      let cnt = 1;
      
      for (let j = i; j < len; j += i) {
          if (temp === s.slice(j, j + i)) cnt++;
          else {
              cnt === 1 ? result += temp : result += cnt + temp;
              
              cnt = 1;
              temp = s.slice(j, j + i);
          }
      }
      cnt === 1 ? result += temp : result += cnt + temp;
      
      answer = Math.min(answer, result.length);
  }
  
  return answer;
}