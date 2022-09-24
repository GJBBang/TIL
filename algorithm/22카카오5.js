const commands = [
  "UPDATE 1 1 menu",
  "UPDATE 1 2 category",
  "UPDATE 2 1 bibimbap",
  "UPDATE 2 2 korean",
  "UPDATE 2 3 rice",
  "UPDATE 3 1 ramyeon",
  "UPDATE 3 2 korean",
  "UPDATE 3 3 noodle",
  "UPDATE 3 4 instant",
  "UPDATE 4 1 pasta",
  "UPDATE 4 2 italian",
  "UPDATE 4 3 noodle",
  "MERGE 1 2 1 3",
  "MERGE 1 3 1 4",
  "UPDATE korean hansik",
  "UPDATE 1 3 group",
  "UNMERGE 1 4",
  "PRINT 1 3",
  "PRINT 1 4",
];

function solution(commands) {
  var answer = [];
  const board = [];
  const checkGroup = [];
  for (let i = 0; i < 50; i++) {
    const temp1 = new Array(50).fill(0);
    const temp2 = new Array(50).fill(0);
    board.push(temp1);
    checkGroup.push(temp2);
  }

  let groupNum = 1;
  const getMerge = (r1, c1, r2, c2, v1, v2, num1, num2) => {
    if (!num1) {
      checkGroup[r1 - 1][c1 - 1] = groupNum;
      if (!v1 && v2) board[r1 - 1][c1 - 1] = v2;
    } else {
      for (let i = 0; i < 50; i++) {
        for (let j = 0; j < 50; j++) {
          if (checkGroup[i][j] === num1) {
            checkGroup[i][j] = groupNum;
            if (!v1 && v2) board[i][j] = v2;
            else board[i][j] = v1;
          }
        }
      }
    }
    if (!num2) {
      checkGroup[r2 - 1][c2 - 1] = groupNum;
      if (v1) board[r2 - 1][c2 - 1] = v1;
    } else {
      for (let i = 0; i < 50; i++) {
        for (let j = 0; j < 50; j++) {
          if (checkGroup[i][j] === num2) {
            checkGroup[i][j] = groupNum;
            if (!v1 && v2) board[i][j] = v2;
            else board[i][j] = v1;
          }
        }
      }
    }
    groupNum++;
  };

  commands.forEach((command) => {
    const com = command.split(" ");
    switch (com[0]) {
      case "UPDATE":
        if (com.length === 4) {
          if (checkGroup[+com[1] - 1][+com[2] - 1]) {
            for (let i = 0; i < 50; i++) {
              for (let j = 0; j < 50; j++) {
                if(checkGroup[+com[1] - 1][+com[2] - 1] === checkGroup[i][j]) {
                  board[i][j] = com[3];
                }
              }
            }
          } else board[+com[1] - 1][+com[2] - 1] = com[3];
          
        } else {
          for (let i = 0; i < 50; i++) {
            for (let j = 0; j < 50; j++) {
              if (board[i][j] === com[1]) board[i][j] = com[2];
            }
          }
        }
        break;
      case "MERGE":
        getMerge(
          +com[1],
          +com[2],
          +com[3],
          +com[4],
          board[+com[1] - 1][+com[2] - 1],
          board[+com[2] - 1][+com[3] - 1],
          checkGroup[+com[1] - 1][+com[2] - 1],
          checkGroup[+com[2] - 1][+com[3] - 1]
        );
        break;
      case "UNMERGE":
        const num = checkGroup[+com[1] - 1][+com[2] - 1];
        const v = board[+com[1] - 1][+com[2] - 1];
        if (num) {
          for (let i = 0; i < 50; i++) {
            for (let j = 0; j < 50; j++) {
              if (checkGroup[i][j] === num) {
                checkGroup[i][j] = 0;
                board[i][j] = 0;
              }
            }
          }
        }
        board[+com[1] - 1][+com[2] - 1] = v;
        break;
      default:
        board[+com[1] - 1][+com[2] - 1]
          ? answer.push(board[+com[1] - 1][+com[2] - 1])
          : answer.push("EMPTY");
    }
  });
  console.log(answer);
  return answer;
}

solution(commands);
