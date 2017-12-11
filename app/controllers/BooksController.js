'use strict';

/** module dependencies */

var Book = require('../models/book');

var Category = require('../models/category');

var user = require('../controllers/UsersController');

// var author = user.verifyAuthor();

// var admin = user.verifyAdimin();

var admin  = true
var  author = true
console.log(admin)

console.log(author)

// exports

exports.create = function(req, res){
	if(admin || author){

		var book = new Book;
		book.title = req.body.title;
		book.content = req.body.content;

		book.save(function(err, book){
			if(err){
				res.status(500).json(err.message)
			}else{
				res.json(200, book);
			}
		})
	}else{
		res.status(401).json("Not Authorized");
	}
};

exports.update = function(req, res){
	if(admin || author){

		Book.findOne({_id: new ObjectID(req.body.id)}, function(err, book){
			if(err){
				res.status(500).json(err.message)
			}else{

				book.title = req.body.title || book.title;
				book.content = req.body.content || book.content;
				book.image_url = req.body.image_url || book.image_url;
				book.categories = req.body.categories || book.categories

				book.save(function(err, book){
					if(err){
						res.json(500, err.message);
					}else{
						res.json(200, book)
					}
				})
			}
		})

	}else{
		res.status(401).json("Not Authorized");
	}
};

exports.remove = function(req, res){
	if(admin || author){
		Book.remove({"_id": new ObjectID(req.body._id)}, function(err){
			if(err){
				res.status(500).json(err.message);
			}else{
				res.json(200, "Book successfully removed.");
			}
		});
	}else{
		res.status(401).json("Not Authorized");
	}
};

exports.booksList = function(req, res){
	var books = Book.find({}, function(err, books){
		if(err){
			res.status(500).json(err.message);
		}else{
			return res.json(200, books);
		}
	})
};