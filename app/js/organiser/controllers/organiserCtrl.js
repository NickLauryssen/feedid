'use strict';

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
