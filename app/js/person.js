$(document).ready(function(e) {
    //hide unselected tabcontents
    $('.tabcontent').hide();
    $('.overview').show();

	// NAVIGATE TABS
	$(".tab").off('click').click(function(e) {
		var elements = document.getElementsByClassName('active');

		$(elements[0]).addClass('inactive');
		$(elements[0]).removeClass('active');

		$(e.target).addClass("active");
		$(e.target).removeClass("inactive");

        //set current tabcontent visible
        $('.tabcontent').hide();
        $('.' + e.target.id).show();
	});
});
$( "#btn_register" ).click(function() {
    document.getElementById("regForm").reset();
});




