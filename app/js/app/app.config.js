'use strict';

//config
angular.module('feedID').config(function($routeProvider, $locationProvider, $httpProvider) {

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

 	$routeProvider.when('/',
	{
		controller: 'MainCtrl',
		templateUrl : 'partials/main.html'
	})
    .when('/password/:userId',
    {
        controller: 'PasswordCtrl',
        templateUrl: 'partials/new.html'
    })
	.when('/login',
	{
		controller: 'LoginCtrl',
		templateUrl: 'partials/login.html'
	})
	.when('/admin',
	{
		controller: 'AdminCtrl',
		templateUrl: 'partials/admin.html'
		/*resolve: {
    			loggedin: checkLoggedin
    		}*/
	})
	.when('/register',
	{
		controller: 'RegisterCtrl',
		templateUrl: 'partials/register.html'
	})
    .when('/confirm/:activationId',
    {
            controller: 'ConfirmCtrl',
            templateUrl: 'partials/confirm.html'
    })
    .when('/user/:userId/:appId',
    {
    		controller: 'PersonCtrl',
    		templateUrl: 'partials/person.html'
    		/*resolve: {
    			loggedin: checkLoggedin
    		}*/

    })
    .when('/user/organiser',
    {
        controller: 'OrganiserCtrl',
        templateUrl: 'partials/organiser.html'
    })
    .when('/photoupload',
    {
    	controller: 'UploadCtrl',
    	templateUrl: 'partials/photoupload.html'
    })
    .when('/uploader', {
    	templateUrl:'partials/uploader.php'
    })
	.otherwise({ redirectTo: '/' });
})
.run(function($rootScope, $http, $location) {
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
        },withCredentials: 'true'})
        .then((result) => {
			$rootScope.user = result.data;

            $http({method: "GET",url : url + '/api/apps/Profile', withCredentials: 'true'}).then((result) => {
                $rootScope.app = result.data;
                $rootScope.message = 'Authentication successful!';
                $location.url('/user/' + $rootScope.user._id + '/' + $rootScope.app._id);
            },function(err){
				console.log("Something went wrong while getting the profile:" , err);
			});
        },() => {
            $rootScope.message = 'Authentication failed.';
            alert("Authentication failed: Controleer login gegevens.");

            $location.url('/');
        });
    };
})
.constant('config', {
	api: 'https://feedid.com/backend'
});
