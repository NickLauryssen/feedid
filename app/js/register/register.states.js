(function() {
	'use strict';

	angular
		.module('feedID.register')
		.config(config);

		config.$inject = ['$stateProvider'];

		function config($stateProvider) {
			$stateProvider
				.state('app.register',
				{
					'url': '/register',
					controller: 'RegisterCtrl',
					templateUrl: 'partials/register.html'
				})
				.state('app.register.confirm',
				{
					'url': '/confirm/:activationId',
					controller: 'ConfirmCtrl',
					templateUrl: 'partials/confirm.html'
				})
				.state('app.register.photoupload',
				{
					'url': '/photoupload',
					controller: 'UploadCtrl',
					templateUrl: 'partials/photoupload.html'
				})
				.state('app.register.uploader',
				{
					'url': '/uploader',
					templateUrl: 'partials/uploader.php'
				});
		}

});
