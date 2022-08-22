/*
5 5 1
1 4
1 2
2 3
2 4
3 4
*/

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [inputN, inputM, inputR] = input[0].split(" ").map(Number);
const inputGraph = [];
for (i = 0; i < inputN + 1; i++) {
  inputGraph.push([]);
}
for (i = 1; i < inputM + 1; i++) {
  let [from, to] = input[i].split(" ").map(Number);
  inputGraph[from].push(to);
  inputGraph[to].push(from);
}
inputGraph.forEach((element) => {
  element.sort((a, b) => a - b);
});

/*
N = 5
M = 5
R = 1
graph = [[], [2, 4], [1, 3, 4], [2, 4], [1, 2, 3], []]
*/

function solution(N, M, R, graph) {
  const visitedNode = new Array(N + 1).fill(0);
  let checkNodeList = [];

  const dfs = (graph, startNode) => {
    let cnt = 1;
    visitedNode[startNode] = cnt;
    cnt++;
    checkNodeList = [...graph[startNode], ...checkNodeList];

    while (checkNodeList.length !== 0) {
      const node = checkNodeList.shift();
      if (!visitedNode[node]) {
        visitedNode[node] = cnt;
        cnt++;
        for (i = graph[node].length - 1; i >= 0; i--) {
          if (!visitedNode[graph[node][i]]) {
            checkNodeList.unshift(graph[node][i]);
          }
        };
      }
    }
  };

  dfs(graph, R);
  for (i = 1; i < N + 1; i++) {
    console.log(visitedNode[i]);
  }
}

solution(inputN, inputM, inputR, inputGraph);
