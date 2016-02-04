//author: Nick
/*
 *	This file is sooo outdated... @TODO: fix with directive
var current = "step1";

$(document).ready(function(){
	//Hide the div when page load
	$(".info").hide();
	$("#" +current).show(800);
	$("#arrow_previous").hide();

	document.getElementById("s1").className = "active";
	document.getElementById("s2").className = "inactive";
	document.getElementById("s3").className = "inactive";
});


function next() {
	if(current=="step1") {
		current="step2";

		document.getElementById("s1").className = "inactive";
		document.getElementById("s2").className = "active";
		document.getElementById("s3").className = "inactive";
		$("#arrow_previous").show();
	} else if(current=="step2") {
		current="step3";

		document.getElementById("s1").className = "inactive";
		document.getElementById("s2").className = "inactive";
		document.getElementById("s3").className = "active";
		$("#arrow_next").hide();
	}
	displayStep();
}

function back() {

	if(current=="step2") {
		current="step1";

		document.getElementById("s1").className = "active";
		document.getElementById("s2").className = "inactive";
		document.getElementById("s3").className = "inactive";
		$("#arrow_previous").hide();
	} else if(current=="step3") {
		current="step2";

		document.getElementById("s1").className = "inactive";
		document.getElementById("s2").className = "active";
		document.getElementById("s3").className = "inactive";
		$("#arrow_next").show();
	}
	displayStep();
}

function displayStep() {
	$(".info").hide(300);
	$("#" +current).show(1200);
}
*/
