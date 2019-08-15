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
exports.getUserByUsername = function(username) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "password" : "password",
  "eventList" : [ 6, 6 ],
  "id" : 0,
  "username" : "username"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Login
 * Login with a form
 *
 * username String 
 * password String 
 * no response value expected for this operation
 **/
exports.userLoginPOST = function(username,password) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Register
 * Register into the store
 *
 * body User 
 * no response value expected for this operation
 **/
exports.userRegisterPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

