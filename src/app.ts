var http = require('http');
const express = require('express');
var bodyParser = require('body-parser')
var usersRouter = require('./routes/user.routes');
var adminRouter = require('./routes/admin.routes');

var app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", usersRouter)
app.use("/admin", adminRouter)




/* 
   For security reasons.
   Handle unmapped addresses
*/
app.use((req,res,next) => {
    res.render('user/404.ejs');
});
   


http.createServer(app).listen(3000);



