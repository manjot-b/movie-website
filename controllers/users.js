var user = require('../sessions/user');

//TEST CODE -----------------------------------------
//test code for recent activities
var micopost = {username:"Mico", type:"review", movie:"Avengers"};
var manjotpost = {username:"Manjot", type:"added", movie:"Spider-Man", list:"Movies to watch"};
var jonapost = {username:"Jona", type:"review", movie:"Riverdale"};
var activities = [micopost, manjotpost, jonapost];

//test code for friends
var mico = {name:"Mico", username:"mic0t"};
var jona = {name:"Jona", username:"jonamik_"};
var manjot = {name:"Manjot", username:"manjotispogi"};
var friends = [mico, manjot, jona];

//test code for media lists
var avengers = {name:"Avengers", year:"2012", type:"Movie", link: null};
var riverdale = {name:"Riverdale", year:"2017", type:"TV Show", link: null};
var jane = {name:"Jane the Virgin", year:"2014", type:"TV Show", link: null};


var media_list1 = {name:"Love me my soapys", media:[avengers, riverdale, jane]};
var media_list2 = {name:"I <3 Jane", media:[jane]};
var media_list = [media_list1, media_list2];

/*for (list in media_list) {
    for (medialist in list.media) {
        for (media in medialist.media) {
            var temp = media.name;
            var prefix = "http://localhost:3000/catalog/movie/"
            var ext = temp.replace(/ /g, "-");
            var newlink = prefix.concat(ext);
            media.link = newlink;

        }
    }
}*/
//-----------------------------------------------
exports.login_post = (req, res) => {
    user.username = req.body.username;
    user.password = req.body.password;

    req.session.user = user;
    res.redirect('/users/dashboard');
};

exports.dashboard_get = (req, res) => {
    if (!req.session.user) {
        res.status(401).send('Access Denied.');
    }
        
    res.status(200).render('dashboard', {
        title: 'Welcome ' + req.session.user.username + '!',    
        activities: activities, 
        username: req.session.user.username
    });
};

exports.login_get = (req, res) => {
    res.redirect('http://localhost:3000');
};

exports.signup_get = (req, res) => {
    res.render('signup', {errors: []});
};

exports.signup_post = (req, res) => {
    // check to see if email and username is already in use
    errors = [];

    if (req.body.firstName.length < 1) {
        errors.push("Enter in first name");
    }
    if (req.body.lastName.length < 1) {
        errors.push("Enter in last name");
    }
    if (req.body.email.length < 1) {
        errors.push("Enter in email");
    }
    if (req.body.username.length < 1) {
        errors.push("Enter in username");
    }
    if (req.body.password.length < 1) {
        errors.push("Enter in password");
    }

    if (errors.length > 0) {
        res.render('signup', { errors: errors });
    }

    user.username = req.body.username;
    user.password = req.body.password;

    req.session.user = user;
    res.render('dashboard', { 
        activities: activities, 
        username: user.username 
    })
};

exports.friends_get = (req, res) => {

    if (!req.session.user) {
        res.status(401).send('Friends list not available at the moment.');
    };
    res.status(200).render('friends', { 
        username: req.session.user.username, friends: friends
});

}

exports.friends_post = (req, res) => {
    console.log(req.body.frienduser);
    if (mico.username === req.body.frienduser) {
        console.log('hello');
    }
    res.render('friends', {username: req.session.user.username, friends: friends
});

}


exports.search_post = (req, res) => {
    var words = req.body.userSearchBox.split(' ');
    var query = "";

    words.forEach(word => {
        query += word + '+';
    });

    res.redirect('search?search1=' + query)
}

exports.search_get = (req, res) => {
    if (!req.query.search1) {    // not seaching for something
        res.render('friends', { title: "Search111", friends: friends });
    }

    res.render('friends', {
        title: "Search",
        // example data
        searchUserResults: [{
            first_name: 'Mico',
            last_name: 'Tran',
            username: mico.username,
            id: 'asj12321'
        },
        {
            first_name: 'Jona',
            last_name: 'Grageda',
            username: jona.username,
            id: 'asj12321'
        },
        {
            first_name: 'Manjot',
            last_name: 'Bal',
            username: manjot.username,
            id: 'asj12321'
        }], search: req.query.search1
    });
}

exports.my_media_get = (req, res) => {

    if (!req.session.user) {
        res.status(401).send('Media lists not available at the moment.');
    };
    res.status(200).render('my_media', { 
        username: req.session.user.username, media_list: media_list
});
}

exports.my_media_post = (req, res) => {
    console.log(req.body.new_list_name);

    //adding a media list and displaying it on page 
    if (typeof req.body.new_list_name != "undefined")
    {
        var newList = {name:req.body.new_list_name, media:[avengers, jane]}
        media_list.push(newList);
    };

    //removing a media list
    if (typeof req.body.removedList != "undefined")
    {
        console.log("Success, removed list: "+ req.body.removedList);
    };

    //delete media from list here
    //use req.body.remMed_list for media list of removed media
    //use req.body.removedMedia for media to be removed 


    res.render('my_media', { 
        username: req.session.user.username, media_list: media_list
});
}

exports.profile_get = (req, res) => {
    errors = [];
    if (!req.session.user) {
        res.status(401).send('Profile not available at the moment.');
    };
        
    res.status(200).render('profile', {
            activities: activities, 
            username: req.session.user.username,
            media_list
    });

};

exports.profile_post = (req, res) => {

    errors = [];

    if (!req.body.firstName.length < 1) {
        errors.push("Update first name");
    }
    if (!req.body.lastName.length < 1) {
        errors.push("Update in last name");
    }
    if (!req.body.email.length < 1) {
        errors.push("Email not valid or unique");
    }
    if (!req.body.password.length < 1) {
        errors.push("Update password");
    }

    if (errors.length > 0) {
        res.render('edit_profile', { errors: errors });
    }
        
    res.status(200).render('profile', {
            activities: activities, 
            username: req.session.user.username,
            media_list
    });

};

exports.editprofile_post = (req, res) => {
    res.render('edit_profile')
};

exports.editprofile_get = (req, res) => {
    res.render('edit_profile')
    
};

