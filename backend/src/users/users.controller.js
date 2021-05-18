const express = require('express');
const router = express.Router();
const users = require('./users.service');
const asyncHandler = require('express-async-handler');

router.use(function timeLog (req, res, next) {
    console.log('Time: ', new Date());
    next();
})

router.post('/register', asyncHandler(async (req, res) => {
    const body = req.body;
    const result = await users.create(body);
    res.status(201).json(result);
}))

router.get('/profile', asyncHandler(async (req, res) => {
	const user = await users.findOne(req.user.userId);
	res.send(user);
}))

router.post('/newGame', asyncHandler(async (req, res) => {
	const boards = users.createBoard(req.body.difficulty);
	const user = await users.findOne(req.user.userId);
	users.saveGame(boards, user);
	res.status(201).send();
}))

module.exports = router;