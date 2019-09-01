let checkUserAuth = new XMLHttpRequest();

checkUserAuth.open( "HEAD", "/login.html", true );
checkUserAuth.onreadystatechange = function () {

	console.log( this.responseURL );

	if ( this.readyState === XMLHttpRequest.DONE && !this.responseURL.includes( "login" ) ) {

		document.getElementById( "login-desktop" ).innerHTML = "Cart";
		document.getElementById( "login-desktop" ).setAttribute( 'href', '/cart.html' );

		document.getElementById( "login-mobile" ).innerHTML = "Cart";
		document.getElementById( "login-mobile" ).setAttribute( 'href', '/cart.html' );

	}
}
checkUserAuth.send();
