const util = require("../commons/util");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 4,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    easyTime: {
      type: Number,
      default: 0,
    },
    mediumTime: {
      type: Number,
      default: 0,
    },
    hardTime: {
      type: Number,
      default: 0,
    },
  },
  { collection: "users" }
);

schema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject._id;
  delete userObject.__v;

  return userObject;
};

schema.pre("save", function (next) {
  if (this.isModified("password")) {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
  }
  this.firstName = this.firstName.trim();
  this.lastName = this.lastName.trim();

  next();
});

module.exports = mongoose.model("User", schema);
