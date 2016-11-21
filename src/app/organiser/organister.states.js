(function() {
	'use strict';

	angular
		.module('feedID.organiser')
		.config(config);

		config.$inject = ['$stateProvider', 'templateProvider'];

		function config($stateProvider, templateProvider) {
			$stateProvider
			.state('app.organiser',
			{
				'url': '/user/organiser',
				controller: 'OrganiserCtrl',
				templateUrl: templateProvider.formatUrl('organiser', organiser)
			})
		}

});
