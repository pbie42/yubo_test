const knex = require('knex')({
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

const { attachPaginate } = require('knex-paginate');
attachPaginate();

module.exports = knex;
