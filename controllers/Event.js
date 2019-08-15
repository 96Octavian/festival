'use strict';

var utils = require( '../utils/writer.js' );
var Event = require( '../service/EventService' );

module.exports.getCalendar = function getCalendar( req, res, next ) {
	var offset = req.swagger.params['offset'].value || 0;
	var limit = req.swagger.params['limit'].value || 20 < 500 ? req.swagger.params['limit'].value : 500;
	Event.getCalendar( offset, limit )
		.then( function ( response ) {
			utils.writeJson( res, response );
		} )
		.catch( function ( response ) {
			utils.writeJson( res, response );
		} );
};

module.exports.getEventByDate = function getEventByDate( req, res, next ) {
	var date = req.swagger.params['date'].value;
	Event.getEventByDate( date )
		.then( function ( response ) {
			utils.writeJson( res, response );
		} )
		.catch( function ( response ) {
			utils.writeJson( res, response );
		} );
};

module.exports.getEventById = function getEventById( req, res, next ) {
	var eventID = req.swagger.params['eventID'].value;
	Event.getEventById( eventID )
		.then( function ( response ) {
			utils.writeJson( res, response );
		} )
		.catch( function ( response ) {
			utils.writeJson( res, response );
		} );
};

module.exports.getEventByPerformer = function getEventByPerformer( req, res, next ) {
	var performerID = req.swagger.params['performerID'].value;
	Event.getEventByPerformer( performerID )
		.then( function ( response ) {
			utils.writeJson( res, response );
		} )
		.catch( function ( response ) {
			utils.writeJson( res, response );
		} );
};

module.exports.getEventBySeminar = function getEventBySeminar( req, res, next ) {
	var seminarID = req.swagger.params['seminarID'].value;
	Event.getEventBySeminar( seminarID )
		.then( function ( response ) {
			utils.writeJson( res, response );
		} )
		.catch( function ( response ) {
			utils.writeJson( res, response );
		} );
};

module.exports.getEventByType = function getEventByType( req, res, next ) {
	var type = req.swagger.params['type'].value;
	Event.getEventByType( type )
		.then( function ( response ) {
			utils.writeJson( res, response );
		} )
		.catch( function ( response ) {
			utils.writeJson( res, response );
		} );
};

module.exports.getEventType = function getEventType( req, res, next ) {
	Event.getEventType()
		.then( function ( response ) {
			utils.writeJson( res, response );
		} )
		.catch( function ( response ) {
			utils.writeJson( res, response );
		} );
};

module.exports.getSeminarByEvent = function getSeminarByEvent( req, res, next ) {
	var eventID = req.swagger.params['eventID'].value;
	Event.getSeminarByEvent( eventID )
		.then( function ( response ) {
			utils.writeJson( res, response );
		} )
		.catch( function ( response ) {
			utils.writeJson( res, response );
		} );
};
