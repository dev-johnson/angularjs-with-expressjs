'use strict';

/**
* The $resource is used for making the Api call to the applicatio
*
* This resource is for user creation
*
*/

angular.module('userRegistry')

	.factory('User', User);

User.$inject = ['$resource'];

function User($resource) {

	return {
		register: $resource('/app/auth/user/register'),
		login: $resource('/app/auth/user/login'),
		logout: $resource('/app/auth/user/logout'),
		session: $resource('/app/auth/session'),
		update: $resource('/app/auth/user/update')
	}

};