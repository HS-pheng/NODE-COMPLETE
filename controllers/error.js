exports.getErrorPage = (req, res, next) => {
    res.render('error', {title : "Error 404", path: "404"});
};
