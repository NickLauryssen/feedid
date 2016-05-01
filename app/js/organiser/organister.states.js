(function() {
	'use strict';

	angular
		.module('feedID.organiser')
		.config(config);

		config.$inject = ['$stateProvider'];

		function config($stateProvider) {
			$stateProvider
			.state('app.organiser',
			{
				'url': '/user/organiser',
				controller: 'OrganiserCtrl',
				templateUrl: 'partials/organiser.html'
			})
		}

});
