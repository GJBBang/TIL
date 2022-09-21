function solution(new_id) {
  var answer = '';
  new_id = new_id.toLowerCase();
  const pattern1 = /[0-9]/;
  const pattern2 = /[a-zA-Z]/;
  let temp = "";
  for (let i = 0; i < new_id.length; i++) {
      if (pattern1.test(new_id[i]) || pattern2.test(new_id[i]) || new_id[i] === "-" || new_id[i] === "_" || new_id[i] === ".") {
          temp += new_id[i];
      }
  }
  
  answer += temp[0];
  for (let i = 1; i < temp.length; i++) {
      if (temp[i] === ".") {
          if (answer[answer.length - 1] !== ".") {
              answer += temp[i];
          }
          continue;
      }
      answer += temp[i];
  }
  
  if (answer[0] === ".") answer = answer.slice(1);
  if (answer[answer.length - 1] === ".") answer = answer.slice(0, -1);
  
  if (!answer) answer = "a";
  
  if (answer.length >= 16) answer = answer.slice(0, 15);
  if (answer[answer.length - 1] === ".") answer = answer.slice(0, -1);
  
  if (answer.length <= 2) {
      const word = answer[answer.length - 1];
      while (answer.length < 3) {
          answer += word;
      }
  }
  return answer;
}