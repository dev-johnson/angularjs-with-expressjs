'use strict';

angular.module('bookModule')

	.factory('BookService',BookService);

BookService.$inject = ['$resource'];

function BookService($resource) {

	return $resource('/app/books');

}
