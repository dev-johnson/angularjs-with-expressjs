'use strict';

/** controller dependencies */

var Category = require('../app/models/category.js');

var user = require('../app/controllers/UsersController.js');

var ObjectID = require('mongodb').ObjectID;

var admin = user.verifyAdmin();

exports.create = function(req, res){
	if(admin){
		var category = new Category;
		category.title = req.body.title;
		category.save(function(err, category){
			if(err){
				res.status(500).json(err.message);
			}else{
				res.json(200, "Category successfully added.");
			}
		});
	}else{
		res.json(401, "Not Authorized");
	}
};

exports.remove = function(req, res){
	if(admin){
		Category.remove({"_id": new ObjectID(req.body._id)}, function(err){
			if(err){
				res.status(500).json(err.message);
			}else{
				res.json(200, "Category successfully removed.");
			}
		});
	}else{
		res.json(401, "Not Authorized");
	}
};

exports.update = function(req, res){
	if(admin){
		Category.findOne({"_id": new ObjectID(req.body._id)}, function(err, category){
			if(err){
				res.status(500).json(err.message);
			}else{
				category.title = req.body.title || category.title;

				category.save(function(err, category){
					if(err){
						res.status(500).json(err.message);
					}else{
						res.json(200, category);
					}
				})
			}
		})
	}else{
		res.json(401, "Not Authorized");
	}
}

