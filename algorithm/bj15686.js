const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const [inputN, inputM] = input[0].split(" ").map(Number);
const inputRoad = [];
for (let i = 0; i < inputN; i++) {
  const temp = input[i + 1].split(" ").map(Number);
  inputRoad.push(temp);
}
/**
 * N, M = 5, 3
 * road = [
    [ 0, 0, 1, 0, 0 ],
    [ 0, 0, 2, 0, 1 ],
    [ 0, 1, 2, 0, 0 ],
    [ 0, 0, 1, 0, 0 ],
    [ 0, 0, 0, 0, 2 ]
  ]
 */
function solution(N, M, road) {
  // 치킨집 , 집 좌표 구하기
  const chickenHouse = [];
  const house = [];
  const getHouse = () => {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (road[i][j] === 2) chickenHouse.push([i, j]);
        else if (road[i][j] === 1) house.push([i, j]);
      }
    }
  };
  getHouse();
  
  // 치킨집 M개 뽑기
  const numOfChickenHouse = chickenHouse.length;
  const visitedChickenHouse = new Array(numOfChickenHouse).fill(false);
  let result = Infinity;
  const getChickenHouse = (k, n) => {
    if (k === M) {
      const d = getChickDistance();
      if (result > d) result = d;
      return;
    }

    for (let i = n; i < numOfChickenHouse; i++) {
      if (!visitedChickenHouse[i]) {
        visitedChickenHouse[i] = true;
        getChickenHouse(k + 1, i + 1);
        visitedChickenHouse[i] = false;
      }
    }
  };

  // 치킨 거리 구하기
  const numOfHouse = house.length;
  const getChickDistance = () => {
    let sumDistance = 0;
    for (let i = 0; i < numOfHouse; i++) {
      let minDistance = Infinity;
      for (let j = 0; j < numOfChickenHouse; j++) {
        if (visitedChickenHouse[j]) {
          const temp = Math.abs(house[i][0] - chickenHouse[j][0]) + Math.abs(house[i][1] - chickenHouse[j][1])
          if (minDistance > temp) minDistance = temp;
        }
      }
      sumDistance += minDistance;
    }
    return sumDistance;
  };
  getChickenHouse(0, 0);
  console.log(result);
}

solution(inputN, inputM, inputRoad);