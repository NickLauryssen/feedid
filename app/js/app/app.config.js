(function() {

	'use strict';

	// Config
	angular
		.module('feedID')
		.config(config)
		.run(run)
		.constant('config', {
			api: 'https://feedid.com/backend'
		});;

	function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

		let checkLoggedin = ($q, $timeout, $http, $location, $rootScope) => {
			var deferred = $q.defer();

			$http.get(url + '/loggedin').success((user) => {
				if (user !== '0'){
					$rootScope.loggedin = true;
					$rootScope.currentUser = user;
					$timeout(deferred.resolve, 0);
				} else {
					$rootScope.loggedin = false;
					$timeout(function(){deferred.reject();}, 0);
					$location.url('/');
				}
			});

			return deferred.promise;
		};

		$httpProvider.interceptors.push(function($q, $location) {
			return (promise) => {
				return promise.then(
					(response) => {
						return response;
					},
					(response) => {
	                    if (response.status === 401)
							$location.url('/login');

						return $q.reject(response);
					}
				);
			};
		});

		// Default redirect
		$urlRouterProvider.otherwise('/');

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
		.state('app.login',
		{
			'url': '/login',
			controller: 'LoginCtrl',
			templateUrl: 'partials/login.html'
		})
		.state('app.admin',
		{
			'url': '/admin',
			controller: 'AdminCtrl',
			templateUrl: 'partials/admin.html'
			/*resolve: {
	    			loggedin: checkLoggedin
	    		}*/
		})
		.state('app.registration',
		{
			'url': '/register',
			controller: 'RegisterCtrl',
			templateUrl: 'partials/register.html'
		})
	    .state('app.registration.confirm',
	    {
			'url': '/confirm/:activationId',
	        controller: 'ConfirmCtrl',
	        templateUrl: 'partials/confirm.html'
	    })
	    .state('app.organiser',
	    {
			'url': '/user/organiser',
	        controller: 'OrganiserCtrl',
	        templateUrl: 'partials/organiser.html'
	    })
	    .state('app.registration.photoupload',
	    {
			'url': '/photoupload',
	    	controller: 'UploadCtrl',
	    	templateUrl: 'partials/photoupload.html'
	    })
	    .state('app.registration.uploader',
		{
			'url': '/uploader',
	    	templateUrl: 'partials/uploader.php'
	    })
		.state('profile', {
			'url': '/user/:userId/:appId',
			'templateUrl': 'partials/person.html',
			'controller': 'PersonCtrl',
			'controllerAs': 'vm'
		})
		.state('profile.overview', {
			'templateUrl': 'partials/overview.html'
		})
		.state('profile.admin', {
			'templateUrl': 'partials/administrator.html'
		});;
	}

	function run($rootScope, $http, $location) {
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
	                $location.url('/user/' + $rootScope.currentUser._id + '/' + $rootScope.app._id);
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
