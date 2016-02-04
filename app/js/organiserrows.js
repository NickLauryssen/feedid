//authors: Nick, Ronald
/*
 * This file is also very outdated and tricky. @TODO: wrap this in angular context with directives

// FORMAT FUNCTIONS

String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
};
var events;

// WINDOW LOAD EVENT

/*window.onload = function()
{
	g_globalObject = new JsDatePick({
		useMode : 1,
		isStripped : true,
		target : "calendar"
	});

	g_globalObject.setOnSelectedDelegate(function(){
		var obj = g_globalObject.getSelectedDay();
		date.setFullYear(obj.year, obj.month - 1, obj.day);

		startdate = obj.year + '-' + obj.month + '-' + obj.day + '-00-00-00';
		enddate = obj.year + '-' + obj.month + '-' + (obj.day + 1) + '-00-00-00';

		calculateStarttime();
		clearTimeline();
		loadTimeline();
		clearEvents();
	});

	startdate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '-00-00-00';
	enddate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + (now.getDate() + 1) + '-00-00-00';

	$("#loading").hide();
	calculateStarttime();
    clearTimeline();
    loadTimeline();
	updateEditButtons();
};

// WINDOW RESIZE EVENT

window.onresize = function()
{
	hidePopups();
	clearTimeline();
	loadTimeline();
	clearEvents();
};

// SHOW LOADING WHILE AJAX REQUEST

$('#loading').bind('ajaxStart', function(){
	var element = document.getElementById('loading');
	$(element).show();
}).bind('ajaxStop', function(){
    $(this).hide();
});

// CALCULATE STARTTIME

function calculateStarttime()
{
	if(now.getTime() == date.getTime())
	{
		starttime = now.getHours() * 60 - 60;
	}
	else
	{
		starttime = 8 * 60;
	}
}

// LOAD TIMELINE

function loadTimeline()
{
	var time = '';
	var hours = '';
	var minutes = '';
	var innerHTML = '';

	screenwidth = window.innerWidth;

	// CALCULATE NUMBER OF TIME BLOCKS

	if(screenwidth < bodywidth)
	{
		screenwidth = bodywidth;
	}
	amount = Math.floor((screenwidth - left - intervalwidth)/ intervalwidth);

	if((amount * intervaltime) > (24*60))
	{
		amount = (24*60) / intervaltime;
	}

	// ADJUST TIMELINE

	if((starttime + amount * intervaltime) > (24 * 60))
	{
		starttime = (24*60) - (amount * intervaltime);
	}
	if(starttime < 0)
	{
		starttime = 0;
	}

	// PUT LEFT ARROWS ON TIMELINE



	// PUT TIME BLOCKS ON TIMELINE

	for (var i=0; i<amount; i++)
	{
		time = starttime + intervaltime * i;
		hours = Math.floor(time/60);
		if(time%60 < 10){
			minutes = '0' + time%60;
		}else{
			minutes = time%60;
		}
		innerHTML += '<div class="time" style="left:' + (left + i*intervalwidth )+  'px;">' + hours + ':' + minutes + '</div>';
	}

	// PUT RIGHT ARROWS ON TIMELINE


	document.getElementById('timetable').innerHTML = innerHTML;
};

// CLEAR TIMELINE

function clearTimeline()
{
	document.getElementById('timetable').innerHTML = '';
}

// ADJUST TIMELINE

function timelineToLeft()
{
	starttime -= 3*intervaltime;
	refreshOrganiser();
}

function timelineToRight()
{
	starttime += 3*intervaltime;
	refreshOrganiser();
}

function timelineToStart()
{
	starttime = 0;
	refreshOrganiser();
}

function timelineToEnd()
{
	starttime = 24*60;
	refreshOrganiser();
}

function zoomInOrganiser()
{
	if(intervaltime > 5)
	{
		intervaltime /= 2;
		refreshOrganiser();
	}
}

function zoomOutOrganiser()
{
	if(intervaltime < 60)
	{
		intervaltime *= 2;
		refreshOrganiser();
	}
}

function refreshOrganiser()
{
	clearTimeline();
	loadTimeline();
	clearEvents();
	//drawEvents();
}

function drawEvents()
{
	var index = 0;
	while(events[index])
	{
		var id = events[index].id;
		var name = events[index].name;
		var locationId = events[index].locationId;
		var startYear = events[index].startYear;
		var startMonth = events[index].startMonth;
		var startDay = events[index].startDay;
		var startHour = events[index].startHour;
		var startMin = events[index].startMin;
		var endHour = events[index].endHour;
		var endMin = events[index].endMin;
		var maxAttendees = events[index].maxAttendees;
        var attendees = 0;

		var itemStartTime = startHour * 60 + startMin;
		var itemEndTime = endHour * 60 + endMin;
		var itemLeft = left + (itemStartTime - starttime) * (intervalwidth / intervaltime);
		var itemLength = (itemEndTime - itemStartTime) * (intervalwidth / intervaltime) - 5;

		var backgroundColor = "#5bbae2";
		var backgroundColorFull = "#4288a6";
		if(attendees.length >= maxAttendees)
		{
			backgroundColor = backgroundColorFull;
		}

		// PREVENT LEFT OVERFLOW
		if(itemLeft < left)
		{
			var difference = left - itemLeft;
			itemLeft = left;
			itemLength -= difference;
		}

		// PREVENT RIGHT OVERFLOW
		if(itemEndTime > intervaltime * amount + starttime)
		{
			itemLength = (intervaltime * amount + starttime - itemStartTime) * (intervalwidth / intervaltime) - 5;
		}

		// PUT IN HTML
		if(itemLength > 0)
		{
			var itemHTML = '';
			itemHTML += '<div class="rowitem" id="event_' + id + '" style="left:' + itemLeft + 'px; width:' + itemLength + 'px; background-color: ' + backgroundColor + ';">';
			itemHTML += '<div class="itemtext"><p>' + name + '</p></div>';
			itemHTML += '<img class="button" alt="Personen toevoegen" onclick="addPersons(' + id + ');" src="/project/resources/icons/ic_persons_add.png" />';
			itemHTML += '</div>';
			document.getElementById('loc_' + index).getElementsByClassName('rowcontent')[0].innerHTML += itemHTML;
		}

		// FILL POPUP
		var popup = document.getElementById('popup');
		popup.getElementsByClassName('name')[0].innerHTML = name;
		popup.getElementsByClassName('time')[0].innerHTML =
			startDay + '/' + startMonth + '/' + startYear + ' om ' +
			startHour + '.' + ('0' + startMin).substr(('0' + startMin).length-2); + 'u';
		for(var i=0; i<locations.length; i++)
		{
			if(locationId == locations[i].id)
			{
				popup.getElementsByClassName('location')[0].innerHTML =
					locations[i].addressStreet + ' ' + locations[i].addressNumber + '<br />' +
					locations[i].addressPostalCode + ' ' + locations[i].addressCity + '<br />' +
					locations[i].addressCountryName;
			}
			else
			{
				popup.getElementsByClassName('location')[0].innerHTML = '';
			}
		}

		// CREATE POPUP
		$('#event_' + id).CreateBubblePopup({
			position : 'top',
			align : 'top',
			selectable : true,
			manageMouseEvents : false,
			innerHtml : document.getElementById('popup').innerHTML,

			innerHtmlStyle : {
				color : '#28444B'
			},

			themeName : 'azure',
			themePath : './resources/js/themes'
		});

		index++;
	}

	loadEventPopups();
}

function clearEvents()
{
	hidePopups();
	var locations = document.getElementsByClassName('rowcontent');
	for (var i=0; i<locations.length; i++)
	{
		locations[i].innerHTML = '';
	}
}

// ADD PERSONS TO EVENT

function addPersons(eventId)
{
	var popup = document.getElementById("addpersonpopup");
	popup.style.visibility = "visible";
	var list = document.getElementsByClassName("searchitemlist")[0];
	window.event.stopPropagation();

	$.ajax({
		type: "GET",
		url: "./getallusers",
		dataType: "json",
		success: function(data)
		{
			users = data;
			var itemsHTML = '';

			for(var i=0; i<users.length; i++)
			{
				itemsHTML += '<li class="searchitem" onclick="addPersonToEvent(' + users[i].id + ',' + eventId + ');" >';
				itemsHTML += '<img alt="Profile picture" src="./imageController/' + users[i].picture.name + '">';
				itemsHTML += '<p>' + users[i].firstname + '</p>';
				itemsHTML += '</li>';
			}
			list.innerHTML = itemsHTML;
		}
	});
}

function addPersonToEvent(personId, eventId)
{
	$.ajax({
		type: "GET",
		url: "./joinevent",
		data: {userId : personId, eventId : eventId},
		success:function(data) {
			var popup = document.getElementById("addpersonpopup");
			popup.style.visibility = "hidden";
		}
	});
}

// LOAD LOCATION ROWS

function loadRows(id) {
	$.ajax({
		type: "GET",
		url: "./getrows",
		data: {actid : id},
		beforesend:function(){
			$('#loading').show();
		}, complete: function(){
	        $('#loading').hide();
	    },
		success:function(data){
				$("#rows").html(data);
				updateEditButtons();
		}
	});
}

//EDIT ORGANISER

function edit() {
	editbuttons = document.getElementsByClassName('edit');
	if(editmode){
		editmode = false;
		stopEdit();
	}else{
		editmode = true;
		startEdit();
	}
}

function startEdit() {
	for (var i=0; i<editbuttons.length; i++) {
		editbuttons[i].style.visibility = "visible";
	}
}

function stopEdit() {
	for (var i=0; i<editbuttons.length; i++) {
		editbuttons[i].style.visibility = "hidden";
	}
}

function updateEditButtons()
{
	editbuttons = document.getElementsByClassName('edit');
	if(editmode){
		for (var i=0; i<editbuttons.length; i++) {
			editbuttons[i].style.visibility = "visible";
		}
	}else{
		for (var i=0; i<editbuttons.length; i++) {
			editbuttons[i].style.visibility = "hidden";
		}
	}
}

// ADD ACTIVITY

function createActivity(event) {
	var popup = document.getElementById("activitypopup");
	popup.style.visibility = "visible";

	var evt = event || window.event;
	evt.stopPropagation();
}

// ADD LOCATION

function addLocation(event) {
	var popup = document.getElementById("locationpopup");
	popup.style.visibility = "visible";

	var evt = event || window.event;
	evt.stopPropagation();
}

// ADD EVENT

function addEvent(event){
	var popup = document.getElementById("editeventpopup");
	popup.style.visibility = "visible";

	//var event_location = document.getElementById("create_event_location");
	//event_location.value = location;

	var editeventpopup = document.getElementById("editeventpopup");
	editeventpopup.getElementsByClassName("day")[0].value = date.getDate();
	editeventpopup.getElementsByClassName("day")[1].value = date.getDate();
	editeventpopup.getElementsByClassName("month")[0].value = date.getMonth() + 1;
	editeventpopup.getElementsByClassName("month")[1].value = date.getMonth() + 1;

    closePopup();

	var evt = event || window.event;
	evt.stopPropagation();
}

//CLOSE POPUP

function closePopup() {
	$(".optionspopup.open").slideUp(50);
	$(".optionspopup.open").removeClass("open");
}

//SHOW EDIT POPUP

function editActivity(id) {
	var popup = document.getElementById("activitypopup");
	popup.style.visibility = "visible";

	closePopup();
	window.event.stopPropagation();
}

// SHOW EDIT POPUP

function editLocation(id) {
	var popup = document.getElementById("locationpopup");
	popup.style.visibility = "visible";

	closePopup();
	window.event.stopPropagation();
}

// REMOVE ACTIVITY

function removeActivity(id) {
	$.ajax({
		type: "GET",
		url: "./removeActivity",
		data: {actid : id},
		success:function(data) {
			$('#tabs').html(data);
		}
		});

	closePopup();
	window.event.stopPropagation();
}

// REMOVE LOCATION

function removeLocation(id){
	$.ajax({
		type: "GET",
		url: "./removeLocation",
		data: {locid : id, actid : getActiveTab()},
		success:function(data) {
			$('#rows').html(data);
		}
	});

	closePopup();
	window.event.stopPropagation();
}

// GET CURRENT ACTIVE TAB

function getActiveTab() {
	var elements = document.getElementsByClassName('active');

	return elements[0].id.substr(6);
}

// HIDE INFO POPUP

function hidePopups() {
	$('.rowitem').HideAllBubblePopups();
}

// NAVIGATE TROUGH ACTIVITIES

function toggleActivity(e) {
	var elements = document.getElementsByClassName('active');

	for(var i=0;i<elements.length;i++) {
		$(elements[0]).addClass('inactive');
		$(elements[0]).removeClass('active');
	}

	$(e.target).addClass("active");
	$(e.target).removeClass("inactive");

	calculateStarttime();
	clearTimeline();
	loadTimeline();
	clearEvents();
};

function loadEventPopups()
{
	// SHOW ITEM POPUP

	$('.rowitem').off('click').on('click', function() {
		$('.rowitem').HideAllBubblePopups();
		id = this.id;
		$('#' + id).ShowBubblePopup();
	});
}

function hideForm(e)
{
    $form = $(e.target).closest('form');
    x = document.forms[$form.attr('name')]["name"].value;

    if(x != null || x != "")
        $(".popup").css("visibility", "hidden");
    refreshOrganiser();
}

// SHOW OPTIONS POPUP

function toggleOptionsPopup(e) {
    var element = document.getElementById(e.target.id);
    var menu = $(element).siblings(".optionspopup");
    var offsets = document.getElementById(e.target.id).getBoundingClientRect();
    var top = offsets.top;
    var left = offsets.left;
    var popupid, popupdiv;

    if (e.target.id.startsWith('act')) {
        popupid = 'options_act' + e.target.id.substr(6);
        popupdiv = document.getElementById(popupid);
        popupdiv.style.left = left + 20 + "px";
        popupdiv.style.top = top + "px";
    } else if(e.target.id.startsWith('loc')) {
        popupid = 'options_loc' + e.target.id.substr(6);
        popupdiv = document.getElementById(popupid);
    }

    popupdiv.style.visibility = "visible";

    if (menu.hasClass("open")) {
        $(menu[0]).removeClass("open");
        $(menu[0]).slideUp(100);
    }
    else {
        $(".optionspopup.open").slideUp(100);
        $(".optionspopup.open").removeClass("open");
        $(menu[0]).addClass("open");
        $(menu[0]).slideDown(100);
    }
};


// DO IF DOCUMENT READY
$(document).ready(function() {
    g_globalObject = new JsDatePick({
        useMode : 1,
        isStripped : true,
        target : "calendar"
    });

    g_globalObject.setOnSelectedDelegate(function(){
        var obj = g_globalObject.getSelectedDay();
        date.setFullYear(obj.year, obj.month - 1, obj.day);

        startdate = obj.year + '-' + obj.month + '-' + obj.day + '-00-00-00';
        enddate = obj.year + '-' + obj.month + '-' + (obj.day + 1) + '-00-00-00';

        calculateStarttime();
        clearTimeline();
        loadTimeline();
        clearEvents();
    });

    startdate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '-00-00-00';
    enddate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + (now.getDate() + 1) + '-00-00-00';

    $(".optionspopup").hide();

	if ($('div').hasClass('rowfill')) {
		// resize opening hours
		$(".rowfill").resizable({
			handles : 'e, w',
			grid : 12
		});
	}

    $("#loading").hide();
    calculateStarttime();
    clearTimeline();
    loadTimeline();

	// CLOSE POPUP IS CLICKED OUTSIDE

	$('body').click(function(e) {
		checkClick("locationpopup");
		checkClick("activitypopup");
		checkClick("editeventpopup");
		//checkClick("addpersonpopup");

		function checkClick(id) {
			if(!(e.target==$('.optionspopup'))) {
				if (!(e.target.id == id || $(e.target).parents("#" + id).size())) {
					var popup = document.getElementById(id);
					popup.style.visibility = "hidden";
				}
			}
		}
	});
});
*/
