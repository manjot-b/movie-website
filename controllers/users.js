exports.login_post = (req, res) => {
    var user = { username: req.body.username, password: req.body.password}
    req.session.user = user;
    res.redirect('/users/dashboard');
};

exports.dashboard_get = (req, res) => {
    if (!req.session.user) {
        res.status(401).send('Access Denied.');
    }

    // return res.status(200).send("username: " + req.session.user.username + 
    // " password: " + req.session.user.password);

    res.status(200).render('dashboard');
};