const sqlDbFactory = require( "knex" );

let { eventsDbSetup } = require( "./EventService" );

let sqlDb = sqlDbFactory( {
	client: "pg",
	connection: {
		host: "127.0.0.1",
		user: "postgres",
		password: "admin",
		database: "festival",
		debug: true
	},
	ssl: true,
	debug: true
} );

function setupDataLayer() {
	console.log( "Setting up data layer" );
	return eventsDbSetup( sqlDb );
}

module.exports = { database: sqlDb, setupDataLayer };