'use strict';

// module declaration

angular.module('bookModule')

	.controller('BookController', BookController);

BookController.$inject = ['$rootScope', '$location', '$cookieStore', 'BookService'];

function BookController ($rootScope, $location, $cookieStore, BookService) {

	var vm = this
	vm.books = BookService.query();
	vm.createBook = createBook;
	vm.checkAuthenticity = checkAuthenticity;

	checkAuthenticity();

	function checkAuthenticity(){
		if($rootScope.currentUser.role !== "Author" && $rootScope.currentUser.role !== "Admin"){
			$location.path("/")
			$rootScope.flashMessage = {data: "You are not authorized !", type: "warning"}
		}
	}

	function createBook(bookData){
		console.log(bookData)
		BookService.save(bookData, function(book){
			$rootScope.flashMessage = {data: "Book Created Successfully", type: "success"}
			$location.path('/books');
		}, function(error){
			console.log('in err')
			$rootScope.flashMessage = {data: "Kindly fill your profile details", type: "error"}
			$location.path('/');
		})	
	}
}