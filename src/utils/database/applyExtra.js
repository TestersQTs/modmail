function ApplyExtra(sequelize) {
	const { thread, users, message } = sequelize.models;

	users.hasMany(thread, {});
	thread.hasMany(message, {});
}

module.exports = { ApplyExtra };
