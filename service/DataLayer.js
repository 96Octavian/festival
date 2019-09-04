const sqlDbFactory = require( "knex" );

let { eventsDbSetup } = require( "./EventService" );
let { artistsDbSetup, companiesDbSetup } = require( "./PerformerService" );
let { usersDbSetup } = require( "./UserService" );

let sqlDb = sqlDbFactory( {
	//client: "pg",
	//connection: {
	//	host: "127.0.0.1",
	//	user: "postgres",
	//	password: "admin",
	//	database: "festival",
	//	debug: false
	//},
	connection: {
		host: "ec2-23-21-148-223.compute-1.amazonaws.com",
		user: "ceyfdzrzhnkjgk",
		password: "a177112efa281b9f4bf826824f6baf89beed14c4ed1880897bbda705d3bc6183",
		database: "d8i9a2k2vbp99s",
		port: 5432
	},
	ssl: true,
	debug: false
} );

function setupDataLayer() {
	console.log( "Setting up data layer" );
	return Promise.all( [eventsDbSetup( sqlDb ), artistsDbSetup( sqlDb ), companiesDbSetup( sqlDb ), usersDbSetup( sqlDb )] );
}

module.exports = { database: sqlDb, setupDataLayer };