exports.movie_get = (req, res) => {
    res.render('media', { title: req.params.name } );
};