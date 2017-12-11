'use strict';

angular.module('Category')
	
	.controller('CategoryController', CategoryController);

CategoryController.$inject = ['$rootScope', '$location', 'CatService'];

function CategoryController(){

	var vm = this;

	vm.listCategories = listCategories;


	function listCategories(){
		CatService.list(function(Categories))
	}
}