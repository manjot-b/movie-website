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

    //test values for activities
    var micopost = {username:"Mico", type:"review", movie:"Avengers"};
    var manjotpost = {username:"Manjot", type:"added", movie:"Spider-Man", list:"Movies to watch"};
    var jonapost = {username:"Jona", type:"review", movie:"Riverdale"};
    var activities = [micopost, manjotpost, jonapost];
    res.status(200).render('dashboard', {activities: activities});
};