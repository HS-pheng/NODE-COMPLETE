exports.getLoginPage = (req, res, next) => {
    res.render('shop/login', {
        title : "Login",
        path : "/login",
        isAuthenticated : req.session.isAuthenticated
    });  
}

exports.postLogin = (req, res, next) => {
    req.session.isAuthenticated = true;
    res.redirect('/');
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}