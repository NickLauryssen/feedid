'use strict';

class MedicalService {

	constructor($http, $rootScope, config) {
		this.$http = $http;
		this.$rootScope = $rootScope;
		this.config = config;
	}

	getInjuries(userId) {
		return this.$http({url:this.config.api + '/api/injuries/' + userId,method:"GET", params:{_id:this.$rootScope.currentUser._id}}).then(
			(result) => {
				console.log("result getInjuries", result);
			},
			(error) => {
				console.log('Couldn\'t get injuries for ' + userId);
			}
		);
	}

	/*updateUser(user) {
		return this.$http.put(this.config.api + '/api/users/' + user._id, user).then(
			(result) => {
				this.user = result.data;
			},
			(error) => {
				console.log('Couldn\'t update user');
			}
		);
	}*/

	addInjury(injury) {
		return this.$http.post(this.config.api + '/api/injury', injury).then(
			(result) => {
				return result.data;
			},
			(error) => {
				console.log('Couldn\'t add injury');
				return null;
			}
		);
	}
}

angular.module('common.services').service('medicalService', MedicalService);
