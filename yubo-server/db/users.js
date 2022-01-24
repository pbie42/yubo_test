const knex = require('./knex');

const getAllUsers = (currentPage) => {
	return knex('users').select('*').paginate({ perPage: 50, currentPage });
};

const updateUser = (user) => {
	return knex('users')
		.where({ id: user.id })
		.update({ isDeleted: user.isDeleted ? null : 1 });
};

const searchUser = (term, currentPage) => {
	return knex('users')
		.where('name', 'like', `%${term}%`)
		.orWhere('username', 'like', `%${term}%`)
		.orWhere('country', 'like', `%${term}%`)
		.orWhere('city', 'like', `%${term}%`)
		.paginate({ perPage: 50, currentPage });
};

module.exports = {
	getAllUsers,
	updateUser,
	searchUser,
};
