import express from 'express';
const router = express.Router();


router.get('/', (req, res) => {
    res.render('user/landing_page');
});

router.get("/product/:id",(req, res) => {
    let id:string = req.params.id;
    //for example purpose
    res.render('user/oneitem');
});

router.get('/basket', (req, res) => {
    //for examle purpose
    res.render('user/cart');
});

router.post('/basket', (req, res) => {
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

router.get('/basket/newaddress', (req, res) => {
    //for examle purpose
    res.render('user/other_adress');
});
router.get('/checkout', (req, res) => {
    //for examle purpose
    res.render('user/bought');
});
router.get('/login', (req, res) => {
    //for examle purpose
    res.render('user/login');
});

router.get('/register', (req, res) => {
    //for examle purpose
    res.render('user/register');
});

router.get('/account', (req, res) => {
    //for examle purpose
    res.render('user/account_settings');
});

router.get('/account/changepassword', (req, res) => {
    //for examle purpose
    res.render('user/account_change_password');
});

router.get('/account/history', (req, res) => {
    //for examle purpose
    res.render('user/account_history');
});

router.get('/account/delete', (req, res) => {
    //for examle purpose
    res.render('user/account_delete');
});




module.exports = router 