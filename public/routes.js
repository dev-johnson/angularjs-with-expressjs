angular.module('ApplicationRoutes', ['ngRoute'])
	
	.config(['$routeProvider', function($routeProvider) {
		
		$routeProvider

			.when("/", {
				access: {restricted: false},
				templateUrl: "/homeModule/view/index.html",
			}).

			when("/login", {
				access: {restricted: false},
				templateUrl: "/userRegistry/view/login.html",
				controller: "UserController",
				controllerAs: "user"
			}).

			when("/register", {
				access: {restricted: false},
				templateUrl: "/userRegistry/view/register.html",
				controller: "UserController",
				controllerAs: "user"
			}).

			when("/profile/:id", {
				access: {restricted: true},
				templateUrl: "/userRegistry/view/userInfo.html",
				controller: "UserController",
				controllerAs: "user"
			}).

			when("/books", {
				access: {restricted: false},
				templateUrl: "/homeModule/view/books.html",
				controller: "HomeController",
				controllerAs: "home"
			}).

			when("/books/new", {
				access: {restricted: true},
				templateUrl: "/booksModule/view/createBook.html",
				controller: "BookController",
				controllerAs: "book"
			}).

			when("/admin/users", {
				access: {restricted: true},
				templateUrl: "/adminModule/view/users.html",
				controller: "AdminController",
				controllerAs: "admin"
			}).

			when("/admin/books", {
				access: {restricted: true},
				templateUrl: "/adminModule/view/books.html",
				controller: "AdminController",
				controllerAs: "admin"
			}).

			when("/admin/categories", {
				access: {restricted: true},
				templateUrl: "/adminModule/view/categories.html",
				controller: "AdminController",
				controllerAs: "admin"
			}).


			otherwise("/");

	}]).run(['$rootScope','$location','$cookieStore', '$route', 'userAuth', function($rootScope, $location, $cookieStore, $route, userAuth){

		// define the pages that doesn't require authorization here.
		var authPages = ['/login', '/register'];
		// define the previous urls
		$rootScope.$on('$locationChangeStart', function (event, current, previous) {
		        $rootScope.previousUrl = previous
		});

		$rootScope.$on('$routeChangeStart', function(event, next, current) {
			// force the use to login for restricted pages
			userAuth.LoggedIn(function(data){
				$rootScope.currentUser = data
				$cookieStore.put('MeAn_user', data)
				if (authPages.indexOf($location.path()) === 0) {
					$location.path($rootScope.previousUrl);
					$rootScope.flashMessage = {data: "You are already logged in...", type: "warning"}
					// $route.reload();
				}

			}, function(error){
				if (next.access.restricted) {
					$location.path("/login");
					$rootScope.flashMessage = {data: "You must login to continue...", type: "warning"}
					// $route.reload();
				}
			})
		})

	}]);