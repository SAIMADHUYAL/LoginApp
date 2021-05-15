const express = require('express');
const router = express.Router();

const config = require('../config.js');
const User = require('../user/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
// Register without JWT validation
router.post('/register', function (req,res) {
        //add new user
        var hashedPasword = bcrypt.hashSync(req.body.password, 8);
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPasword,
        }, function (err, user) {
            if(err) return res.status(500).send('There was a problem registering user')
            var token = jwt.sign({id: user._id},config.secret,{
                expiresIn: 86400 //expires in 24hours
            });
            res.status.send({auth: true,token: token});
        });
});