const cacheSize = 3;
const cities = [
  "Jeju",
  "Pangyo",
  "Seoul",
  "NewYork",
  "LA",
  "Jeju",
  "Pangyo",
  "Seoul",
  "NewYork",
  "LA",
];

function solution(cacheSize, cities) {
  var answer = 0;
  const cashe = [];

  if (cacheSize) {
    cities.forEach((city) => {
      city = city.toLowerCase();
      if (cashe.includes(city)) {
        cashe.splice(cashe.indexOf(city), 1);
        cashe.push(city);
        answer++;
      } else {
        if (cashe.length < cacheSize) cashe.push(city);
        else {
          cashe.shift();
          cashe.push(city);
        }
        answer += 5;
      }
    });
  } else answer = cities.length * 5;

  return answer;
}

solution(cacheSize, cities);
