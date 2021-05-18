const { NotFound } = require("http-errors");
const util = require("../commons/util");
const User = require("./user.entity");

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
}

module.exports = new UserService();
