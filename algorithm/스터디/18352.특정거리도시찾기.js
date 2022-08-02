/*
4 4 2 1
1 2
1 3
2 3
2 4
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const [inputN, inputM, inputK, inputX] = input[0].split(" ").map(Number);
const inputGraph = [];
for (i = 0; i < inputN + 1; i++) {
  inputGraph.push([]);
}

for (i = 1; i < inputM + 1; i++) {
  const [from, to] = input[i].split(" ").map(Number);
  inputGraph[from].push(to);
}

/*
N = 4
M = 4
K = 2
X = 1
graph = [[], [2, 3], [3, 4], [], []]
*/

function solution(N, M, K, X, graph) {
  const visitedNode = new Array(N + 1).fill(0);
  let checkNodeList = [];

  const bfs = (graph, startNode) => {
    visitedNode[startNode] = 1;
    checkNodeList.push(startNode);

    while (checkNodeList.length !== 0) {
      const node = checkNodeList.shift();
      if (visitedNode[node] > K) return
      for (i = 0; i < graph[node].length; i++) {
        if (!visitedNode[graph[node][i]]) {
          visitedNode[graph[node][i]] = visitedNode[node] + 1;
          checkNodeList.push(graph[node][i]);
        }
      }
    }
  };


  bfs(graph, X);

  let cnt = 0;
  for (i = 1; i < N + 1; i++) {
    if (visitedNode[i] === K + 1) {
      console.log(i);
      cnt++;
    }
  }
  if (!cnt) {
    console.log(-1);
  }
}

solution(inputN, inputM, inputK, inputX, inputGraph);
