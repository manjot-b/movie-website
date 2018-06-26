var Sequelize = require('../sequelize/sequelize.js');
var async = require('async');

exports.media_get = (req, res) => {
    console.log('admin controller');
    if(!req.session.user) {
        res.redirect('http://localhost:3000');
    }
    else if (!req.session.user.isAdmin) {
        res.status(401).send("You don't have the required privileges");
    }

    res.redirect('/admin/media/add');
};

exports.media_add_get = (req, res) => {
    res.render('admin_media_add', {
        title: 'Add Movie',
        isAdmin: req.session.user.isAdmin,
        errors: []
    });
}

exports.media_add_post = (req, res) => {
    var tempMedia = {
        title: req.body.title,
        year: req.body.year,
        description: req.body.description,
        director: req.body.director,
        cast: req.body.cast,
        type: req.body.mediaType    // can be 'movie' or 'tv'
    }

    errors = [];

    if (req.body.title.length < 1) {
        errors.push("Enter in title");
    }
    if (req.body.year.length < 1) {
        errors.push("Enter in year");
    }
    if (req.body.description.length < 1) {
        errors.push("Enter in description");
    }
    if (req.body.director.length < 1) {
        errors.push("Enter in director/creator");
    }
    if (req.body.cast.length < 1) {
        errors.push("Enter in cast");
    }
    if (req.body.genre.length < 1) {
        errors.push("Enter in genre");
    }


    if(req.body.title.length > 0 && req.body.year.length > 0 && 
        req.body.description.length > 0 && req.body.director.length > 0 
        && req.body.cast.length > 0 && req.body.genre.length > 0)
    {
        Sequelize.query('INSERT INTO media (name, year, description, admin_un_added) '+
        'VALUES (:title, :year, :description, :admin) ', 
        {type:Sequelize.QueryTypes.INSERT,
            replacements: {
                title: req.body.title,
                year: req.body.year,
                description: req.body.description,
                admin: req.session.user.username
                }
        }).then(
            () =>{
                Sequelize.query('SELECT id FROM media ' +
                'WHERE name = :title AND year = :year AND description = :description',
                {type: Sequelize.QueryTypes.SELECT,
                    replacements: {
                    title: req.body.title,
                    year: req.body.year,
                    description: req.body.description
                    }
                }).then(
                    rows => {
                            console.log(rows);
                            if (typeof req.body.cast != 'undefined') {
                                var words = req.body.cast.split(',');
                                console.log(words);
                                words.forEach(word =>{
                                    Sequelize.query("INSERT INTO `cast` (name) VALUES (:word)", {
                                        type: Sequelize.QueryTypes.INSERT,
                                        replacements: {
                                            word: word
                                        }
                                        }).then(
                                            ()=> {
                                                Sequelize.query('SELECT id FROM `cast` ' +
                                                'WHERE name = :word', {
                                                    type: Sequelize.QueryTypes.SELECT,
                                                    replacements: {
                                                        word: word
                                                    }
                                                }).then(
                                                    castRows =>{
                                                        Sequelize.query('INSERT INTO media_cast (media_id, cast_id) ' +
                                                        'VALUES (:mediaID, :castID)' , {
                                                            type: Sequelize.QueryTypes.INSERT,
                                                            replacements: {
                                                                mediaID:rows[0].id,
                                                                castID: castRows[0].id
                                                                }   
                                                        }) 
                                                    }
                                                )
                                            }
                                        )
                                })
                            }
                            if (typeof req.body.genre != 'undefined') {
                                var words = req.body.genre.split(',');
                                console.log(words);
                                words.forEach(word =>{
                                    Sequelize.query("INSERT INTO genre (name) VALUES (:word)", {
                                        type: Sequelize.QueryTypes.INSERT,
                                        replacements: {
                                            word: word
                                        }
                                        }).then(
                                            ()=> {
                                                Sequelize.query('SELECT id FROM genre ' +
                                                'WHERE name = :word', {
                                                    type: Sequelize.QueryTypes.SELECT,
                                                    replacements: {
                                                        word: word
                                                    }
                                                }).then(
                                                    genreRows =>{
                                                        Sequelize.query('INSERT INTO media_genre (media_id, genre_id) ' +
                                                        'VALUES (:mediaID, :genreID)' , {
                                                            type: Sequelize.QueryTypes.INSERT,
                                                            replacements: {
                                                                mediaID:rows[0].id,
                                                                genreID: genreRows[0].id
                                                                }   
                                                        }) 
                                                    }
                                                )
                                            }
                                        )
                                })
                            }
                            if(req.body.mediaType == 'movie')
                            {
                                Sequelize.query('INSERT INTO movie (movie_media_id, director) '+
                                'VALUES (:id, :director) ', 
                                {type:Sequelize.QueryTypes.INSERT,
                                    replacements: {
                                    id: rows[0].id,
                                    director: req.body.director
                                    }   
                                }).then(
                                    res.render('admin_media_add', {
                                        title: 'Add Movie',
                                        isAdmin: true,
                                        success: true,
                                        errors: errors
                                     })
                                )      
                            }
                            else
                            {
                                Sequelize.query('INSERT INTO tv_show (show_media_id, creator) '+
                                'VALUES (:id, :creator) ', 
                                {type:Sequelize.QueryTypes.INSERT,
                                    replacements: {
                                    id: rows[0].id,
                                    creator: req.body.director
                                    }   
                                }).then(
                                    res.render('admin_media_add', {
                                        title: 'Add Movie',
                                        isAdmin: true,
                                        success: true,
                                        errors: errors
                                    })
                                )
                            }
                    })
                }
            )
           
    }
    else{
        res.render('admin_media_add', {
            title: 'Add Movie',
            isAdmin: true,
            success: false,
            errors: errors
            })
    }
}

exports.media_edit_get = (req, res) => {
    searchResults = [];
    if (req.query.search) {
        Sequelize.query("SELECT * FROM media " +
        "WHERE name LIKE :searchTitle" , {
            type:Sequelize.QueryTypes.SELECT,
            replacements: {
            searchTitle: "%" + req.query.search + "%",
            }   
        }).then(rows=> {
            console.log(rows);
            searchResults = [];
            rows.forEach(row => {
                var media = {
                    title: row.name,
                    year: row.year,
                    description: row.description,
                    id: row.id
                }
                searchResults.push(media);
            })
            res.render('admin_media_edit', {
                title: "Search",
                isAdmin: req.session.user.isAdmin,
                searchResults:searchResults})
        })
    }

    else if (req.query.id) { // editing a specific movie
        Sequelize.query('SELECT * FROM media ' +
        'WHERE id = :selectedID', {
            type: Sequelize.QueryTypes.SELECT,
                replacements: {
                selectedID: req.query.id
                }
            }).then(
                rows => {
                    console.log(rows);
                    var tempMovie = {
                        title: rows[0].name,
                        year: rows[0].year,
                        description: rows[0].description,
                        id: req.query.id
                    };
                    res.render('admin_media_edit', {
                        title: "Edit",
                        isAdmin: true,
                        movieData: tempMovie,
                    })
                }
            )
    }

    if(!req.query.id && !req.query.search){
        // not searching and not editing a movie
        res.render('admin_media_edit', { 
            title: "Search",
            isAdmin: true 
        });    
    }   
}

exports.media_edit_post = (req, res) => {
    if(!req.query.id) {   // searching for results if id not defined
        var words = req.body.catalogSearchBox.split(' ');
        var query = "";

        for(var i=0; i<words.length; i++) {
            if (i == words.length - 1) {
                query += words;
                break; 
            }
            query += words + '+';
        }

        res.redirect('?search=' + query)
    }

    errors = [];

    if (req.body.title.length < 1) {
        errors.push("Enter in title");
    }
    if (req.body.year.length < 1) {
        errors.push("Enter in year");
    }
    if (req.body.description.length < 1) {
        errors.push("Enter in description");
    }
    

    if(req.body.title.length > 0 && req.body.year.length > 0 && 
        req.body.description.length > 0){
            Sequelize.query('UPDATE media ' +
            'SET name = :newTitle, year = :newYear, description = :newDescription ' +
            'WHERE id = :selectedID' , {
                type:Sequelize.QueryTypes.UPDATE,
                replacements: {
                    newTitle: req.body.title,
                    newYear: req.body.year,
                    newDescription: req.body.description,
                    selectedID: req.query.id
            }}).then(
                () => {
                    Sequelize.query('SELECT * FROM media ' +
                    'WHERE id = :selectedID', {
                        type: Sequelize.QueryTypes.SELECT,
                        replacements: {
                            selectedID: req.query.id
                        }
                    }).then(
                        rows => {
                            var tempMovie = {
                                title: rows[0].name,
                                year: rows[0].year,
                                description: rows[0].description,
                                id: req.query.id
                            };
                            res.render('admin_media_edit', {
                                title: "Edit",
                                isAdmin: true,
                                movieData: tempMovie,
                                success: true,
                            })
                        }
                    )
                }

            )
        }
        else{
            Sequelize.query('SELECT * FROM media ' +
            'WHERE id = :selectedID', {
                type: Sequelize.QueryTypes.SELECT,
                replacements: {
                    selectedID: req.query.id
                }
            }).then(
                rows => {
                    var tempMovie = {
                        title: rows[0].name,
                        year: rows[0].year,
                        description: rows[0].description,
                        id: req.query.id
                    };
                    res.render('admin_media_edit', {
                        title: "Edit",
                        isAdmin: true,
                        movieData: tempMovie,
                        success: false,
                        errors:errors
                    })
                }
            )
        }

}

exports.media_delete_post = (req, res) => {
    if(!req.query.id) {   // searching for results if id not defined
        var words = req.body.catalogSearchBox.split(' ');
        var query = "";

        for(var i=0; i<words.length; i++) {
            if (i == words.length - 1) {
                query += words;
                break; 
            }
            query += words + '+';
        }

        res.redirect('?search=' + query)
    }
}

exports.media_delete_get = (req, res) => {
    searchResults = [];
    if (!req.query.search && !req.query.id) {
        res.render('admin_media_delete', {
            title: 'Delete Movie',
            isAdmin: true,
        });
    }

    if (req.query.search) { // if searching for some value
        Sequelize.query("SELECT * FROM media " +
        "WHERE name LIKE :searchTitle" , {
            type:Sequelize.QueryTypes.SELECT,
            replacements: {
            searchTitle: "%" + req.query.search + "%",
            }   
        }).then(rows=> {
            console.log(rows);
            searchResults = [];
            rows.forEach(row => {
                var media = {
                    title: row.name,
                    year: row.year,
                    rating: row.avg_rating,
                    id: row.id
                }
                searchResults.push(media);
            })
            res.render('admin_media_delete', 
                {title: "Search", isAdmin: req.session.user.isAdmin,
                searchResults: searchResults})
        });
    }
    
    if (req.query.id) { // if deleting some movie
                        // might be easier to just say the movie was deleted
                        // instead of displaying updated movies
        Sequelize.query('DELETE FROM media ' +
        'WHERE id = :resultID', {
            type: Sequelize.QueryTypes.DELETE,
            replacements: {
                resultID: req.query.id 
                }
            }
        ).then(
            res.render('admin_media_delete', {
                title: "Search",
                isAdmin: req.session.user.isAdmin,
                success: true,
                searchResults: searchResults
            })
        )
    }
}

exports.media_tvshow_get = (req, res) => {
    res.redirect('/admin/media/tv_show/add')
}

exports.users_get = (req, res) => {
    res.send("Have not yet implemented admin users");
}