'use strict';

var utils = require( '../utils/writer.js' );
var User = require( '../service/UserService' );

module.exports.logOut = function logOut( req, res, next ) {
	req.session = null;
	utils.writeJson( res, "/index.html", 200 );
};

module.exports.getCart = function getCart( req, res, next ) {
	var userID = req.session.logged_id;
	User.getCart( userID )
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

module.exports.reserveByEventID = function reserveByEventID( req, res, next ) {
	var eventID = req.swagger.params["eventID"].value;
	if ( typeof req.session.logged_id === 'undefined' ) {
		req.session = null;
		utils.writeJson( res, "", 401 );
		return;
	}
	var userID = req.session.logged_id;
	console.log( "User " + userID + " is trying to book an event" );
	User.reserveByEventID( userID, eventID ).then( ids => {
		console.log( ids );
		if ( ids.length > 0 ) {
			console.log( "Event " + eventID + " reserved" );
			utils.writeJson( res, "", 200 );
		} else {
			utils.writeJson( res, "", 401 );
		}
	} )
};

module.exports.removeByEventID = function removeByEventID( req, res, next ) {
	var eventID = req.swagger.params["eventID"].value;
	if ( typeof req.session.logged_id === 'undefined' ) {
		req.session = null;
		utils.writeJson( res, "", 401 );
		return;
	}
	var userID = req.session.logged_id;
	User.removeByEventID( userID, eventID ).then( ids => {
		console.log( ids );
		if ( ids == 1 ) {
			console.log( "Event " + eventID + " removed" );
			utils.writeJson( res, "", 200 );
		} else {
			utils.writeJson( res, "", 401 );
		}
	} )
};

module.exports.userRegisterPOST = function userRegisterPOST( req, res, next ) {
	var username = req.swagger.params["username"].value;
	var password = req.swagger.params['password'].value;
	console.log( "User " + username + " is trying to register" );
	User.userRegisterPOST( username, password ).then( response => {
		console.log( response );
		console.log( "Response: " + response );
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
