'use strict';

const RESOURCE_URL = 'https://feedid.com/backend';

class ResourceManager {
	constructor($http) {
		this.$http = $http;
	}

	handle(url) {
		return this.$http(RESOURCE_URL + url);
	}

}

angular.module('feedID.api').factory('resourceManager', ResourceManager);
