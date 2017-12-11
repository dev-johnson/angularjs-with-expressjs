'use strict';

var LocalStrategy = require('passport-local').Strategy,
    User = require('../app/models/user');

var Book = require('../app/models/book');
    
module.exports = function(passport) {
    
    // Use local strategy
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(username, password, done) {
            User.findOne({email: username}).populate('books').exec(function(err, user) {
                if (err) { return done(err); }
                
                if (!user) {
                    return done(null, false, {
                        'errors': {
                            'email': {
                                type: 'Email is not registered.'
                            }
                        }
                    });
                }
                if (!user.authenticate(password)) {
                    return done(null, false, {
                        'errors': {
                            'password': {
                                type: 'Password is incorrect.'
                            }
                        }
                    });
                }
                return done(null, user);
            });
        }
    ));

    // Serialize the user id to push into the session
    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    // Deserialize the user object based on a pre-serialized token
    // which is the user id
    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });

};
