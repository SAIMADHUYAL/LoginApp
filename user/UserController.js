var express = require('express');
var router = express.Router();
var bodyPsrser = require('body-parser');

var localStorage = require('node-localstorage')
router.use(bodyPsrser.urlencoded({extended : true}));
router.use(bodyPsrser.json());

var User = require('./User');
const jwt = require('jsonwebtoken');

router.get('/', function(req,res){
    User.find({},function(err,users){
        if(err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });

});


router.get('/loginedUser', function(req,res){
    var token = req.headers['x-access-token'];
    if(!token) return res.status(401).send({auth: false, message:'No token Provided.'});
    jwt.verify(token, config.secret, function(err, decoded){
        if(err) return res.status(500).send({auth: false , message:'Failed to Authenticate token. '});

        User.findById(decoded.id , { password: 0}, function(err, user){
            if(err) return res.status(500).send("There was a problem finding the user.");
            if(!user) return res.status(404).send("No User found.");

            res.status(200).send(user);
        })
    })
})


router.get('/profile', function(req,res){
    var token = localStorage.getItem('authtoken');
    console.log("token>>>>", token);
    if(!token){
        res.redirect('/');
    }
    jwt.verify(token, config.secret, function(err, decoded){
        if(err){
            res.redirect('/')
        };
        User.findById(decoded.id,{password:0},function(err, user){
            if(err){ res.redirect('/')}
            if(!user){res.redirect('/')}
            res.render('profile.ejs',{user})
        });
    });
});

module.exports = router;