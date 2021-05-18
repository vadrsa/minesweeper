const { NotFound } = require("http-errors");
const util = require("../commons/util");
const User = require("./user.entity");

function rand(num) {
  return Math.floor(Math.random() * num);
}

class UserService {
  create(payload) {
    const user = new User(payload);
    return user.save();
  }

  findAll(query) {
    const { offset, limit, sort, asc } = query;

    const sortObj = {};
    sortObj[sort] = asc === "true" ? "asc" : "desc";

        return User.find({}, { password: false, currentGame: false })
            .skip(+offset)
            .limit(+limit)
            .sort(sortObj)
            .exec();
    }

  async findOne(id) {
    const user = await User.findById(id).exec();
    if (!user) {
      throw new NotFound(`User with id ${id} not found.`);
    }
    return user;
  }

  createBoard(difficulty) {
    let n, m, bombs;

    if (difficulty === util.MODES.easy) {
      n = 9;
      m = 9;
      bombs = 10;
    } else if(difficulty === util.MODES.medium) {
      n = 16;
      m = 16;
      bombs = 40;
    } else {
      n = 30;
      m = 16;
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
      userArr: boards[1]
    }

    return user.save();
  }
}

module.exports = new UserService();
