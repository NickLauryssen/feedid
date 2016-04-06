'use strict';

class AppService {

	constructor($http, config) {
		this.$http = $http;
		this.config = config;
		this.app = {};
	}

	getApp(id) {
		return this.$http({method: 'GET',url:this.config.api + '/api/apps/' + id}).then(
			(result) => {
				this.app = result.data;
			},
			(error) => {
				console.log('Couldn\'t retrieve app from FeeID');
			}
		);
	}

}

angular.module('common.services').service('appService', AppService);
