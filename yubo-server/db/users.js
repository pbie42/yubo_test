const knex = require('./knex');

const getAllUsers = () => {
	return knex('users').select('*');
};

module.exports = {
	getAllUsers,
};

// const User = sequelize.define(
// 	'user',
// 	{},
// 	{
// 		tableName: 'users',
// 	}
// );

// const getAllUsers = async () => {
// 	user.findAll({
// 		where: {}
// 	})
// }
