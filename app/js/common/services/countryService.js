'use strict';

class CountryService {

	constructor($http, config) {
		this.$http = $http;
		this.config = config;
		this.countries = [];
	}

	getCountries() {
		return this.$http.get(this.config.api + '/api/countries').then(
			(result) => {
				this.countries = result.data;
				return this.countries;
			},
			(error) => {
				console.log('Couldn\'t retrieve countries from FeedID');
			}
		)
	}

}

angular.module('common.services').service('countryService', CountryService);
