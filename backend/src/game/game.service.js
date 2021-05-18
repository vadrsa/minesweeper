const util = require("../commons/util");

function rand(num) {
  return Math.floor(Math.random() * num);
}

class GameService {
  createBoard(difficulty) {
    let n, m, bombs;

    if (difficulty === util.MODES.easy) {
      n = 9;
      m = 9;
      bombs = 10;
    } else if (difficulty === util.MODES.medium) {
      n = 16;
      m = 16;
      bombs = 40;
    } else {
      n = 16;
      m = 30;
      bombs = 99;
    }

    let gameBoard = new Array(n);
    let userBoard = new Array(n);

    for (let i = 0; i < n; i++) {
      gameBoard[i] = new Array(m);
      userBoard[i] = new Array(m);
      for (let j = 0; j < m; j++) {
        gameBoard[i][j] = 0;
        userBoard[i][j] = -2;
      }
    }

    for (let i = 0; i < bombs; i++) {
      let x, y;
      do {
        x = rand(n);
        y = rand(m);
      } while (gameBoard[x][y] === -1);

      gameBoard[x][y] = -1;
    }

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (gameBoard[i][j] === -1) continue;

        let num = 0;
        if (i - 1 >= 0 && j - 1 >= 0 && gameBoard[i - 1][j - 1] == -1) num++;
        if (i - 1 >= 0 && gameBoard[i - 1][j] == -1) num++;
        if (i - 1 >= 0 && j + 1 < m && gameBoard[i - 1][j + 1] == -1) num++;

        if (j - 1 >= 0 && gameBoard[i][j - 1] == -1) num++;
        if (j + 1 < m && gameBoard[i][j + 1] == -1) num++;

        if (i + 1 < n && j - 1 >= 0 && gameBoard[i + 1][j - 1] == -1) num++;
        if (i + 1 < n && gameBoard[i + 1][j] == -1) num++;
        if (i + 1 < n && j + 1 < m && gameBoard[i + 1][j + 1] == -1) num++;

        gameBoard[i][j] = num;
      }
    }

    return [gameBoard, userBoard];
  }

  saveGame(boards, user) {
    user.currentGame = {
      gameArr: boards[0],
      userArr: boards[1],
    };

    return user.save();
  }

  click(row, col, user) {
    const gameBoard = user.currentGame[0].gameArr;
    const userBoard = user.currentGame[0].userArr;
    let newUserBoard = JSON.parse(JSON.stringify(userBoard));
    let isLost = false;

    let n = gameBoard.length;
    let m = gameBoard[0].length;

    for(let i = 0; i < n; i++) {
      let str = '';
      for(let j = 0; j < m; j++) {
        str += userBoard[i][j] + '  ';
      }
      console.log(str);
    }

    const num = gameBoard[row][col];
    newUserBoard[row][col] = num;

    if(num == -1) {
      user.currentGame[0].isLost = true;
      newUserBoard = revealBombs(newUserBoard, gameBoard, n, m);
      isLost = true;
    }
    if(num == 0) {
      newUserBoard = checkSurroundings(row, col, newUserBoard, gameBoard, n, m)
    }
    
    console.log();
    console.log();

    for(let i = 0; i < n; i++) {
      let str = '';
      for(let j = 0; j < m; j++) {
        str += newUserBoard[i][j] + '  ';
      }
      console.log(str);
    }

    let isWon;
    if(!isLost) isWon = checkVictory(newUserBoard, gameBoard, n, m);

    user.currentGame[0].userArr = newUserBoard;
    if(isWon) user.currentGame[0].endDate = Date.now;

    return user.save();
  }
}

function revealBombs(userBoard, gameBoard, n, m) {
  for(let i = 0; i < n; i++) {
    for(let j = 0; j < m; j++) {
      if(gameBoard[i][j] === -1) userBoard[i][j] = -1;
    }
  }
  
  return userBoard;
}

function checkSurroundings(row, col, userBoard, gameBoard, n, m) {
  for(let i = row - 1; i <= row + 1; i++) {
    for(let j = col - 1; j <= col + 1; j++) {
      if(i < 0 || j < 0 || i >= n || j >= m || userBoard[i][j] != -2) continue;

      userBoard[i][j] = gameBoard[i][j];

      if(userBoard[i][j] === 0) checkSurroundings(i, j, userBoard, gameBoard, n, m);
    }
  }

  return userBoard;
}

function checkVictory(userBoard, gameBoard, n, m) {
  for(let i = row - 1; i <= row + 1; i++) {
    for(let j = col - 1; j <= col + 1; j++) {
      if(userBoard[i][j] !== gameBoard[i][j]) {
        if(gameBoard[i][j] !== -1) return false;
      }
    }
  }

  return true;
}

module.exports = new GameService();
