exports.media_get = (req, res) => {
    if(!req.session.user) {
        res.redirect('http://localhost:3000');
    }
    else if (!req.session.user.isAdmin) {
        res.status(401).send("You don't have the required privileges");
    }

    res.redirect('/admin/media/movie/add');
};

exports.media_movie_get = (req, res) => {
    res.redirect('/admin/media/movie/add')
}

exports.media_movie_add_get = (req, res) => {
    res.render('admin_movie_add', {
        title: 'Add Media',
        isAdmin: req.session.user.isAdmin
    });
}

exports.media_tvshow_get = (req, res) => {
    res.redirect('/admin/media/tv_show/add')
}

exports.media_tvshow_add_get = (req, res) => {
    res.render('admin_tvshow_add', {
        title: 'Add Media',
        isAdmin: req.session.user.isAdmin
    });
}

exports.users_get = (req, res) => {
    res.send("Have not yet implemented admin users");
}