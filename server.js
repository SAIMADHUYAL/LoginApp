const app = require('./app');
const express = require('express');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.use(express.static(__dirname+'/public'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/',(req,res) => {
    res.render('login',{error: req.query.valid?req.query.valid:''})
})

const server = app.listen(port, () => {
    console.log('Express Server Listeneing on port '+ port);
});