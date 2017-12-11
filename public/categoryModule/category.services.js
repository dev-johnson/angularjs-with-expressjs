'use strict';

angular.module('Category')

	.factory('CatService', ['$http', '$rootScope', '$cookieStore', function($http, $rootScope, $cookieStore){

		return {
			list: listCategory,
			create: createCategory,
			update: updateCategory,
			destroy: destroyCategory
		}

		function list(){
			$http.get()
		}
	}]);