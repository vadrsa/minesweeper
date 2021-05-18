require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});
require('./db-connection');
const express = require('express');
const app = express();
const users = require('./users/users.controller');
const game = require('./game/game.controller');
const auth = require('./auth/auth.controller');
const admin = require('./admin/admin.controller');
const { handleError } = require('./commons/middlewares/error-handler.middleware');
const { jwtMiddleware } = require('./commons/middlewares/auth.middleware');
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(jwtMiddleware.unless({
    path: [
        '/auth/login',
		'/users/register',
    ]
}));

app.use('/users', users);
app.use('/game', game);
app.use('/auth', auth);
app.use('/admin', admin);
app.use(handleError);

module.exports = app;