var http = require('http');
var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use( (req: Request, res) => {
 res.render('index');
 });
http.createServer(app).listen(3000);



