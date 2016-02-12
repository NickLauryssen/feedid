'use strict';

angular.module('feedID.organiser').directive('fiEvent', function() {
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
