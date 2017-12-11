'use strict';

/* module requirements. */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
*
* The table schema for the Article Table
*
*/

var bookSchema = new Schema({

	title: {
		type: String,
		required: [true, "Book Title Can't Be Blank."]
	},
	
	content:  String,
	
	url: String,
	
	image_url: String,

	likes: {
		type: Number,
		default: 0
	},

	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},

	categories: [{
		type: Schema.Types.ObjectId,
		ref: 'Category'
	}],
	
	comments: [{
        text: String,
        posted_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }]

},{
	timestamps: true
});

module.exports = mongoose.model('Book',bookSchema);