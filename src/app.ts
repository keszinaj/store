const http = require('http');
const express = require('express');
const bodyParser = require('body-parser')
const usersRouter = require('./routes/user.routes');
const adminRouter = require('./routes/admin.routes');
const sessions = require('express-session');

import session_settings from './config/session_setup';
import {syncDb, testConnectionToDb} from "./config/dbConnection";

const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(sessions(session_settings));

app.use("/", usersRouter)
app.use("/admin", adminRouter)

/* 
   For security reasons.
   Handle unmapped addresses
*/
app.use((req,res,next) => {
    res.render('user/404.ejs');
});
   

http.createServer(app).listen(3000, async function () {
    // This is here only to test if database connection is setup correctly.
    // It can be safely removed.
    await testConnectionToDb();

    // This synchronizes the db to reflect the structure of javascript models.
    // It has to run every time we change anything in one of the models.
    await syncDb();
});



