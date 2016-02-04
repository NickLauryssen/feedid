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

app.controller('PersonCtrl', function($scope, $rootScope, $http, $location, $routeParams) {
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

app.controller('OrganiserCtrl', function($scope, $rootScope, $location, $http, $timeout, $window) {
    $scope.activities = [];
    $scope.locations = [];
    $scope.events = [];
    $scope.countries = [];
    $scope.actIndex = 0;
    $scope.locIndex = 0;
    $scope.intervalTime = 20;
    $scope.startTime = new Date().getHours() * 60 - 60;
    $scope.editingActivity = false;
    $scope.editingLocation = false;
    $scope.currentActivity = 0;

    //get countries
    $http.get(url + '/api/countries').success(function(countries) {
        for (var c in countries)
            $scope.countries.push(countries[c]);

    });


    //TODO: should become activities of the user only
    //get activities
    $http.get(url + '/api/activities').success(function(activities) {
        for (var a in activities)
            $scope.activities.push(activities[a]);
        if($scope.activities.length > 0){
          $scope.currentActivity = $scope.activities[0];
          $scope.selectTab(0);
        }
    });
/*
    //get events
    $http.get(url + '/api/events').success(function(events) {
        for (var e in events)
            $scope.events.push(events[e]);
    });*/

    //add new activity to activity list
    $scope.addActivity = function() {
        if(!$scope.activity.name)
            alert("Gelieve een naam te geven aan je activiteit");
        else {
          //TODO: Change to current user
          $scope.activity["user"] = "54feefcccf4100975819aeeb";
          console.log($scope.activity);

          $http.post(url + '/api/activities', $scope.activity)
              .success(function(activity) {
                  console.log(activity);
                  $scope.activity = activity;
                  $scope.activities.push($scope.activity);
                  $scope.activity = {};
              });

        }
    };

    $scope.editActivity = function() {
      if(!$scope.activity.name){
        alert("Gelieve een naam te geven aan je activiteit");
      }else{
        $http.put(url + '/api/activities/'+ $scope.activity._id, $scope.activity)
            .success(function(activity) {
                console.log("updated it!" , activity);
                $scope.activity = activity;

                $scope.activities.splice($scope.currentActivity,1,activity);
                $scope.activity = {};
            });
      }
    };

    $scope.removeActivity = function(index) {
      var act = $scope.activities[index];
      //  if(index < $scope.activities.length && index > -1){
      //    $scope.activities.splice(index,1);
         $http.delete(url+'/api/activities/'+ act._id).success(function(){
           alert("Removed " + act.name);
           $scope.activities.splice(index,1);
         }).error(function(err){
           console.log("An error occured while deleting: ", err);
         });
    };

    $scope.openActivityEditor = function(index) {
        $scope.currentActivity = index;
        $scope.activity = $scope.activities[index];
        $scope.editingActivity = true;
        var popup = document.getElementById("activitypopup");
        popup.style.visibility = "visible";
        document.getElementById("options_act_"+index).style.visibility = "hidden";
    };

    //add new location to location list
    $scope.addLocation = function() {
        if(!$scope.location.name)
            alert("Gelieve een naam te geven aan je locatie");
        else {
          console.log("adding", $scope.currentActivity._id);
          $scope.location["activity"] = $scope.currentActivity._id;
          console.log($scope.location);
          $http.post(url + '/api/locations', $scope.location)
              .success(function(location) {
                  console.log(location);
                  $scope.locations.push(location);
                  $scope.location = {};
              });
        }
    };

    $scope.editLocation = function() {
      if(!$scope.location.name){
        alert("Gelieve een naam te geven aan je activiteit");
      }else{
        $http.put(url + '/api/locations/'+ $scope.location._id, $scope.location)
            .success(function(activity) {
                console.log("updated it!" , location);
                $scope.location = location;

                $scope.locations.splice($scope.currentLocation,1,location);
                $scope.location = {};
            });
      }
    };

    $scope.selectLocation = function(index) {
        $scope.currentLocation = $scope.locations[index];
        locIndex = index;
    };

    $scope.removeLocation = function(index) {
      $scope.location = $scope.locations[index];
      var loc = $scope.location;
      console.log($scope.location);

       if(index < $scope.locations.length && index > -1){
        //  $scope.locations.splice(index,1);
         $http.delete(url+'/api/locations/'+ loc._id).success(function(){
           alert("Removed " + loc.name);
           $scope.locations.splice(index,1);
         });
       }
    };

    $scope.openLocationEditor = function(index) {
      $scope.location = $scope.locations[index];
      $scope.editingLocation = true;
      addLocation();
      document.getElementById("options_loc_"+index).style.visibility ="hidden";
    };

    //add new event to event list
    $scope.addEvent = function() {
        if(!$scope.event.name)
            alert("Gelieve een naam te geven aan je event");
        else {
            $scope.event.attendees = [];
            $scope.event.location = $scope.currentLocation._id;
            $http.post(url + '/api/events/', $scope.event)
                .success(function(event) {
                    event.lIndex = locIndex;
                    $scope.events.push(event);
                    $scope.event = {};
                });
        }
    };

    $scope.zoomIn = function () {
        $timeout(function() {
            if ($scope.intervalTime > 5)
                $scope.intervalTime /= 2;
        });
    };

    $scope.zoomOut = function() {
        $timeout(function() {
            if ($scope.intervalTime < 60)
                $scope.intervalTime *= 2;
        });
    };

    $scope.timelineToLeft = function () {
        $timeout(function() {
            $scope.startTime -= 3 * $scope.intervalTime;
        });
    };

    $scope.timelineToRight = function() {
        $timeout(function() {
            $scope.startTime += 3 * $scope.intervalTime;
        });
    };

    $scope.timelineToStart = function() {
        $timeout(function() {
            $scope.startTime = 0;
        });
    };

    $scope.timelineToEnd = function() {
        $timeout(function() {
            $scope.startTime = 24*60;
        });
    };

    $scope.selectTab = function(index) {
        $scope.actIndex = index;
        $scope.currentActivity = $scope.activities[index];

        //get locations
        $http.get(url + '/api/locations/'+$scope.currentActivity._id).success(function(locations) {
            $scope.locations = [];
            for (var l in locations){
                $scope.locations.push(locations[l]);
            }
            if($scope.locations.length > 0){
                $scope.currentLocation = $scope.locations[0];
                $scope.events = [];

                for (var loc in $scope.locations) {
                        $http.get(url + '/api/events/' + $scope.locations[loc]._id).success(function (events) {
                            var lIndex;
                            //FIX: index van corresponderende locatie vinden
                            //ISSUE: for-loop eindigt voor alle requests zijn afgelopen dus loc variabele niet up-to-date
                            for (var i in $scope.locations) {
                                if ($scope.locations[i]._id == events[0].location)
                                    lIndex = i;
                            }

                            for (var e in events) {
                                events[e].lIndex = lIndex;
                                $scope.events.push(events[e]);
                            }
                        });
                }
            }
        });
        console.log(index, $scope.currentActivity);
    }
});

//image uploader with ngFlow
app.controller('UploadCtrl', ['$scope', '$location', function($scope, $location){
    $scope.$on('flow::fileAdded', function (event, $flow, flowFile) {
        var path = $location.path();
        //check if upload is from /user:id page or /confirm:actID page so the correct user can be edited
        if(path.substr(0, path.indexOf("/",path.indexOf("/") +1 )) == '/confirm' || !$scope.editorEnabled)
            $scope.user.picture = flowFile.name;
        else
            $scope.editUser.picture = flowFile.name;
    });
}]);
