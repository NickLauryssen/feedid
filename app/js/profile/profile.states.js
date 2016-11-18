angular
	.module('feedID.profile')
	.config(config);

config.$inject = ['$stateProvider', 'templateProvider'];

function config($stateProvider, templateProvider) {
	$stateProvider
	.state('profile', {
			'url': '/user/:userId/:appId',
			'templateUrl': templateProvider.formatUrl('person', 'profile'),
			'controller': 'PersonCtrl',
			'controllerAs': 'vm'
	})
	.state('profile.overview', {
			'templateUrl': templateProvider.formatUrl('overview', 'profile'),
			'controller': 'PersonCtrl',
			'controllerAs': 'vm'
	})
	.state('profile.admin', {
			'templateUrl': templateProvider.formatUrl('administrator', 'profile')
	});
}
