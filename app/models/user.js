'use strict';

/**
*
* module requirements.
*
*/

var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

/**
*
* The table schema for the User Table
*
*/

var UserSchema = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: String,
	email: {
		type: String,
		required: [true, "Please Enter The Email Address"],
		unique: true,
		lowercase: true,
		match: [/\S+@\S+\.\S+/, "Invalid Email Address"]
	},
	encrypted_password: {
		type: String,
		required: true,
		min:[6, "Password is too short."],
		default: null
	},
	password_salt: {
		type: String,
		default: null
	},
	role: {
		type: String,
		default: "Reader"
	},
	avatar: {
		type: String,
		default: "/assets/images/avatar.png"
	},
	description: {
		type: String,
		default: null
	},
	facebook: {
		type: String,
		default: null
	},
	twitter:  {
		type: String,
		default: null
	},
	instagram:  {
		type: String,
		default: null
	},
	books: [{
		type: Schema.Types.ObjectId,
		ref: 'Book'
	}]
},{
	runSettersOnQuery: true  // setters like lowercase won't run automatically so use this line for that.
},{
	timestamps: true
});

/**
 * Pre-save hook
 */
UserSchema.pre('save', function(next) {
	if (this.isModified('encrypted_password')) {
		this.password_salt = this.makeSalt();
	   	this.encrypted_password =  this.hashPassword(this.encrypted_password.toString());
	}
	this.social_presence_slug();
	next();
});

/**
* Virtual's for setting the hashed password for the user
*
*/

UserSchema.virtual('password').get(function() {
	return this.encrypted_password;
})

/**
*
*model function
*
*/

UserSchema.methods = {

	makeSalt: function(){
		return crypto.randomBytes(16).toString('base64');
	},

	hashPassword: function(password){
		return crypto.createHmac('sha256', password.toString()).digest('base64');
	},
	/**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function(plainText) {
        return this.hashPassword(plainText) === this.encrypted_password;
    },

    social_presence_slug: function(){
    	
    }
}

module.exports = mongoose.model('User', UserSchema);