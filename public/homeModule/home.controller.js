'use strict';

// module declaration

angular.module('homeModule')

	.controller('HomeController', HomeController);

HomeController.$inject = ['$rootScope', '$location', 'BookService'];

function HomeController ($rootScope, $location, BookService) {

	var vm = this
	
	vm.books = BookService.query();
}