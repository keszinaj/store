function authorize(req, res, next) {
    if (req.session.logged === true) {
        req.logged = true;
        req.user = req.session.user
    next();
    } else {
        req.logged = false;
        res.redirect('/login');
    }
}

export default authorize;