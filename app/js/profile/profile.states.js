(function() {
	'use strict';

	angular
		.module('feedID.profile')
		.config(config);

		function config($stateProvider) {
			$stateProvider
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
				});
		}

})();
