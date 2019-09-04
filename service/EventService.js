'use strict';

let sqlDb;

exports.eventsDbSetup = function ( database ) {
	sqlDb = database;
	console.log( "Checking if Events table exists" );
	return database.schema.hasTable( "Events" ).then( exists => {
		if ( !exists ) {
			console.log( "It doesn't so we create it" );
			return database.schema.createTable( "Events", table => {
				table.increments();
				table.integer( "EventID" );
				table.text( "Facts" );
				table.text( "Abstract" );
			} );
		}
		else console.log( "Events table exists" );
	} );
};

/**
 * Get available events
 * Get a list of all the events in the calendar
 *
 * offset Integer Pagination offset. Default is 0. (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500. (optional)
 * returns List
 **/
exports.getCalendar = function ( offset, limit ) {
	return sqlDb( "Calendar" )
		.distinct( "Date" )
		.limit( limit )
		.offset( offset )
}

/**
 * Get available seminars
 * Get a list of all the seminars in the calendar
 *
 * offset Integer Pagination offset. Default is 0. (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500. (optional)
 * returns List
 **/
exports.getseminars = function ( offset, limit ) {
	return sqlDb( "Seminaries" )
		.limit( limit )
		.offset( offset )
}

/**
 * Find events by date
 * Returns a list of events
 *
 * date String date of events to return
 * returns List
 **/
exports.getEventByDate = function ( date ) {
	return sqlDb( "Calendar" )
		.select( 'EventID' )
		.where( 'Date', date )
		.then( rows => {
			let ids = []
			let lista = JSON.stringify( rows, null, 2 );
			lista = ( JSON.parse( lista ) );
			for ( let i = 0; i < lista.length; i++ ) {
				ids.push( lista[i].EventID );
			}
			return sqlDb( "Events" )
				.whereIn( 'EventID', ids );
		} )
}


/**
 * Find event by ID
 * Returns an event
 *
 * eventID Long ID of event to return
 * returns Event
 **/
exports.getEventById = function ( eventID ) {
	return sqlDb( "Events" )
		.where( 'EventID', eventID );
}

/**
 * Find seminar by ID
 * Returns a seminar
 *
 * seminarID Long ID of seminar to return
 * returns Seminar
 **/
exports.getSeminarById = function ( seminarID ) {
	return sqlDb( "Seminaries" )
		.where( 'SeminarID', seminarID );
}

/**
 * Find Gallery by ID
 * Returns a gallery
 *
 * seminarID Long ID of gallery to return
 * returns Gallery
 **/
exports.getGalleryById = function ( eventID ) {
	return sqlDb( "Gallery" )
		.where( 'EventID', eventID );
}

/**
 * Find events by performer
 * Returns a list of events
 *
 * performerID String performer of events to return
 * returns List
 **/
exports.getEventByPerformer = function ( performerID ) {
	return sqlDb( "EventToArtist" )
		.select( 'EventID' )
		.where( 'ArtistID', performerID )
		.then( rows => {
			let ids = []
			let lista = JSON.stringify( rows, null, 2 );
			lista = ( JSON.parse( lista ) );
			for ( let i = 0; i < lista.length; i++ ) {
				ids.push( lista[i].EventID );
			}
			return sqlDb( "Events" )
				.whereIn( 'EventID', ids );
		} )
}

/**
 * Find events by user
 * Returns a list of events
 *
 * userID String performer of events to return
 * returns List
 **/
exports.getEventByUser = function ( userID ) {
	console.log( "EventService" );
	return sqlDb( "UserToEvent" )
		.select( 'EventID' )
		.where( 'UserID', userID )
		.then( rows => {
			let ids = []
			let lista = JSON.stringify( rows, null, 2 );
			lista = ( JSON.parse( lista ) );
			for ( let i = 0; i < lista.length; i++ ) {
				ids.push( lista[i].EventID );
			}
			return sqlDb( "Events" )
				.whereIn( 'EventID', ids );
		} )
}

/**
 * Find events by seminar
 * Returns a list of events
 *
 * seminarID String seminar of events to return
 * returns List
 **/
exports.getEventBySeminar = function ( seminarID ) {
	return sqlDb( "EventToSeminar" )
		.select( 'EventID' )
		.where( 'SeminarID', seminarID )
		.then( rows => {
			let ids = []
			let lista = JSON.stringify( rows, null, 2 );
			lista = ( JSON.parse( lista ) );
			for ( let i = 0; i < lista.length; i++ ) {
				ids.push( lista[i].EventID );
			}
			return sqlDb( "Events" )
				.whereIn( 'EventID', ids );
		} )
}


/**
 * Find events by type
 * Returns a list of events
 *
 * type String type of events to return
 * returns List
 **/
exports.getEventByType = function ( type ) {
	return sqlDb( "TypeToEvent" )
		.select( 'EventID' )
		.where( 'Type', type )
		.then( rows => {
			let ids = []
			let lista = JSON.stringify( rows, null, 2 );
			lista = ( JSON.parse( lista ) );
			for ( let i = 0; i < lista.length; i++ ) {
				ids.push( lista[i].EventID );
			}
			return sqlDb( "Events" )
				.whereIn( 'EventID', ids );
		} )
}


/**
 * Find events type
 * Returns a list of events type
 *
 * returns List
 **/
exports.getEventType = function () {
	return new Promise( function ( resolve, reject ) {
		var examples = {};
		examples['application/json'] = [{}, {}];
		if ( Object.keys( examples ).length > 0 ) {
			resolve( examples[Object.keys( examples )[0]] );
		} else {
			resolve();
		}
	} );
}


/**
 * Find seminar by event
 * Returns a seminar
 *
 * eventID String event of seminar to return
 * returns Seminar
 **/
exports.getSeminarByEvent = function ( eventID ) {
	return sqlDb( "EventToSeminar" )
		.select( 'SeminarID' )
		.where( 'EventID', eventID )
		.then( rows => {
			let ids = []
			let lista = JSON.stringify( rows, null, 2 );
			lista = ( JSON.parse( lista ) );
			for ( let i = 0; i < lista.length; i++ ) {
				ids.push( lista[i].SeminarID );
			}
			return sqlDb( "Seminaries" )
				.whereIn( 'SeminarID', ids );
		} )
}

