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
	game.saveGame(boards, user);
	res.status(201).send();
}))

router.patch('/click', asyncHandler(async (req, res) => {
	const user = await users.findOne(req.user.userId);
	const newBoard = game.click(req.body.row, req.body.col, user);
	res.send();
}))

module.exports = router;