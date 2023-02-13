function authorize(req, res, next) {
    if (req.session.logged === true) {
        req.logged = true;
        req.user = req.session.uid
    next();
    } else {
    res.redirect('/login');
    }
}

export default authorize;