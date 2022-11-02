function solution(n, wires) {
  var answer = Infinity;
  
  const visited = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(false));
  const board = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(0));
  
  wires.forEach((arr) => {
      const [x, y] = arr;
      board[x][y] = 1;
      board[y][x] = 1;
  });
  
  const getNum = (tempVisited) => {
      let cnt = 0;
      
      tempVisited.forEach((n) => {
          if (n) cnt++;
      });
      return Math.abs(2 * cnt - n);
  };
  
  const bfs = (i) => {
      const tempVisited = new Array(n + 1).fill(false);
      const queue = [];
      queue.push(i);
      tempVisited[i] = true;
      
      while (queue.length) {
          const v = queue.shift();
          for (let w = 1; w <= n; w++) {
              if (board[v][w] && !tempVisited[w]) {
                  tempVisited[w] = true;
                  queue.push(w);
              }
          }
      }
      return getNum(tempVisited);
  };
  
  for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
          if (board[i][j] && !visited[i][j]) {
              visited[i][j] = true;
              visited[j][i] = true;
              board[i][j] = 0;
              board[j][i] = 0;
              answer = Math.min(answer, bfs(i))
              board[i][j] = 1;
              board[j][i] = 1;
          }
      }
  }
  return answer;
}