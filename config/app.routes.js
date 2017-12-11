'use strict';

 module.exports = function(app) {

 	// user routes

    var user = require('../app/controllers/UsersController');

    app.route('/app/auth/user/register')
        .post(user.create);

    app.route('/app/auth/user/login')
        .post(user.login)
        
    app.route('/app/auth/user/logout')
        .delete(user.logout);

    app.route('/app/auth/session')
        .get(user.session);

    app.route('/app/auth/user/update')
    	.post(user.update);


    //admin routes
    var admin = require('../app/controllers/AdminController');

    app.route('/app/admin/users')
        .get(admin.usersList);

    app.route('/app/admin/books')
        .get(admin.booksList);

    app.route('/app/admin/categories')
        .get(admin.categoriesList);

    //books routes
    var book = require('../app/controllers/BooksController');
    app.route("/app/books")
        .get(book.booksList)
        .post(book.create);

 };
