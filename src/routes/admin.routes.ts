import express from 'express';
const router = express.Router();


router.get('/', (req, res) => {
    //for examle purpose
    res.render('admin/landing_page');
});

router.get('/users', (req, res) => {
    //for examle purpose
    res.render('admin/list_of_users');
});
router.get('/user/:id', (req, res) => {
    //for examle purpose
    res.render('admin/user');
});
router.get('/admin/orders', (req, res) => {
    //for examle purpose
    res.render('admin/orders');
});

router.get("/orders/:id",(req, res) => {
    let id:string = req.params.id;
    //for example purpose
    res.render('admin/oneorder');
});

router.get('/products', (req, res) => {
    //for examle purpose
    res.render('admin/store_resources');
});

router.get("/products/new",(req, res) => {
    res.render('admin/new_item');
});

router.get("/products/:id",(req, res) => {
    let id:string = req.params.id;
    //for example purpose
    res.render('admin/show_item');
});

router.get("/products/edit/:id",(req, res) => {
    let id:string = req.params.id;
    //for example purpose
    res.render('admin/edit_item');
});
module.exports = router 