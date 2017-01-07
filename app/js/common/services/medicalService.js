'use strict';

class MedicalService {

	constructor($http, $rootScope, config) {
		this.$http = $http;
		this.$rootScope = $rootScope;
		this.config = config;
	}
	getColorForSeverity(severity){
		switch(severity){
			case "Licht":
				return '#16277e';
			case "Matig":
				return '#f0fd21';
			case "Zwaar":
				return '#ff0000';
		}
	}
	getInjuries(userId) {
		return this.$http({url:this.config.api + '/api/injuries/' + userId,method:"GET", params:{_id:this.$rootScope.currentUser._id}}).then(
			(result) => {
				console.log("result getInjuries", result);
				return result.data;
			},
			(error) => {
				console.log('Couldn\'t get injuries for ' + userId);
			}
		);
	}

	deleteInjury(injury){
		return this.$http.delete(this.config.api + '/api/injury/'+ injury._id).then(
			(response) => {
				return response;
			}
		)
	}
	updateInjury(injury) {
		return this.$http.put(this.config.api + '/api/injury/' + injury._id, injury).then(
			(result) => {
				return result;
			},
			(error) => {
				console.log('Couldn\'t update user');
			}
		);
	}

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
