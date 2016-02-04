<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib tagdir="/WEB-INF/tags" prefix="tags"%>
<link href="<c:url value="/resources/css/jquery-bubble-popup-v3.css" />" rel="stylesheet" type="text/css" media="screen" />
<script type="text/javascript" src="<c:url value="//resources/js/jquery-1.11.3.min.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/js/jquery-bubble-popup-v3.min.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/js/organiserrows.js" />"></script>
<c:set var="index" value="0" scope="page"/>
<c:forEach items="${locations}" var="loc">
	<c:if test="${actid==loc.activity.id}">
		<script type="text/javascript">
			var locations = [];
			locations.push(
				{id:'${loc.id}',
				name:'${loc.name}',
				addressStreet:'${loc.locationaddress.street}',
				addressNumber:'${loc.locationaddress.number}',
				addressPostalCode:'${loc.locationaddress.postalcode}',
				addressCity:'${loc.locationaddress.city}',
				addressCountryCode:'${loc.locationaddress.country.countrycode}',
				addressCountryName:'${loc.locationaddress.country.countryname}',
				description:'${loc.description}',
				openingStartHour:'${loc.opening.startHour}',
				openingStartMin:'${loc.opening.startMin}',
				openingEndHour:'${loc.opening.endHour}',
				openingEndMin:'${loc.opening.endMin}',
				activityId:'${loc.activity.id}'}
			);
		</script>
		<div class="row" id="loc_${loc.id}"
			style="top: ${index * 50}px;">
			<div class="rowtitle">
				<h2>${loc.name}</h2>
				<img class="optionsbutton edit" id="locimg_${index}" alt="Opties" src="<c:url value="/resources/icons/ic_arrow_bold_down.png" />">
				<tags:optionspopup id="loc_${loc.id}" />
			</div>
			<div class="rowcontent">
			</div>
		</div>
		<c:set var="index" value="${index + 1}" scope="page"/>
	</c:if>
	<c:set var="rows" value="${index}" />
</c:forEach>
<div class="row edit" id="loc_add" style="top: ${index * 50}px;">
	<div class="rowtitle">
		<h2 onclick="addLocation(event);">LOCATIE TOEVOEGEN</h2>
	</div>
</div>
<div id="guides" style="height: 460px">
	<c:forEach begin="0" end="${amount}" varStatus="status">
		<div class="guide" style="left: ${left + status.index * intervalwidth}px; height: ${index * 50}px"></div>
	</c:forEach>
</div>
<div id="tags">
	<tags:eventpopup />
	<tags:editeventpopup id="${actid}"/>
	<tags:locationpopup id="${actid}" />
	<tags:addpersonpopup />
</div>
