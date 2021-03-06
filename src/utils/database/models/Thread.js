const { DataTypes } = require("sequelize");

module.exports = sequelize => {
	sequelize.define("thread", {
		isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
			allowNull: false,
		},
		messageId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		uuid: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};
