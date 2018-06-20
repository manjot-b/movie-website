var user = require('../sessions/user');

//TEST CODE -----------------------------------------
//test code for recent activities
var micopost = {username:"Mico", type:"review", movie:"Avengers"};
var manjotpost = {username:"Manjot", type:"added", movie:"Spider-Man", list:"Movies to watch"};
var jonapost = {username:"Jona", type:"review", movie:"Riverdale"};
var activities = [micopost, manjotpost, jonapost];

//test code for friends
var mico = {name:"Mico", username:"mic0t"};
var jona = {name:"Jona", username:"jonamik_"};
var manjot = {name:"Manjot", username:"manjotispogi"};
var friends = [mico, manjot, jona];

//-----------------------------------------------
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
        
    res.status(200).render('dashboard', {
            activities: activities, 
            username: req.session.user.username
    });
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
    res.render('dashboard', { 
        activities: activities, 
        username: user.username 
    })
};

exports.friends_get = (req, res) => {

    if (!req.session.user) {
        res.status(401).send('Friends list not available at the moment.');
    };
    res.status(200).render('friends', { 
        username: req.session.user.username, friends: friends
});

} 

exports.profile_get = (req, res) => {

    if (!req.session.user) {
        res.status(401).send('Profile not available at the moment.');
    };
        
    res.status(200).render('profile', {
            activities: activities, 
            username: req.session.user.username
    });

};