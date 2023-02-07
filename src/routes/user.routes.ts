import express from 'express';
import authorize from '../middlewares/authorize';
const router = express.Router();
import {login_user, getLogin} from '../controllers/handle_login';
router.get('/', (req, res) => {
    res.render('user/landing_page');
});

router.get("/product/:id",(req, res) => {
    let id:string = req.params.id;
    //for example purpose
    res.render('user/oneitem');
});

router.get('/basket', authorize,  (req, res) => {
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

router.get('/basket/newaddress', authorize, (req, res) => {
    //for examle purpose
    res.render('user/other_adress');
});
router.get('/checkout',  authorize, (req, res) => {
    //for examle purpose
    res.render('user/bought');
});

router.get('/login', getLogin);
router.post('/login', login_user);


router.get('/register', (req, res) => {
    //for examle purpose
    res.render('user/register');
});

router.get('/account', authorize, (req, res) => {
    //for examle purpose
    res.render('user/account_settings');
});

router.get('/account/changepassword', authorize, (req, res) => {
    //for examle purpose
    res.render('user/account_change_password');
});

router.get('/account/history', authorize, (req, res) => {
    //for examle purpose
    res.render('user/account_history');
});

router.get('/account/delete', authorize, (req, res) => {
    //for examle purpose
    res.render('user/account_delete');
});




module.exports = router