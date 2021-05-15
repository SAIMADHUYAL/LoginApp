const express = require('express');
const app = express();
const db = require('./db');

var UserContoller = require('./user/UserController');
app.use('/users',UserContoller);

var AuthController = require('./auth/AuthController');
app.use('/api/auth',AuthController);

module.exports = app;