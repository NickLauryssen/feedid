'use strict';

angular.module('feedID.profile').controller('PersonCtrl', function($scope, $rootScope, $http, $location, $routeParams) {
    $scope.client = {};
    $scope.countries = [];
    $scope.userId = $routeParams.userId;
    $scope.tests = [];
    $scope.testResults = [];
    $scope.app = {};
    $rootScope.editorEnabled = false;
    $scope.releaseBtn = false;
    $scope.editBtn = false;
    $scope.canDoAdmin = false;


    if(($rootScope.currentUser._id =='54e83de7b752bfa10e47d8bf') || ($rootScope.currentUser._id =='5502409dd4ac39257ca71f86') || ($rootScope.currentUser._id =='54feefcccf4100975819aeeb')){
        $scope.canDoAdmin = true;
    }
    //get countries
    $http.get(url + '/api/countries').success(function(countries) {
        for (var c in countries)
            $scope.countries.push(countries[c]);

    });

    //get App
    $http.get(url + '/api/apps/Profile').success(function(resultApp){
        $scope.app = resultApp;
    });

    //register client and add client to database
    $scope.register = function() {
        $http.post(url + '/api/users', $scope.client).success(function(user) {
	        var userApp = {owner: $rootScope.currentUser._id, linkuser:user._id, app:$scope.app._id};
		    $scope.userapp = userApp;
	        $http.post(url+'/api/userapps',$scope.userapp);

                /*$http.post(url + '/api/register', $scope.client)
                    .success(function(message) {

                      $rootScope.message = 'User registered and mail is sent to your email.';
                        $location.url('/login');
                    })
                    .error(function() {
                        $rootScope.message = 'Couldn\'t register user';
                    });*/
                $rootScope.message = "User registered!";
                $scope.client = {};
                alert($rootScope.message);
        }).error(function() {
                $rootScope.message = 'Couldn\'t register user';
                alert($rootScope.message);
        });
    };

/**
 * This function is responsible for the content of the google charts.
 */
    $http.get(url + '/api/apps/Profile').success(function(resultApp) {
        $scope.app = resultApp;
        $http.get(url + '/api/users/' + $scope.userId + '/' + $scope.app._id).success(function (user) {
            $scope.user = user; //visible User

            if (!$scope.user.validated) {
                var owner_id = $rootScope.currentUser._id;
                var user_id = $scope.user._id;
                //get app to make sure it is set (I made another get app request here because sometimes this userapps request was sent before app was set)


                $http.get(url + '/api/userapps/' + owner_id + '/' + user_id + '/' + $scope.app._id)
                    .success(function (userapp) {
                        if (userapp._id) {
                            $scope.releaseBtn = true;
                            $scope.editBtn = true;
                        }
                    });
            }

            if ($rootScope.currentUser._id == $scope.user._id) {
                $scope.editBtn = true;
            }

/**
 * These charts are filled with testresults for this test.
 * The testresults are unique for a specific user.
 */
            $http.get(url + '/api/tests/'+ $scope.user._id).success(function (tests) {
                for (var i in tests) {
                    $scope.tests.push(tests[i]);
                }
                $scope.selectedTest = tests[0];

                /**
                 * Get all testresults from a specific user.
                 */
                $http.get(url + '/api/testresults/' + $scope.user._id).success(function (testResults) {

                    for (var i in testResults)
                        if(testResults[i]== null){
                         $scope.tests = [];
                        }else{
                            $scope.testResults = testResults;

                        }

                    /**
                     * For each test we make a new chart and store them in a charts array.(array == store of all test charts)
                     * Some configurations are made for the chart.
                     * The cols[] array represents the X-axis of the graph.
                     * The rows[] array will represent the Y-axis data.
                     */

                    for (var k in $scope.tests) {
                        var testId = $scope.tests[k]._id;
                        var aChart = {};
                        aChart.type = "LineChart";
                        aChart.displayed = "true";
                        aChart.data = {};
                        var cols = [];
                        var rows = [];
                        cols.push({"id": "time", "label": "Time", "type": "string", "p": {}});
                        for (var sub in $scope.tests[k].subTests) {
                            cols.push({
                                "id": $scope.tests[k].subTests[sub].name,
                                "label": $scope.tests[k].subTests[sub].name,
                                "type": "number",
                                "p": {}
                            });
                        }
                        aChart.data.cols = cols;
                        /**
                         * For each testresult of a user.
                         */

                        for (var res in $scope.testResults) {
                            if ($scope.testResults[res].test == testId) {
                                var o = {};
                                var valArray = [];
                                valArray.push({"v": $scope.testResults[res].time});

                                for (var r in $scope.testResults[res].subResults) {
                                    valArray.push({"v": $scope.testResults[res].subResults[r]});
                                }
                                o.c = valArray;
                                rows.push(o);
                            }
                        }
                        aChart.data.rows = rows;
                        //$scope.charts.push(aChart);
                        if (rows.length < 1) aChart = null;
                        $scope.tests[k].chart = aChart;
                    }
                });
            });
        });
    });

/**
 * Edit profile
 */

    $scope.enableEditor = function() {
        $rootScope.editorEnabled = true;
        $scope.editUser = $scope.user;
    };

    $scope.disableEditor = function() {
        $rootScope.editorEnabled = false;
    };

    $scope.save = function() {
        $scope.user = $scope.editUser;
        $http.put(url + '/api/users/' + $scope.editUser._id, $scope.editUser).success(function(usr) {
            $rootScope.message = "User updated successfully!";
            if($rootScope.currentUser._id == usr._id)
                $rootScope.currentUser = usr;
             alert($rootScope.message);
        });
        $scope.disableEditor();
    };

    $scope.sendConfirmEmail = function(){
         $http.post(url + '/register', $scope.user)
            .success(function(message) {
                alert('User registered and mail is sent to your email.');
            })
            .error(function() {
                $rootScope.message = 'Couldn\'t register user';
            });
    }
});
