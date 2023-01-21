var http = require('http');
var express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req: Request, res) => {
    res.render('landing_page');
});

app.get("/product/:id",(req, res) => {
    let id:string = req.params.id;
    //for example purpose
    res.render('oneitem');
});

app.get('/basket', (req: Request, res) => {
    //for examle purpose
    res.render('cart');
});

app.post('/basket', (req: Request, res) => {
    //for examle purpose
    console.log(req.body)
    if(req.body !== null)
    {
        let checkaddress = (<any>req.body).checkaddress;
        console.log(checkaddress)
        if(checkaddress === 'newaddress')
        {
            res.redirect('/basket/newaddress')

        }
        else if(checkaddress === 'savedaddress')
        {
            res.redirect('checkout');
        }
    }
    else{
        res.render('cart');
    }
});

app.get('/basket/newaddress', (req: Request, res) => {
    //for examle purpose
    res.render('other_adress');
});
app.get('/checkout', (req: Request, res) => {
    //for examle purpose
    res.render('bought');
});
app.get('/login', (req: Request, res) => {
    //for examle purpose
    res.render('login');
});

app.get('/register', (req: Request, res) => {
    //for examle purpose
    res.render('register');
});

app.get('/account', (req: Request, res) => {
    //for examle purpose
    res.render('account_settings');
});

app.get('/account/changepassword', (req: Request, res) => {
    //for examle purpose
    res.render('account_change_password');
});

app.get('/account/history', (req: Request, res) => {
    //for examle purpose
    res.render('account_history');
});

app.get('/account/delete', (req: Request, res) => {
    //for examle purpose
    res.render('account_delete');
});



/* 
   For security reasons.
   Handle unmapped addresses
*/
app.use((req,res,next) => {
    res.render('404.ejs');
});
   


http.createServer(app).listen(3000);



