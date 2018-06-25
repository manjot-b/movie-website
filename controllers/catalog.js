var Sequelize = require('../sequelize/sequelize.js');
var async = require('async');

exports.media_get = (req, res) => {
    Sequelize.query("SELECT * FROM media WHERE id = :id", {
        type:Sequelize.QueryTypes.SELECT,
        replacements: {
        id: req.params.id
    }
    }).then(rows => {
        async.parallel({
            movieData: (callback) => {
                Sequelize.query("SELECT * FROM media, movie WHERE id = movie_media_id " + 
                    "AND id = :movieId", { 
                    type: Sequelize.QueryTypes.SELECT, 
                    replacements: {
                        movieId: rows[0].id
                    }
                }).then(rows => {
                    if(rows.length > 0) {
                        callback(null, {
                            media: rows[0],
                            isMovie: true
                        });
                    } 
                    else {
                        callback(null, { isMovie: false });
                    }
                });
            },

            tvShowData: (callback) => {
                Sequelize.query("SELECT * FROM media, tv_show WHERE id = show_media_id " +
                    "AND id = :tvShowId", { 
                    type: Sequelize.QueryTypes.SELECT, 
                    replacements: {
                        tvShowId: rows[0].id                        
                    }
                } ).then(rows => {
                    if(rows.length > 0) {
                        callback(null, {
                            media: rows[0],
                            isTVShow: true
                        });
                    } 
                    else {
                        callback(null, { isTVShow: false });
                    }
                });
            },

            cast: (callback) => {
                Sequelize.query("SELECT cast.name FROM media, media_cast, cast " + 
                    "WHERE media.id = media_cast.media_id AND media_cast.cast_id = cast.id " +
                    "AND media.id = :mediaId", { 
                    type: Sequelize.QueryTypes.SELECT, 
                    replacements: {
                        mediaId: rows[0].id                        
                    }
                } ).then(rows => {
                    var cast = "";
                    for(var i = 0; i < rows.length; i++) {
                        if (i == rows.length - 1) {
                            cast += rows[i].name;
                        }
                        else {
                            cast += rows[i].name + ", ";
                        }
                    }
                    callback(null, cast);
                });
            }
        }, (err, results) => {
            if (results.movieData.isMovie) {
                console.log(results.movieData.media.director);
                res.render('media', {
                    title: results.movieData.media.name,
                    media: results.movieData.media,
                    isMovie: true,
                    cast: results.cast
                });
            }
            else {
                res.render('media', {
                    title: results.tvShowData.media.name,
                    media: results.tvShowData.media,
                    isMovie: false,
                    cast: results.cast
                });
            }
        });
        // res.render('media', {
        //     media: rows[0]
        // })
    });

    // res.render('media', { title: req.params.id } );
};

exports.search_post = (req, res) => {
    var words = req.body.catalogSearchBox.split(' ');
    var query = "";

    for(var i = 0; i < words.length; i++) {
        if (i == words.length - 1) {
            query += words[i];
        }
        else {
            query += words[i] + '+';
        }
    }
    res.redirect('search?search=' + query)
}

exports.search_get = (req, res) => {
    if (!req.query.search) {    // not seaching for something
        res.render('search', { title: "Search" } );
    }

    Sequelize.query("SELECT * FROM media WHERE name LIKE :searchTerm ", {
            type:Sequelize.QueryTypes.SELECT,
            replacements: {
            searchTerm: "%" + req.query.search + "%"
        }
        }).then(rows => {
            res.render('search', {
                title: "Search",
                searchResults: rows
            });

        });

    // res.render('search', {
    //     title: "Search",
    //     // example data
    //     searchResults: [{
    //         title: 'Spiderman',
    //         year: 2017,
    //         rating: 10,
    //         id: 'asj12321'
    //     },
    //     {
    //         title: 'Hulk',
    //         year: 2017,
    //         rating: 10,
    //         id: 'asj12321'
    //     },
    //     {
    //         title: 'Friends',
    //         year: 2017,
    //         rating: 8,
    //         id: 'asj12321'
    //     },
    //     {
    //         title: 'Game of Thrones',
    //         year: 2010,
    //         rating: 9.7,
    //         id: 'asj12321'
    //     }
    // ]
    // });
}
