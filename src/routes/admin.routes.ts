import express from 'express';
import { getAllProducts, getOrdersbyUserID, getProductbyID, getUserbyId, getOrderByID, getAllUsers, getAllOrders, deleteProduct } from '../models/repo_demo';
import { editProduct } from '../controllers/edit_product';
const router = express.Router();
import authorize from '../middlewares/admin_authorize'
import { login_user } from '../controllers/admin_login'
import { addNewProduct } from '../controllers/add_product';
import { newProductValidationRules } from '../middlewares/new_product_validation_rules';
const json = express.json()
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

router.get('/users', authorize, (req, res) => {
    const users = getAllUsers();
    res.render('admin/list_of_users', { users: users });
});
router.get('/user/:id', authorize, (req, res) => {
    let id: string = req.params.id;
    const userID = parseInt(id);
    if (isNaN(userID)) {
        res.status(400).send('Invalid user ID');
        return;
    }
    const user = getUserbyId(userID);
    if (!user) {
        res.status(404).send('User not found');
        return;
    }
    const orders = getOrdersbyUserID(userID);
    const ordersWithTotalPrice = orders.map(order => {
        const totalPrice = order.Products.reduce((total, product) => {
            return total + product!.Price;
        }, 0);
        return { ...order, totalPrice: totalPrice };
    });
    res.render('admin/user', { user: user, orders: ordersWithTotalPrice });
});
router.get('/orders', authorize, (req, res) => {
    const orders = getAllOrders();
    const renderData =
        orders.map(order => {
            const user = getUserbyId(order.UserID);
            const username = user ? user.Name + " " + user.Surname : 'unknown';
            return {
                ...order,
                username: username
            }
        });
    res.render('admin/orders', { orders: renderData });
});

router.get("/orders/:id", authorize, (req, res) => {
    let id: string = req.params.id;
    const orderID = parseInt(id);
    if (isNaN(orderID)) {
        res.status(400).send('Invalid order ID');
        return;
    }
    const order = getOrderByID(orderID);
    if (!order) {
        res.status(404).send('Order not found');
        return;
    }
    const user = getUserbyId(order.UserID);
    const totalAmount = order.Products.reduce((sum, p) => sum + p!.Price, 0);
    res.render('admin/oneorder', { order: order, user: user, totalAmount: totalAmount });
});

router.get('/products', authorize, (req, res) => {
    const products = getAllProducts();

    res.render('admin/store_resources', { products: products });
});

router.get("/products/new", authorize, (req, res) => {
    res.render('admin/new_item');
});

router.post("/products/new", authorize, json, newProductValidationRules(), addNewProduct);
router.post("/products/new_photo", authorize, upload.single('file'), (req, res) => {
    res.status(201).json({ errors: []});
});


router.get("/products/:id", authorize, (req, res) => {
    let id: string = req.params.id;
    const productID = parseInt(id);
    if (isNaN(productID)) {
        res.status(400).send('Invalid product ID');
        return;
    }
    const product = getProductbyID(productID);
    if (!product) {
        res.status(404).send('Product not found');
        return;
    }

    res.render('admin/show_item', { product: product });
});

router.get("/products/edit/:id", authorize, (req, res) => {
    let id: string = req.params.id;
    const productID = parseInt(id);
    if (isNaN(productID)) {
        res.status(400).send('Invalid product ID');
        return;
    }
    const product = getProductbyID(productID);
    if (!product) {
        res.status(404).send('Product not found');
        return;
    }
    res.render('admin/edit_item', { product: product });
});

router.get("/products/delete/:id", authorize, (req, res) => {
    let id: string = req.params.id;
    const productID = parseInt(id);
    if (isNaN(productID)) {
        res.status(400).send('Invalid product ID');
        return;
    }
    deleteProduct(productID);
    res.redirect('/admin/products');
});

router.post('/products/edit/:id', authorize, json, newProductValidationRules(), editProduct);


module.exports = router 