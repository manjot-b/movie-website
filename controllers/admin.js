exports.media_get = (req, res) => {
    if(!req.session.user) {
        res.redirect('http://localhost:3000');
    }
    else if (!req.session.user.isAdmin) {
        res.status(401).send("You don't have the required privileges");
    }

    res.render('admin_media', { 
        title: 'Welcome ' + req.session.user.username + '!',
        isAdmin: req.session.user.isAdmin
    });
};

exports.media_add_get = (req, res) => {
    res.render('admin_media_add', {
        title: 'Add Media',
        isAdmin: req.session.user.isAdmin
    })
}

exports.media_edit_get = (req, res) => {
    res.render('admin_media_add', {
        title: 'Edit Media',
        isAdmin: req.session.user.isAdmin
    })
}

exports.media_delete_get = (req, res) => {
    res.render('admin_media_add', {
        title: 'Delete Media',
        isAdmin: req.session.user.isAdmin
    })
}

exports.users_get = (req, res) => {
    res.send("Have not yet implemented admin users");
}