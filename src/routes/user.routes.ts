import express from 'express';
import authorize from '../middlewares/authorize';
import register from '../controllers/register_new_user'
import {userValidationRules, dataValidationRules, pswValidationRules} from '../middlewares/user_data_validation_rules'
const router = express.Router();

import {loginUser, getLogin, logoutUser} from '../controllers/handle_login';
import {getLandingPage, sendAllProductsIDs, sendProductsPartialInfo, addToCart} from '../controllers/landing_page'
import {getProductDetails} from '../controllers/product_details'

import {getProfileSettings, changeAccountData, changePsw, renderUserHistory} from '../controllers/user_account'

import {getSearchResult} from '../controllers/search_product'
import {renderBasket, apiPayment, successPayment} from '../controllers/handle_basket'


const json = express.json()

router.get('/', getLandingPage);
router.get('/allproducts', sendAllProductsIDs);
router.get('/ppinfo/:arg', sendProductsPartialInfo);


router.get("/product/:id", getProductDetails);
router.get("/search",  getSearchResult)


router.get('/basket', authorize,  renderBasket);
router.post("/addtobasket", authorize, json, addToCart);


router.get('/basket/payment', authorize, apiPayment);
router.get('/checkout',  authorize, successPayment);

router.get('/login', getLogin);
router.post('/login', loginUser);

router.get('/logout', logoutUser);

router.get('/register', (req, res) => {res.render('user/register');});
router.post('/register', json, userValidationRules(),  register);


router.get('/account', authorize, getProfileSettings);
router.post('/account', authorize, json, dataValidationRules(),  changeAccountData);



router.get('/account/changepassword', authorize, (req, res) => {
    res.render('user/account_change_password');
});
router.post('/account/changepassword', authorize, json, pswValidationRules(),  changePsw);

router.get('/account/history', authorize, renderUserHistory);


module.exports = router