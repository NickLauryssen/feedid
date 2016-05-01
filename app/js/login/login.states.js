(function() {
	'use strict';

	angular
		.module('feedID.login')
		.config(config);

		config.$inject = ['$stateProvider', '$urlRouterProvider'];

		function config($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('app.login',
				{
					'url': '/login',
					controller: 'LoginCtrl',
					templateUrl: 'partials/login.html'
				});
		}

});
