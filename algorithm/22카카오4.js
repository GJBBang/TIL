const numbers = [63, 111, 95, 47, 59, 62, 126, 122];
const n = 1111010;
console.log(parseInt(n, 2));

function solution(numbers) {
  var answer = [];

  numbers.forEach((number) => {
    const binaryNumber = [number.toString(2)];
    if (binaryNumber[0][0] === "1") binaryNumber.push("0" + binaryNumber[0]);

    const check = [];
    binaryNumber.forEach((num) => {
      let cnt = 1;
      let len = 1;
      while (num.length > len) {
        len += 2 ** cnt;
        cnt++;
      }
      if (num.length === len) {
        let flag = true;
        for (let i = 1; i < len; i += 2) {
          if (num[i] === "0") {
            flag = false;
            break;
          }
        }
        if (flag) check.push(1);
        else check.push(0);
      } else check.push(0);
    });
    check.reduce((sum, currValue) => {
      return sum + currValue;
    })
      ? answer.push(1)
      : answer.push(0);
  });

  console.log(answer);
  return answer;
}

solution(numbers);
