'use strict';

angular.module('feedID.organiser').directive('fiPopup', function() {
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
})
.directive('showPopup', ["$interval", function(interval){
  return {
    restrict: "A",
    link: function(scope, elem, attrs){
      $(elem).click(function(){
        console.log("clicked for popup");
      });
    }
  }
}]);
