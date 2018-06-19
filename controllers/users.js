var user = require('../sessions/user');

exports.login_post = (req, res) => {
    user.username = req.body.username;
    user.password = req.body.password;

    req.session.user = user;
    res.redirect('/users/dashboard');
};

exports.dashboard_get = (req, res) => {
    if (!req.session.user) {
        res.status(401).send('Access Denied.');
    }

    // return res.status(200).send("username: " + req.session.user.username + 
    // " password: " + req.session.user.password);
    console.log(req.session.user);
    res.status(200).render('dashboard', {username: req.session.user.username});
};

exports.login_get = (req, res) => {
    res.redirect('http://localhost:3000');
};

exports.signup_get = (req, res) => {
    res.render('signup', {errors: []});
};

exports.signup_post = (req, res) => {
    // check to see if email and username is already in use
    errors = [];

    if (req.body.firstName.length < 1) {
        errors.push("Enter in first name");
    }
    if (req.body.lastName.length < 1) {
        errors.push("Enter in last name");
    }
    if (req.body.email.length < 1) {
        errors.push("Enter in email");
    }
    if (req.body.username.length < 1) {
        errors.push("Enter in username");
    }
    if (req.body.password.length < 1) {
        errors.push("Enter in password");
    }

    if (errors.length > 0) {
        res.render('signup', { errors: errors });
    }

    user.username = req.body.username;
    user.password = req.body.password;

    req.session.user = user;
    res.render('dashboard', { username: user.username })
};