import express from 'express';
import { getAllProducts, getOrdersbyUserID, getProductbyID, getUserbyId, getOrderByID, getAllUsers, getAllOrders } from '../models/repo_demo';
const router = express.Router();
import authorize from '../middlewares/admin_authorize'
import { login_user } from '../controllers/admin_login'

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
    const ordersWIthProducts = orders.map(order => {
        const products = order.ProductIDs.map(productID => {
            return getProductbyID(productID);
        });
        if (products.some(product => !product)) {
            res.status(404).send('Product not found');
            return;
        }
        const totalPrice = products.reduce((total, product) => {
            return total + product!.Price;
        }, 0);
        return { ...order, products: products, totalPrice: totalPrice };
    });
    res.render('admin/user', { user: user, orders: ordersWIthProducts });
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
    const products = order.ProductIDs.map(id => getProductbyID(id));
    if (products.some(p => !p)) {
        res.status(500).send('Order contains invalid product ID');
        return;
    }
    const totalAmount = products.reduce((sum, p) => sum + p!.Price, 0);
    res.render('admin/oneorder', { order: order, user: user, products: products, totalAmount: totalAmount });
});

router.get('/products', authorize, (req, res) => {
    const products = getAllProducts();

    res.render('admin/store_resources', { products: products });
});

router.get("/products/new", authorize, (req, res) => {
    res.render('admin/new_item');
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
    //for example purpose
    res.render('admin/edit_item');
});
module.exports = router 