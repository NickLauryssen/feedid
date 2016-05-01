(function() {

	'use strict';

	// Config
	angular
		.module('feedID')
		.config(config)
		.run(run)
		.constant('config', {
			api: 'https://feedid.com/backend'
		});

	function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

		let checkLoggedin = ($q, $timeout, $http, $injector, $rootScope) => {
			var deferred = $q.defer();

			$http.get(url + '/loggedin').success((user) => {
				if (user !== '0'){
					$rootScope.loggedin = true;
					$rootScope.currentUser = user;
					$timeout(deferred.resolve, 0);
				} else {
					$rootScope.loggedin = false;

					$timeout(function(){
						deferred.reject();
					}, 0);

					$injector.get('$state').go('app');
				}
			});

			return deferred.promise;
		};

		$httpProvider.interceptors.push(function($q, $injector) {
			return (promise) => {
				return promise.then(
					(response) => {
						return response;
					},
					(response) => {
	                    if (response.status === 401) {
							$injector.get('$state').go('login');
						}

						return $q.reject(response);
					}
				);
			};
		});

	 	$stateProvider.state('app',
		{
			'url': '/',
			controller: 'MainCtrl',
			templateUrl : 'partials/main.html'
		})
	    .state('app.password',
	    {
			'url': '/password/:userId',
	        controller: 'PasswordCtrl',
	        templateUrl: 'partials/new.html'
	    })
		.state('app.admin',
		{
			'url': '/admin',
			controller: 'AdminCtrl',
			templateUrl: 'partials/admin.html'
			/*resolve: {
	    			loggedin: checkLoggedin
	    		}*/
		});

		// Default redirect
		$urlRouterProvider.otherwise('/');
	}

	function run($rootScope, $http, $location, $state) {
		const url = "https://feedid.com/backend";
		$rootScope.message = '';
		$rootScope.loggedin = false;

		$rootScope.logout = () => {
			$rootScope.message = 'Logged out.';
			$http.post(url + '/logout');
			$rootScope.loggedin = false;
			$location.url('/');
		};

		$rootScope.login = () => {
	      $http({method: "POST", url: url + '/login',data: {
	            username: $rootScope.user.username,
	            password: $rootScope.user.pass
	        }})
	        .then((result) => {
				$rootScope.currentUser = result.data;
				$rootScope.user = $rootScope.currentUser;
				$rootScope.loggedin = true;
	            $http({method: "GET",url : url + '/api/apps/Profile'}).then((result) => {
	                $rootScope.app = result.data;
	                $rootScope.message = 'Authentication successful!';
					$state.go('profile', { 'userId': $rootScope.currentUser._id, 'appId': $rootScope.app._id });
	                //$location.url('/user/' + $rootScope.currentUser._id + '/' + );
	            },function(err){
					console.log("Something went wrong while getting the profile:" , err);
				});
	        },() => {
	            $rootScope.message = 'Authentication failed.';
	            alert("Authentication failed: Controleer login gegevens.");
	            $location.url('/');
	        });
	    };
	}

})();
