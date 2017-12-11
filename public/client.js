'use strict';

angular.module('BaseApplication', ['ngCookies', 'ApplicationRoutes', 'userRegistry', 'adminModule', 'bookModule', 'homeModule'])

	.controller('ApplicationController', ApplicationController);

ApplicationController.$inject = ['userAuth', '$rootScope', '$cookieStore', '$location'];

function ApplicationController (userAuth, $rootScope, $cookieStore, $location) {

	var vm = this;

	$rootScope.flashMessage = {data: null, type: null};

	vm.logout = logout;

	//check the session and auto logs the user in

	// logUser($rootScope.currentUser);

	function logUser(user){
		userAuth.LoggedIn(user, function() {
		    // success handler
          	$cookieStore.put('MeAn_user', $rootScope.currentUser)
		}, function(error) {
	    	// error handler
			$location.path("/login");
		});
	}


	function logout(user){
		userAuth.logout(user, function(err) {
			if(!err){
				$cookieStore.remove('MeAn_user');
				$rootScope.currentUser = null;
				vm.user = null;
				$location.path('/login');
				$rootScope.flashMessage = {data: "Logged Out !", type: "success"}
			}else{
				$location.path('/');
				$rootScope.flashMessage = {data: "Something went wrong", type: "error"}
			}
		});
	}

}