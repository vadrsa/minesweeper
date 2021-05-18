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

module.exports = router;