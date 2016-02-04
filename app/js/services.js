/*angular.module('feedIDServices', ['ngResource']).factory('feedID', ['$http', function($http) {
	var urlBase = '/api/users';
	var dataFactory = {};

	dataFactory.getUsers = function() {
		return $http.get(urlBase);
	};

	dataFactory.insertUser = function(user) {
		return $http.post(urlBase, user);
	};

	return dataFactory;
}]);*/

var services = angular.module('feedID.services',[]);
//Services

