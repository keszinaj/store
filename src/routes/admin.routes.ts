import express from 'express';
const router = express.Router();
import authorize from '../middlewares/admin_authorize'
import {login_user} from '../controllers/admin_login' 

router.get('/login', (req, res) => {
    //for examle purpose
    res.render('admin/admin_login');
});
router.post('/login', login_user);
router.get('/',authorize, authorize, (req, res) => {
    //for examle purpose
    res.render('admin/landing_page');
});

router.get('/users', authorize, (req, res) => {
    //for examle purpose
    res.render('admin/list_of_users');
});
router.get('/user/:id', authorize, (req, res) => {
    //for examle purpose
    res.render('admin/user');
});
router.get('/orders', authorize, (req, res) => {
    //for examle purpose
    res.render('admin/orders');
});

router.get("/orders/:id", authorize, (req, res) => {
    let id:string = req.params.id;
    //for example purpose
    res.render('admin/oneorder');
});

router.get('/products', authorize,  (req, res) => {
    //for examle purpose
    res.render('admin/store_resources');
});

router.get("/products/new", authorize, (req, res) => {
    res.render('admin/new_item');
});

router.get("/products/:id", authorize, (req, res) => {
    let id:string = req.params.id;
    //for example purpose
    res.render('admin/show_item');
});

router.get("/products/edit/:id", authorize,(req, res) => {
    let id:string = req.params.id;
    //for example purpose
    res.render('admin/edit_item');
});
module.exports = router 