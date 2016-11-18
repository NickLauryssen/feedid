(function() {
	'use strict';

	angular
		.module('feedID.login')
		.config(config);

		config.$inject = ['$stateProvider', 'templateProvider'];

		function config($stateProvider, templateProvider) {
			$stateProvider
				.state('app.login',
				{
					'url': '/login',
					controller: 'LoginCtrl',
					templateUrl: templateProvider.formatUrl('login', 'login')
				});
		}

});
