// const survey = ["AN", "CF", "MJ", "RT", "NA"];
// const choices = [5, 3, 2, 7, 5];
const survey = [ 'TR', 'RT', 'TR' ]
const choices = [ 7, 1, 3 ]

function solution(survey, choices) {
  var answer = "";
  const character = {
    R: 0,
    T: 0,
    C: 0,
    F: 0,
    J: 0,
    M: 0,
    A: 0,
    N: 0,
  };

  for (i = 0; i < survey.length; i++) {
    switch (choices[i]) {
      case 1:
        character[survey[i][0]] += 3;
        break;
      case 2:
        character[survey[i][0]] += 2;
        break;
      case 3:
        character[survey[i][0]] += 1;
        break;
      case 4:
        break;
      case 5:
        character[survey[i][1]] += 1;
        break;
      case 6:
        character[survey[i][1]] += 2;
        break;
      case 7:
        character[survey[i][1]] += 3;
        break;
    }
  }

  if (character["R"] >= character["T"]) answer += "R";
  else answer += "T";
  if (character["C"] >= character["F"]) answer += "C";
  else answer += "F";
  if (character["J"] >= character["M"]) answer += "J";
  else answer += "M";
  if (character["A"] >= character["N"]) answer += "A";
  else answer += "N";

  return answer;
}

console.log(solution(survey, choices));
