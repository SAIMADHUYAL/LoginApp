const app = require('./app');
const express = require('express');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.use(express.static(__dirname+'/public'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/',(req,res) => {
    sess = req.session;
    sess.email = " ";
    console.log(">>>>",sess.email);
    res.render('login',{error: req.query.valid?req.query.valid:' ',
                        msg: req.query.msg?req.query.msg:' '})
})


app.get('/signup',(req,res) => {
    res.render('signup');
})
const server = app.listen(port, () => {
    console.log('Express Server Listeneing on port '+ port);
});