'use strict';

angular.module('adminModule')

	.controller('AdminController', AdminController);

AdminController.$inject = ['$rootScope', '$location'];

function AdminController ($rootScope, $location) {

	var vm = this;

	vm.checkAuthenticity = checkAuthenticity;

	checkAuthenticity();

	function checkAuthenticity(){
		if($rootScope.currentUser.role !== "Admin"){
			$location.path("/")
			$rootScope.flashMessage = {data: "You are not authorized !", type: "warning"}
		}
	}
}