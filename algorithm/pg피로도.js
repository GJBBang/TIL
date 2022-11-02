function solution(k, dungeons) {
  var answer = -1;
  const depth = dungeons.length;
  const visited = new Array(depth).fill(false);
  
  const dfs = (d, v, cnt) => {
      if (d === depth) {
          answer = Math.max(answer, cnt);
          return;
      }
      
      for (let i = 0; i < depth; i++) {
          if (!visited[i]) {
              visited[i] = true;
              if (v >= dungeons[i][0]) {
                  dfs(d + 1, v - dungeons[i][1], cnt + 1);
              } else {
                  dfs(d + 1, v, cnt);
              }
              visited[i] = false;
          }
      }
  };
  
  dfs(0, k, 0);
  
  return answer;
}