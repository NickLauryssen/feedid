'use strict';

class TestService {

	constructor($http, config) {
		this.$http = $http;
		this.config = config;
		this.tests = [];
		this.results = [];
	}

	getTests(userId) {
		return this.$http.get(this.config.api + '/api/tests/'+ userId).then(
			(result) => {
				return result;
			},
			(error) => {
				console.log('Couldn\'t retrieve tests from FeeID');
			}
		);
	}

	getResults(userId, requester) {
		console.log("UID", userId, "REQ", requester);
		return this.$http.get(this.config.api + '/api/testResults/' + userId + '/' + requester).then(
			(result) => {
				return result;
			},
			(error) => {
				console.log('Couldn\'t retrieve test results from FeeID');
			}
		);
	}

}

angular.module('common.services').service('testService', TestService);
