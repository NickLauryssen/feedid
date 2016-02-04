'use strict';
/**google.setOnLoadCallback(function () {
    angular.bootstrap(document.body, ['feedID']);
});
google.load('visualization', '1', {packages: ['corechart']});
**/
var app = angular.module('feedID',['ngResource','ngRoute','ngSanitize','feedID.directives','googlechart', 'ui.bootstrap']);

//config
app.config(function($routeProvider, $locationProvider, $httpProvider) {

	var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
		var deferred = $q.defer();

		$http.get(url + '/loggedin').success(function(user) {
			if(user !== '0'){
				$rootScope.loggedin = true;
				$rootScope.currentUser = user;
				$timeout(deferred.resolve, 0);
			}
			else {
				$rootScope.loggedin = false;
				$timeout(function(){deferred.reject();}, 0);
				$location.url('/');
			}

		});

		return deferred.promise;
	};

	$httpProvider.interceptors.push(function($q, $location) {
		return function(promise) {
			return promise.then(
				function(response) {
					return response;
				},
				function(response) {
                    if (response.status === 401)
						$location.url('/login');
					return $q.reject(response);
				}
			);
		}
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
		templateUrl: 'partials/admin.html',
		resolve: {
    			loggedin: checkLoggedin
    		}
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
    		templateUrl: 'partials/person.html',
    		resolve: {
    			loggedin: checkLoggedin
    		}

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
});

app.run(function($rootScope, $http, $location) {
	var url = "https://feedid.com/backend";
	$rootScope.message = '';
	$rootScope.loggedin = false;

	$rootScope.logout = function() {
		$rootScope.message = 'Logged out.';
		$http.post(url + '/logout');
		$rootScope.loggedin = false;
		$location.url('/');
	};
	$rootScope.login = function() {
        $http.post(url + '/login', {
            username: $rootScope.user.username,
            password: $rootScope.user.pass
        })
        .success(function(user) {
            $http.get(url + '/api/apps/Profile').success(function(resultApp) {
                $rootScope.app = resultApp;
                $rootScope.message = 'Authentication successful!';
                $rootScope.user = user;
                $location.url('/user/' + user._id + '/' + $rootScope.app._id);
            });
        })
        .error(function() {
            $rootScope.message = 'Authentication failed.';
            alert("Authentication failed: Controleer login gegevens.");
            $location.url('/');
        });
    };
});
