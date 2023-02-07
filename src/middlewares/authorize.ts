function authorize(req, res, next) {
    console.log(req.session.logged)
    if (req.session.logged === true) {
        req.logged = true;
        req.user = req.session.user
    next();
    } else {
    res.redirect('/login');
    }
}

export default authorize;