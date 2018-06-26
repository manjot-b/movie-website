exports.logout_post = (req, res) => {
    req.session.user.isAdmin = null;
    req.session.user = null;
    

    res.redirect("/");
   
};