'use strict';

let sqlDb;

exports.usersDbSetup = function ( database ) {
	sqlDb = database;
	console.log( "Checking if Users table exists" );
	return database.schema.hasTable( "Users" ).then( exists => {
		if ( !exists ) {
			console.log( "It doesn't so we create it" );
			return database.schema.createTable( "Users", table => {
				table.increments();
				table.integer( "UserID" );
				table.text( "Name" );
				table.text( "Password" );
			} );
		}
		else console.log( "Users table exists" );
	} );
};

/**
 * Find events by user
 * Returns a list of events
 *
 * userID String performer of events to return
 * returns List
 **/
exports.getCart = function ( userID ) {
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
 * Find user by username
 * Returns a user
 *
 * username Long username of username to return
 * returns User
 **/
exports.getUserByUsername = function ( username ) {
	return new Promise( function ( resolve, reject ) {
		var examples = {};
		examples['application/json'] = {
			"password": "password",
			"eventList": [6, 6],
			"id": 0,
			"username": "username"
		};
		if ( Object.keys( examples ).length > 0 ) {
			resolve( examples[Object.keys( examples )[0]] );
		} else {
			resolve();
		}
	} );
}

/**
 * Login
 * Login with a form
 *
 * username String 
 * password String 
 * no response value expected for this operation
 **/
exports.userLoginPOST = function ( username, password ) {

	return sqlDb( "Users" ).where( 'Name', username ).andWhere( 'Password', password ).select( 'UserID' );

}

/**
 * Reserve
 * Reserve an event
 *
 * username String 
 * eventID Integer 
 * no response value expected for this operation
 **/
exports.reserveByEventID = function ( username, eventID ) {
	console.log( "Params: " + username + ", " + eventID );
	return sqlDb( "UserToEvent" ).where( 'EventID', eventID ).andWhere( 'UserID', username ).then( ( rows ) => {
		if ( rows.length > 0 ) {
			return sqlDb( "UserToEvent" ).where( 'EventID', eventID ).andWhere( 'UserID', username );
		}
		else {
			return sqlDb( "UserToEvent" ).insert( { UserID: username, EventID: eventID } )
				.then( () => {
					return sqlDb( "UserToEvent" ).where( 'EventID', eventID ).andWhere( 'UserID', username );
				} )
		}
	} )

}

/**
 * Remove
 * Remove an event
 *
 * username String 
 * eventID Integer 
 * no response value expected for this operation
 **/
exports.removeByEventID = function ( username, eventID ) {
	console.log( "Params: " + username + ", " + eventID );
	return sqlDb( 'UserToEvent' ).where( 'UserID', username ).andWhere( 'EventID', eventID ).del();
}

/**
 * Register
 * Register into the store
 *
 * body User 
 * no response value expected for this operation
 **/
exports.userRegisterPOST = function ( username, password ) {
	return sqlDb( "Users" ).where( 'Name', username )
		.then( function ( rows ) {
			if ( Object.keys( rows ).length == 0 ) {

				return sqlDb( "Users" ).select( "UserID" )
					.then( ids => {
						console.log( ids );
						let lista = []
						for ( let i = 0; i < ids.length; i++ ) {
							lista.push( ids[i].UserID );
						}
						let ID = 9;
						while ( lista.includes( ID ) ) {
							ID++;
						}
						console.log( "ID = " + ID );
						return sqlDb( "Users" ).insert( { UserID: ID, Name: username, Password: password } )
							.then( () => {
								return sqlDb( "Users" ).where( 'Name', username );
							} )
					} )
			}
			else {
				return sqlDb( "Users" ).where( 'Name', username );
			}
		} )
}

var checkIfUserExists = function ( username ) {
	return sqlDb( "Users" ).where( 'Name', username );
}
