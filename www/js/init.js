(function($){
  $(function(){

    $('.sidenav').sidenav();
	  $( '.parallax' ).parallax();
	  $( ".event-dropdown-trigger" ).dropdown( { constrainWidth: true, coverTrigger: false, hover: true } );
	  $( ".mobile-event-dropdown-trigger" ).dropdown( { constrainWidth: true, coverTrigger: false, hover: false } );

  }); // end of document ready
})(jQuery); // end of jQuery name space
