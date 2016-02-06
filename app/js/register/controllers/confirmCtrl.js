
app.controller('ConfirmCtrl', function ($scope, $rootScope, $http, $location, $routeParams) {
    $scope.countries = [];
    $scope.address = [];
    $scope.actId = $routeParams.activationId;
    $scope.sex = [{id: '0', name:"Man"}, {id: '1', name: "Vrouw"}];
    $scope.user = [];
    $scope.app = [];
    $scope.releaseBtn = false;

    //get App
    $http.get(url + '/api/apps/Profile').success(function(resultApp){
        $scope.app = resultApp;
    });

    //set sex default man
    $scope.user.sex = $scope.sex[0];

    if($scope.user.sex == null){
        $location.url('/');
    }

    //validate user
    $http.get(url + '/api/users/validate/'+$scope.actId).success(function(user){
        $scope.user = user;
        //check if user has an owner (to set new password by claiming user)
        if(!$scope.user.validated){
            var user_id = $scope.user._id;

            //get app to make sure it is set (I made another get app request here because sometimes this userapps request was sent before app was set)
            $http.get(url + '/api/apps/Profile').success(function(resultApp) {
                $scope.app = resultApp;

                $http.get(url + '/api/userapps/' + user_id + '/' + $scope.app._id).success(function (userapp) {
                    if (userapp._id) {
                        $scope.releaseBtn = true;
                    }
                });
            });
        } else {
            $location.url('/');
        }
    });

    //get countries
    $http.get(url + '/api/countries').success(function(countries) {
        for (var c in countries)
            $scope.countries.push(countries[c]);

        $scope.address.country = countries[0];
    });

    //confirm user's personal information
    $scope.confirm = function() {
        $scope.user.validated = true;
        $http.put(url + '/api/users/' + $scope.user._id, $scope.user).success(function(){
            $http.put(url + '/api/users/reset/' + $scope.user._id, $scope.user).success(function() {
                $location.url('/');
            });
        });
    };
});
