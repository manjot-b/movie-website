var Sequelize = require('../sequelize/sequelize.js');
var user = require('../sessions/user');
var async = require('async');
// //TEST CODE -----------------------------------------
//test code for recent activities
var micopost = {username:"Mico", type:"review", movie:"Avengers"};
var manjotpost = {username:"Manjot", type:"added", movie:"Spider-Man", list:"Movies to watch"};
var jonapost = {username:"Jona", type:"review", movie:"Riverdale"};
var activities = [micopost, manjotpost, jonapost];

// //test code for friends
// var mico = {name:"Mico", username:"mic0t"};
// var jona = {name:"Jona", username:"jonamik_"};
// var manjot = {name:"Manjot", username:"manjotispogi"};
// var friends = [mico, manjot, jona];

// //test code for media lists
// var avengers = {name:"Avengers", year:"2012", type:"Movie", id: 1};
// var riverdale = {name:"Riverdale", year:"2017", type:"TV Show", id: 2};
// var jane = {name:"Jane the Virgin", year:"20140", type:"TV Show", id: 3};


// var media_list1 = {name:"Love me my soapys", media:[avengers, riverdale, jane]};
// var media_list2 = {name:"I <3 Jane", media:[jane]};
// var media_list = [media_list1, media_list2];

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
    Sequelize.query('SELECT * FROM (people INNER JOIN users ON username = users_username)' + 
    'WHERE username = :username AND password = :password', {
        type:Sequelize.QueryTypes.SELECT,
        replacements: {
            username: req.body.username,
            password: req.body.password
        }
    }).then(
        rows => {
            console.log(rows);
            if(rows.length == 0) {
                Sequelize.query('SELECT * FROM (people INNER JOIN admin ON username = admin_username)' + 
                        'WHERE username = :username AND password = :password', {
                    type: Sequelize.QueryTypes.SELECT,
                    replacements: {
                        username: req.body.username,
                        password: req.body.password
                    }
                }).then(rows => {
                    if (rows.length == 0) {
                        res.render('index', {
                            error: 'That username or password doesn\'t exist'
                        })
                    }
                    console.log(rows);
                    user.username = req.body.username;
                    user.password = req.body.password;
                    req.session.user = user;
                    req.session.user.isAdmin = true;
                    console.log('test');
                    res.redirect('/admin/media');
                    console.log('tset2');
                });
                
                
            }
            else {
                user.username = req.body.username;
                user.password = req.body.password;
                req.session.user = user;
                res.redirect('/users/dashboard');
            }
        }
    );
};

exports.dashboard_get = (req, res) => {
    if (!req.session.user) {
        res.status(401).send('Access Denied.');
    }

    res.status(200).render('dashboard', {
        title: 'Welcome ' + req.session.user.username + '!',    
        isAdmin: req.session.user.isAdmin,
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

    Sequelize.query('SELECT * FROM (people INNER JOIN users ON username = users_username)' + 
    'WHERE username = :username OR email = :email', {
        type:Sequelize.QueryTypes.SELECT,
        replacements: {
            username: req.body.username,
            email: req.body.email
        }
    }).then(
        rows => {
            console.log(rows);
            if(rows.length > 0) {
                console.log(rows.length);
                errors.push('That username or email already exists');
                res.render('signup', { errors: errors });
                return;
            }
            user.username = req.body.username;
            user.email = req.body.email;
            req.session.user = user;
            Sequelize.query('INSERT INTO people ' +
            'VALUES(:username, :email, :password, :first_name, :last_name)', {
                type:Sequelize.QueryTypes.INSERT,
                 replacements: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    first_name: req.body.firstName,
                    last_name: req.body.lastName
                 }
            }).then(
                () => {
                    Sequelize.query('INSERT INTO users ' +
                    'VALUES(:username)', {
                    type:Sequelize.QueryTypes.INSERT,
                    replacements: {
                        username: req.body.username,
                    }
                })
                    res.redirect('/users/dashboard');
                }
            )
        }
    )

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

//friends page
exports.friends_get = (req, res) => {
    if (!req.session.user) {
        res.status(401).send('Friends list not available at the moment.');
    };
    //gets the friends of the user 
    Sequelize.query('SELECT first_name, last_name, username FROM (people INNER JOIN (SELECT user2_username FROM friends_with ' + 
    'WHERE user1_username = :username) AS nest ON username = nest.user2_username)', {
        type:Sequelize.QueryTypes.SELECT,
        replacements: {
            username: req.session.user.username,
        }
    }).then(
        rows => {
            console.log(rows);
        friends = [];
        rows.forEach(row =>{
            friends.push(
                {name: row.first_name + ' ' + row.last_name, 
                username: row.username }
            )
        })
        res.status(200).render('friends', { 
            username: req.session.user.username, friends: friends
        })
    })
   
}; 

//executed when user clicks on remove friend button
exports.friends_post = (req, res) => {
    console.log(req.body.frienduser);
    Sequelize.query("DELETE FROM friends_with " +
        "WHERE user2_username = :removed_friend AND user1_username = :logged_in_user"  , {
            type:Sequelize.QueryTypes.DELETE,
            replacements: {
            removed_friend: req.body.frienduser,
            logged_in_user: req.session.user.username
        }
        }).then(
            
            exports.friends_get( req, res)

    );

}

//executed when searching for friend button is clicked
exports.search_post = (req, res) => {
    if (typeof req.body.userSearchBox != 'undefined') {
        var words = req.body.userSearchBox.split(' ');
        var query = "";
    
        for(var i=0; i<words.length; i++) {
            if (i == words.length - 1) {
                query += words;
                break; 
            }
            query += words + '+';
        }
        res.redirect('search?search1=' + query);    
    }

    // add friend with user if button is pressed
    if (typeof req.body.new_friend_username != 'undefined') {
        console.log('hello friends');
        Sequelize.query("INSERT INTO friends_with " +
        "VALUES(:user1, :user2)"  , {
            type:Sequelize.QueryTypes.INSERT,
            replacements: {
            user1: req.session.user.username,
            user2: req.body.new_friend_username
        }
        }).then(
            
            res.redirect("http://localhost:3000/users/friends")

        );

    }
    
}

//looks for users in database that are not user's friend
exports.search_get = (req, res) => {
    if (!req.query.search1) {    // not seaching for something
        res.render('friends', { title: "Search111", username: req.session.user.username, friends: friends });
    }
    //searches for users in database with substring of input
    Sequelize.query("SELECT * FROM (people INNER JOIN users ON username = users_username) " +
        "WHERE (username LIKE :search_term OR last_name LIKE :search_term OR first_name LIKE :search_term) " + 
        "AND (username NOT IN (SELECT T.user2_username FROM (people INNER JOIN " + 
        "(SELECT * FROM friends_with WHERE user1_username = :logged_in_user) AS T ON username = user2_username)))" , {
            type:Sequelize.QueryTypes.SELECT,
            replacements: {
            search_term: "%" + req.query.search1 + "%",
            logged_in_user: req.session.user.username
        }
        }).then(rows=> {
            console.log(rows);
            results = [];
            rows.forEach(row => {
                var user = {
                    first_name: row.first_name,
                    last_name: row.last_name,
                    username: row.users_username,
                }
                results.push(user);
            });
            res.render('friends', {title: "Search", searchUserResults: results});
        });
}

exports.my_media_get = (req, res) => {
    media_list = [];

    if (!req.session.user) {
        res.status(401).send('Media lists not available at the moment.');
    };

    Sequelize.query('SELECT name FROM media_list WHERE user_username = :username',{
        type:Sequelize.QueryTypes.SELECT,
        replacements: {
            username: req.session.user.username,
        }
    }).then(
        rows => {
            //console.log(rows);
            async.each(rows, (row, callback) => {
                console.log(row.name);
                var mediaList = {
                    name: row.name, 
                    media: []
                };
                Sequelize.query('SELECT name, year, id FROM media AS m, ' + 
                    '(SELECT list_media_id FROM contains ' +
                    'WHERE list_username = :username AND list_name = :listname) AS main ' +
                    'WHERE m.id = main.list_media_id;', {
                        type:Sequelize.QueryTypes.SELECT,
                        replacements: {
                            username: req.session.user.username,
                            listname: row.name,
                        }
                    }).then(rows1 => {
                            //console.log(rows1);
                                rows1.forEach(row1 =>{
                                    mediaList.media.push(
                                        {
                                            name: row1.name, 
                                            year: row1.year,
                                            id: row1.id }
                                )
                            }
                            )
                            media_list.push(mediaList);
                            console.log(mediaList);
                    
                            callback();
                        }
                    )
                
            },
            err => {
                console.log('done');
                console.log(media_list);
                res.status(200).render('my_media', { 
                    username: req.session.user.username, media_list: media_list
                })
            }
            )
        })
};

exports.my_media_post = (req, res) => {
    console.log(req.body.new_list_name);

    //adding a media list and displaying it on page (WORKS) 
    if (typeof req.body.new_list_name != "undefined")
    {
        var newList = {name:req.body.new_list_name, media:[]}
        media_list.push(newList);
        Sequelize.query('INSERT INTO media_list VALUES (:title, :username, null)' , {
            type:Sequelize.QueryTypes.INSERT,
            replacements: {
                title: req.body.new_list_name,
                username: req.session.user.username,
            }
        }).then(
            res.render('my_media', { 
                username: req.session.user.username, media_list: media_list
        })
        )
    };

    //removing a media list (DOESNT WORK COMPLETELY YET)
    if (typeof req.body.removedList != "undefined")
    {
        console.log("Success, removed list: "+ req.body.removedList);
        Sequelize.query('DELETE FROM media_list ' +
        'WHERE name = :name AND user_username = :username' , {
            type:Sequelize.QueryTypes.DELETE,
            replacements: {
                name: req.body.removedList,
                username: req.session.user.username
            }
        }).then(
            exports.my_media_get(req, res)
        )
    };

    //delete media from list here (WORKS)
    if (typeof req.body.removedMedia != "undefined")
    {
        console.log("removed media item " + req.body.removedMedia);
        console.log(req.body.remMedia_list);
        Sequelize.query('DELETE FROM contains ' +
        'WHERE list_media_id = :mediaId ' +
        'AND list_username = :loggedInUser ' +
        'AND list_name = :listName', {
            type:Sequelize.QueryTypes.DELETE,
            replacements: {
                mediaId: req.body.removedMedia,
                loggedInUser: req.session.user.username,
                listName: req.body.remMedia_list
            }
        }).then(
            exports.my_media_get(req, res)
        )
    }
}

//gets profile page of user
exports.profile_get = (req, res) => {
    errors = [];
    var fname = "";
    var lname = "";
    var email = "";
    var count = 0;
    
    if (!req.session.user) {
        res.status(401).send('Profile not available at the moment.');
    };

    var get_username = "";
    if (req.params.username === 'myprofile') {

      
        res.redirect("http://localhost:3000/users/profile/" + 
        req.session.user.username);
  
    } else {

        get_username = req.params.username;
        
    }
    //get basic info of user 
    Sequelize.query('SELECT * FROM people WHERE username = :username' , {
        type:Sequelize.QueryTypes.SELECT,
        replacements: {
            username: get_username
        }}).then( 
            rows => {
                rows.forEach(row =>{
                    fname = row.first_name;
                    lname = row.last_name;
                    email = row.email;
                   
                })
            //count how many friends user has 
            Sequelize.query("SELECT COUNT(*) AS friendcount FROM friends_with WHERE user1_username = :username" , {
                type:Sequelize.QueryTypes.SELECT,
                replacements: {
                    username: get_username
                }}).then(

                    rows1 => {
                        rows1.forEach(row =>{
                            count = row.friendcount;

                        })

                        //getting the media list along with the media contained in it
                    }).then (
                        () => 
                        {
                        media_list = [];
                        Sequelize.query('SELECT name FROM media_list WHERE user_username = :username',{
                            type:Sequelize.QueryTypes.SELECT,
                            replacements: {
                                username: get_username,
                            }
                        }).then(
                            rows => {
                                async.each(rows, (row, callback) => {
                                    console.log(row.name);
                            
                                    var mediaList = {
                                        name: row.name, 
                                        media: []
                                    };
                                    Sequelize.query('SELECT name, year, id FROM media AS m, ' + 
                                        '(SELECT list_media_id FROM contains ' +
                                        'WHERE list_username = :username AND list_name = :listname) AS main ' +
                                        'WHERE m.id = main.list_media_id;', {
                                            type:Sequelize.QueryTypes.SELECT,
                                            replacements: {
                                                username: get_username,
                                                listname: row.name,
                                            }
                                        }).then(rows1 => {
                                            
                                                    rows1.forEach(row1 =>{
                                                        mediaList.media.push(
                                                            {
                                                                name: row1.name, 
                                                                year: row1.year,
                                                                id: row1.id }
                                                    )
                                                }
                                                )
                                                media_list.push(mediaList);
                                                console.log(mediaList);
                                        
                                                callback();
                                            }
                                        )
                                    
                                },
                                err => {

                                    if (get_username === req.session.user.username) {

                                        var myprofile = true;
                                    } else {
                                        var myprofile = false;
                                    }

                

                                    console.log(media_list);
                                    res.render('profile', {

                                        activities: activities, 
                                        username: get_username,
                                        fname: fname,
                                        lname: lname,
                                        email: email,
                                        media_list: media_list,
                                        count: count,
                                        myprofile
                                })
            
                                }
                                )
                            })

                        }
                        
                    )    
            }


        );

};

//UPDATES USER INFO AND CHECKS IF EMAIL IS UNIQUE
exports.profile_post = (req, res) => {

    errors = [];

    //update first name if given
    if (req.body.firstName.length > 0) {
        Sequelize.query('UPDATE people ' +
        'SET first_name = :firstName ' +
        'WHERE username = :username' , {
            type:Sequelize.QueryTypes.UPDATE,
            replacements: {
                firstName: req.body.firstName,
                username: req.session.user.username
        }}).then(
            res.redirect("http://localhost:3000/users/profile/" + req.session.user.username)
        )
    }
    //update last name if given
    if (req.body.lastName.length > 0) {
        Sequelize.query('UPDATE people ' +
        'SET last_name = :lastName ' +
        'WHERE username = :username' , {
            type:Sequelize.QueryTypes.UPDATE,
            replacements: {
                lastName: req.body.lastName,
                username: req.session.user.username
        }}).then(
            res.redirect("http://localhost:3000/users/profile/" + req.session.user.username)
        )
    }
    //update email if given
    if (req.body.email.length > 0) {
        Sequelize.query('SELECT * FROM people WHERE email = :email', {
            type:Sequelize.QueryTypes.SELECT,
            replacements: {
                email: req.body.email,
        }}).then(
            rows => {
                console.log(rows);
                if(rows.length > 0) {
                    console.log(rows.length);
                    errors.push('That email already exists');
                    res.render('edit_profile', { errors: errors });
                    return;
                }
                user.email = req.body.email;
                req.session.user = user;
                Sequelize.query('UPDATE people ' +
                'SET email = :newEmail ' +
                'WHERE username = :username', {
                    type:Sequelize.QueryTypes.UPDATE,
                     replacements: {
                        newEmail: req.body.email,
                        username: req.session.user.username
                     }
                }).then(
                    res.redirect("http://localhost:3000/users/profile/" + req.session.user.username)
                )
            }
        )
    }
    //update password if given
    if (req.body.password.length > 0) {
        Sequelize.query('UPDATE people ' +
        'SET password = :newPassword ' +
        'WHERE username = :username' , {
            type:Sequelize.QueryTypes.UPDATE,
            replacements: {
                newPassword: req.body.password,
                username: req.session.user.username
        }}).then(
            res.redirect("http://localhost:3000/users/profile/" + req.session.user.username)
        )
    }
    //check for any errors with given input, otherwise go back to profile page
    if (errors.length > 0) {
        res.render('edit_profile', { errors: errors });
    } else {
        res.redirect("http://localhost:3000/users/profile/" + req.session.user.username);
    }

    
};

exports.editprofile_post = (req, res) => {
    var fname = req.body.current_user_fname;
    var lname = req.body.current_user_lname;
    var email = req.body.current_user_email;
    var un = req.body.current_user_un;
    res.render('edit_profile', { 

        fname: fname,
        lname: lname,
        email: email,
        un: un


    })
};

exports.editprofile_get = (req, res) => {
    res.render('edit_profile')
    
};
