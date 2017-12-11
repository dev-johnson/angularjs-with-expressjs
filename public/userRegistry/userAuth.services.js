'use strict';

angular.module('userRegistry')

	.factory('userAuth', ['User','$rootScope','$cookieStore','$q', '$timeout', function(User, $rootScope, $cookieStore, $q, $timeout) {

		// create user variable
        var user = null;

		return {
			login: login,
			register: register,
			logout: logout,
			update: update,
			LoggedIn: LoggedIn
		}

		function login(user, callback) {
			var cb = callback || angular.noop;
			var loginDetails = User.login
			var deferred = $q.defer();
			loginDetails.save(user, function(user) {

				$rootScope.currentUser = user;
				$cookieStore.put('MeAn_user', $rootScope.currentUser)
				return cb();

	        }, function(err) {
				return cb(err.data);
	        });

		}

		function logout(user, callback) {
			var cb = callback || angular.noop;
			var session = User.logout
			session.delete(user, function(){
				return cb();
			}, function(err) {

	          return cb(err.data);
	        });

		}


		function register(user, callback) {
			var cb = callback || angular.noop;
			var request = User.register;

			request.save(user, function(user){
				$rootScope.currentUser = user;
				$cookieStore.put('MeAn_user', $rootScope.currentUser)

	          	return cb();
	        }, function(err) {
	          	return cb(err.data);
	        });

		}

		function LoggedIn(callback, errorCallback) {

			var cb = callback || angular.noop;
			var session = User.session

			session.get(function(data){
				$rootScope.currentUser = user;
				$cookieStore.put('MeAn_user', $rootScope.currentUser)
				return cb(data)
			}, function(error){
				return errorCallback(error)
			})
		}

		function update(user, callback){
			var cb = callback || angular.noop;
			var updateUser = User.update;
			updateUser.save(user, function(user){
				$rootScope.currentUser = user;
				$cookieStore.put('MeAn_user', $rootScope.currentUser)
				return cb;
			}, function(error){
				return cb(err.data);
			})
		}

	}]);