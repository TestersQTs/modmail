function ApplyExtra(sequelize) {
	const { guild, guildConfiguration } = sequelize.models;

	guild.belongsTo(guildConfiguration, {});
}

module.exports = { ApplyExtra };
