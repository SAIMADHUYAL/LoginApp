var express = require('express');
var router = express.Router();
var bodyPsrser = require('body-parser');

router.use(bodyPsrser.urlencoded({extended : true}));
riuter.use(bodyPsrser.json());

var User = require('./User');

router.get('/', function(req,res){
    User.find({},function(err,users){
        if(err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });

});

module.exports = router;