<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib tagdir="/WEB-INF/tags" prefix="tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<script type="text/javascript" src="<c:url value="/resources/js/organiser.js" />"></script>
<ul>
	<c:forEach items="${tabs}" var="tab" varStatus="status">
		<li>
			<c:if test="${status.first }">
				<p class="active act" id="actid_${tab.id}">${tab.name}</p>
			</c:if> 
			<c:if test="${!status.first }">
				<p class="inactive act" id="actid_${tab.id}">${tab.name}</p>
			</c:if>
			
			<img class="optionsbutton edit" id="actimg_${tab.id}" alt="Opties" src="<c:url value="/resources/icons/ic_arrow_bold_down.png" />">
			<tags:optionspopup id="act_${tab.id}" />
		</li>
	</c:forEach>
	<li>
		<p onclick="addActivity(event);" class="inactive edit" id="act_add">ACTIVITEIT TOEVOEGEN</p>
	</li>
</ul>
<tags:activitypopup />