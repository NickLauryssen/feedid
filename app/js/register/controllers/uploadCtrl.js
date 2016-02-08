'use strict';

angular.module('feedID.register').controller('UploadCtrl', ['$scope', '$location', function($scope, $location){
	//image uploader with ngFlow
    $scope.$on('flow::fileAdded', function (event, $flow, flowFile) {
        var path = $location.path();
        //check if upload is from /user:id page or /confirm:actID page so the correct user can be edited
        if(path.substr(0, path.indexOf("/",path.indexOf("/") +1 )) == '/confirm' || !$scope.editorEnabled)
            $scope.user.picture = flowFile.name;
        else
            $scope.editUser.picture = flowFile.name;
    });
}]);
