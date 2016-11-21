/*'use strict';

//directives
app.directive('passwordMatch', function(){
    return {
        restrict: 'A',
        scope: true,
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl){
            var checker = function (){
                var pass1 = scope.$eval(attrs.ngModel);
                var pass2 = scope.$eval(attrs.passwordMatch);
                return pass1 === pass2;
            };
            scope.$watch(checker, function (n) {
                ctrl.$setValidity("unique", n);
            });
        }

    };
});*/






// app.directive('fileUploader', function(){
//     return {
//         restrict:'E',
//         template:'<img id="profile_picture" alt="Profielfoto" width="160" height="160" src="/project/imageController/${user.picture.name}" /><br /><br /><div><input ng-model="user.picture" type="file" ></input><button ng-click="upload()">Volgende</button></div>',//+'<ul><li ng-repeat="file in files">{{file.name}} - {{file.type}}</li></ul>',
//         controller: function($scope, $fileUpload){
//             $scope.notReady = true;
//             $scope.upload= function (){
//                 $fileUpload.upload($scope.files);
//             };
//         },
//         link: function($scope, $element){
//             var fileInputElem = $element.find('input');
//             fileInputElem.bind('change', function(e){
//                 $scope.notReady = e.target.files.length == 0;
//                 $scope.files=[];

//                 //preview picture
//                  if (e.target.files && e.target.files[0]) {
//                         var reader = new FileReader();

//                         reader.onload = function (e) {
//                             $('#profile_picture').attr('src', e.target.result);
//                         }
//                         reader.readAsDataURL(e.target.files[0]);
//                     }
//                 //for(i in e.target.files){
//                     console.log('file: ', e.target.files[0]);
//                     if(typeof e.target.files[0] == 'object') $scope.files.push(e.target.files[0]);
//                 //}
//             });
//         }

//     }
// });


// app.service('$fileUpload', ['$http', function($http) {
//     this.upload = function(files) {
//         var formData = new FormData();
//         var folder = './partials/uploader.php';
//         formData.append('file_'+0, files[0]);
//         //Om te debuggen   debugger;
//         $http({method: 'POST', url: folder, data: formData, headers: {'Content-Type': undefined}, transformRequest: angular.identity})
//         .success(function(data, status, headers, config) {
//             console.log("data: " + status);
//         });
//     }
// }]);
