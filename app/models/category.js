'use strict';
/**
*model dependencies
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
* Schema declaration for categories
*/

var categorySchema = new Schema({
	name: {
		type: String,
		required: [true, 'Category name cannot be blank'],
		unique: [true, 'Category already exists']
	},
	url: {
		type: String
	},
	books: [{
		type: Schema.Types.ObjectId,
		ref: 'Book'
	}]
});

/**
* pre save
*/

categorySchema.pre('save', function(next){
	this.url = this.to_slug(this.name);
	next();
});

/**
* model method's
*/

categorySchema.methods = {

	to_slug: function(plainText){
		return plainText.toLowerCase().trim().replace(' ','-');
	}
}

module.exports = mongoose.model('Category',categorySchema);