'use strict';

let sqlDb;

exports.artistsDbSetup = function ( database ) {
	sqlDb = database;
	console.log( "Checking if Artists table exists" );
	return database.schema.hasTable( "Artists" ).then( exists => {
		if ( !exists ) {
			console.log( "It doesn't so we create it" );
			return database.schema.createTable( "Artists", table => {
				table.increments();
				table.integer( "ArtistID" );
				table.text( "Name" );
				table.text( "Achievements" );
			} );
		}
		else console.log( "Artists table exists" );
	} );
};

exports.companiesDbSetup = function ( database ) {
	sqlDb = database;
	console.log( "Checking if Companies table exists" );
	return database.schema.hasTable( "Companies" ).then( exists => {
		if ( !exists ) {
			console.log( "It doesn't so we create it" );
			return database.schema.createTable( "Companies", table => {
				table.increments();
				table.integer( "CompanyID" );
				table.text( "Name" );
			} );
		}
		else console.log( "Company table exists" );
	} );
};

/**
 * Find a performer by event
 * Returns a performer
 *
 * eventID Long ID of event to return
 * returns List
 **/
exports.getPerformerByEvent = function ( eventID ) {
	return sqlDb( "EventToArtist" )
		.where( 'EventID', eventID );
  //return new Promise(function(resolve, reject) {
  //  var examples = {};
  //  examples['application/json'] = [ "", "" ];
  //  if (Object.keys(examples).length > 0) {
  //    resolve(examples[Object.keys(examples)[0]]);
  //  } else {
  //    resolve();
  //  }
  //});
}

/**
 * Find a performer by company
 * Returns performers
 *
 * companyID Long ID of event to return
 * returns List
 **/
exports.getPerformerByCompany = function ( companyID ) {
	return sqlDb( "ArtistToCompany" )
		.where( 'CompanyID', companyID );
	//return new Promise(function(resolve, reject) {
	//  var examples = {};
	//  examples['application/json'] = [ "", "" ];
	//  if (Object.keys(examples).length > 0) {
	//    resolve(examples[Object.keys(examples)[0]]);
	//  } else {
	//    resolve();
	//  }
	//});
}

/**
 * Find a performer by artist
 * Returns performers
 *
 * artistID Long ID of event to return
 * returns List
 **/
exports.getPerformerByArtist = function ( artistID ) {
	return sqlDb( "ArtistToCompany" )
		.where( 'ArtistID', artistID );
	//return new Promise(function(resolve, reject) {
	//  var examples = {};
	//  examples['application/json'] = [ "", "" ];
	//  if (Object.keys(examples).length > 0) {
	//    resolve(examples[Object.keys(examples)[0]]);
	//  } else {
	//    resolve();
	//  }
	//});
}

/**
 * Find a performer by ID
 * Returns a performer
 *
 * performerID Long ID of performer to return
 * returns Object
 **/
exports.getPerformerById = function ( performerID ) {
	if ( String( performerID ).charAt( 0 ) == '1' ) {
		return sqlDb( "Artists" )
			.where( 'ArtistID', performerID );
	}
	else return sqlDb( "Companies" )
		.where( 'CompanyID', performerID );
  //return new Promise(function(resolve, reject) {
  //  var examples = {};
  //  examples['application/json'] = "";
  //  if (Object.keys(examples).length > 0) {
  //    resolve(examples[Object.keys(examples)[0]]);
  //  } else {
  //    resolve();
  //  }
  //});
}


/**
 * Get available performers
 * Get a list of all the performers of the festival
 *
 * offset Integer Pagination offset. Default is 0. (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500. (optional)
 * returns List
 **/
exports.getPerformers = function(offset,limit) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ "", "" ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

