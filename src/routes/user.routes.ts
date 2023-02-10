import express from 'express';
import authorize from '../middlewares/authorize';
const router = express.Router();
import {loginUser, getLogin, logoutUser} from '../controllers/handle_login';
import {getLandingPage, sendAllProductsIDs, sendProductsPartilaInfo} from '../controllers/landing_page'
import {getProductDetails} from '../controllers/product_details'

router.get('/', getLandingPage);
router.get('/allproducts', sendAllProductsIDs);
router.get('/ppinfo/:arg', sendProductsPartilaInfo);

router.get("/product/:id", getProductDetails);

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
router.post('/login', loginUser);
router.get('/logout', logoutUser);

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