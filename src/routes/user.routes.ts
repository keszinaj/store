import express from 'express';
import authorize from '../middlewares/authorize';
import register from '../controllers/register_new_user'
import {userValidationRules} from '../middlewares/user_data_validation_rules'
const router = express.Router();

import {loginUser, getLogin, logoutUser} from '../controllers/handle_login';
import {getLandingPage, sendAllProductsIDs, sendProductsPartilaInfo} from '../controllers/landing_page'
import {getProductDetails} from '../controllers/product_details'

const stripe = require('stripe')("sk_test_51Mae79DsMkUfjELNFGqTadfXlVJo48xS4ekh0R1FhdngnYb1HGdL3xlDWQsK6TK3IxwpX8yPR7v2aVwupj8CnzjC00C5uwJki6")
const json = express.json()

router.get('/', getLandingPage);
router.get('/allproducts', sendAllProductsIDs);
router.get('/ppinfo/:arg', sendProductsPartilaInfo);


router.get("/product/:id", getProductDetails);

router.get('/basket', authorize,  (req, res) => {
    //for examle purpose
    res.render('user/cart');
});

import { getUserbyId, getProductbyID } from '../models/repo_demo';
router.get('/basket/payment', authorize, async (req, res) => {
    console.log((<any>req).session.user)
    let user_basket = getUserbyId((<any>req).user)?.Basket;
    console.log(user_basket)
    let items = user_basket?.map(id => getProductbyID(id))
    let cost = 0
    if(items === undefined || items === null)
    {
        res.status(404).send('Payment error');
        console.log(items)
        return;
    }
    items?.forEach(e=> {if(e!==null){cost = cost + e.Price}})
    try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: items.map(item => {
            
                return {
                    price_data: {
                      currency: "usd",
                      product_data: {
                        name: item?.Name,
                      },
                      unit_amount: (<any>item).Price * 100,
                    },
                    quantity: 1,
                  }
           
        
          }),
          success_url: `http://localhost:3000/checkout`,
          cancel_url: `http://localhost:3000/`,
        })
        res.redirect(session.url);
      } catch (e) {
        res.status(404).send('Payment error 1');
      }
    
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

router.get('/register', (req, res) => {res.render('user/register');});
router.post('/register', json, userValidationRules(),  register);


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