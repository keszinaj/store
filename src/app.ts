var http = require('http');
var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static(__dirname + '/public'));

app.get('/', (req: Request, res) => {
    res.render('index');
});

app.get('/item', (req: Request, res) => {
    res.render('oneitem');
});

app.get('/login', (req: Request, res) => {
    res.render('login');
});




http.createServer(app).listen(3000);



