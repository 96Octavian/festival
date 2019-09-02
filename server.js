// TODO: Wrap events in events.html
// TODO: Better spacing in events.html
// TODO: performer.html is for both artist and company
'use strict';

var fs = require( 'fs' ),
	path = require( 'path' ),
	http = require( 'http' ),
	util = require( 'util' );

var app = require( 'connect' )();
var morgan = require( 'morgan' );
var swaggerTools = require( 'swagger-tools' );
var jsyaml = require( 'js-yaml' );
let cookieSession = require( "cookie-session" );
let cookieParser = require( "cookie-parser" );
var serverPort = process.env.PORT || 8080;
let serveStatic = require( "serve-static" );

let { setupDataLayer } = require( "./service/DataLayer" );

// swaggerRouter configuration
var options = {
	swaggerUi: path.join( __dirname, '/swagger.json' ),
	controllers: path.join( __dirname, './controllers' ),
	useStubs: process.env.NODE_ENV !== 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync( path.join( __dirname, 'api/swagger.yaml' ), 'utf8' );
var swaggerDoc = jsyaml.safeLoad( spec );

// Add cookies to responses
app.use( cookieParser() );
app.use( cookieSession( { keys: ["secret"] } ) );

var serving = serveStatic( __dirname + "/www" );

app.use( morgan( 'common' ) );

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware( swaggerDoc, function ( middleware ) {

	// Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
	app.use( middleware.swaggerMetadata() );

	// Validate Swagger requests
	app.use( middleware.swaggerValidator() );

	// Route validated requests to appropriate controller
	app.use( middleware.swaggerRouter( options ) );

	// Serve the Swagger documents and Swagger UI
	app.use( middleware.swaggerUi() );

	//// Redirect if logged in
	//app.use( "/login.html", function ( req, res, next ) {
	//	console.log( "Session " + util.inspect( req.session ) );
	//	req.session.goBackTo = req.headers.referer;
	//	if ( typeof ( req.session.logged_id ) !== 'undefined' ) {
	//		res.writeHead( 307, { "Location": '/cart.html' } );
	//		res.end();
	//	} else {
	//		next();
	//	}
	//} );
	//app.use( "/cart.html", function ( req, res, next ) {
	//	console.log( "Session " + util.inspect( req.session ) );
	//	req.session.goBackTo = req.headers.referer;
	//	if ( typeof ( req.session.logged_id ) !== 'undefined' ) {
	//		res.writeHead( 307, { "Location": '/login.html' } );
	//		res.end();
	//	} else {
	//		next();
	//	}
	//} );

	// Modify the URL
	app.use( function ( req, res, next ) {
		if ( req.url.includes( "materialize.js" ) ) req.url = "/js/materialize.js";
		if ( req.url.includes( "init.js" ) ) req.url = "/js/init.js";
		if ( req.url.includes( "performers/" ) && !req.url.includes( "by" ) ) {
			req.url = "performers.html";
		}
		if ( req.url.match( /^\/events\/([0-9]+)$/ ) ) {
			req.url = "event.html";
		}
		if ( req.url.includes( "bytype/" ) ) {
			req.url = "types.html";
		}
		if ( req.url.match( /^\/affiliation\/([0-9]+)$/ ) ) {
			req.url = "affiliation.html";
		}
		if ( req.url.includes( "byperformer/" ) ) {
			req.url = "byperformer.html";
		}
		if ( req.url.includes( "bydate/" ) ) {
			req.url = "sameday.html";
		}
		if ( req.url.includes( "seminarbyevent/" ) ) {
			req.url = "seminar.html";
		}
		if ( req.url.includes( "byseminar/" ) ) {
			req.url = "byseminar.html";
		}
		if ( req.url.match( /^\/events\/seminaries\/([0-9]+)$/ ) ) {
			req.url = "seminar.html";
		}
		if ( req.url.includes( "login.html" ) || req.url.includes( "cart.html" ) ) {
			console.log( "Session " + util.inspect( req.session ) );
			if ( req.url.includes( "login.html" ) ) {
				req.session.goBackTo = req.headers.referer;
				if ( typeof ( req.session.logged_id ) !== 'undefined' ) {
					res.writeHead( 307, { "Location": 'cart.html' } );
					res.end();
					return;
					//req.url = "cart.html";
					//console.log( "Now: " + req.url );
				}
			}
			else {
				req.session.goBackTo = req.headers.referer;
				if ( typeof ( req.session.logged_id ) === 'undefined' ) {
					res.writeHead( 307, { "Location": 'login.html' } );
					res.end();
					return;
					//req.url = "login.html";
					//console.log( "Now: " + req.url );
				}
			}
		}
		if ( req.url.includes( "backend" ) ) {
			if ( req.url.includes( "swaggerui" ) ) {
				res.writeHead( 307, { "Location": '/docs' } );
				res.end();
				return;
			}
			if ( req.url.includes( "spec.yaml" ) ) {
				req.url = "swagger.yaml";
			}
			if ( req.url.includes( "app.zip" ) ) {
				req.url = "app.zip";
			}
		}

		serving( req, res, next );
	} );

	// Start the server
	setupDataLayer().then( () => {
		http.createServer( app ).listen( serverPort, function () {
			console.log( 'Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort );
			console.log( 'Swagger-ui is available on http://localhost:%d/docs', serverPort );
		} );
	} );
} );
