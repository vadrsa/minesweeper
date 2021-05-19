const express = require('express');
const router = express.Router();
const users = require('../users/users.service');
const game = require('./game.service');
const asyncHandler = require('express-async-handler');
const util = require("../commons/util");

router.use(function timeLog (req, res, next) {
    console.log('Time: ', new Date());
    next();
})

router.post('/newGame', asyncHandler(async (req, res) => {
	const boards = game.createBoard(req.body.difficulty);
	const user = await users.findOne(req.user.userId);
	game.saveGame(boards, user, req.body.difficulty);
	res.status(201).send();
}))

router.patch('/click', asyncHandler(async (req, res) => {
	const user = await users.findOne(req.user.userId);
	const result = game.click(req.body.row, req.body.col, user);
	res.json(result);
}))

router.patch('/flag', asyncHandler(async (req, res) => {
	const user = await users.findOne(req.user.userId);
	const result = game.flag(req.body.row, req.body.col, user);
	res.json(result);
}))

router.get('/', asyncHandler(async (req, res) => {
	const user = await users.findOne(req.user.userId);
	const result = game.getGame(user);
	res.status(201).json(result);
}))

router.patch('/quit', asyncHandler(async (req, res) => {
	const user = await users.findOne(req.user.userId);
	game.quit(user);
	res.status(201).send();
}))

module.exports = router;