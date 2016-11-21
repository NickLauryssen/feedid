'use strict';

angular.module('feedID.organiser').service('activityService', ActivityService);

class ActivityService {
	constructor(resourceManager) {
		this.resourceManager = resourceManager;
	}

	addActivity() {
		this.resourceManager.handle('/api/activities', $scope.activity)
			.success(function(activity) {
				console.log(activity);
				$scope.activity = activity;
				$scope.activities.push($scope.activity);
				$scope.activity = {};
			});
	}
}
