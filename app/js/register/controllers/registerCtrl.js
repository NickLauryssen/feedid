app.controller('RegisterCtrl', function($scope, $rootScope, $http, $location) {
	$scope.register = function() {
        $http.post(url + '/api/users', $scope.user)
            .success(function(message) {
                $http.post(url + '/register', $scope.user)
                    .success(function(message) {
                        $rootScope.message = 'User registered and mail is sent to your email.';
                        $location.url('/');
                    })
                    .error(function() {
                        $rootScope.message = 'Couldn\'t register user';
                    });
            })
            .error(function() {
                $rootScope.message = 'Couldn\'t register user';
            });
    };
});
