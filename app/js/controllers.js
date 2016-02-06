var url = "https://feedid.com/backend";

app.controller('AdminCtrl', function ($rootScope,$scope, $http) {
  $scope.user = $rootScope.currentUser;
});

app.controller('MainCtrl', function($scope, $rootScope, $http, $location) {
	$scope.register = function() {
		$http.post(url + '/api/users', $scope.user)
		.success(function(message) {
                $http.post(url + '/register', $scope.user)
                    .success(function(message) {
                        $rootScope.message = 'User registered and mail is sent to your email.';
                        alert($rootScope.message);
                        $location.url('/');
                    })
                    .error(function() {
                        $rootScope.message = 'Couldn\'t register user';
                        alert($rootScope.message);
                        $location.url('/');
                    });
		})
		.error(function() {
            $rootScope.message = 'Couldn\'t register user';
            alert($rootScope.message);
			$location.url('/');
		});
	};
});
