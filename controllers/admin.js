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
    res.render('admin_media_add', {
        title: 'Add Movie',
        isAdmin: req.session.user.isAdmin
    });
}

exports.media_movie_add_post = (req, res) => {
    var tempMedia = {
        title: req.body.title,
        year: req.body.year,
        description: req.body.description,
        director: req.body.director,
        type: req.body.mediaType    // can be 'movie' or 'tv'
    }
    console.log(tempMovie);
    res.render('admin_media_add', {
        title: 'Add Movie',
        isAdmin: true,
        success: true
    })
}

exports.media_movie_edit_get = (req, res) => {
    if (req.query.search) {
        res.render('admin_media_edit', {
            title: "Search",
            isAdmin: req.session.user.isAdmin,

            // example data
            searchResults: [{
                title: 'Spiderman',
                year: 2017,
                rating: 10,
                id: 'asj12321'
            },
            {
                title: 'Hulk',
                year: 2017,
                rating: 10,
                id: 'asj12321'
            },
            {
                title: 'Friends',
                year: 2017,
                rating: 8,
                id: 'asj12321'
            },
            {
                title: 'Game of Thrones',
                year: 2010,
                rating: 9.7,
                id: 'asj12321'
            }
        ]
        });
    }

    var tempMovie = {
        title: 'Spiderman',
        year: 2017,
        description: 'Local spider swings from webs',
        id: 'asj12321'
    };

    if (req.query.id) { // editing a specific movie
        res.render('admin_media_edit', {
            title: "Edit",
            isAdmin: true,
            movieData: tempMovie
        })
    }

    // not searching and not editing a movie
    res.render('admin_media_edit', { 
        title: "Search",
        isAdmin: true 
    });
        
}

exports.media_movie_edit_post = (req, res) => {
    if(!req.query.id) {   // searching for results if id not defined
        var words = req.body.catalogSearchBox.split(' ');
        var query = "";

        words.forEach(word => {
            query += word + '+';
        });

        res.redirect('?search=' + query)
    }
    
    
    // else editing a specific movie    
    var tempMovie = {
        title: 'Spiderman',
        year: 2017,
        description: 'Local spider swings from webs',
        id: 'asj12321'
    };
    res.render('admin_media_edit', {
        title: "Edit",
        isAdmin: true,
        movieData: tempMovie,
        success: true
    })
}

exports.media_movie_delete_post = (req, res) => {
    if(!req.query.id) {   // searching for results if id not defined
        var words = req.body.catalogSearchBox.split(' ');
        var query = "";

        words.forEach(word => {
            query += word + '+';
        });

        res.redirect('?search=' + query)
    }
}

exports.media_movie_delete_get = (req, res) => {
    if (req.query.search) { // if searching for some value
        res.render('admin_media_delete', {
            title: "Search",
            isAdmin: req.session.user.isAdmin,

            // example data
            searchResults: [{
                title: 'Spiderman',
                year: 2017,
                rating: 10,
                id: 'asj12321'
            },
            {
                title: 'Hulk',
                year: 2017,
                rating: 10,
                id: 'asj12321'
            },
            {
                title: 'Friends',
                year: 2017,
                rating: 8,
                id: 'asj12321'
            },
            {
                title: 'Game of Thrones',
                year: 2010,
                rating: 9.7,
                id: 'asj12321'
            }
        ]
        });
    }
    
    if (req.query.id) { // if deleting some movie
                        // might be easier to just say the movie was deleted
                        // instead of displaying updated movies
        res.render('admin_media_delete', {
            title: "Search",
            isAdmin: req.session.user.isAdmin,
            success: true
        });
    }

    res.render('admin_media_delete', {
        title: 'Delete Movie',
        isAdmin: true
    });
}

exports.media_tvshow_get = (req, res) => {
    res.redirect('/admin/media/tv_show/add')
}

exports.media_tvshow_add_get = (req, res) => {
    res.render('admin_tvshow_add', {
        title: 'Add TV Show',
        isAdmin: req.session.user.isAdmin
    });
}

exports.users_get = (req, res) => {
    res.send("Have not yet implemented admin users");
}