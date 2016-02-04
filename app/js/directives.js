'use strict';

var directives = angular.module('feedID.directives', []);

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
});

app.directive('fiEvent', function() {
   return {
       restrict: 'E',
       scope: true,
       replace: true,
       link: function(scope, elem, attrs) {
           var left = 150;
           var event = scope.events[attrs.eventIndex];
           //var location = scope.location[attrs.locationIndex];
           var itemStartTime = event.opening.start_hour * 60 + parseInt(event.opening.start_min);
           var itemEndTime = event.opening.end_hour * 60 + parseInt(event.opening.end_min);
           var itemLeft = left + (itemStartTime - scope.startTime) * (intervalwidth / scope.intervalTime);
           var itemLength = (itemEndTime - itemStartTime) * (intervalwidth / scope.intervalTime) - 5;
           var backgroundColor = "#5bbae2";
           var backgroundColorFull = "#4288a6";
           var itemHTML = '';

           if(event.attendees.length >= event.maxAttendees)
           {
               backgroundColor = backgroundColorFull;
           }

           function drawEvents(startTime, intervalTime) {
                  if ((startTime + amount * intervalTime) > (24 * 60)) {
                      scope.startTime = (24 * 60) - (amount * intervalTime);
                  }

                  if (startTime < 0) {
                      scope.startTime = 0;
                  }
                  itemLeft = left + (itemStartTime - startTime) * (intervalwidth / intervalTime);
                  itemLength = (itemEndTime - itemStartTime) * (intervalwidth / intervalTime) - 5;

                  if (itemLeft < left) {
                      var difference = left - itemLeft;
                      itemLeft = left;
                      itemLength -= difference;
                  }

                  // PREVENT RIGHT OVERFLOW
                  /*if(itemEndTime > (intervalTime * amount + startTime))
                   {
                   itemLength = (intervalTime * amount + startTime - itemStartTime) * (intervalwidth / intervalTime) - 5;
                   }*/

                  if (itemLength > 0) {
                      itemHTML = '';
                      itemHTML += '<div uib-popover="Hi" popover-trigger="mouseenter" class="rowitem" id="event_' + attrs.eventIndex + '" style="top:' + (50 * (event.lIndex)) + 'px; left:' + itemLeft + 'px; width:' + itemLength + 'px; background-color: ' + backgroundColor + ';">';
                      itemHTML += '<div class="itemtext"><p>' + event.name + '</p></div>';
                      itemHTML += '<img class="button" alt="Personen toevoegen" onclick="addPersons(' + attrs.eventIndex + ');" src="./icons/ic_person_add.png" />';
                      itemHTML += '</div>';
                      elem.html(itemHTML);
                  }
           }

           scope.$watch(function() {return scope.intervalTime;}, function(n) {
               drawEvents(scope.startTime, n);
           });



           scope.$watch(function() {return scope.startTime;}, function(n) {
               drawEvents(n, scope.intervalTime);
           });
       }
   }
});

app.directive('fiPopup', function() {
    return {
        restrict: 'E',
        scope: true,
        link: function (scope, elem, attrs) {
            var popup = document.getElementById('popup');
            var event = scope.events[attrs.eventIndex];
            popup.getElementsByClassName('name')[0].innerHTML = event.name;

            elem.html();
            $('#event_' + attrs.eventIndex).CreateBubblePopup({
                position: 'top',
                align: 'top',
                selectable: true,
                manageMouseEvents: false,
                innerHtml: document.getElementById('popup').innerHTML,
                innerHtmlStyle: {
                    color: '#28444B'
                },
                themeName: 'azure',
                themePath: './js/themes'
            });
        }
    }
});

app.directive('showPopup', ["$interval", function(interval){
  return {
    restrict: "A",
    link: function(scope, elem, attrs){
      $(elem).click(function(){
        console.log("clicked for popup");
      });
    }
  }
}]);

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
