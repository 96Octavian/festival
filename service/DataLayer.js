const sqlDbFactory = require( "knex" );

let { eventsDbSetup } = require( "./EventService" );
let { artistsDbSetup, companiesDbSetup } = require( "./PerformerService" );
let { usersDbSetup } = require( "./UserService" );

let sqlDb = sqlDbFactory( {
	client: "pg",
	connection: {
		host: "127.0.0.1",
		user: "postgres",
		password: "admin",
		database: "festival",
		debug: false
	},
	ssl: true,
	debug: false
} );

function setupDataLayer() {
	console.log( "Setting up data layer" );
	return Promise.all( [eventsDbSetup( sqlDb ), artistsDbSetup( sqlDb ), companiesDbSetup( sqlDb ), usersDbSetup( sqlDb )] );
}

module.exports = { database: sqlDb, setupDataLayer };