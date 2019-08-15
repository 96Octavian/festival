// TODO: Wrap events in events.html
// TODO: Better spacing in events.html
// TODO: performer.html is for both artist and company
'use strict';

var fs = require( 'fs' ),
	path = require( 'path' ),
	http = require( 'http' );

var app = require( 'connect' )();
var morgan = require( 'morgan' );
var swaggerTools = require( 'swagger-tools' );
var jsyaml = require( 'js-yaml' );
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

	// Modify the URL
	app.use( function ( req, res, next ) {
		if ( req.url.includes( "materialize.js" ) ) req.url = "/js/materialize.js";
		if ( req.url.includes( "init.js" ) ) req.url = "/js/init.js";
		if ( req.url.includes( "performers/" ) && !req.url.includes( "byevent" ) ) {
			req.url = "performers.html";
		}
		if ( req.url.includes( "bytype/" ) ) {
			req.url = "types.html";
		}
		serving( req, res, next );
		//console.log( "Modified URL: " + req.url );
	} );

	// Start the server
	setupDataLayer().then( () => {
		http.createServer( app ).listen( serverPort, function () {
			console.log( 'Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort );
			console.log( 'Swagger-ui is available on http://localhost:%d/docs', serverPort );
		} );
	} );
} );
