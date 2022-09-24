const [n, m, x, y, r, c, k] = [3, 4, 2, 3, 3, 1, 5];

function solution(n, m, x, y, r, c, k) {
  var answer = "";
  const arr = [];
  for (let i = 0; i < n; i++) {
    const temp = new Array(m).fill(0);
    arr.push(temp);
  }
  arr[x - 1][y - 1] = 1;
  arr[r - 1][c - 1] = 2;

  const dx = [1, 0, 0, -1];
  const dy = [0, -1, 1, 0];
  const d = ["d", "l", "r", "u"];

  const result = [];
  const dfs = (depth, a, b, route) => {
    if (depth === k) {
      if (arr[a][b] === 2) {
        result.push(route);
      }
      return;
    }

    for (let z = 0; z < 4; z++) {
      const i = a + dx[z];
      const j = b + dy[z];
      if (i >= 0 && i < n && j >= 0 && j < m) {
        dfs(depth + 1, i, j, route + d[z]);
      }
    }
  };

  dfs(0, x - 1, y - 1, "");
  result.sort();
  answer = result[0];
  if (!answer.length) answer = "impossible";
  return answer;
}

solution(n, m, x, y, r, c, k);
