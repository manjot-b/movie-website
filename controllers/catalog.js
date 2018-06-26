var Sequelize = require('../sequelize/sequelize.js');

exports.movie_get = (req, res) => {
    res.render('media', { title: req.params.name } );
};

exports.search_post = (req, res) => {
    //var words = req.body.catalogSearchBox.split(' ');
   // var query = "";

    //words.forEach(word => {
   //     query += word + '+';
   // });

   if (typeof req.body.catalogSearchBox != 'undefined') {
    var words = req.body.catalogSearchBox.split(' ');
    var query = "";

    for(var i=0; i<words.length; i++) {
        if (i == words.length - 1) {
            query += words;
            break; 
        }
        query += words + '+';
    }

        res.redirect('search?search=' + query)
    }
}

exports.search_get = (req, res) => {
    if (!req.query.search) {    // not seaching for something
        res.render('search', { title: "Search" } );
    }

    Sequelize.query('SELECT * FROM media ' +
    'WHERE name LIKE :searchedTitle', {
        type: Sequelize.QueryTypes.SELECT,
        replacements: {
            searchedTitle: "%" + req.query.search + "%"
        }
    }).then(rows=> {
        console.log(rows);
        results = [];
        rows.forEach(row => {
            results.push(row.name);
        });
        res.render('search', {title: "Search", searchMediaResults: results});
    });
    /*
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
    });*/
}
