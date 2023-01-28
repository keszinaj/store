var http = require('http');
var express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req: Request, res) => {
    res.render('user/landing_page');
});

app.get("/product/:id",(req, res) => {
    let id:string = req.params.id;
    //for example purpose
    res.render('user/oneitem');
});

app.get('/basket', (req: Request, res) => {
    //for examle purpose
    res.render('user/cart');
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
            res.redirect('/checkout');
        }
    }
    else{
        res.render('user/cart');
    }
});

app.get('/basket/newaddress', (req: Request, res) => {
    //for examle purpose
    res.render('user/other_adress');
});
app.get('/checkout', (req: Request, res) => {
    //for examle purpose
    res.render('user/bought');
});
app.get('/login', (req: Request, res) => {
    //for examle purpose
    res.render('user/login');
});

app.get('/register', (req: Request, res) => {
    //for examle purpose
    res.render('user/register');
});

app.get('/account', (req: Request, res) => {
    //for examle purpose
    res.render('user/account_settings');
});

app.get('/account/changepassword', (req: Request, res) => {
    //for examle purpose
    res.render('user/account_change_password');
});

app.get('/account/history', (req: Request, res) => {
    //for examle purpose
    res.render('user/account_history');
});

app.get('/account/delete', (req: Request, res) => {
    //for examle purpose
    res.render('user/account_delete');
});



app.get('/admin', (req: Request, res) => {
    //for examle purpose
    res.render('admin/landing_page');
});

app.get('/admin/users', (req: Request, res) => {
    //for examle purpose
    res.render('admin/list_of_users');
});
app.get('/admin/user/:id', (req: Request, res) => {
    //for examle purpose
    res.render('admin/user');
});
app.get('/admin/orders', (req: Request, res) => {
    //for examle purpose
    res.render('admin/orders');
});

app.get("/admin/orders/:id",(req, res) => {
    let id:string = req.params.id;
    //for example purpose
    res.render('admin/oneorder');
});

app.get('/admin/products', (req: Request, res) => {
    //for examle purpose
    res.render('admin/store_resources');
});

app.get("/admin/products/:id",(req, res) => {
    let id:string = req.params.id;
    //for example purpose
    res.render('admin/show_item');
});

app.get("/admin/products/edit/:id",(req, res) => {
    let id:string = req.params.id;
    //for example purpose
    res.render('admin/edit_item');
});

app.get("/admin/products/new",(req, res) => {
    res.render('admin/new_item');
});
/* 
   For security reasons.
   Handle unmapped addresses
*/
app.use((req,res,next) => {
    res.render('user/404.ejs');
});
   


http.createServer(app).listen(3000);



