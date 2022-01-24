const knex = require('knex');

const konnected = knex({
	client: 'sqlite3',
	connection: {
		filename: 'db.sqlite',
	},
	development: {
		client: 'sqlite3',
		connection: {
			filename: 'db.sqlite',
		},
	},
});

module.exports = konnected;
