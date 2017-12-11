'use strict'

// module dependencies

var User = require('../models/user');

var Book = require('../models/book');

var Category = require('../models/category');

var validator = require('../controllers/UsersController')

var admin = true

// exports

exports.usersList = function(req, res){
	if(admin){
		User.find({}, function(err, users){
			if(err){
				res.status(500).json(err.message);
			}else{
				res.json(200, users)
			}
		})
	}else{
		res.status(401).json("Not Authorized");
	}
};

exports.booksList = function(req, res){
	if(admin){
		Book.find({}, function(err, books){
			if(err){
				res.status(500).json(err.message);
			}else{
				res.json(200, books)
			}
		})
	}else{
		res.status(401).json("Not Authorized");
	}
};

exports.categoriesList = function(req, res){
	if(admin){
		Category.find({}, function(err, categories){
			if(err){
				res.status(500).json(err.message);
			}else{
				res.json(200, categories)
			}
		})
	}else{
		res.status(401).json("Not Authorized");
	}
};

exports.removeUser = function(req, res){
	if(admin){
		User.remove({"_id": new ObjectID(req.body._id)}, function(err){
			if(err){
				res.status(500).json(err.message);
			}else{
				res.json(200, "User successfully removed.");
			}
		});
	}else{
		res.json(401, "Not Authorized");
	}
};