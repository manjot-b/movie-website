exports.movie_get = (req, res) => {
    res.render('media', { title: req.params.name } );
};

exports.search_post = (req, res) => {
    var words = req.body.catalogSearchBox.split(' ');
    var query = "";

    words.forEach(word => {
        query += word + '+';
    });

    res.redirect('search?search=' + query)
}

exports.search_get = (req, res) => {
    if (!req.query.search) {    // not seaching for something
        res.render('search', { title: "Search" } );
    }

    res.render('search', {
        title: "Search",
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
