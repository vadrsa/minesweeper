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

  saveGame(boards, user, difficulty) {
    user.currentGame = {
      gameArr: boards[0],
      userArr: boards[1],
	  difficulty
    };

    return user.save();
  }

  getGame(user) {
    if(typeof user.currentGame[0] === 'undefined') return {userArr: []};
    const gameData = JSON.parse(JSON.stringify(user.currentGame[0]));

    delete gameData.gameArr;

    return gameData;
  }

  click(row, col, user) {
    const gameBoard = user.currentGame[0].gameArr;
    const userBoard = user.currentGame[0].userArr;

    if(user.currentGame[0].isLost) return {userArr: userBoard};
    if(userBoard[row][col] === -3) return {userArr: userBoard};
    
    let newUserBoard = JSON.parse(JSON.stringify(userBoard));
    let isLost = false;

    let n = gameBoard.length;
    let m = gameBoard[0].length;

    const num = gameBoard[row][col];
    newUserBoard[row][col] = num;

    if(num == -1) {
      user.currentGame[0].isLost = true;
      newUserBoard = revealBombs(newUserBoard, gameBoard, n, m);
      isLost = true;
      user.currentGame[0].endDate = Date.now();
    }

    if(num == 0) {
      newUserBoard = checkSurroundings(row, col, newUserBoard, gameBoard, n, m)
    }

    let isWon;
    if(!isLost) {
      isWon = checkVictory(newUserBoard, gameBoard, n, m);
    }

    user.currentGame[0].userArr = newUserBoard;
    if(isWon) {
      user.currentGame[0].endDate = Date.now();
      const gameTime = Math.floor((user.currentGame[0].endDate - user.currentGame[0].startDate) / 1000);
      if(user.currentGame[0].difficulty === util.MODES.easy) {
        if(gameTime < user.easyTime || user.easyTime === 0) user.easyTime = gameTime;
      }
    }

    user.save();

    const result = JSON.parse(JSON.stringify(user.currentGame[0]));
    delete result.gameArr;

    return result;
  }

  flag(row, col, user) {
    const userBoard = user.currentGame[0].userArr;
    if(user.currentGame[0].endDate > user.currentGame[0].startDate) return userBoard;

    let newUserBoard = JSON.parse(JSON.stringify(userBoard));

    if(newUserBoard[row][col] === -3) newUserBoard[row][col] = -2;
    else if(newUserBoard[row][col] === -2) newUserBoard[row][col] = -3;

    user.currentGame[0].userArr = newUserBoard;
    user.save();

    return newUserBoard;
  }

  quit(user) {
    user.currentGame = undefined;
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
      if(i < 0 || j < 0 || i >= n || j >= m || userBoard[i][j] > -2) continue;

      userBoard[i][j] = gameBoard[i][j];

      if(userBoard[i][j] === 0) checkSurroundings(i, j, userBoard, gameBoard, n, m);
    }
  }

  return userBoard;
}

function checkVictory(userBoard, gameBoard, n, m) {
  for(let i = 0; i < n; i++) {
    for(let j = 0; j < m; j++) {
      if(userBoard[i][j] !== gameBoard[i][j]) {
        if(gameBoard[i][j] !== -1) return false;
      }
    }
  }

  return true;
}

module.exports = new GameService();
