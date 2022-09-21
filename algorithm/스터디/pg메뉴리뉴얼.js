function solution(orders, course) {
  var answer = [];
  // 각 메뉴 구성 정렬
  const newOrders = [];
  for (let i = 0; i < orders.length; i++) {
      const temp = [...orders[i]];
      temp.sort();
      newOrders.push(temp.join(""));
  }
  
  // 가장 많이 함께 주문된 메뉴 구성 추출
  const getMaxCombi = (l) => {
      let maxNum = 2;
      let maxNumCombi = [];
      for (const [key, value] of Object.entries(menuObject)) {
          if (key.length === l) {
              if (maxNum < value) {
                  maxNum = value;
                  maxNumCombi.length = 0;
                  maxNumCombi.push(key);
              } else if (maxNum === value) maxNumCombi.push(key);
          }
      }
      return maxNumCombi;
  }
  
  // 코스별 구성요소 조합
  const visitedMenu = new Array(newOrders.length).fill(false);
  const menuObject = {};
  const combiMenu = (k, n, m, foods, order) => {
      if (k === n) {
          foods in menuObject ? menuObject[foods] += 1 : menuObject[foods] = 1;
          return
      }
      
      for (let i = m; i < order.length; i++) {
          if (!visitedMenu[i]) {
              visitedMenu[i] = true;
              combiMenu(k + 1, n, i, foods + order[i], order);
              visitedMenu[i] = false;
          }
      }
  }
  
  course.forEach((num) => {
      for (let i = 0; i < newOrders.length; i++) {
          combiMenu(0, num, 0, "", newOrders[i]);
      }
      const tempArray = getMaxCombi(num);
      answer = [...answer, ...tempArray];
  })
  
  answer.sort();
  
  return answer;
}