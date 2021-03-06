const { DataTypes } = require("sequelize");

module.exports = sequelize => {
	sequelize.define("users", {
		userId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		activeThread: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
			allowNull: false,
		},
	});
};
