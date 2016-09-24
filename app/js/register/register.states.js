(function() {
	'use strict';

	angular
		.module('feedID.register')
		.config(config);

		config.$inject = ['$stateProvider', 'templateProvider'];

		function config($stateProvider, templateProvider) {
			$stateProvider
				.state('app.register',
				{
					'url': '/register',
					controller: 'RegisterCtrl',
					templateUrl: templateProvider.formatUrl('register', 'register')
				})
				.state('app.register.confirm',
				{
					'url': '/confirm/:activationId',
					controller: 'ConfirmCtrl',
					templateUrl: templateProvider.formatUrl('confirm', 'register')
				})
				.state('app.register.photoupload',
				{
					'url': '/photoupload',
					controller: 'UploadCtrl',
					templateUrl: templateProvider.formatUrl('photoupload', 'register')
				})
				.state('app.register.uploader',
				{
					'url': '/uploader',
					templateUrl: 'partials/uploader.php'
				});
		}

});
