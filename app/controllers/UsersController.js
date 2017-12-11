'use strict';

/* Controller Dependencies */

var User = require('../models/user');

var passport = require('passport');

var ObjectID = require('mongodb').ObjectID;

exports.create = function(req, res) {
	 var user = new User();
	 user.firstName = req.body.firstName;
	 user.lastName = req.body.lastName;
	 user.email = req.body.email;
	 user.encrypted_password = req.body.password;
	 user.role = req.body.userType == 'true' ? "Author" : "Reader";

	 user.save(function(err, user) {
	 	if(err) {
	 		return res.json(400, err.message);
	 	}else{
	 		passport.authenticate('local')(req, res, function () {
                return res.json(200, user);
            })
	 	}
	 });
};

exports.login = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		var error = err || info;
		if (error) {
			return res.json(400, error);
		}else{
			req.logIn(user, function(err) {
				if (err) {
					return res.send(err);
				}
				res.json(req.user);
			})
		}
	})(req, res, next);
};

exports.logout = function(req, res) {
    if (req.user) {
        req.logout();
        res.send(200, "Successfully logged out");
    } else {
        res.send(400, "Not logged in");
    }
};


exports.session = function(req, res) {
	if (req.user) {
		res.json(req.user);
    } else {
        res.send(401, "Not logged in !");
    }
};


exports.update = function(req, res){
	User.findOne({_id: new ObjectID(req.body.id)}, function(err, user){
		if(err){
			res.status(500).json(err.message)
		}else{

			user.firstName = req.body.firstName || user.firstName;
			user.lastName = req.body.lastName || user.lastName;
			user.description = req.body.description || user.description;
			user.facebook = req.body.facebook || user.facebook
			user.twitter = req.body.twitter || user.twitter
			user.instagram = req.body.instagram || user.instagram

			user.save(function(err, user){
				if(err){
					res.json(500, err.message);
				}else{
					res.json(200, user)
				}
			})
		}
	})
};

exports.verifyAdmin = function(req, res, next){
	
	
	// if(req.user.role === "Admin"){
	// 	return true
	// 	next
	// }else{
	// 	return false
	// 	next
	// }
}

exports.verifyAuthor = function(req, res, next){

	if(req.user.role === "Author"){
		return true
		next
	}else{
		return false
		next
	}
}