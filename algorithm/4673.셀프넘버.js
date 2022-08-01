// 입력 없음

function solution() {
  const numbers = new Array(10001).fill(false);
  for (i = 1; i <= 10000; i++) {
    const charNum = i.toString();
    let selfNum = i;
    for (j = 0; j < charNum.length; j++) {
      selfNum += +charNum[j];
    }
    if (selfNum <= 10000) {
      numbers[selfNum] = true;
    }
  }

  for (i = 1; i <= 10000; i++) {
    if (!numbers[i]) {
      console.log(i);
    }
  }
}

solution();
