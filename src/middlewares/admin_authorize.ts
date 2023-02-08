function authorize(req, res, next) {
    try{
        if (req.session.admin === true) {
        next();
        } else {
        res.redirect('/admin/login');
        }

    }
    catch{
        res.redirect('/admin/login');
    }
}

export default authorize;