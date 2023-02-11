import express from 'express';
const router = express.Router();
import authorize from '../middlewares/admin_authorize'
import { login_user } from '../controllers/admin_login'
import {getAllProducts, getAllUsers, getProductById} from "../dbUtils/dbQueries";

router.get('/login', (req, res) => {
    //for examle purpose
    res.render('admin/admin_login');
});
router.post('/login', login_user);
router.get('/', authorize, (req, res) => {
    //for examle purpose
    res.render('admin/landing_page');
});

router.get('/users', authorize, async (req, res) => {
    const users = await getAllUsers();
    res.render('admin/list_of_users', { users: users });
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
    let id: string = req.params.id;
    //for example purpose
    res.render('admin/oneorder');
});

router.get('/products', authorize, async (req, res) => {
    const products = await getAllProducts();

    res.render('admin/store_resources', { products: products });
});

router.get("/products/new", authorize, (req, res) => {
    res.render('admin/new_item');
});

router.get("/products/:id", authorize, async (req, res) => {
    let id: string = req.params.id;
    const productID = parseInt(id);
    if (isNaN(productID)) {
        res.status(400).send('Invalid product ID');
        return;
    }
    const product = await getProductById(productID);
    if (!product) {
        res.status(404).send('Product not found');
        return;
    }

    res.render('admin/show_item', { product: product });
});

router.get("/products/edit/:id", authorize, (req, res) => {
    let id: string = req.params.id;
    //for example purpose
    res.render('admin/edit_item');
});
module.exports = router 