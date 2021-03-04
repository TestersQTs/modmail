const { DataTypes } = require("sequelize");

module.exports = sequelize => {
	sequelize.define("guildConfiguration", {
		prefix: {
			type: DataTypes.STRING,
			defaultValue: "!",
		},
	});
};
