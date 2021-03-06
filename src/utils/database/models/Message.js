const { DataTypes } = require("sequelize");

module.exports = sequelize => {
	sequelize.define("message", {
		messageId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		content: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};
