'use strict';

var utils = require( '../utils/writer.js' );
var User = require( '../service/UserService' );

module.exports.getUserByUsername = function getUserByUsername( req, res, next ) {
	var username = req.swagger.params['username'].value;
	User.getUserByUsername( username )
		.then( function ( response ) {
			utils.writeJson( res, response );
		} )
		.catch( function ( response ) {
			utils.writeJson( res, response );
		} );
};

module.exports.userLoginPOST = function userLoginPOST( req, res, next ) {
	var username = req.swagger.params["username"].value;
	var password = req.swagger.params["password"].value;
	console.log( "User " + username + " is trying to login" );
	User.userLoginPOST( username, password ).then( ids => {
		if ( Object.keys( ids ).length == 1 ) {
			console.log( "User " + username + " authenticated" );
			req.session.logged_id = ids[0].UserID;
			console.log( "Referer: " + req.headers.referer );
			console.log( "goBackTo: " + req.session.goBackTo );
			utils.writeJson( res, req.session.goBackTo, 200 );
		} else {
			console.log( "User " + username + " not authorized" );
			req.session = null;
			utils.writeJson( res, "", 401 );
		}
	} )
};

module.exports.userRegisterPOST = function userRegisterPOST( req, res, next ) {
	var username = req.swagger.params["username"].value;
	var password = req.swagger.params['password'].value;
	console.log( "User " + username + " is trying to register" );
	User.userRegisterPOST( username, password ).then( response => {
		if ( response.length == 1 ) {
			console.log( "User " + username + " authenticated" );
			console.log( "Referer: " + req.headers.referer );
			console.log( "goBackTo: " + req.session.goBackTo );
			utils.writeJson( res, "/index.html", 200 );
		} else {
			utils.writeJson( res, response, 401 );
		}
	} )
		.catch( function ( response ) {
			utils.writeJson( res, response );
		} );
};
