'use strict';

class UserService {

	constructor($http, config) {
		this.$http = $http;
		this.config = config;
		this.user = {};
	}

	getUser(userId, appId) {
		return this.$http.get(this.config.api + '/api/users/' + userId + '/' + appId).then(
			(result) => {
				this.user = result.data;
			},
			(error) => {
				console.log('Couldn\'t load user from FeedID');
			}
		);
	}

	updateUser(user) {
		return this.$http.put(this.config.api + '/api/users/' + user._id, user).then(
			(result) => {
				this.user = result.data;
			},
			(error) => {
				console.log('Couldn\'t update user');
			}
		);
	}

	addUser(user) {
		return this.$http.post(this.config.api + '/api/users', user).then(
			(result) => {
				this.user = result.data;
			},
			(error) => {
				console.log('Couldn\'t add user');
			}
		);
	}

}

angular.module('common.services').service('userService', UserService);
