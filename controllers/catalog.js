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
            },

            reviews: (callback) => {
                var reviewList = [];

                Sequelize.query("SELECT * FROM review, people WHERE review_username = username " + 
                    "AND review_media_id = :mediaId", {
                    type: Sequelize.QueryTypes.SELECT,
                    replacements: {
                        mediaId: req.params.id
                    }
                }).then(rows => {                    
                    async.each(rows, (row, callback) => {
                        Sequelize.query("SELECT * FROM comment, review WHERE review_id = review.id " + 
                            "AND review.id = :id", {
                            type: Sequelize.QueryTypes.SELECT,
                            replacements: {
                                id: row.id
                            }
                        }).then(comments => {
                            reviewList.push({
                                review: row,
                                comments: comments
                            });
                            callback();
                        });
                    }, (err) => {
                        callback(null, reviewList);
                        // reviewList.forEach(r => {
                        //     callback(null, reviewList);
                        // })
                    });
                })
            },

            userLists: (callback) => {
                var userLists = [];

                Sequelize.query("SELECT name FROM media_list WHERE user_username = :username", {
                    type: Sequelize.QueryTypes.SELECT,
                    replacements: {
                        username: req.session.user.username
                    }
                }).then(rows => {
                    rows.forEach(row => {
                        userLists.push(row.name);
                    });
                    callback(null, userLists);
                })
            }
        }, (err, results) => {
            if (results.movieData.isMovie) {
                res.render('media', {
                    title: results.movieData.media.name,
                    media: results.movieData.media,
                    isMovie: true,
                    cast: results.cast,
                    reviews: results.reviews,
                    userLists: results.userLists
                });
            }
            else {
                res.render('media', {
                    title: results.tvShowData.media.name,
                    media: results.tvShowData.media,
                    isMovie: false,
                    cast: results.cast,
                    reviews: results.reviews,
                    userLists: results.userLists
                });
            }
        });
    });

};

exports.media_post = (req, res) => {
    if (!req.session.user) {
        res.redirect("http://localhost:3000");
    }

    else if(req.body.comment) {
        Sequelize.query("INSERT INTO comment " + 
            "(date_created, comment_text, review_id, username_comment) " +
            "VALUES (CURRENT_TIMESTAMP(), :text, :reviewId, :username)", {
                type: Sequelize.QueryTypes.INSERT,
                replacements: {
                    text: req.body.comment,
                    reviewId: req.body.reviewId,
                    username: req.session.user.username
                }
            }).then( () => {
                res.redirect("/catalog/"+req.params.id);
            })
    }

    else if (req.body.userList) {
        Sequelize.query("INSERT INTO contains " + 
            "(list_name, list_username, list_media_id) " +
            "VALUES (:listName, :username, :mediaId)", {
                type: Sequelize.QueryTypes.INSERT,
                replacements: {
                    listName: req.body.userList,
                    username: req.session.user.username,
                    mediaId: req.params.id
                }
            }).then( () => {
                res.redirect("/catalog/"+req.params.id);
            })
    }

    else if (req.body.rating) {
        async.waterfall([
            (callback) => {
                Sequelize.query("SELECT * FROM review WHERE review_media_id = :mediaId " + 
                    "AND review_username = :username", {
                    type: Sequelize.QueryTypes.SELECT,
                    replacements: {
                        mediaId: req.params.id,
                        username: req.session.user.username
                }
            }).then(rows => {
                if (rows.length > 0) {
                    callback(req.session.user.username + " already reviewed this media")
                }
                else {
                    callback(null)
                }
            })
            },

            (callback) => {
                Sequelize.query("SELECT avg_rating FROM media WHERE id = :id", {
                    type: Sequelize.QueryTypes.SELECT,
                    replacements: {
                        id: req.params.id
                    }
                }).then(rows => {
                    callback(null, rows[0].avg_rating)
                })
            },

            (avgRating, callback) => {
                if (!avgRating) {
                    callback(null, req.body.rating);
                }
                else {  // average rating is not null/0
                    Sequelize.query("SELECT COUNT(*) AS count, SUM(rating) AS sumRating FROM media, review " + 
                        "WHERE media.id = review.review_media_id", {
                        type: Sequelize.QueryTypes.SELECT
                    }).then(rows => {
                        var count = parseFloat(rows[0].count);
                        var sumRating = parseFloat(rows[0].sumRating);
                        var avgRating = (sumRating + parseInt(req.body.rating)) / ++count;    // convert to numbers
                        callback(null, avgRating);
                    })
                }
            },

            (avgRating, callback) => {
                Sequelize.query("UPDATE media SET avg_rating = :avgRating WHERE id = :id", {
                    type: Sequelize.QueryTypes.UPDATE,
                    replacements: {
                        avgRating: avgRating,
                        id: req.params.id
                    }
                }).then( () => {
                    callback(null);
                })
            },

            (callback) => {
                Sequelize.query("INSERT INTO review (date_created, review_username, review_media_id, review_text, rating) " + 
                                    "VALUES(CURRENT_TIMESTAMP(), :username, :mediaId, :review, :rating)", {
                                    type: Sequelize.QueryTypes.INSERT,
                                    replacements: {
                                        username: req.session.user.username,
                                        mediaId: req.params.id,
                                        review: req.body.review,
                                        rating: req.body.rating
                                    }
                    }).then( () => {
                        callback(null);
                })  
            }


        ], (err, results) => {
            if(err) {
                console.log(err);
            }
            res.redirect("/catalog/"+req.params.id);
        });

    }
}

exports.search_post = (req, res) => {
    //var words = req.body.catalogSearchBox.split(' ');
   // var query = "";

    //words.forEach(word => {
   //     query += word + '+';
   // });

   if (typeof req.body.catalogSearchBox != 'undefined') {
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
