/* index.js by Stefan Lovecchio ID# 301305372 18/06/23 */

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//create the User Model instance
let userModel = require('../models/user');
let User = userModel.User //alias

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Home', username: req.user ? req.user.username : '' });
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', { title: 'About Me' , username: req.user ? req.user.username : ''});
}

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('index', { title: 'Projects' , username: req.user ? req.user.username : ''});
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', { title: 'Services' , username: req.user ? req.user.username : ''});
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('index', { title: 'Contact' , username: req.user ? req.user.username : ''});
}

//display login page
module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is already logged in
    if(!req.user)
    {
        res.render('auth/login',
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            username: req.user ? req.user.username : ''
        })
    }
    else
    {
        return res.redirect('/');
    }
}

//process login page
module.exports.processLoginPage = (req, res, next) => {

    passport.authenticate('local',
    (err, user, info) => {
        //server err?
        if(err)
        {
            return next(err);
        }
        // is there a user login err?
        if(!user){
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            //server err?
            if(err)
            {
                return next(err);
            }
            return res.redirect('/contacts-list');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: "Register",
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    //initialize an user object
    let newUser = new User({
        "username": req.body.username,
        "password": req.body.password,
        "email": req.body.email
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log(err);
            console.log("Error: Inserting New User");
            if(err.name == 'UserExistsError')
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!');
            }
            return res.render('auth/register',
            {
                title: "Register",
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {
            //if registration is success
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/contacts-list')
            });
        }
    });
}

//perform logout
module.exports.performLogout = (req, res, next) => {
    req.logout((err) => {
        if (err)
        {
            //handle error here
            console.log(err);
            return next(err);
        }
        return res.redirect('/');
    });
}