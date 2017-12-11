'use strict';


angular.module('userRegistry')
	
	.controller('UserController', UserController);

UserController.$inject = ['userAuth', '$location', '$rootScope','$routeParams'];

function UserController(userAuth, $location, $rootScope, $routeParams) {

	/*
	*
	*The scope and the function's declaration are defined
	*
	*/
	var vm = this
	vm.createUser = createUser;
	vm.login = login;
	vm.updateUser = updateUser;
	vm.showForm = false;
	vm.clearFrom = clearFrom;

	/*
	*
	* functions of the user controller
	*
	*/

	function createUser(userData) {
		userAuth.register(userData, function(err) {
			if(err){ 
				$rootScope.flashMessage = {data: "Something went wrong please try again", type: "error"}
			}else{
				if($rootScope.currentUser.role == "Author"){
					$location.path('/info');
					$rootScope.flashMessage = {data: "Kindly fill your profile details", type: "success"}
					vm.showForm = true;
					return
				}
				$location.path('/');
				$rootScope.flashMessage = {data: "Successfully Logged In", type: "success"}
			}
		});
	}

	function login(user) {
		userAuth.login(user, function(err) {
			if(err){ 
				$rootScope.flashMessage = {data: "Invalid username or password", type: "error"}
			}else{
				$location.path('/dashboard');
				$rootScope.flashMessage = {data: "Successfully Logged In", type: "success"}
			}
		});
	}

	function updateUser(user, id){
		user['id'] = id;
		userAuth.update(user, function(err){
			if(err){
				$rootScope.flashMessage = {data: "Something went wrong", type: "error"}
			}else{
				$rootScope.flashMessage = {data: "Successfully Logged In", type: "success"}
			}
		});
		vm.showForm = false;
		return;
	}

	function clearFrom(){
		vm.showForm = false;
		return;
	}

}