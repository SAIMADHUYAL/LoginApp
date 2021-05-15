const express = require('express');
const router = express.Router();

const config = require('../config.js');
const User = require('../user/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();

const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const session = require('express-session');

router.use(session({secret: 'edurekaSecert1', resave: false, saveUninitialized: true}));
app.use(express.static(__dirname+'/public'));
app.set('view engine', 'ejs');
app.set('views', './views');
// Register without JWT validation
// router.post('/register', function (req,res) {
//         //add new user
//         var hashedPasword = bcrypt.hashSync(req.body.password, 8);
//         User.create({
//             name: req.body.name,
//             email: req.body.email,
//             password: hashedPasword,
//         }, function (err, user) {
//             if(err) return res.status(500).send('There was a problem registering user')
//             var token = jwt.sign({id: user._id},config.secret,{
//                 expiresIn: 86400 //expires in 24hours
//             });
//             const string =  encodeURIComponent('Sucessfully Registered');
//             res.redirect('/?msg=' + string);
//             res.status.send({auth: true,token: token});
//         });
// });




router.post('/register', (req,res) => {

    var hashedPasword = bcrypt.hashSync(req.body.password, 8);
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPasword,
    }, 
    function (err, user) {
        if(err) return res.status(500).send('There was a problem registering user')
        var token = jwt.sign({id:user._id},config.secret,{
            expiresIn:86400
        });
        const string =  encodeURIComponent('Sucessfully Registered');
        res.redirect('/?msg=' + string);
        res.status(200).send({auth:true, token:token});
    });     
});

// Login User
router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      console.log("/login : user => ", user)
      if (err) return res.status(500).send('Error on the server.');
      const string = encodeURIComponent('! Please enter valid value');
      //let htmlMsg
      if (!user) { 
        //htmlMsg = encodeURIComponent('Email not found, try again ...');
        res.redirect('/?valid=' + string);
      }else{
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
          return res.status(401).send({ auth: false, token: null });
        }

        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        // localStorage.setItem('authtoken', token)
        // req.session.isLoggedIn = true;
        // console.log('admin:'+req.session.isLoggedIn)
        // res.redirect(`/home`)

        localStorage.setItem()
        res.redirect(`/users/profile`);
        //res.send({auth: true, token: token});
      }
    });
});


module.exports = router;


