import express from 'express';
import { editProduct } from '../controllers/edit_product';
const router = express.Router();
import authorize from '../middlewares/admin_authorize'
import { login_user } from '../controllers/admin_login'
import {
    getAllProducts,
    getAllUsers,
    getUserById,
    getProductById,
    getOrdersOfUser,
    getProductsInOrder, getAllOrders, getUserWithOrder, getOrderById, deleteProduct
} from "../dbUtils/dbQueries";
import { addNewProduct } from '../controllers/add_product';
import { newProductValidationRules } from '../middlewares/new_product_validation_rules';
const json = express.json()
const fs = require('fs');
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/laptop_img')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })
router.use(express.urlencoded({ extended: true }));


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

router.get('/user/:id', authorize, async (req, res) => {
    let id: string = req.params.id;
    const userID = parseInt(id);
    if (isNaN(userID)) {
        res.status(400).send('Invalid user ID');
        return;
    }
    const user = await getUserById(userID);
    if (!user) {
        res.status(404).send('User not found');
        return;
    }
    const orders = await getOrdersOfUser(user);
    const ordersWithTotalPrice = await Promise.all(
        orders.map(async order => {
            const products = await getProductsInOrder(order);
            const totalPrice = products.reduce((total, product) => {
                return total + product.price;
            }, 0);
            order['totalPrice'] = totalPrice;
            return order;
    }));
    console.log(ordersWithTotalPrice);
    res.render('admin/user', { user: user, orders: ordersWithTotalPrice });
});

router.get('/orders', authorize, async (req, res) => {
    const orders = await getAllOrders();
    const renderData = await Promise.all(
        orders.map(async order => {
            const user = await getUserWithOrder(order);
            order['username'] = user ? user.name + " " + user.surname : 'unknown';

            await getProductsInOrder(order);
            return order;
        }));
    console.log(renderData);
    res.render('admin/orders', { orders: renderData });
});

router.get("/orders/:id", authorize, async (req, res) => {
    let id: string = req.params.id;
    const orderID = parseInt(id);
    if (isNaN(orderID)) {
        res.status(400).send('Invalid order ID');
        return;
    }
    const order = await getOrderById(orderID);
    if (!order) {
        res.status(404).send('Order not found');
        return;
    }
    const user = await getUserWithOrder(order);
    const products = await getProductsInOrder(order);

    // const user = getUserbyId(order.UserID);
    const totalAmount = products.reduce((sum, p) => sum + p.price, 0);
    res.render('admin/oneorder', { order: order, user: user, totalAmount: totalAmount });
});

router.get('/products', authorize, async (req, res) => {
    const products = await getAllProducts();

    res.render('admin/store_resources', { products: products });
});

router.get("/products/new", authorize, (req, res) => {
    res.render('admin/new_item');
});

router.post("/products/new", authorize, json, newProductValidationRules(), addNewProduct);
router.post("/products/new_photo", authorize, upload.single('file'), (req, res) => {
    res.status(201).json({ errors: [] });
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

router.get("/products/edit/:id", authorize, async (req, res) => {
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
    res.render('admin/edit_item', { product: product });
});

router.get("/products/delete/:id", authorize, async (req, res) => {
    let id: string = req.params.id;
    const productID = parseInt(id);
    if (isNaN(productID)) {
        res.status(400).send('Invalid product ID');
        return;
    }
    await deleteProduct(productID);
    // TODO:
    const product = getProductbyID(productID);
    if (product) {
        const photoPath = product.Photo_Path;
        fs.unlink("./src/public/laptop_img/" + photoPath, (err) => {
            if (err) {
                console.error(err)
                return
            }
        }
        )
    }
    deleteProduct(productID);
    res.redirect('/admin/products');
});

router.post('/products/edit/:id', authorize, json, newProductValidationRules(), editProduct);


module.exports = router