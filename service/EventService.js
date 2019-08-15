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
	//return new Promise( function ( resolve, reject ) {
	//	var examples = {};
	//	examples['application/json'] = [{
	//		"fact": "fact",
	//		"id": 0,
	//		"abstract": "abstract",
	//		"type": {},
	//		"gallery": "gallery"
	//	}, {
	//		"fact": "fact",
	//		"id": 0,
	//		"abstract": "abstract",
	//		"type": {},
	//		"gallery": "gallery"
	//	}];
	//	if ( Object.keys( examples ).length > 0 ) {
	//		resolve( examples[Object.keys( examples )[0]] );
	//	} else {
	//		resolve();
	//	}
	//} );
}


/**
 * Find events by date
 * Returns a list of events
 *
 * date String date of events to return
 * returns List
 **/
exports.getEventByDate = function ( date ) {
	return new Promise( function ( resolve, reject ) {
		var examples = {};
		examples['application/json'] = [{
			"fact": "fact",
			"id": 0,
			"abstract": "abstract",
			"type": {},
			"gallery": "gallery"
		}, {
			"fact": "fact",
			"id": 0,
			"abstract": "abstract",
			"type": {},
			"gallery": "gallery"
		}];
		if ( Object.keys( examples ).length > 0 ) {
			resolve( examples[Object.keys( examples )[0]] );
		} else {
			resolve();
		}
	} );
}


/**
 * Find event by ID
 * Returns an event
 *
 * eventID Long ID of event to return
 * returns Event
 **/
exports.getEventById = function ( eventID ) {
	return new Promise( function ( resolve, reject ) {
		var examples = {};
		examples['application/json'] = {
			"fact": "fact",
			"id": 0,
			"abstract": "abstract",
			"type": {},
			"gallery": "gallery"
		};
		if ( Object.keys( examples ).length > 0 ) {
			resolve( examples[Object.keys( examples )[0]] );
		} else {
			resolve();
		}
	} );
}


/**
 * Find events by performer
 * Returns a list of events
 *
 * performerID String performer of events to return
 * returns List
 **/
exports.getEventByPerformer = function ( performerID ) {
	return new Promise( function ( resolve, reject ) {
		var examples = {};
		examples['application/json'] = [{
			"fact": "fact",
			"id": 0,
			"abstract": "abstract",
			"type": {},
			"gallery": "gallery"
		}, {
			"fact": "fact",
			"id": 0,
			"abstract": "abstract",
			"type": {},
			"gallery": "gallery"
		}];
		if ( Object.keys( examples ).length > 0 ) {
			resolve( examples[Object.keys( examples )[0]] );
		} else {
			resolve();
		}
	} );
}


/**
 * Find events by seminar
 * Returns a list of events
 *
 * seminarID String seminar of events to return
 * returns List
 **/
exports.getEventBySeminar = function ( seminarID ) {
	return new Promise( function ( resolve, reject ) {
		var examples = {};
		examples['application/json'] = [{
			"fact": "fact",
			"id": 0,
			"abstract": "abstract",
			"type": {},
			"gallery": "gallery"
		}, {
			"fact": "fact",
			"id": 0,
			"abstract": "abstract",
			"type": {},
			"gallery": "gallery"
		}];
		if ( Object.keys( examples ).length > 0 ) {
			resolve( examples[Object.keys( examples )[0]] );
		} else {
			resolve();
		}
	} );
}


/**
 * Find events by type
 * Returns a list of events
 *
 * type String type of events to return
 * returns List
 **/
exports.getEventByType = function ( type ) {
	return new Promise( function ( resolve, reject ) {
		var examples = {};
		examples['application/json'] = ["", ""];
		if ( Object.keys( examples ).length > 0 ) {
			resolve( examples[Object.keys( examples )[0]] );
		} else {
			resolve();
		}
	} );
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
	return new Promise( function ( resolve, reject ) {
		var examples = {};
		examples['application/json'] = {
			"date": "date",
			"id": 0,
			"place": "place",
			"title": "title"
		};
		if ( Object.keys( examples ).length > 0 ) {
			resolve( examples[Object.keys( examples )[0]] );
		} else {
			resolve();
		}
	} );
}

