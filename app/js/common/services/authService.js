'use strict';

class AuthService {

	constructor($http, config) {
		this.$http = $http;
		this.config = config;
	}

	register(user) {
		return this.$http.post(this.config.api + '/register', user).then(
			(result) => {
				console.log('User registered');
			},
			(error) => {
				console.log('Couldn\'t register user');
			}
		);
	}

}

angular.module('common.services').service('authService', AuthService);
