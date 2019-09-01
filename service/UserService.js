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
 * Register
 * Register into the store
 *
 * body User 
 * no response value expected for this operation
 **/
exports.userRegisterPOST = function ( username, password ) {
	return checkIfUserExists( username )
		.then( function ( rows ) {
			if ( Object.keys( rows ).length == 0 ) {

				sqlDb( "Users" ).select( "UserID" )
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
							})
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
