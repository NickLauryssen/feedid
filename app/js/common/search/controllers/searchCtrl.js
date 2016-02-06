'use strict';

app.controller('SearchCtrl', function($scope, $rootScope, $http) {
    $scope.filterUsers = function() {
        $rootScope.searchUsers=[];
        $http.get(url + '/api/users/search/' + $scope.query).success(function(users) {
            for (var u in users)
            $rootScope.searchUsers.push(users[u]);
        });
    };

	$scope.clear = function() {
		$scope.query = '';
	};
});
