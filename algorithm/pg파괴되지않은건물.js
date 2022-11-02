function solution(board, skill) {
  var answer = 0;
  const sumDegree = new Array(board.length + 1).fill(0).map(() => new Array(board[0].length + 1).fill(0));
  skill.forEach((arr) => {
      const [type, r1, c1, r2, c2, degree] = arr;
      sumDegree[r1][c1] += type === 1 ? -degree : degree;
      sumDegree[r1][c2 + 1] += type === 1 ? degree : -degree;
      sumDegree[r2 + 1][c1] += type === 1 ? degree : -degree;
      sumDegree[r2 + 1][c2 + 1] += type === 1 ? -degree : degree;
  });
  
  for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
          sumDegree[i][j + 1] += sumDegree[i][j];
      }
  }
  
  for (let j = 0; j < board[0].length; j++) {
      for (let i = 0; i < board.length; i++) {
          sumDegree[i + 1][j] += sumDegree[i][j];
      }
  }
  
  for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
          board[i][j] += sumDegree[i][j];
          if (board[i][j] > 0) answer++;
      }
  }
  return answer;
}