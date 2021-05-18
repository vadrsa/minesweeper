const express = require('express');
const router = express.Router();
const users = require('./users.service');
const asyncHandler = require('express-async-handler');
const util = require("../commons/util");
const { BadRequest } = require('http-errors');

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

router.get('/top', asyncHandler(async (req, res) => {
    const { difficulty } = req.query;
    let sort = undefined;
    if(difficulty == util.MODES.easy){
        sort = "easyTime";
    }
    else if(difficulty == util.MODES.medium){
        sort = "mediumTime";
    }
    else if(difficulty == util.MODES.hard){
        sort = "hardTime";
    }
    if(!sort){
        throw new BadRequest(`difficulty must be one of ${Object.values(util.MODES)}`);
    }
	const result = await users.findAll({limit: 10, sort, asc: 'true'});
	res.send(result);
}))

module.exports = router;